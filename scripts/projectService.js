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

projectService.$inject = ['$rootScope', 'enumService', 'fidgetService', 'popupService', '$location', 'scriptManagerService', 'variableService', '$timeout', 'backgroundService', 'projectConversionService', 'iconService'];

function projectService($rootScope, enumService, fidgetService, popupService, $location, scriptManagerService, variableService, $timeout, backgroundService, projectConversionService, iconService) {
    var project = {
        currentScreen: null,
        appVersion: null,
        adminEnabled: false,
        _forceScreenBelt: false,
        prevProject: null,
        onlineVersion: null,
        localVersion: null,
        projectUploading: false,
        needSave: null,
        testSequence: [],
        //returns with a new, empty screen
        getScreen: function (name, type) {
            return {
                id: project.getId(),
                type: type || enumService.screenTypesEnum.Normal,
                properties: { name: name, hasScreenBelt: 'true', logo: '', logoPosition: 'bottomRight', logoWidth: 0 },
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
                testSequence: [],
                appVersion: project.appVersion,
                adminEnabled: false,
                password: null
            };

            //add capability to add new parameters to the get from addons
            angular.forEach(project.extraCleanParamGetters, function (f) { obj = f(obj); });

            project.interfaceMetaData.list = [];

            return obj;
        },

        getFidgetById: function (id) {
            var ret = null;

            function searchInFidgets(fidget) {
                angular.forEach(fidget.fidgets, function (f) {
                    if (f.id == id) ret = f; else if (f.fidgets) searchInFidgets(f);
                });
            }

            angular.forEach(project.screens, function (s) {
                searchInFidgets(s);
            });

            return ret;
        },

        getObject: function (images, saveEditorId) {
            var obj = {
                screens: project.screens,
                initScript: project.initScript,
                background: project.backgroundImage,
                name: project.name,
                id: project.id,
                images: images,
                testSequence: project.testSequence,
                appVersion: project.appVersion,
                interfaceMetaDataList: project.interfaceMetaData.list,
                adminEnabled: project.adminEnabled,
                clientId: $rootScope.currentUserId,
                projectVersion: project.localVersion,
                password: project.password
            }

            //add capability to add new parameters to the get from addons
            angular.forEach(project.extraParamGetters, function (f) { obj = f(obj); });

            return obj;
        },

        setObject: function (proj) {

        },

        //save the project object to a JSON string
        toJSON: function (images, saveEditorId) {
            var seen = [];
            var projectJson = JSON.stringify(project.getObject(images, saveEditorId), function (key, val) {
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
                var meta = { path: path, friendlyName: null, subscribed: false, deepFriendlyNames: {}, lastValue: null, isTopic: $rootScope.device.getInterface(path).isTopic };
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
            setFriendlyName: function (path, type, friendlyName) {
                var metaChanged = false;
                var meta = this.find(path);
                //if meta doesn't exist and friendlyName is empty, nothing to do
                if (!meta && !friendlyName)
                    return metaChanged;
                    //meta doesn't exist, friendlyName isn't empty
                else if (!meta && friendlyName) {
                    meta = this.add(path);
                    metaChanged = true;
                    meta.friendlyName = friendlyName;
                }
                    //default meta
                else if (!friendlyName && !meta.subscribed) {
                    this.remove(path);
                    metaChanged = true;
                    return metaChanged;
                }
                else
                    meta.friendlyName = friendlyName;

                if (type) meta.type = type;

                return metaChanged;
            },

            //Sets the subscribed property for an entry. 
            //Creates the entry if it doesn't exist,
            //Removes the entry if it contains default data.
            setSubscribed: function (path, type, subscribed) {
                var metaChanged = false;
                var meta = this.find(path);
                //if meta doesn't exist and subscribed is false, nothing to do
                if (!meta && !subscribed)
                    return metaChanged;
                    //meta doesn't exist, friendlyName isn't empty
                else if (!meta && subscribed) {
                    meta = this.add(path);
                    meta.subscribed = true;
                    metaChanged = true;
                }
                    //default meta
                else if (!subscribed && !meta.friendlyName) {
                    this.remove(path);
                    metaChanged = true;
                    return metaChanged;
                }
                else
                    meta.subscribed = subscribed;

                meta.type = type;

                return metaChanged;
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
            },

            //Returns the deep friendly names of the metadata if exists.
            getDeepFriendlyNames: function (path) {
                var meta = this.find(path);
                return meta == null || !meta.deepFriendlyNames ? {} : meta.deepFriendlyNames;
            },

            //Set deep friendly name
            setDeepFriendlyName: function (path, type, key, value, oldKey) {
                var meta = this.find(path);
                //if meta doesn't exist and subscribed is false, nothing to do
                if (!meta && !meta.subscribed)
                    return;
                //meta doesn't exist, friendlyName isn't empty

                if (!meta.deepFriendlyNames) meta.deepFriendlyNames = {};

                //remove the old value
                if (oldKey && meta.deepFriendlyNames[oldKey]) {
                    delete meta.deepFriendlyNames[oldKey];
                }

                //add the new value
                meta.deepFriendlyNames[key] = value;
                meta.type = type;
            },

            //Set last value
            setLastValue: function (path, type, value) {
                var metaChanged = false;
                //find meta
                var meta = this.find(path);

                //if not existing, create a new
                if (!meta) {
                    meta = this.add(path);
                    metaChanged = true;
                }
                if (!meta.type) meta.type = type;

                //set value
                meta.lastValue = value;

                return metaChanged;
            },

            //Get last value
            getLastValue: function (path) {
                var meta = this.find(path);

                if (!meta || !meta.lastValue) {
                    return null;
                }

                return meta.lastValue;
            },

            setType: function (path, type) {
                var metaChanged = false;
                //find meta
                var meta = this.find(path);

                //if not existing, create a new
                if (!meta) {
                    meta = this.add(path);
                    metaChanged = true;
                }

                meta.type = type;

                return metaChanged;
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
            this.currentLogo =
            $rootScope.$apply;
            this.currentScreen = screen;
            if (screen) {
                $location.path(screen.properties.name);
            } else {
                $location.path(null);
                return;
            }
        },

        //Sets the screen index directly
        setCurrentScreenIndex: function (value) {
            this.setCurrentScreen(this.screens[value]);
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
            //add default logo
            s.properties.logo = "iconService.get('images/logo_small.png')";
            s.properties.logoWidth = 100;
            s.properties.logoPosition = 'bottomRight';

            this.screens.push(s);
            $rootScope.editScreen(s);
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
                    var proj = JSON.parse(JSON.stringify(data), function (k, v) {
                        if (v == "@null") { return null; }
                        return v;
                    });

                    //convert to latest version
                    proj = projectConversionService.convert(proj, project.appVersion);

                    //load images
                    if (proj.images) {
                        angular.forEach(proj.images, function (img) {
                            if (img.base64) {
                                var slot = $rootScope.images.getSlot(img.name);

                                if (slot) {
                                    $rootScope.drive.setImage(img.name, img.base64);
                                    slot.base64 = img.base64;
                                    variableService.friendlyCache[img.name] = slot;
                                }
                            }
                        });
                    }

                    //load project
                    project.load(proj);
                });
            }
        },
        //available screen types
        screenTypes: [],
        //screen added
        screenAdded: null,
        //the given project version is not the latest
        projectVersionError: false,
        //last load date
        loaded: null,
        //project is changed but not saved yet
        changed: false,
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

                                $rootScope.$apply(function () {
                                    //load the converted project
                                    project.load(p);
                                });
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
                //hold a reference to the prev. project
                project.prevProject = angular.copy(project);

                //if we have the same version, we can load it
                project.interfaceMetaData.list = proj.interfaceMetaDataList || [];
                project.name = proj.name;
                project.id = proj.id;
                project.localVersion = proj.projectVersion
                project.testSequence = proj.testSequence || [];
                project.password = proj.password;

                //add capability to add new parameters to the get from addons
                angular.forEach(project.extraParamSetters, function (f) { f(proj); });

                project.adminEnabled = proj.adminEnabled || false;

                $timeout(function () {
                    project.screens = proj.screens;
                    project.backgroundImage = proj.backgroundImage;
                    project.setupFidgets();

                    if (project.initScript != proj.initScript) {
                        project.initScript = proj.initScript;
                        project.runInit();
                    }

                    if (project.currentScreenIndex == -1 && project.screens.length > 0) {
                        project.setCurrentScreenIndex(0);
                    }

                    if ($rootScope.sessionCookie) {
                        //load the start page if existing or from location
                        var location = $rootScope.startPage || $location.path().substring(1);
                        //remove startPage link
                        delete $rootScope.startPage;

                        if (location) {
                            project.setCurrentScreenByName(location);
                        }
                        else if (project.currentScreen) {
                            $location.path(project.currentScreen.name);
                        }
                    }

                    //change the last loaded time to be able to watch the project load action from other services
                    project.loaded = new Date();
                }, 0, true);

            }
        },
        getFidgetByName: function (name) {
            function isArray(obj) {
                return !!obj && obj.constructor === Array;
            }

            var f = null;

            function searchInContainer(container) {
                angular.forEach(container.fidgets, function (fidget) {
                    if (fidget.properties.name == name) {
                        //if there is more then one with the same name, return with an array
                        if (f != null) {
                            if (!isArray(f)) {
                                var temp = f;
                                f = [];
                                f.push(temp);
                            }

                            f.push(fidget);
                        } else {
                            f = fidget;
                        }
                    } else if (fidget.fidgets) {
                        searchInContainer(fidget)
                    }
                });
            }

            searchInContainer(project.currentScreen);

            return f;
        },
        getFidgetById: function (id) {
            var f = null;

            function searchInContainer(container) {
                angular.forEach(container.fidgets, function (fidget) {
                    if (fidget.id == id) {
                        f = fidget;
                    } else if (fidget.fidgets) {
                        searchInContainer(fidget)
                    }
                });
            }

            searchInContainer(project.currentScreen);

            return f;
        }
    };

    Object.defineProperty(project, "screenBeltVisible", {
        get: function () {
            return !project.currentScreen || [null, undefined, true, "true"].indexOf(project.currentScreen.properties.hasScreenBelt) > -1 || project.forceScreenBelt || $rootScope.settings.forceScreenBeltShow;
        }
    });

    Object.defineProperty(project, "currentLogo", {
        get: function () {
            var logo = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

            if (project && project.currentScreen && project.currentScreen.properties && project.currentScreen.properties.logo != '') {
                var base64 = eval(project.currentScreen.properties.logo);
                logo = base64 || logo;
            }

            return logo;
        }
    });

    Object.defineProperty(project, "forceScreenBelt", {
        get: function () {
            return project._forceScreenBelt;
        },
        set: function (v) {
            if ($rootScope.editHandler.isEditMode) return;
            project._forceScreenBelt = v;
        }
    });

    project.screenTypes.push({
        title: localization.currentLocal.buttons.addNormalScreen,
        icon: 'images/normalScreen.png',
        action: function () {
            project.addScreen(enumService.screenTypesEnum.Normal);
            project.showAddScreen(false);
            project.needSave = { history: true, ts: Date.now() };
        }
    })

    return project;
}


