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

angular.module("flexGuiApp", ["ngCookies", "ngRoute", 'ngSanitize', "ui.bootstrap-slider", "perfect_scrollbar", "jg.knob", "hmTouchEvents", "angularStats", "ui.router"])
    .directive("ngFileSelect", ngFileSelect)
    .directive("fgFidgetRepeater", function () {
        var directive = {
            restrict: 'AEC', 
            template: function (elm, attr) {
                return "<div class='fidget' ng-if='fidget.template' id='{{fidget.id}}' ng-repeat='fidget in " + attr.fidgets + " track by fidget.id' ng-class=\"{'editModeOn': editHandler.isEditMode, 'selected': editHandler.selectedFidgets.indexOf(fidget) >= 0  }\" style=\"left:{{fidget.properties.left}}px; top: {{fidget.properties.top}}px;\">" +
                           "<div ng-class=\"{'disabled': [false, 'false', 0].indexOf(fidget.properties.enabled) != -1 ,'clickable': !editHandler.isEditMode && [undefined, 'undefined', '', null, 'null'].indexOf(fidget.properties.onClick) == -1, 'selectedFidget': editHandler.selectedFidgets.indexOf(fidget) > -1 && editHandler.isEditMode, 'dragged': editHandler.selectedFidgets.length > 0 && editHandler.isMouseDown && !editHandler.inResize && editHandler.selectedFidgets.indexOf(fidget) > -1 }\">" +
                                "<ng-include ng-controller='fidgetCtrl' src=\"toTrustedUrl(fidget.template.root + fidget.template.source + '.html')\"></ng-include>" +
                           "</div>" +
                       "</div>";
            },
        };

        return directive;
    }).directive('scrollTopOnRefresh', function () {
        return function (scope, element, attrs) {
            if (scope.$last) {
                setTimeout(function () {
                    //if the last element is loaded, scroll to the bottom of the message list
                    $(".scrollTop").each(function () {
                        $(this).scrollTop(0);
                    });
                }, 500);
            }
        };
    }).directive('scrollBottomOnRefresh', function () {
        return function (scope, element, attrs) {
            if (scope.$last) {
                setTimeout(function () {
                    //if the last element is loaded, scroll to the bottom of the message list
                    $(".scrollBottom").each(function () {
                        $(this).scrollTop($(this).find(".scrollItems").prop('scrollHeight'));
                    });
                }, 500);
            }
        };
    }).directive('showPerfectScrollBar', function () {
        return function (scope, element, attrs) {
            setTimeout(function () {
                $(".perfectScrollBar").each(function () {
                    $(this).perfectScrollbar('update');
                });
            }, 500);
        };
    }).directive('imageload', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('load', function () {
                    //call the function that was passed
                    scope.$apply(attrs.imageload);
                });
            }
        };
    }).directive('imageerror', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('error', function () {
                    //call the function that was passed
                    scope.$apply(attrs.imageerror);
                });
            }
        };
    }).directive('compile', ['$compile', function ($compile) {
        return function (scope, element, attrs) {
            scope.$watch(
              function (scope) {
                  return scope.$eval(attrs.compile);
              },
              function (value) {
                  element.html(value);
                  $compile(element.contents())(scope);
              }
           )
        };
    }]).filter('isTopicFilter', function () {
        return function (items, value) {
            var filtered = [];
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var isTopic = item.isTopic || false;
                if (isTopic === value) {
                    filtered.push(item);
                }
            }
            return filtered;
        };
    }).filter('orderObjectBy', function () {
        return function (items, field, reverse) {
            var filtered = [];
            angular.forEach(items, function (item) {
                filtered.push(item);
            });
            filtered.sort(function (a, b) {
                return (a[field] > b[field] ? 1 : -1);
            });
            if (reverse) filtered.reverse();
            return filtered;
        };
    }).filter('stringSort', function () {
        return function (input) {
            return input.sort();
        }
    })
.controller('flexGuiCtrl', flexGuiCtrl)
.controller('propertiesWindowCtrl', propertiesWindowCtrl)
.controller('fidgetCtrl', fidgetCtrl)
.controller('fidgetGroupCtrl', fidgetGroupCtrl)
.factory('backgroundService', backgroundService)
.factory('editorService', editorService)
.factory('deviceService', deviceService)
.factory('imageService', imageService)
.factory('fidgetService', fidgetService)
.factory('projectService', projectService)
.factory('projectWindowService', projectWindowService)
.factory('historyService', historyService)
.factory('enumService', enumService)
.factory('variableService', variableService)
.factory('clipboardService', clipboardService)
.factory('settingsWindowService', settingsWindowService)
.factory('helpService', helpService)
.factory('popupService', popupService)
.factory('scriptManagerService', scriptManagerService)
.factory('colorPickerService', colorPickerService)
.factory('projectConversionService', projectConversionService)
.factory('projectStorageService', projectStorageService)
.factory('diagnosticsService', diagnosticsService)
.factory('backupService', backupService)
.run(run);

ngFileSelect.$inject = ['$parse', 'projectWindowService'];
function ngFileSelect($parse, projectWindowService) {
    var directiveDefinitionObject = {
        restrict: 'A',
        scope: {
            method: '&ngFileSelect',
        },
        link: function (scope, element, attrs) {
            var expressionHandler = scope.method();
            element.bind('change', function (e) {
                expressionHandler(e.target.files[0]);
            });
        }
    };
    return directiveDefinitionObject;
}

run.$inject = ['$rootScope', '$templateCache', '$location', '$timeout', 'settingsWindowService', 'projectService', 'variableService', 'deviceService', 'popupService'];
function run($rootScope, $templateCache, $location, $timeout, settingsWindowService, projectService, variableService, deviceService, popupService) {

    if (!$rootScope.settingsTabs) $rootScope.settingsTabs = [];

    $rootScope.mirrorMode = {};
    $rootScope.addonServerUrl = "";
    $rootScope.currentUserId = "user_" + variableService.guid();
    projectService.appVersion = "1.9.7";

    //set ROS address with query string
    var queryString = $location.search();
    if (queryString && queryString.RosUrl) {

        console.log("Using ROS server in the query string");    

        //get parameters from query string
        var rosurl = queryString.RosUrl, ip, port, wss = false;
        if (rosurl.indexOf("wss") === 0) {
            wss = true;
            ip = rosurl.substring(6, rosurl.lastIndexOf(":"));
        } else {
            ip = rosurl.substring(5, rosurl.lastIndexOf(":"));
        }

        port = rosurl.substring(rosurl.lastIndexOf(":") + 1);

        //setup parameters
        deviceService.port = port;
        deviceService.ip = ip;
        deviceService.secure = wss;

        settingsWindowService.demoMode = false;
    }
    //location setup
    $rootScope.startPage = $location.path().substring(1);
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (typeof (current) !== 'undefined') {
            $templateCache.remove(current.templateUrl);
        }
    });
}