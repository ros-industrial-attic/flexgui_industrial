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

projectWindowService.$inject = ['$rootScope', '$location', 'projectService', 'deviceService', 'popupService', 'historyService', 'editorService', 'imageService', 'variableService', 'settingsWindowService'];

function projectWindowService($rootScope, $location, projectService, deviceService, popupService, historyService, editorService, imageService, variableService, settingsWindowService) {
    var projectsWindowHandler = {

        //currently selected project in the window
        selectedProject: null,
        setSelectedProject: function (type, id) {
            var proj = null;

            switch (type) {
                case "local":
                    proj = JSON.parse(localStorage.getItem("project_" + id));
                    break;
                case "remote":
                    proj = project;
                    break;
            }

            if (proj != null) {
                projectsWindowHandler.selectedProject = proj;
            }
        },

        //The visibility of the window
        visible: false,
        setVisible: function (value) {
            projectsWindowHandler.visible = value;

            projectsWindowHandler.setProjects();
        },

        //load the selected project
        loadProject: function () {
            //project = projectsWindowHandler.selectedProject;
            project.initScript = projectsWindowHandler.selectedProject.initScript;
            project.screens = projectsWindowHandler.selectedProject.screens;
            project.id = projectsWindowHandler.selectedProject.id;
            project.name = projectsWindowHandler.selectedProject.name;

            project.runInit();
            project.setupFidgets(fidgetService.defineProperties);

            device.saveProject();
        },

        //compare two projects
        compare: function (project1, project2) {
            //TODO: make the comparsion for all of the properties
            var diff = [];

            if (project1 && project2) {
                if (project1.version != project2.version) diff.push("version");
                if (project1.name != project2.name) diff.push("name");
                if (project1.backgroundImage != project2.backgroundImage) diff.push("backgroundImage");
                if (project1.initScript != project2.initScript) diff.push("initScript");
                if (project1.screens == undefined || project2.screens == undefined || project1.screens.length != project2.screens.length) diff.push("screens");
                if (project1.id != project2.id) diff.push("id");
            }

            return diff;
        },

        //delete the selected project
        deleteProject: function (type, id) {
            switch (type) {
                case "local":
                    localStorage.removeItem("project_" + id);
                    break;
                case "remote":
                    //TODO: multi project handling on DI
                    break;
            }

            projectsWindowHandler.setProjects();
        },

        //delete all local project
        clearLocalProjects: function () {
            for (var key in localStorage) {
                if (key.indexOf("project_") === 0) {
                    localStorage.removeItem(key);
                }
            }

            projectsWindowHandler.setProjects();
        },

        //Current tabIndex on the window
        tabIndex: 0,
        setTabIndex: function (value) {
            projectsWindowHandler.tabIndex = value;
        },

        //download project in JSON format
        downloadPropject: function () {
            var images = [];
            var i = 0;
            angular.forEach(imageService.slots, function (img) {
                images.push({ index: i++, name: img.name, base64: img.base64 });
            });
            var json = projectService.toJSON(images);

            var fileName = "project" + Date.now() + ".fgproj";

            if ($rootScope.isMobile) {
                var fileObj;
                window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function (dir) {
                    dir.getFile(fileName, { create: true }, function (file) {
                        fileObj = file;
                        writeLog(json);
                    });
                });

                function writeLog(str) {
                    if (!fileObj) return;
                    fileObj.createWriter(function (fileWriter) {
                        fileWriter.write(str);
                        popupService.show(localization.currentLocal.settings.tabs.project.savedToMobile + fileName);
                    }, fail);

                    function fail() {
                        popupService.show(localization.currentLocal.settings.tabs.project.savedFailed);
                    }
                }
            } else {
                var blob = new Blob([json], { type: "application/json;charset=utf-8;" });

                var downloadLink = angular.element('<a></a>');
                downloadLink.attr('href', window.URL.createObjectURL(blob));
                downloadLink.attr('download', fileName);
                downloadLink[0].click();
            }
        },

        //clean the current project and load a new one
        clean: function () {
            bootbox.confirm(localization.currentLocal.settings.tabs.project.cleanConfirm, function (result) {
                if (result) {
                    //disable edit mode
                    editorService.switchEditMode();

                    //load a clean project
                    projectService.load(projectService.getCleanObject());
                    deviceService.cleanNodes();
                    projectService.currentScreen = null;
                    //remove path
                    $location.path('');

                    //refresh ui and save the project
                    deviceService.changeOnUi = true;
                    deviceService.saveProject(true);
                }
            });
        },

        //upload fgproj file and save to local storage
        uploadProject: function (file) {
            bootbox.confirm(localization.currentLocal.settings.tabs.project.uploadConfirm, function (result) {
                if (result) {
                    projectsWindowHandler.scope.blockUI(localization.currentLocal.project.blockMsg);
                    var r = new FileReader();
                    r.onloadend = function (e) {
                        var content = e.target.result;
                        var proj = JSON.parse(content, function (k, v) {
                            if (v == "@null") { return null; }
                            return v;
                        });

                        if (proj) {

                            if (proj.images && proj.images.length > 0) {
                                //overwrite images
                                bootbox.confirm(localization.currentLocal.settings.tabs.project.uploadImagesConfirm, function (result) {
                                    if (result) {
                                        angular.forEach(proj.images, function (img) {
                                            if (img.base64) {
                                                var slot = imageService.getSlot(img.name);

                                                if (slot) {
                                                    if (!settingsWindowService.demoMode) {
                                                        deviceService.nodes.rosapi.set_param.call({ name: img.name, value: JSON.stringify({ base64: img.base64 }) });
                                                    } else {
                                                        //store image in local storage
                                                        localStorage.setItem("flexgui4_images_" + img.name, img.base64);
                                                    }

                                                    slot.base64 = img.base64;
                                                    variableService.friendlyCache[img.name] = slot;
                                                }
                                            }
                                        });
                                    }
                                });
                            }


                            projectService.load(proj);
                            deviceService.changeOnUi = true;
                            deviceService.saveProject(true);
                            historyService.clearHistory();
                        }

                        projectsWindowHandler.scope.unBlockUI();
                        popupService.show(localization.currentLocal.settings.tabs.project.uploadComplete);
                    }
                    r.readAsText(file);
                }
            });
        }
    }

    return projectsWindowHandler;
}