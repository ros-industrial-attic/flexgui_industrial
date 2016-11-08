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

fidgetCtrl.$inject = ['$http', '$sce', '$scope', '$window', '$location', '$routeParams', '$attrs', 'editorService',
    'popupService', 'deviceService', 'scriptManagerService', 'projectService', 'variableService', 'settingsWindowService',
    '$timeout', '$rootScope'];

function fidgetCtrl($http, $sce, $scope, $window, $location, $routeParams, $attrs, editorService,
    popupService, deviceService, scriptManagerService, projectService, variableService, settingsWindowService,
    $timeout, $rootScope) {
    //onClick method for all fidgets. The current fidget is available in the script as 'fidget'.
    $scope.onClick = function (fidget, script) {
        if (editorService.selectedFidgets.length == 0) {
            eval(scriptManagerService.compile(script));
        }
    }

    $scope.Math = window.Math;

    //calculates the size of the indicator lamp
    var indicatorLampSize = function (fidget) {
        if (fidget.properties.width > fidget.properties.height) return fidget.properties.height;

        return fidget.properties.width;
    }

    //make trusted links
    $scope.trustAsResourceUrl = $sce.trustAsResourceUrl;

    //fidget press event for screen change
    $scope.onFidgetPress = function (fidget) {
        if (fidget.properties.screenLink) {
            var screen = projectService.findScreenById(fidget.properties.screenLink);
            if (screen) {
                $location.path(screen.properties.name);
            }
        }
    }

    //sets the value for a fidgets property
    $scope.setValue = function (fidget, value) {
        fidget.properties.value = value;
    }

    //calculates the text width for a given font
    $scope.textWidth = function (text, font) {
        var f = font || '14px',
            o = $('<div>' + text + '</div>')
                  .css({ 'position': 'absolute', 'float': 'left', 'white-space': 'nowrap', 'visibility': 'hidden', 'font-size': f })
                  .appendTo($('body')),
            w = o.width();

        o.remove();

        return w;
    }

    //calculates the text height for a given font
    $scope.textHeight = function (text, font) {
        var f = font || '14px',
            o = $('<div>' + text + '</div>')
                  .css({ 'position': 'absolute', 'float': 'left', 'white-space': 'nowrap', 'visibility': 'hidden', 'font-size': f })
                  .appendTo($('body')),
            h = o.height();

        o.remove();

        return h;
    }

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    //calculates the number of the grid rectangles
    $scope.getArray = function (size) {
        size = isNumeric(size) ? size : 0;
        var gridSize = settingsWindowService.gridsize || 1;
        var d = size / gridSize == Math.floor(size / gridSize) ? 1 : 0;
        var arrSize = Math.floor(size / gridSize) - d;
        return new Array(arrSize >= 0 ? arrSize : 0);
    }

    //current fidget for the controller
    $scope.currentFidget = null;
    $scope.initIndicatorLamp = function (f) {
        $scope.currentFidget = f;
        $scope.size = indicatorLampSize(f);
        $scope.$watchGroup([function () { return $scope.currentFidget.properties.width; }, function () { return $scope.currentFidget.properties.height; }], function () {
            $scope.size = indicatorLampSize($scope.currentFidget);
        });
    }

    var imageResizeTimer = null;
    $scope.initImage = function (f) {
        $scope.currentFidget = f;
        $scope.$watchGroup([function () { return $scope.currentFidget.properties.width }, function () { return $scope.currentFidget.properties.height }, function () { return $scope.currentFidget.properties.value }], function () {
            function resize() {
                function imageToDataUri(img, maxWidth, maxHeight) {
                    var ratio = 0;  // Used for aspect ratio
                    var width = img.width;    // Current image width
                    var height = img.height;  // Current image height
                    var needDownScale = false;
                    // create an off-screen canvas
                    var canvas = document.createElement('canvas'),
                        ctx = canvas.getContext('2d');

                    // Check if the current width is larger than the max
                    if (width > maxWidth) {
                        ratio = maxWidth / width;   // get ratio for scaling image
                        canvas.width = maxWidth; // Set new width
                        canvas.height = height * ratio;  // Scale height based on ratio
                        height = height * ratio;    // Reset height to match scaled image
                        width = width * ratio;    // Reset width to match scaled image
                        needDownScale = true;
                    } else if (height > maxHeight) {
                        // Check if current height is larger than max
                        ratio = maxHeight / height; // get ratio for scaling image
                        canvas.height = maxHeight;   // Set new height
                        canvas.width = width * ratio;    // Scale width based on ratio
                        width = width * ratio;    // Reset width to match scaled image
                        height = height * ratio;    // Reset height to match scaled image
                        needDownScale = true;
                    } 

                    if (needDownScale) {
                        // draw source image into the off-screen canvas:
                        ctx.drawImage(img, 0, 0, width, height);
                        // encode image to data-uri with base64 version of compressed image
                        $scope.imageUrl = canvas.toDataURL();
                    } else {
                        //the image is smaller then the desired size, so we can keep the actual base64
                        $scope.imageUrl = $scope.currentFidget.properties.value;
                    }

                    $scope.$apply();
                }

                var img = new Image;
                img.onload = function () {
                    imageToDataUri(img, $scope.currentFidget.properties.width, $scope.currentFidget.properties.height)
                };
                img.src = $scope.currentFidget.properties.value;
            }

            if (!$scope.imageUrl) {
                //generate asap
                resize();
            } else {
                //generate at the end of the loop
                if (imageResizeTimer) {
                    $timeout.cancel(imageResizeTimer);
                    imageResizeTimer = null;
                }

                imageResizeTimer = $timeout(function () {
                    resize();
                }, 200);
            }
        });
    }
}