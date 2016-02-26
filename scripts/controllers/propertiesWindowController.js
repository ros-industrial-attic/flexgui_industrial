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
 
propertiesWindowCtrl.$inject = ['$scope', '$rootScope', '$window', '$location', '$routeParams', 'projectService', 'deviceService', 'editorService', 'colorPickerService', 'scriptManagerService', 'variableService', 'enumService'];

function propertiesWindowCtrl($scope, $rootScope, $window, $location, $routeParams, projectService, deviceService, editorService, colorPickerService, scriptManagerService, variableService, enumService) {
    var invalidScripts = {};

    //returns if any of the property is an invalid script, used for disabling the save of the properties
    $scope.hasInvalidScript = function () {
        return Object.keys(invalidScripts).length > 0;
    }

    //validates of the value of a property, unValidatedPropertes to be extended, if we want to exclude something from the validated prop list
    $scope.validate = function (error, fidget, property) {
        var validateProperties = ["width", "height", "_value", "min", "max", "angleArc", "angleOffset", "precision", "step", "lock", "blinking", "blinkPeriod"];

        if (fidget == projectService.currentScreen) {
            var existing = false;
            angular.forEach(projectService.screens, function (screen) {
                if (screen != projectService.currentScreen && screen.properties.name == projectService.currentScreen.properties.name) {
                    existing = true;
                }
            });

            if (existing) {
                invalidScripts["projectName"] = "";
            } else {
                delete invalidScripts["projectName"];
            }
        }

        if (validateProperties.indexOf(property) >= 0) {
            try {
                eval(scriptManagerService.compile(fidget.properties[property]));
                delete invalidScripts[property];
            }
            catch (e) {
                error.scriptError = true;
                invalidScripts[property] = "";
                return;
            }
        }

        error.scriptError = false;
    }

    //open a color picker
    $scope.openColorPicker = function (prop, value) {
        colorPickerService.onColorSelected = function () {
            editorService.editedFidget.properties[prop] = colorPickerService.selectedColor;
            colorPickerService.showColorPicker(false);
        };

        colorPickerService.selectedColor = value;
        colorPickerService.showColorPicker(true);
    }

    //open color picker for background
    $scope.openBackgroundColorPicker = function (value) {
        colorPickerService.onColorSelected = function () {
            editorService.editedFidget.backgroundColor = colorPickerService.selectedColor;
            colorPickerService.showColorPicker(false);
        };

        colorPickerService.selectedColor = value;
        colorPickerService.showColorPicker(true);
    }

    //generate background
    //generates a base64 background from a color
    $scope.generateBackground = function () {
        var image = colorPickerService.generateBase64Color(editorService.editedFidget.backgroundColor);
    }

    $scope.$watch(function () { return editorService.editedFidget.backgroundColor }, function () {
        if (editorService.editedFidget.backgroundColor == null || editorService.editedFidget.backgroundColor == undefined || editorService.editedFidget.backgroundColor.trim() == "") {
            editorService.editedFidget.backgroundImage = null;
        } else {
            editorService.editedFidget.backgroundImage = colorPickerService.generateBase64Color(editorService.editedFidget.backgroundColor);

        }
    });

    //init color picker to pick color for a factory screen background
    //for this we have to convert the color the a base64 image and back (to show which is selected)
    $scope.colorPickerInitForFactory = function () {

        if (editorService.editedFidget.id != projectService.currentScreen.id) return;

        var image = new Image();
        image.onload = function () {

            function rgb2hex(r, g, b) {
                return "#" +
                 ("0" + parseInt(red, 10).toString(16)).slice(-2) +
                 ("0" + parseInt(green, 10).toString(16)).slice(-2) +
                 ("0" + parseInt(blue, 10).toString(16)).slice(-2);
            }

            var canvas = document.createElement('canvas');
            canvas.width = 1;
            canvas.height = 1;

            var context = canvas.getContext('2d');
            context.drawImage(image, 0, 0);

            var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            var index = (0 * imageData.width + 0) * 4;
            var red = imageData.data[index];
            var green = imageData.data[index + 1];
            var blue = imageData.data[index + 2];
            var alpha = imageData.data[index + 3];

            //colorPickerService.selectedColor = rgb2hex(red, green, blue).toUpperCase();

            editorService.editedFidget.backgroundColor = rgb2hex(red, green, blue).toUpperCase();
        };
        image.src = editorService.editedFidget.backgroundImage;
    }

    Array.prototype.move = function (old_index, new_index) {
        if (new_index >= this.length) {
            var k = new_index - this.length;
            while ((k--) + 1) {
                this.push(undefined);
            }
        }
        this.splice(new_index, 0, this.splice(old_index, 1)[0]);
        return this; // for testing purposes
    };

    //returns with the fidget properties (setted up in fidgetTemplate.js)
    $scope.getFidgetProperties = function () {
        var result = Array();
        if (projectService.currentScreen == editorService.editedFidget) {

            //if a fidget is a screen, go through the properties
            for (var p in editorService.editedFidget.properties)
                result.push(p);
        } else {

            //if a fidget, get the properties from the template (and keep the order)
            for (var p in editorService.editedFidget.template.properties)
                result.push(p);
        }

        var result = result.sort();
        //move onclick to the end of the list
        if (result.indexOf("onClick") != -1) result.move(result.indexOf("onClick"), result.length - 1);
        return result;
    }

    //removes a screen from the project
    $scope.removeScreen = function () {
        projectService.screens.splice(projectService.screens.indexOf(projectService.currentScreen), 1);
        if (projectService.screens.length > 0) {
            projectService.setCurrentScreenIndex(0);
        } else {

        }
        editorService.setPropertiesWindowVisible(false);
        deviceService.saveProject(true);
    }

    //moves a screen up or down in the screenbelt
    $scope.moveScreen = function (d) {
        var s = projectService.currentScreen;
        var index = projectService.screens.indexOf(s);
        projectService.screens.splice(index, 1);
        projectService.screens.splice(index + d, 0, s);
        projectService.setCurrentScreenIndex(projectService.currentScreenIndex + d);
        deviceService.saveProject(true);
    }

    //enum for the fidget's position on the layer
    $scope.moveTo = {
        backOne: function () { return -1; },
        forwardOne: function () { return 1; },
        toBack: function () { return -editorService.editedFidget.parent.fidgets.indexOf(editorService.editedFidget); },
        toFront: function () { return editorService.editedFidget.parent.fidgets.length - editorService.editedFidget.parent.fidgets.indexOf(editorService.editedFidget); },
    }

    //moves a screen up or down in the screenbelt
    $scope.moveFidget = function (d) {
        var f = editorService.editedFidget;
        var index = f.parent.fidgets.indexOf(f);
        f.parent.fidgets.splice(index, 1);
        f.parent.fidgets.splice(index + d, 0, f);
        deviceService.saveProject(true);
    }

    //returns true if a property is required
    $scope.isPropertyRequired = function (p) {
        return p == 'name' || p == 'width' || p == 'height';
    }

    //remove background
    $scope.clearBackground = function () {
        projectService.currentScreen.backgroundImage = null;
    }
}
