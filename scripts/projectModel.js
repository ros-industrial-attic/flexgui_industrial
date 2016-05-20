/*
 * Software License Agreement (Apache License)
 *
 * Copyright (c) 2016, PPM AS
 * Contact: laszlo.nagy@ppmas.no
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License. 
*/

projectService.$inject = ['$rootScope', 'enumService', 'fidgetService', 'popupService', '$location', 'scriptManagerService', 'variableService', '$timeout', 'backgroundService', 'projectConversionService'];

function projectService($rootScope, enumService, fidgetService, popupService, $location, scriptManagerService, variableService, $timeout, backgroundService, projectConversionService) {
    var project = {
        currentScreen: null,
        appVersion: null,
        forceScreenBelt: false,
        //returns with a new, empty screen
        getScreen: function (name, type) {
            return {
                id: project.getId(),
                type: type || enumService.screenTypesEnum.Normal,
                properties: { name: name, hasScreenBelt: 'true' },
                fidgets: []
            }
        },

        generateIndexImage: function (screen, callback) {
            html2canvas(document.getElementById('currentScreen'), {
                onrendered: function (canvas) {
                    var windowSize = { w: $(window).width(), h: $(window).height() };
                    //step down resize
                    while (canvas.height / 2 > 240 && canvas.width / 2 > 400) {
                        canvas = project.halfScale(canvas);
                    }

                    canvas = project.halfScale(canvas, 400, 240);
                    var indexImage = canvas.toDataURL("image/jpeg", 0.3);
                    if (screen) screen.indexImage = indexImage;
                    if (callback) callback();
                }
            });
        },

        halfScale: function (canvas, w, h) {
            var destCtx = document.createElement("canvas").getContext("2d");
            destCtx.canvas.width = w || canvas.width / 2;
            destCtx.canvas.height = h || canvas.height / 2;
            destCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, w || canvas.width / 2, h || canvas.height / 2);
            return destCtx.canvas;
        },

        //extra setters/getters for the addons
        extraParamGetters: [],
        extraParamSetters: [],
        extraCleanParamGetters: [],

        getCleanObject: function () {
            var obj = {
                screens: [],
                name: '',
                id: 0,
                backgroundImage: null,
                interfaceMetaDataList: [],
                initScript: null,
                appVersion: project.appVersion
            };

            //add capability to add new parameters to the get from addons
            angular.forEach(project.extraCleanParamGetters, function (f) { obj = f(obj); });

            return obj;
        },

        getObject: function (images) {
            var obj = {
                screens: project.screens,
                initScript: project.initScript,
                background: project.backgroundImage,
                name: project.name,
                id: project.id,
                currentEditorId: project.currentEditorId,
                images: images,
                appVersion: project.appVersion,
                interfaceMetaDataList: project.interfaceMetaData.list,
            }

            //add capability to add new parameters to the get from addons
            angular.forEach(project.extraParamGetters, function (f) { obj = f(obj); });

            return obj;
        },

        setObject: function (proj) {
            project.screens = proj.screens;
            project.name = proj.name;
            project.id = proj.id;
            project.backgroundImage = proj.backgroundImage;
            project.interfaceMetaData.list = proj.interfaceMetaDataList || [];
            project.currentEditorId = proj.currentEditorId;

            //add capability to add new parameters to the get from addons
            angular.forEach(project.extraParamSetters, function (f) { f(proj); });

            if (project.initScript != proj.initScript) {
                project.initScript = proj.initScript;
                project.runInit();
            }
        },

        //save the project object to a JSON string
        toJSON: function (images) {
            var seen = [];
            var projectJson = JSON.stringify(project.getObject(images), function (key, val) {
                if (!val && val !== 0) {
                    return "@null";
                }

                if (val != null && typeof val == "object") {
                    if (seen.indexOf(val) >= 0) {
                        return;
                    }
                    seen.push(val);
                }
                return val;
            });

            return projectJson;
        },

        parseJSON: function (json) {
            var proj = JSON.parse(json, function (k, v) {
                if (v == "@null") { return null; }
                return v;
            });

            return proj;
        },

        //generate unique id
        getId: function () {

            var exists = true;
            var id = variableService.guid();

            while (exists) {
                exists = false;
                angular.forEach(project.screens, function (screen) {
                    if (screen.id == "screen-" + id) {
                        exists = true;
                        id = variableService.guid();
                    }
                });
            }

            return "screen-" + id;
        },

        addScreenVisible: false,
        showAddScreen: function (val) {
            if (project.screenTypes.length == 1 && val) {
                project.screenTypes[0].action();
            } else {
                project.addScreenVisible = val;
            }
        },

        //array for the screens in the project
        screens: [],

        //background of all screens
        backgroundImage: null,

        //id of the project
        id: -1,

        //name of the project
        name: 'Project',

        //Metadata for interfaces
        interfaceMetaData: {
            //Stored interface data
            list: [],
            //Finds metadata for the given path. Returns null if not found.
            find: function (path) {
                var result = null;
                angular.forEach(this.list, function (metaData) {
                    if (metaData.path == path) {
                        result = metaData;
                    }
                });
                return result;
            },

            //Adds a new metadata entry. Removes already existing entries for the same path.
            add: function (path) {
                this.remove(path);
                var meta = { path: path, friendlyName: null, subscribed: false };
                this.list.push(meta);
                return meta;
            },

            //Removes a metadata entry.
            remove: function (path) {
                var i = this.list.indexOf(this.find(path));
                if (i != -1)
                    this.list.splice(i, 1);
            },

            //Sets the friendly name for an entry. 
            //Creates the entry if it doesn't exist,
            //Removes the entry if it contains default data.
            setFriendlyName: function (path, friendlyName) {
                var meta = this.find(path);
                //if meta doesn't exist and friendlyName is empty, nothing to do
                if (!meta && !friendlyName)
                    return;
                    //meta doesn't exist, friendlyName isn't empty
                else if (!meta && friendlyName) {
                    meta = this.add(path);
                    meta.friendlyName = friendlyName;
                }
                    //default meta
                else if (!friendlyName && !meta.subscribed)
                    this.remove(path);
                else
                    meta.friendlyName = friendlyName;
            },

            //Sets the subscribed property for an entry. 
            //Creates the entry if it doesn't exist,
            //Removes the entry if it contains default data.
            setSubscribed: function (path, subscribed) {
                var meta = this.find(path);
                //if meta doesn't exist and subscribed is false, nothing to do
                if (!meta && !subscribed)
                    return;
                    //meta doesn't exist, friendlyName isn't empty
                else if (!meta && subscribed) {
                    meta = this.add(path);
                    meta.subscribed = true;
                }
                    //default meta
                else if (!subscribed && !meta.friendlyName)
                    this.remove(path);
                else
                    meta.subscribed = subscribed;
            },

            //Returns if the metadata is subscribed.
            getSubscribed: function (path) {
                var meta = this.find(path);
                return meta != null && meta.subscribed;
            },

            //Returns the friendly name of the metadata if exists.
            getFriendlyName: function (path) {
                var meta = this.find(path);
                return meta == null ? null : meta.friendlyName;
            }
        },

        //runs when the project is loaded or changed
        initScript: "/*Nothing set yet*/",

        setupContainer: function (container, lvl, callback) {
            angular.forEach(container.fidgets, function (fidget, index) {
                fidget.parent = container;
                fidget.containerLevel = lvl;
                fidgetService.defineProperties(fidget);

                if (callback) {
                    callback(fidget);
                }

                if (fidget.source == "fidgetGroup") {
                    project.setupContainer(fidget, lvl + 1);
                }
            })
        },

        //setup getters and setters for all private members of fidgets in the project
        setupFidgets: function (callback) {
            angular.forEach(project.screens, function (screen, index) {
                screen.id = screen.id || project.getId();
                screen.type = screen.type || enumService.screenTypesEnum.Normal;
                screen.containerLevel = 0;
                project.setupContainer(screen, 1, callback);
            });

            $rootScope.$watchGroup(
                [
                    function () { return Object.keys(enumService.screenTypesEnum).length; },
                    function () { return project.screens.length }
                ],
                function (nv, ov) {
                    var types = [];
                    angular.forEach(enumService.screenTypesEnum, function (v) { types.push(v); });
                    angular.forEach(project.screens, function (screen) {
                        screen.visible = types.indexOf(screen.type) > -1;
                    });
                });
        },

        updateFidgets: function (container) {
            angular.forEach(container.fidgets, function (fidget) {
                if (!fidget.template) {
                    fidget.template = fidgetService.templates[fidget.source];
                }

                if (fidget.fidgets) {
                    project.updateFidgets(fidget);
                }
            });
        },

        //delete fidgets from screen
        //project.currentScreen: screen
        deleteFidget: function (container, fidget) {
            container.fidgets.splice(container.fidgets.indexOf(fidget), 1);
        },

        //runs the initscript 
        runInit: function () {
            fidgetService.scriptDict = {};

            try {
                eval(scriptManagerService.compile(project.initScript));
            }
            catch (ex) {
                popupService.show(localization.currentLocal.settings.tabs.initScript.initException + ": " + ex.message, popupService.types.error);
            }
        },

        //Sets the current screen to the given one
        setCurrentScreen: function (screen) {
            this.currentScreenIndex = this.screens.indexOf(screen);
            this.forceScreenBelt = false;

            $rootScope.$apply;
            this.currentScreen = screen;
            if (screen) {
                $location.path(screen.properties.name);

                //$timeout(project.generateIndexImage, 0, true, screen);

            } else {
                $location.path(null);
                return;
            }
        },

        //Sets the screen index directly
        setCurrentScreenIndex: function (value) {
            this.setCurrentScreen(this.screens[value]);
            //this.currentScreenIndex = value;
            //this.currentScreen = this.screens[value];
        },

        //Finds a screen with the given name and set it as current
        setCurrentScreenByName: function (name) {
            var s = project.findScreen(name);
            if (s != null)
                project.setCurrentScreen(s);
            else
                project.setCurrentScreenIndex(0);
        },

        //The index of the current screen. Stored as index to make project update easy.
        currentScreenIndex: 0,
        getCurrentScreen: function () {
            project.currentScreen = this.screens[Math.min(this.screens.length - 1, Math.max(0, this.currentScreenIndex))];
        },

        //Adds a new screen to the project. If the New Screen name is taken, it tries to find a proper one.
        addScreen: function (type) {
            var name = "New ";
            name += type == enumService.screenTypesEnum.Factory ? "Factory" : "Screen";

            var exists = true;
            var id = "";

            while (exists) {
                exists = false;
                angular.forEach(project.screens, function (screen) {
                    if (screen.properties.name == name + (id == "" ? id : (" " + id))) {
                        exists = true;
                        if (id == "")
                            id = 2;
                        else
                            id++;
                    }
                });
            }

            var s = this.getScreen(name + (id == "" ? id : (" " + id)), type);
            s.backgroundType = backgroundService.backgroundTypes["Image"];
            //set default background for factory screens
            if (s.type == enumService.screenTypesEnum.Factory) {
                s.backgroundImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAACklEQVQYV2P4DwABAQEAWk1v8QAAAABJRU5ErkJggg==";
                s.indexImage = s.backgroundImage;
                s.backgroundType = backgroundService.backgroundTypes["Color"];
            }
            this.screens.push(s);
            $rootScope.editScreen(s);
            //device.saveProject(true);
            return s;
        },

        //Finds a screen with the given name. Returns null if not found.
        findScreen: function (name) {
            for (var i = 0; i < this.screens.length; i++)
                if (this.screens[i].properties.name == name)
                    return this.screens[i];

            return null;
        },

        //Finds a screen with the given id. Returns null if not found.
        findScreenById: function (id) {
            for (var i = 0; i < this.screens.length; i++)
                if (this.screens[i].id == id)
                    return this.screens[i];

            return null;
        },

        //Adds the default screens to the project
        addDefaultScreens: function () {
            if (project.screens.length == 0) {
                $.getJSON("project.json", function (data) {
                    //automatic conersion for the demo project
                    data = projectConversionService.convert(data, project.appVersion);
                    project.load(data);
                });
            }
        },

        screenTypes: [],
        screenAdded: null,
        projectVersionError: false,
        //loads a given project
        load: function (proj) {
            //remove block ui
            if ($rootScope.blockMessage == localization.currentLocal.project.loading) $rootScope.blockMessage = null;
            //check that the current version of the app (setted in the app.js) is the same as the loaded one
            if (project.appVersion != proj.appVersion) {
                if (!project.projectVersionError) {
                    project.projectVersionError = true;
                    bootbox.confirm(localization.format(localization.currentLocal.project.notForThisVersion, [proj.appVersion, project.appVersion]), function (result) {
                        if (result) {
                            var p = projectConversionService.convert(proj, project.appVersion);
                            if (p) {
                                project.projectVersionError = false;

                                //load the converted project
                                project.load(p);

                                //save 
                                project.forceSave = new Date();
                            } else {
                                //the conversion failed
                                bootbox.confirm(localization.currentLocal.project.canNotConvert, function (result) {
                                    if (result) {
                                        //load a clean project
                                        project.load(project.getCleanObject());
                                        //clean node's friendly names
                                        $rootScope.device.cleanNodes();

                                        //remove path
                                        $location.path('');

                                        //save 
                                        project.forceSave = new Date();
                                        project.projectVersionError = false;
                                        project.currentScreen = null;
                                    } else {
                                        //if the user don't want to create a new one we can still try to load the project
                                        proj.appVersion = project.appVersion;
                                        project.load(proj);

                                        project.projectVersionError = false;
                                    }
                                });
                            }
                        } else {
                            //if the user don't want to convert we can still try to load the project
                            proj.appVersion = project.appVersion;
                            project.load(proj);
                        }
                    });
                }
            } else {
                //if we have the same version, we can load it
                project.setObject(proj);
                project.setupFidgets();

                if (project.currentScreenIndex == -1 && project.screens.length > 0) {
                    project.setCurrentScreenIndex(0);
                }

                if ($rootScope.sessionCookie) {
                    var location = $rootScope.startPage || $location.path().substring(1);
                    if (project.findScreen($rootScope.startPage)) {
                        delete $rootScope.startPage;
                    }

                    if (location) {
                        project.setCurrentScreenByName(location);
                    }
                    else if (project.currentScreen) {
                        $location.path(project.currentScreen.name);
                    }
                }
            }
        }
    };

    Object.defineProperty(project, "screenBeltVisible", {
        get: function () {
            return !project.currentScreen || [null, undefined, true, "true"].indexOf(project.currentScreen.properties.hasScreenBelt) > -1 || project.forceScreenBelt;
        }
    });

    project.screenTypes.push({
        title: localization.currentLocal.buttons.addNormalScreen,
        icon: 'images/folder.png',
        action: function () {
            project.addScreen(enumService.screenTypesEnum.Normal);
            project.showAddScreen(false);
            project.screenAdded = Date.now();
        }
    })

    return project;
}