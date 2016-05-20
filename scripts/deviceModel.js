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

deviceService.$inject = ['$rootScope', 'historyService', 'projectService', 'variableService', 'popupService', 'scriptManagerService', 'fidgetService'];

function deviceService($rootScope, historyService, projectService, variableService, popupService, scriptManagerService, fidgetService) {

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
        secure: ["true", true, null].indexOf(localStorage.getItem("diSecure")) > -1 || window.location.protocol == 'https:',

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
                            projectService.load(downloadedProject);
                            device.changeOnUi = true;
                        } else {
                            projectService.addDefaultScreens();
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
                device.nodes[_interf.nodeName] = { __isNode: true, __name: _interf.nodeName };

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

            fidgetService.scriptDict = {};
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
                    // Store the old friendly name to be able to delete from the cache
                    if (!_this._oldFriendlyName) _this._oldFriendlyName = _this._friendlyName;

                    // Set the new friendly name
                    _this._friendlyName = newValue;
                }
            });
        },

        cleanNodes: function(){
            function fn(i) {
                i.friendlyName = null;
                delete projectService.changeScripts[i.path];
            }

            angular.forEach(device.topics, fn);
            angular.forEach(device.services, fn);

            device.updateFriendlyCache();
        },

        //update friendly Cache
        updateFriendlyCache: function () {
            if (!device.hasDupes()) {
                var updateFn = function (_this) {
                    if (variableService.friendlyCache[_this._oldFriendlyName]) {
                        //empty scriptDict
                        fidgetService.scriptDict = {};

                        delete variableService.friendlyCache[_this._oldFriendlyName];
                        delete _this._oldFriendlyName;
                    }

                    // Put the interface in the friendlyCache
                    if (_this.friendlyName)
                        variableService.friendlyCache[_this.friendlyName] = _this;

                    // Saves the change in the projectService.
                    projectService.interfaceMetaData.setFriendlyName(_this.path, _this.friendlyName);

                    //empty scriptDict
                    fidgetService.scriptDict = {};
                }

                angular.forEach(device.topics, updateFn);
                angular.forEach(device.services, updateFn);


                device.saveProject(true);
            } else {
                var restoreFn = function (_this) {
                    if (_this._oldFriendlyName) {
                        _this._friendlyName = _this._oldFriendlyName;
                        delete _this._oldFriendlyName;
                    }
                }

                angular.forEach(device.topics, restoreFn);
                angular.forEach(device.services, restoreFn);
            }
        },

        hasDupes: function () {
            var hasDupe = false;
            angular.forEach(device.topics, function (i) { hasDupe = hasDupe || device.isDupe(i) });
            angular.forEach(device.services, function (i) { hasDupe = hasDupe || device.isDupe(i) });
            return hasDupe;
        },

        //Counts the interfaces that are using the 'name' friendly name.
        countFriendly: function (name) {
            result = 0;

            var countFn = function (_interf) {
                if (_interf.friendlyName == name)
                    result++;
            };

            angular.forEach(device.topics, countFn);
            angular.forEach(device.services, countFn);

            return result;
        },

        //An interface is using duplicated friendly name if more than 1 occurs in the interface list.
        isDupe: function (_interf, nm) {
            //if a special name is presented, check for that, otherwise check for the existing value
            return _interf.friendlyName && (nm ? device.countFriendly(nm) == 1 : device.countFriendly(_interf.friendlyName) > 1);
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
                        //overwrite properties to be able to update with a simple call
                        function overwriteProperties(obj) {
                            if (!obj || typeof obj !== "object") return;

                            angular.forEach(Object.keys(obj), function (key) {
                                //save property value
                                obj["_" + key] = angular.copy(obj[key]);

                                //overwrite properties recursively
                                overwriteProperties(obj["_" + key]);

                                //remove property to be able to create getter and setter
                                delete obj[key];

                                //create getter and setter
                                Object.defineProperty(obj, key, {
                                    get: function () { return obj["_" + key]; },
                                    set: function (v) {
                                        //set the original property
                                        obj["_" + key] = v;

                                        //save the new value
                                        var publishValue = angular.copy(thisTopic.value);

                                        //set back the property names
                                        function createOriginalNames(obj) {
                                            if (!obj || typeof obj !== "object") return;
                                            angular.forEach(Object.keys(obj), function (key) {
                                                createOriginalNames(obj[key]);
                                                obj[key.substring(1)] = angular.copy(obj[key]);
                                                delete obj[key];
                                            });
                                        }

                                        //change back the names
                                        createOriginalNames(publishValue);

                                        var parts = thisTopic.type.split("/");

                                        //check if there is any special setter for the given type
                                        if (device.topicSetters[parts[0]]) {
                                            device.topicSetters[parts[0]](thisTopic, publishValue);
                                        } else {
                                            //publish topic
                                            thisTopic.listener.publish(publishValue);
                                        }

                                        //create the getters/setters for the new value
                                        overwriteProperties(v);
                                    }
                                });
                            });
                        }

                        //start overwriting properties
                        overwriteProperties(message);

                        //set the value to the overwrited ones
                        thisTopic.value = message;

                        if (projectService.changeScripts[thisTopic.path]) {
                            eval(scriptManagerService.compile(projectService.changeScripts[thisTopic.path]));
                        }

                        device.changeOnUi = true;
                        angular.forEach(Object.keys(fidgetService.scriptDict), function (key) {
                            if (key.indexOf("#getReadyConnectorVariable") != -1 ||
								key.indexOf(thisTopic.shortPath) != -1 ||
								key.indexOf(thisTopic.friendlyName) != -1) delete fidgetService.scriptDict[key];
                        });
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

        // Special setters for some topics
        topicSetters: {},

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

            var projectJson = projectService.toJSON();

            device.nodes.rosapi.set_param.call({
                name: "project", value: projectJson
            });

            //checks the sent and downloaded project's length without spaces. If there is a different, something went wrong
            function checkSaveResult(projectJson) {
                if (device.checkProjectTimeout) {
                    clearTimeout(device.checkProjectTimeout);
                    device.checkProjectTimeout = null;
                }

                device.checkProjectTimeout = setTimeout(function () {
                    device.callService("/rosapi/get_param", { name: "project" }, function (result) {
                        //remove unicode chars
                        var r = /\\u([\d\w]{4})/gi;
                        result.value = result.value.replace(r, function (match, grp) {
                            return String.fromCharCode(parseInt(grp, 16));
                        });

                        //remove the spaces and compare the langth, if not equal: the save failed
                        if (result.value.replace(/\s/g, '').length != projectJson.replace(/\s/g, '').length) {
                            bootbox.confirm(localization.currentLocal.project.saveError, function (result) {
                                if (result) device.saveProject(false);
                                else device.showProjectSaveError = false;
                            });
                        }
                    });
                }, 1500);
            }

            //start checking the save result
            if (device.showProjectSaveError) checkSaveResult(projectJson);

            //Called after the upload, because that might take some time
            device.prevProjectVersion = device.projectVersion;
            device.projectVersion = parseInt(Math.random() * 1000000);
            device.save(projectService, device.projectVersion, true);
            device.nodes.rosapi.set_param.call({ name: "projectVersion", value: device.projectVersion.toString() });
        },

        checkProjectTimeout: null,
        showProjectSaveError: true,

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
                    localStorage.setItem("diSecure", device.secure);
                    device.connected = true;
                    device.changeOnUi = true;
                });

                variableService.ros.on('error', function (error) {
                    //retry connection with the other security mode (ws / wss)
                    //retry only if we are not on https, then we have to force https
                    if (device.secure == ["true", true, null].indexOf(localStorage.getItem("diSecure")) > -1 && window.location.protocol != 'https:') {
                        device.secure = !device.secure;
                        device.init(location);
                    } else {
                        device.connected = false;
                        device.changeOnUi = true;
                        device.onCantConnectToRos();
                    }
                });

                variableService.ros.on('close', function () {
                    if (device.connected) {
                        device.connected = false;
                        device.onCantConnectToRos();
                    }
                    device.changeOnUi = true;
                });

                this.beginDownloadProject();
                this.refreshUi();
                this.initDone = Date.now();
            } catch (exception) {
                if (device.connected) {
                    device.connected = false;
                    device.onCantConnectToRos();
                }
            }
        },

        demoModeDialog: function () {
            return bootbox.dialog({
                message: localization.currentLocal.ros.demoBody,
                backdrop: 'static',
                closeButton: false,
                keyboard: false,
                show: false,
                title: localization.currentLocal.ros.connectionError,
                buttons: {
                    back: {
                        label: localization.currentLocal.ros.back,
                        className: 'btn-danger',
                        callback: function () {
                            bootbox.hideAll();
                            device.connectionLostDialog().modal('show');
                        }
                    },
                    success: {
                        label: localization.currentLocal.ros.keepProject,
                        className: "btn-success",
                        callback: function () {
                            //restart in demo mode, and keep the CURRENT project
                            localStorage.setItem("demoMode", true);
                            localStorage.setItem("demoProject", projectService.toJSON());
                            location.reload();
                        }
                    },
                    danger: {
                        label: localization.currentLocal.ros.discardProject,
                        className: "btn-primary",
                        callback: function () {
                            //restart in demo mode, and keep the LOCAL project
                            localStorage.setItem("demoMode", true);
                            location.reload();
                        }
                    },
                }
            })
        },

        connectionLostDialog: function () {

            var buttons = {
                success: {
                    label: localization.currentLocal.ros.reconnect,
                    className: "btn-success",
                    callback: function () {
                        //restart app and try to reconnect
                        location.reload();
                    }
                },
                danger: {
                    label: localization.currentLocal.ros.demoMode,
                    className: "btn-primary",
                    callback: function () {
                        bootbox.hideAll();
                        device.demoModeDialog().modal('show');
                    }
                }
            }

            if ($rootScope.editHandler.isEditAvailable()) {
                buttons.info = {
                    label: localization.currentLocal.editMode.settings,
                    className: "btn-info",
                    callback: function () {
                        bootbox.hideAll();
                        $rootScope.$apply(function () {
                            $rootScope.settings.setVisible(true);
                        });
                    }
                }
            }

            return bootbox.dialog({
                message: localization.currentLocal.ros.connectionErrorBody,
                backdrop: 'static',
                closeButton: false,
                show: false,
                keyboard: false,
                title: localization.currentLocal.ros.connectionError,
                buttons: buttons
            })
        },

        onCantConnectToRos: function () {
            if ($rootScope.blockMessage == localization.currentLocal.project.loading) $rootScope.blockMessage = null;

            if (!device.connected) {
                device.connectionLostDialog().modal('show');
            }
        }
    };

    $rootScope.$watch(function () { return projectService.forceSave; }, function (nv, ov) {
        if (nv) {
            device.changeOnUi = true;
            device.saveProject(false);
        }
    });

    Object.defineProperty(device, 'server', {
        get: function () {
            return (device.secure || window.location.protocol == 'https:' ? "wss://" : "ws://") + device.ip + ":" + device.port + "/";
        }
    });

    return device;
}