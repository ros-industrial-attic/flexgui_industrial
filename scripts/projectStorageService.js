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

projectStorageService.$inject = ['$rootScope', 'projectService', 'historyService', 'settingsWindowService', 'deviceService', '$timeout', 'variableService'];

function projectStorageService($rootScope, projectService, historyService, settingsWindowService, deviceService, $timeout, variableService) {

    var srv = {
        // current mode
        mode: localStorage.getItem("projectDriveMode") || 'localStorage',
        // save the selected storage mode
        saveMode: function () {
            localStorage.setItem("projectDriveMode", srv.mode);
        },
        // already used local versions
        localVersions: [],
        // online project's version
        onlineVersion: null,
        // save in progress
        saving: false,
        // download in progress
        downloading: false,
        // Edit mode action visiblity
        editActionsVisible: function() {
            return this.modes[this.mode].editActionsVisible();
        },
        // generate new version id
        generateVersionId: function () {
            projectService.localVersion = variableService.guid();
            srv.localVersions.push(projectService.localVersion);
        },
        // set mode
        setMode: function (mode) {
            this.mode = mode;
        },
        // init the current mode
        init: function () {
            var connectedWatcher = $rootScope.$watch(function () { return deviceService.connected }, function (nv) {
                if (nv) {
                    //console.log("ROS Connected, download project");
                    srv.download(false, true);
                    connectedWatcher();
                }
            });

            this.modes[this.mode].init();
        },
        // Save auto project update 
        changeAutoUpdate: function () {
            localStorage.setItem("isAutoProjectUpdateEnabled", srv.isAutoProjectUpdateEnabled);
        },
        // Get image from storage
        getImage: function (name, i, slots) {
            this.modes[this.mode].getImage(name, i, slots);
        },
        // Set image on storage
        setImage: function (i, b64) {
            this.modes[this.mode].setImage(i, b64);
        },
        // Enabled or disable auto project update from localStorage
        isAutoProjectUpdateEnabled: localStorage.getItem("isAutoProjectUpdateEnabled") == "false" ? false : true,
        // Uploads the project to the server and creates a new projectVersion.
        save: function (saveHistory, overwrite, forceSave) {

            if (saveHistory) {
                historyService.saveState();
            }

            this.modes[this.mode].save(overwrite, forceSave);
        },
        // Used to synchronize the project file. After each modification the projectVersion
        // is incremented. If the two projectVersions are different, the client request
        // the download of the project from the server. 
        download: function (once, forceDownload) {
            srv.downloading = true;
            this.modes[this.mode].download(once, forceDownload);
        },
        //need to reserve the edit bit or not
        needReservation: function(){
            return this.modes[this.mode].needReservation();
        },
        //show or hide the update/upload actions on the belt
        showBeltActions: function() {
            return this.modes[this.mode].showBeltActions();
        },
        //concurent next save
        nextSave: null,
        //storage modes
        modes: {
            //store everything in as rosparam
            rosparam: {
                needReservation: function () { return srv.isAutoProjectUpdateEnabled; },
                showBeltActions: function () { return !srv.isAutoProjectUpdateEnabled; },
                download: function (once, forceDownload) {
                    //console.log("Download from ROS");
                    deviceService.callService("/rosapi/get_param", { name: "/project/projectVersion", default: "0" }, function (result) {
                        function continueUpdate() {
                            if (!once) {
                                //console.log("Download success, check after 2s");
                                setTimeout(function () { srv.download(); }, 2000);
                            }
                        }

                        var version = JSON.parse(result.value);
                        srv.onlineVersion = version;
                        //console.log("Current online version: ", version);
                        if (srv.localVersions.indexOf(version) === -1) {
                            //console.log("Project file is new, download");

                            if (srv.isAutoProjectUpdateEnabled || forceDownload) {
                                deviceService.callService("/rosapi/get_param", { name: "project" }, function (result) {
                                    var downloadedProject = JSON.parse(result.value, function (k, v) {
                                        if (v == "@null") { return null; }
                                        return v;
                                    });

                                    //If there is a saved project
                                    if (downloadedProject && downloadedProject.screens) {
                                        projectService.load(downloadedProject);
                                    } else {
                                        projectService.addDefaultScreens();
                                    }

                                    projectService.changed = false;
                                    srv.localVersions.push(srv.onlineVersion);
                                    srv.downloading = false;
                                    deviceService.changeOnUi = true;

                                    continueUpdate();
                                });
                            } else {
                                continueUpdate();
                            }
                        } else {
                            continueUpdate();
                        }
                    });
                },
                save: function (overwrite, forceWrite) {
                    if (srv.isAutoProjectUpdateEnabled || forceWrite) {
                        //console.log("Upload to ROS");

                        if (srv.saving) {
                            //if the save is locked, create the next save object or update
                            //console.log("Prevent concurrent save");
                            if (srv.nextSave) srv.nextSave = { overwrite: srv.nextSave.overwrite || overwrite, forceWrite: srv.nextSave.forceWrite || forceWrite };
                            else srv.nextSave = { overwrite: overwrite, forceWrite: forceWrite };

                            return;
                        }

                        //lock saving
                        srv.saving = true;

                        deviceService.callService("/rosapi/get_param", { name: "/project/projectVersion" }, function (result) {
                            //check project version
                            var version = JSON.parse(result.value);

                            //check online version
                            if (srv.localVersions.indexOf(version) === -1 && !overwrite) {
                                srv.versionNotLatestSaveDialog().modal('show');
                                return;
                            }

                            //change project version
                            srv.generateVersionId();

                            //get project object
                            var projectJson = projectService.toJSON(null, true);

                            //console.log("Start uploading to ROS");

                            //upload to server
                            deviceService.callService("/rosapi/set_param", { name: "project", value: projectJson }, function (result) {
                                //console.log("Upload finished");
                                //upload finished, the two version should be the same
                                srv.onlineVersion = projectService.localVersion;
                                projectService.changed = false;
                                srv.saving = false;
                                deviceService.changeOnUi = true;

                                if (!srv.showProjectSaveError) {
                                    //check the uploaded project is correct or not
                                    deviceService.callService("/rosapi/get_param", { name: "project" }, function (result) {
                                        //we don't want to check other usersaves and newer versions
                                        var temp = JSON.parse(result.value);
                                        if (temp.clientId != $rootScope.currentUserId || temp.projectVersion != projectService.localVersion) {
                                            return;
                                        }

                                        //convert to correct format
                                        var r = /\\u([\d\w]{4})/gi;
                                        result.value = result.value.replace(r, function (match, grp) {
                                            return String.fromCharCode(parseInt(grp, 16));
                                        });

                                        if (result.value.replace(/\s/g, '').length != projectJson.replace(/\s/g, '').length) {
                                            //ask what to do if the projects are not equal
                                            bootbox.confirm(localization.currentLocal.project.saveError, function (result) {
                                                if (result) {
                                                    //try to save again
                                                    srv.save(false, true, true);
                                                } else {
                                                    //disable project error
                                                    srv.showProjectSaveError = false;
                                                }
                                            });
                                        }
                                    });
                                }

                                //start next save if needed
                                if (srv.nextSave) {
                                    //console.log("Start next save");
                                    var ow = srv.nextSave.overwrite, fw = srv.nextSave.forceWrite;
                                    srv.nextSave = null;
                                    srv.modes.rosparam.save(ow, fw);
                                }

                            });
                        });
                    } else {
                        projectService.changed = true;
                    }
                },
                init: function () {
                
                },
                getImage: function (name, i, slots) {
                    deviceService.callService("/rosapi/get_param", { name: name }, function (result) {
                        var value = JSON.parse(result.value);
                        var base64 = value == null ? null : value.base64;
                        var slot = { name: name, base64: base64 };

                        variableService.friendlyCache[name] = slot;
                        slots[i] = slot;
                        $rootScope.$apply;
                    });
                },
                setImage: function (i, b64) {
                    deviceService.nodes.rosapi.set_param.call({ name: i, value: JSON.stringify({ base64: b64 }) });
                }
            },
            //store everything as localStorage
            localStorage: {
                needReservation: function () { return false; },
                showBeltActions: function () { return false; },
                download: function () {
                    var offlineProject = localStorage.getItem("demoProject");
                    if (offlineProject) {
                        var downloadedProject = projectService.parseJSON(offlineProject);
                        if (downloadedProject) {
                            projectService.load(downloadedProject);
                        }
                    } else {
                        projectService.addDefaultScreens();
                    }

                    $rootScope.blockMessage = null;
                    srv.downloading = false;
                },
                save: function () {
                    srv.saving = true;
                    localStorage.setItem("demoProject", projectService.toJSON());
                    srv.saving = false;
                },
                init: function () {
                    
                },
                getImage: function (name, i, slots) {
                    var slot = { name: "image" + i, base64: localStorage.getItem("flexgui4_images_image" + i) };
                    variableService.friendlyCache[name] = slot;
                    slots[i] = slot;
                },
                setImage: function (i, b64) {
                    localStorage.setItem("flexgui4_images_" + i, b64);
                }
            }
        },
        //version is not the latest alert dialog
        versionNotLatestSaveDialog: function () {
            return bootbox.dialog({
                message: localization.currentLocal.ros.versionIsNotLatest.body,
                backdrop: 'static',
                closeButton: false,
                keyboard: false,
                show: false,
                title: localization.currentLocal.ros.versionIsNotLatest.title,
                buttons: {
                    success: {
                        label: localization.currentLocal.ros.versionIsNotLatest.overwrite,
                        className: "btn-success",
                        callback: function () {
                            srv.saving = false;
                            srv.save(false, true, true);
                        }
                    },
                    danger: {
                        label: localization.currentLocal.ros.versionIsNotLatest.update,
                        className: "btn-primary",
                        callback: function () {
                            srv.saving = false;
                            srv.download(true, true);
                        }
                    },
                }
            });
        }
    };

    Object.defineProperty(srv, 'downloadNeeded', {
        get: function () { return srv.localVersions.indexOf(srv.onlineVersion) === -1 && !srv.isAutoProjectUpdateEnabled && projectService.loaded && srv.mode == 'rosparam'; }
    });

    Object.defineProperty(srv, 'saveNeeded', {
        get: function () { return projectService.changed && !srv.isAutoProjectUpdateEnabled && srv.mode == 'rosparam' }
    });

    $rootScope.$watch(function () { return projectService.needSave }, function (nv, ov) {
        if (!nv) return;

        srv.save(nv.history);
    });


    return srv;
}