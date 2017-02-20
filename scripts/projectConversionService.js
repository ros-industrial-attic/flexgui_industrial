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

projectConversionService.$inject = ['$rootScope', 'popupService'];

function projectConversionService($rootScope, popupService) {
    var serv = {};

    serv.list = [];

    //step from unVersioned - 1.0
    serv.list[0] = {
        to: "1.0",
        action: function (project) {
            console.log("converting...", this.from, this.to);
            project.appVersion = this.to;
            return project;
        }
    }

    //step from 1.0 - 1.1, in this version, the screen has to have hasScreenBelt property
    serv.list[1] = {
        from: "1.0",
        to: "1.1",
        action: function (project) {
            console.log("converting...", this.from, this.to);

            //add hasScreenBelt property for screens
            angular.forEach(project.screens, function (s) { if (Object.keys(s.properties).indexOf("hasScreenBelt") == -1) s.properties.hasScreenBelt = 'true'; });

            project.appVersion = this.to;
            return project;
        }
    }

    serv.list[2] = {
        from: "1.1",
        to: "1.2",
        action: function (project) {
            console.log("converting...", this.from, this.to);

            function updateFidgets(c) {
                angular.forEach(c.fidgets, function (f) {
                    if (f.fidgets) updateFidgets(f);

                    if (f.source == "text") {
                        f.properties._font = "inherit";
                        f.properties._textAlign = "left";
                    }

                    if (f.source == "scrollableText") {
                        f.properties._font = "inherit";
                        f.properties._textAlign = "left";
                        f.properties._fontSize = 12;
                        f.properties._color = "#000000";;
                    }
                });
            }

            angular.forEach(project.screens, function (screen) {
                updateFidgets(screen);
            });

            project.appVersion = this.to;

            return project;
        }
    }

    serv.list[3] = {
        from: "1.2",
        to: "1.3",
        action: function (project) {
            console.log("converting...", this.from, this.to);

            angular.forEach(project.screens, function (screen) {
                screen.properties.logo = '';
                screen.properties.logoPosition = 'bottomRight';
                screen.properties.logoWidth = 100;
            });

            project.appVersion = this.to;

            return project;
        }
    }

    serv.list[4] = {
        from: "1.3",
        to: "1.4",
        action: function (project) {
            console.log("converting...", this.from, this.to);

            function updateFidgets(c) {
                angular.forEach(c.fidgets, function (f) {
                    if (f.fidgets) updateFidgets(f);

                    f.properties._top = f.top;
                    f.properties._left = f.left;
                });
            }

            angular.forEach(project.screens, function (screen) {
                updateFidgets(screen);
            });

            project.appVersion = this.to;

            return project;
        }
    }

    serv.list[5] = {
        from: "1.4",
        to: "1.5",
        action: function (project) {
            console.log("converting...", this.from, this.to);

            function updateFidgets(c) {
                angular.forEach(c.fidgets, function (f) {
                    if (f.fidgets) updateFidgets(f);

                    if (["boolen", "button", "checkbox", "radioButton"].indexOf(f.source) > -1) {
                        f.properties._font = "inherit";
                        f.properties._fontSize = 12;
                        f.properties._color = f.source == "button" ? "" : "#000000";;
                    }
                });
            }

            angular.forEach(project.screens, function (screen) {
                updateFidgets(screen);
            });

            project.appVersion = this.to;

            return project;
        }
    }

    serv.list[6] = {
        from: "1.5",
        to: "1.6",
        action: function (project) {
            console.log("converting...", this.from, this.to);

            function updateFidgets(c) {
                angular.forEach(c.fidgets, function (f) {
                    if (f.fidgets) updateFidgets(f);

                    if (["progressBar"].indexOf(f.source) > -1) {
                        f.properties._fontColor = '';
                    }
                });
            }

            angular.forEach(project.screens, function (screen) {
                updateFidgets(screen);
            });

            project.appVersion = this.to;

            return project;
        }
    }

    serv.list[7] = {
        from: "1.6",
        to: "1.7",
        action: function (project) {
            console.log("converting...", this.from, this.to);

            function updateFidgets(c) {
                angular.forEach(c.fidgets, function (f) {
                    if (f.fidgets) updateFidgets(f);
                    f.properties._enabled = true;
                });
            }

            angular.forEach(project.screens, function (screen) {
                updateFidgets(screen);
            });

            project.appVersion = this.to;

            return project;
        }
    }

    serv.list[8] = {
        from: "1.7",
        to: "1.8",
        action: function (project) {
            console.log("converting...", this.from, this.to);

            project.directConnections = {};
            project.appVersion = this.to;

            return project;
        }
    }

    serv.list[9] = {
        from: "1.8",
        to: "1.9",
        action: function (project) {
            console.log("converting...", this.from, this.to);
            project.appVersion = this.to;

            return project;
        }
    }

    serv.list[10] = {
        from: "1.9",
        to: "1.9.1",
        action: function (project) {
            console.log("converting...", this.from, this.to);
            project.appVersion = this.to;
            var hasRotated = false;

            function updateFidgets(c) {
                angular.forEach(c.fidgets, function (f) {
                    if (f.fidgets) updateFidgets(f);
                    if (f.properties._angle) hasRotated = true;
                });
            }

            angular.forEach(project.screens, function (screen) {
                updateFidgets(screen);
            });

            if (hasRotated) popupService.show("Due to a change in the project, we can not update the position of your fidgets. Please update your rotated fidget's positions manually!")

            return project;
        }
    }

    serv.list[11] = {
        from: "1.9.1",
        to: "1.9.2",
        action: function (project) {
            console.log("converting...", this.from, this.to);
            project.appVersion = this.to;

            function updateFidgets(c) {
                angular.forEach(c.fidgets, function (f) {
                    if (f.fidgets) updateFidgets(f);
                    if (["genericObstacle"].indexOf(f.source) > -1) {
                        f.properties.opacity = 1;
                    }
                });
            }

            angular.forEach(project.screens, function (screen) {
                updateFidgets(screen);
            });

            return project;
        }
    }

    serv.list[12] = {
        from: "1.9.2",
        to: "1.9.3",
        action: function (project) {
            console.log("converting...", this.from, this.to);
            project.appVersion = this.to;
            project.clientId = $rootScope.currentUserId;
            return project;
        }
    }

    serv.list[13] = {
        from: "1.9.3",
        to: "1.9.4",
        action: function (project) {
            console.log("converting...", this.from, this.to);
            project.appVersion = this.to;
            project.projectVersion = parseInt(Math.random() * 1000000);
            return project;
        }
    }

    serv.list[14] = {
        from: "1.9.4",
        to: "1.9.5",
        action: function (project) {
            console.log("converting...", this.from, this.to);
            project.appVersion = this.to;
            project.theme = localStorage.getItem("theme") || "default";
            return project;
        }
    }

    serv.list[15] = {
        from: "1.9.5",
        to: "1.9.6",
        action: function (project) {
            console.log("converting...", this.from, this.to);
            project.appVersion = this.to;

            function updateFidgets(c) {
                angular.forEach(c.fidgets, function (f) {
                    if (f.fidgets) updateFidgets(f);
                    if (f.properties.opacity !== undefined) {
                        f.properties._opacity = f.properties.opacity;
                    }
                });
            }

            angular.forEach(project.screens, function (screen) {
                updateFidgets(screen);
            });

            return project;
        }
    }

    serv.list[16] = {
        from: "1.9.6",
        to: "1.9.7",
        action: function (project) {
            console.log("converting...", this.from, this.to);
            project.appVersion = this.to;

            function updateFidgets(c) {
                angular.forEach(c.fidgets, function (f) {
                    if (f.fidgets) updateFidgets(f);
                    if (!f.properties.layout && ["fidgetGroup"].indexOf(f.source) > -1) {
                        f.properties._layout = "";
                    }
                });
            }

            angular.forEach(project.screens, function (screen) {
                updateFidgets(screen);
            });

            return project;
        }
    }

    var loops = 0;

    serv.convert = function (project, toVersion) {
        loops++;
        var current = project.appVersion;

        for (var i = 0; i < serv.list.length; i++) {
            if (serv.list[i].from == current) {
                project = serv.list[i].action(project)
                break;
            }
        }

        //if the to version are not equal, search for another step
        if (project.appVersion != toVersion && loops <= serv.list.length) {
            serv.convert(project, toVersion);
            loops++;
        }


        $rootScope.$apply();

        //if the conversion is successfull return with the project
        if (project.appVersion == toVersion) {
            return project;
        }

        //if we can not convert, return null
        return null;
    }

    return serv;
}