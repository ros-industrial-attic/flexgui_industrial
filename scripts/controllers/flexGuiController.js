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

flexGuiCtrl.$inject = ['$scope', '$window', '$location', '$routeParams', '$sce', '$timeout', '$rootScope', '$interval', '$injector', '$cookies',
    'editorService', 'historyService', 'deviceService', 'imageService', 'fidgetService',
    'projectService', 'enumService', 'projectWindowService', 'variableService',
    'clipboardService', 'settingsWindowService', 'colorPickerService', 'helpService', 'popupService',
    'scriptManagerService', 'demoMessengerService'];

function flexGuiCtrl($scope, $window, $location, $routeParams, $sce, $timeout, $rootScope, $interval, $injector, $cookies,
        editorService,
        historyService,
        deviceService,
        imageService,
        fidgetService,
        projectService,
        enumService,
        projectWindowService,
        variableService,
        clipboardService,
        settingsWindowService,
        colorPickerService,
        helpService,
        popupService,
        scriptManagerService,
        demoMessengerService
        ) {


    $rootScope.blockMessage = localization.currentLocal.project.loading;

    var trusted = {};

    $rootScope.toTrustedUrl = function (url) {
        return trusted[url] || (trusted[url] = $sce.trustAsResourceUrl(url))
    }

    $rootScope.screenRoot = $rootScope.screenRoot || 'views/screen.html';

    //window size
    $scope.windowWidth = 0;

    //belt size
    $scope.beltWidth = 120;

    //cordova device ready event listener
    document.addEventListener("deviceready", function () {
        $rootScope.isMobile = true;
        console.log("Online: " + window.navigator.onLine);
    }, false);

    if (settingsWindowService.isStatVisible) {
        showAngularStats({
            "position": "topright",
            "digestTimeThreshold": 30,
            "logDigest": false,
            "logWatches": false,
            "htmlId": "angularPerformanceStats",
        });

        $("#angularPerformanceStats").css({ right: 20, top: 20 });
    }

    //if demo mode, then setup the demo parts
    if (settingsWindowService.demoMode) {
        demoMessengerService.init($scope);
        /*device service demo overrides*/
        deviceService.connected = true;
        deviceService.saveProject = function (saveHistory) {
            localStorage.setItem("demoProject", projectService.toJSON());

            if (saveHistory) {
                historyService.saveState();
            }
        };

        deviceService.downloadProject = function () {
            if (localStorage.getItem("demoProject")) {
                //remove block ui
                if ($rootScope.blockMessage == localization.currentLocal.project.loading) $rootScope.blockMessage = null;

                var downloadedProject = projectService.parseJSON(localStorage.getItem("demoProject"));
                if (downloadedProject) {
                    projectService.load(downloadedProject);
                }
            } else {
                projectService.addDefaultScreens();
            }

            setTimeout(device.saveProject, 1000);
        };

        deviceService.init = function (location) {
            deviceService.location = location;

            imageService.init = function () {
                imageService.scope = $scope;

                imageService.slots = [];

                for (var i = 0; i < 21; i++) {
                    imageService.slots.push({ name: "image" + i, base64: localStorage.getItem("flexgui4_images_image" + i) });
                }

                for (var i = 0; i < imageService.slots.length; i++) {
                    var slot = imageService.slots[i];
                    variableService.friendlyCache[slot.name] = slot;
                }
            }

            imageService.init($scope);

            try {
                this.beginDownloadProject();
            } catch (exception) {

            }
        };
    }

    $rootScope.project = projectService;
    $rootScope.device = deviceService;
    $scope.nodes = deviceService.nodes;
    $scope.colorPickerHandler = colorPickerService;

    $scope.accessLevelsEnum = enumService.accessLevelsEnum;
    $scope.screenTypesEnum = enumService.screenTypesEnum;

    $rootScope.fidgets = fidgetService;
    $rootScope.settings = settingsWindowService;
    $scope.localization = localization;
    $scope.projects = projectWindowService;
    projectWindowService.scope = $scope;

    $rootScope.editHandler = editorService;

    $scope.is_chrome = /chrome/i.test(navigator.userAgent);
    $scope.helpMessages = helpService;
    $scope.popup = popupService;

    $scope.images = imageService;


    $rootScope.settings.loadLocalStorage();

    $scope.blockUI = function (msg) {
        $rootScope.blockMessage = msg;
        $scope.$apply();
    };

    $scope.variables = variableService;

    $scope.unBlockUI = function () {
        $rootScope.blockMessage = null;
        $scope.$apply();
    };

    $scope.dragCorner = enumService.dragCorner;
    $scope.isModalVisible = function () {
        var visible = editorService.propertiesWindowVisible ||
            $rootScope.settings.visible ||
            $scope.projects.visible ||
            $scope.images.visible ||
            $scope.colorPickerModalVisible ||
            $scope.helpMessages.open != null ||
            $scope.popup.messages.length != 0 ||
            $rootScope.blockMessage != null;

        return visible;

    };

    $scope.historyHandler = historyService;
    $scope.clipboardHandler = clipboardService;

    $rootScope.extraButtonsForSettingsWindow = [];
    $rootScope.editScreen = function (screen) {
        historyService.saveState();
        projectService.setCurrentScreen(screen);
        editorService.editedFidget = screen;
        editorService.propertiesWindowVisible = true;
    }

    if (typeof ($.timeago) != "undefined") {
        jQuery.timeago.settings.strings = localization.currentLocal.timeago.settings.strings;
    }

    $window.scriptManager = scriptManagerService;

    $scope.activeRemoteView;
    $scope.setActiveRemoteView = function (fidget) {
        activeRemoteView = fidget;
    }

    $rootScope.addModal = function (name, src, ngIf) {
        $rootScope.modals[name] = {
            src: src,
            visible: false
        };

        $rootScope.$watch(function () { return eval(ngIf) }, function (nv, ov) { $rootScope.modals[name].visible = nv; }, true);
    }

    deviceService.init($location);
    imageService.init($scope);
    editorService.init($scope.beltWidth);

    $rootScope.modals = {};
    $rootScope.addModal("addScreen", "views/addScreen.html", "projectService.addScreenVisible");
    $rootScope.addModal("propertiesWindow", "views/propertiesWindow.html", "editorService.propertiesWindowVisible");
    $rootScope.addModal("settingsWindow", "views/settingsWindow.html", "settingsWindowService.visible");
    $rootScope.addModal("imageExplorerWindow", "views/imageExplorerWindow.html", "imageService.visible");
    $rootScope.addModal("colorPickerWindow", "views/colorPickerWindow.html", "colorPickerService.colorPickerModalVisible");

    $scope.$on("$locationChangeSuccess", function (event, newUrl) {
        //records the location to a global variable, because modules need to access it too
        var requestLocation = $location.path().substring(1);
        projectService.setCurrentScreenByName(requestLocation);
    });

    //makes and url friendly string from a custom string
    $scope.slugify = function (text) {
        return text.toString().toLowerCase()
          .replace(/\s+/g, '-')           // Replace spaces with -
          .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
          .replace(/\-\-+/g, '-')         // Replace multiple - with single -
          .replace(/^-+/, '')             // Trim - from start of text
          .replace(/-+$/, '');            // Trim - from end of text
    }

    $scope.onScreenClick = function (screen, $event) {
        $location.path(screen.properties.name);
    }

    //Prevents sanitizing of the HTML parameter. Only use for non-user input!
    $scope.toTrustedHTML = function (html) {
        return $sce.trustAsHtml(html);
    }

    //Makes the website go full screen
    $scope.goFullScreen = function () {
        window.document.documentElement.webkitRequestFullScreen();
    }
};