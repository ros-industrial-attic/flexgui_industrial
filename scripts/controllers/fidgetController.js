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
 

fidgetCtrl.$inject = ['$http', '$sce', '$scope', '$window', '$location', '$routeParams', '$attrs', '$timeout', 'editorService', 'popupService', 'deviceService', 'scriptManagerService', 'projectService', 'variableService', 'settingsWindowService'];

function fidgetCtrl($http, $sce, $scope, $window, $location, $routeParams, $attrs, $timeout, editorService, popupService, deviceService, scriptManagerService, projectService, variableService, settingsWindowService) {
    //onClick method for all fidgets. The current fidget is available in the script as 'fidget'.
    $scope.onClick = function (fidget, script) {
        if (editorService.selectedFidgets.length == 0) {
            eval(scriptManagerService.compile(script));
        }
    }

    //calculates the size of the indicator lamp
    var indicatorLampSize = function (fidget) {
        if (fidget.properties.width - $scope.textWidth(fidget.properties.text, 12) > fidget.properties.height) return fidget.properties.height;

        return fidget.properties.width - $scope.textWidth(fidget.properties.text, 12);
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

    //current fidget for the controller
    $scope.currentFidget = null;
  
    //init current indicator lamp
    $scope.initIndicatorLamp = function (f) {
        $scope.currentFidget = f;
        $scope.size = indicatorLampSize(f);
        $scope.$watchGroup([function () { return $scope.currentFidget.properties.width; }, function () { return $scope.currentFidget.properties.height; }], function () {
            $scope.size = indicatorLampSize($scope.currentFidget);
        });
    }
}