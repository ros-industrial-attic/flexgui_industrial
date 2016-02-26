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
 
deviceService.$inject = ['$rootScope', 'historyService', 'projectService', 'variableService', 'popupService', 'scriptManagerService'];

function deviceService($rootScope, historyService, projectService, variableService, popupService, scriptManagerService) {

    $rootScope.$watch(function () { return projectService.screenAdded; }, function () {
        if (projectService.screenAdded) {
            device.saveProject(true);
        }
    });

    // Communication with the ROS
    var device = {
        //connection starts from unconnected state
        connected: false,

        nodes: {},

        //server address
        ip: localStorage.getItem("diIp") || "localhost",
        port: localStorage.getItem("diPort") || 9090,

        // The current version of the local project
        projectVersion: -1,
        // Stored to avoid problems caused by upload delay
        prevProjectVersion: -1,

        // Used to synchronize the project file. After each modification the projectVersion
        // is incremented. If the two projectVersions are different, the client request
        // the download of the project from the server. 
        downloadProject: function () {
            //TODO: handle collisions
            //TODO: handle local projects
            device.callService("/rosapi/get_param", { name: "projectVersion", default: "0" }, function (result) {
                var version = parseInt(result.value);
                if (device.projectVersion != version && device.prevProjectVersion != version) {
                    device.projectVersion = version;

                    device.callService("/rosapi/get_param", { name: "project" }, function (result) {
                        var downloadedProject = JSON.parse(result.value, function (k, v) {
                            if (v == "@null") { return null; }
                            return v;
                        });
                        //If there is a saved project
                        if (downloadedProject && downloadedProject.screens) {
                            projectService.screens = downloadedProject.screens;
                            projectService.name = downloadedProject.name;
                            projectService.id = downloadedProject.id;
                            projectService.backgroundImage = downloadedProject.backgroundImage;
                            projectService.interfaceMetaData.list = downloadedProject.interfaceMetaDataList || [];

                            if (projectService.initScript != downloadedProject.initScript) {
                                projectService.initScript = downloadedProject.initScript;
                                projectService.runInit();
                            }

                            device.changeOnUi = true;
                            projectService.setupFidgets();
                            //we need to change the screen after the project is downloaded,
                            //before that the requested screen is not yet available.
                            var location = device.location.path().substring(1);
                            if (location) {
                                projectService.setCurrentScreenByName(location);
                            }
                            else {
                                projectService.setCurrentScreenIndex(projectService.currentScreenIndex);
                                if (projectService.currentScreen)
                                    device.location.path(projectService.currentScreen.name);
                            }
                        }

                        if (!device.rosUpdateStarted) {
                            device.rosUpdateStarted = true;
                            device.updateRos();
                        }
                    });
                }
            });

            setTimeout(device.downloadProject, 1000);
        },

        // Resets the project version and starts the project version update loop.
        beginDownloadProject: function () {
            device.projectVersion = -1;
            device.downloadProject();
        },

        // The list of topics in ROS
        topics: [],

        // The list of services in ROS
        services: [],

        // True if the ROS update is started already
        rosUpdateStarted: false,

        // Updates the list of topics, then calls itself after a delay
        updateRos: function () {
            variableService.ros.getTopics(function (pathList) {
                device.findRemovedInterfaces(pathList, device.topics);

                angular.forEach(pathList, function (path) {
                    // Returns a type string
                    variableService.ros.getTopicType(path, function (type) {
                        // Returns details from the type string
                        variableService.ros.getMessageDetails(type, function (details) {
                            // Everything is ready to assembly a Topic
                            device.addNewInterface(new device.Topic(path, type, details));
                        });
                    });
                });
            });

            //TODO for Laci: Solve this somehow, but not like this, with this in every 10sec you mess up the history. Why do we need this?
            //historyService.saveState();
            variableService.ros.getServices(function (pathList) {
                //TODO: rosapi/service_type is not working right now (even in the console). Check out later to get type data.
                device.findRemovedInterfaces(pathList, device.services);

                angular.forEach(pathList, function (path) {
                    // Simpler then Topic, because no type data available, but can be used still.
                    device.addNewInterface(new device.Service(path));
                });
            });

            setTimeout(device.updateRos, 10000);
        },

        // Adds a new interface if it's not already there
        addNewInterface: function (_interf) {
            if (device.nodes[_interf.nodeName] == undefined)
                device.nodes[_interf.nodeName] = { isNode: true, name: _interf.nodeName };

            //If the topic is already present, no action is required
            if (device.nodes[_interf.nodeName][_interf.shortPath]) {
                return;
            }

            device.nodes[_interf.nodeName][_interf.shortPath] = _interf;

            //Adding the interface to the flat list
            if (_interf.isTopic)
                device.topics.push(_interf);
            else
                device.services.push(_interf);

            device.changeOnUi = true;

            if (_interf.subscribed)
                _interf.subscribe();

            if (_interf.friendlyName)
                variableService.friendlyCache[_interf.friendlyName] = _interf;
            //console.log(nodes);
            //console.log("topic ready:", topic);
        },

        // Finds and removes removed topics and nodes
        findRemovedInterfaces: function (pathList, interfaceList) {
            var toRemove = [];
            angular.forEach(interfaceList, function (_interf) {
                //If the interface is not in the list anymore
                if (pathList.indexOf(_interf.path) == -1) {
                    toRemove.push(_interf);
                }
            });

            angular.forEach(toRemove, function (_interf) {
                //Remove the interface from the flat list
                interfaceList.splice(interfaceList.indexOf(_interf), 1);
                var node = device.nodes[_interf.nodeName];
                //Remove the interface from the node
                delete node[_interf.shortPath];

                device.changeOnUi = true;

                var interfaceLeft = false;
                // If the node becomes empty, it will be removed
                angular.forEach(Object.keys(node), function (leftInterface) {
                    //If there is any topic left, the node is not deleted
                    if (node[leftInterface].isInterface)
                        interfaceLeft = true;
                });

                if (!interfaceLeft) {
                    delete device.nodes[_interf.nodeName];
                }
            }
            );
        },

        // Base class for Service and Topic
        Interface: function (path, _this) {
            // Helps identifying interfaces
            _this.isInterface = true;
            // The full path of the topic
            _this.path = path;
            // Cuts down the name of the node
            _this.shortPath = path.substring(path.substring(1).indexOf("/") + 2);
            // Cuts down leading /, jumps over it as well, searching for the 2nd one
            _this.nodeName = path.substring(1, path.substring(1).indexOf("/") + 1);

            // Defines the friendlyName property
            _this._friendlyName = projectService.interfaceMetaData.getFriendlyName(path);
            Object.defineProperty(_this, "friendlyName", {
                get: function () {
                    return _this._friendlyName;
                },
                set: function (newValue) {
                    // Remove the old one
                    if (variableService.friendlyCache[_this._friendlyName])
                        delete variableService.friendlyCache[_this._friendlyName];

                    _this._friendlyName = newValue;

                    // Put the interface in the friendlyCache
                    if (newValue)
                        variableService.friendlyCache[newValue] = _this;

                    // Saves the change in the projectService.
                    projectService.interfaceMetaData.setFriendlyName(path, newValue);
                    device.saveProject(false);
                }
            });
        },

        callService: function (path, params, resultCallback) {
            var client = new ROSLIB.Service({
                ros: variableService.ros,
                name: path
            });

            var request = new ROSLIB.ServiceRequest(params);

            client.callService(request, function (result) {
                if (resultCallback) {
                    resultCallback(result);
                }
                device.changeOnUi = true;
            });
        },

        // Service class for handling service related logic
        Service: function (path) {
            // Constructs the base class
            device.Interface(path, this);
            // Helps identifying services
            this.isService = true;

            // Calling the service. Results in a callback.
            this.call = function (params, resultCallback) {
                //Test: nodes["/"].spawn.call({x:0, y:0, theta:0})
                //Test: nodes["/"].spawn.call({x:0,y:0,theta:0}, function(result){#message("Spawned: " + result.name)})
                //Test: nodes["/"].reset.call()
                device.callService(path, params, resultCallback);
            }
        },

        // Topic class for handling topic related logic
        Topic: function (path, type, details) {
            // Constructs the base class
            device.Interface(path, this);
            // Helps identifying topics
            this.isTopic = true;
            // The type of the topic
            this.type = type;
            // Details of the type information
            this.details = details;
            // The last value received
            this.value = null;

            this.subscribe = function () {
                // The Topic object to handle listening
                this.listener = new ROSLIB.Topic({
                    ros: variableService.ros,
                    name: this.path,
                    messageType: this.type,
                    // Max 2 messages/s
                    throttle_rate: 500
                });

                // This will mean another object in the subscribe
                var thisTopic = this;
                this.listener.subscribe(function (message) {
                    // Compares the content of the values, to avoid unnecessary ui updates
                    if (JSON.stringify(thisTopic.value) != JSON.stringify(message)) {
                        var newValue, oldValue;

                        //save new and old values
                        oldValue = angular.copy(thisTopic.value);
                        newValue = angular.copy(message);

                        thisTopic.value = message;
                        device.changeOnUi = true;
                    }
                });
            };

            // Property to handle subscribed binding
            this._subscribed = projectService.interfaceMetaData.getSubscribed(path);
            Object.defineProperty(this, "subscribed", {
                get: function () {
                    return this._subscribed;
                },
                set: function (newValue) {
                    this._subscribed = newValue;

                    // Saves the change in the projectService.
                    projectService.interfaceMetaData.setSubscribed(path, newValue);
                    device.saveProject(false);

                    if (this._subscribed) {
                        this.subscribe();
                    }
                    else {
                        //Unsubscribe
                        if (this.listener)
                            this.listener.unsubscribe();
                    }
                }
            });
        },

        // Stores if there is a change on the UI
        changeOnUi: false,

        // Refreshes the UI if there is a change
        refreshUi: function () {
            if (device.changeOnUi) {
                device.changeOnUi = false;
                $rootScope.$apply();
            }

            setTimeout(device.refreshUi, 200);
        },

        // Uploads the project to the server and creates a new projectVersion.
        saveProject: function (saveHistory) {
            if (saveHistory) {
                historyService.saveState();
            }

            //TODO: this is only a quick fix to be able to use iVAR without ROS backend
            if (!device.nodes.rosapi) {
                return;
            }

            var seen = [];

            var projectJson = JSON.stringify({
                screens: projectService.screens,
                initScript: projectService.initScript,
                background: projectService.backgroundImage,
                name: projectService.name,
                id: projectService.id,
                interfaceMetaDataList: projectService.interfaceMetaData.list,
            }, function (key, val) {
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

            device.nodes.rosapi.set_param.call({
                name: "project", value: projectJson
            });

            //Called after the upload, because that might take some time
            device.prevProjectVersion = device.projectVersion;
            device.projectVersion = parseInt(Math.random() * 1000000);
            device.save(projectService, device.projectVersion, true);
            device.nodes.rosapi.set_param.call({ name: "projectVersion", value: device.projectVersion.toString() });
        },

        save: function (proj, version, overwrite) {
            overwrite = overwrite || false;
            proj.version = version;

            //check project exists in the local storage
            var p = localStorage.getItem("project_" + proj.id);
            var seen = [];
            localStorage.setItem("project_" + proj.id, JSON.stringify(proj, function (key, val) {
                if (val != null && typeof val == "object") {
                    if (seen.indexOf(val) >= 0) {
                        return;
                    }
                    seen.push(val);
                }
                return val;
            }));

            return true;
        },

        // Friendly name based hash
        friendlyCache: {},

        // Sets up the ROS and its callback events
        init: function (location) {
            device.location = location;

            try {
                variableService.ros = new ROSLIB.Ros({
                    url: device.server
                });

                //ROS Event handling
                variableService.ros.on('connection', function () {
                    device.connected = true;
                    device.changeOnUi = true;
                });

                variableService.ros.on('error', function (error) {
                    device.connected = false;
                    popupService.show(localization.currentLocal.ros.connectionError, popupService.types.error);
                    device.changeOnUi = true;
                });

                variableService.ros.on('close', function () {
                    device.connected = false;
                    device.changeOnUi = true;
                });

                this.beginDownloadProject();
                this.refreshUi();

                this.initDone = Date.now();
            } catch (exception) {
                popupService.show(localization.currentLocal.ros.communicationInitError + ": " + exception, popupService.types.error);
            }
        }
    };

    Object.defineProperty(device, 'server', {
        get: function () {
            return "ws://" + device.ip + ":" + device.port + "/";
        }
    });

    return device;
}