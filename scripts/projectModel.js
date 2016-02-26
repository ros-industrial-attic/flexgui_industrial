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
 
projectService.$inject = ['$rootScope', 'enumService', 'fidgetService', 'popupService', '$location', 'scriptManagerService', 'variableService', '$timeout'];

function projectService($rootScope, enumService, fidgetService, popupService, $location, scriptManagerService, variableService, $timeout) {
    var project = {
        currentScreen: null,

        //returns with a new, empty screen
        getScreen: function (name, type) {
            return {
                id: project.getId(),
                type: type || enumService.screenTypesEnum.Normal,
                properties: { name: name },
                fidgets: []
            }
        },

        //generates index image for the screen belt
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
                    screen.indexImage = indexImage;

                    if (callback) callback();
                }
            });
        },

        halfScale: function(canvas, w, h){
            var destCtx = document.createElement("canvas").getContext("2d");
            destCtx.canvas.width = w || canvas.width / 2;
            destCtx.canvas.height = h || canvas.height / 2;
            destCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, w || canvas.width / 2, h || canvas.height / 2);
            return destCtx.canvas;
        },

        //generate unique id
        getId: function () {

            var exists = true;
            var id = guid();

            while (exists) {
                exists = false;
                angular.forEach(project.screens, function (screen) {
                    if (screen.id == "screen-" + id) {
                        exists = true;
                        id = guid();
                    }
                });
            }

            return "screen-" + id;

            function guid() {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                      .toString(16)
                      .substring(1);
                }
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                  s4() + '-' + s4() + s4() + s4();
            }
        },

        addScreenVisible: false,
        showAddScreen: function (val) {
            project.addScreenVisible = val;
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

        //setup getters and setters for all private members of fidgets in the project
        setupFidgets: function (callback) {
            function setupContainer(container, lvl) {
                angular.forEach(container.fidgets, function (fidget, index) {
                    fidget.parent = container;
                    fidget.containerLevel = lvl;
                    fidgetService.defineProperties(fidget);

                    if (callback) {
                        callback(fidget);
                    }

                    if (fidget.source == "fidgetGroup") {
                        setupContainer(fidget, lvl + 1);
                    }
                });
            }

            angular.forEach(project.screens, function (screen, index) {
                screen.id = screen.id || project.getId();
                screen.type = screen.type || enumService.screenTypesEnum.Normal;
                screen.containerLevel = 0;
                setupContainer(screen, 1);
            });
        },

        //delete fidgets from screen
        //project.currentScreen: screen
        deleteFidget: function (container, fidget) {
            container.fidgets.splice(container.fidgets.indexOf(fidget), 1);
        },

        //runs the initscript 
        runInit: function () {
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
            name += type == enumService.screenTypesEnum.Factory ? "Factory " : "Screen ";

            var exists = true;
            var id = "";

            while (exists) {
                exists = false;
                angular.forEach(project.screens, function (screen) {
                    if (screen.properties.name == name + id) {
                        exists = true;
                        if (id == "")
                            id = 2;
                        else
                            id++;
                    }
                });
            }

            var s = this.getScreen(name + id, type);
            this.screens.push(s);
            //this.setCurrentScreen(s);
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
                    project.load(data);
                });
            }
        },

        screenTypes: [],
        screenAdded: null,
        load: function (proj) {
            project.screens = proj.screens;
            project.name = proj.name;
            project.id = proj.id;
            project.backgroundImage = proj.backgroundImage;
            project.interfaceMetaData.list = proj.interfaceMetaDataList || [];

            if (project.initScript != proj.initScript) {
                project.initScript = proj.initScript;
                project.runInit();
            }

            project.setupFidgets();
            project.setCurrentScreenIndex(0);
            //we need to change the screen after the project is downloaded,
            //before that the requested screen is not yet available.
            var location = $location.path().substring(1);
            if (location) {
                project.setCurrentScreenByName(location);
            }
            else {
                project.setCurrentScreenIndex(project.currentScreenIndex);
                $location.path(project.currentScreen.name);
            }
        }
    };

    //project.setCurrentScreenIndex(0);
    project.screenTypes.push({ title: localization.currentLocal.buttons.addNormalScreen, icon: 'images/folder.png', action: function () { project.addScreen(enumService.screenTypesEnum.Normal); project.showAddScreen(false), project.screenAdded = Date.now(); } })

    return project;
}