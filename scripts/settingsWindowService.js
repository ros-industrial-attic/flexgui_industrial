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

settingsWindowService.$inject = ['projectService', 'deviceService', 'popupService', '$rootScope', '$cookies', 'variableService', '$timeout'];

function settingsWindowService(projectService, deviceService, popupService, $rootScope, $cookies, variableService, $timeout) {

    //Controller for the settings window
    var settingsWindowHandler = {

        tabs: [],
        getTab: function (source, title, classes) {
            return {
                title: title,
                source: source
            }
        },

        pinchEnabled: localStorage.getItem("pinchEnabled") == "true" ? true : false,

        offlineMode: localStorage.getItem("offlineMode") == "true" || !localStorage.getItem("offlineMode") ? true : false,

        //The visibility of the window
        visible: false,
        setVisible: function (value) {
            settingsWindowHandler.visible = value;

            if (!value) {
                deviceService.updateFriendlyCache();

                //run changed initscript and save
                if (settingsWindowHandler.lastInitScript != projectService.initScript) {
                    projectService.needSave = { history: true, ts: Date.now() };
                    projectService.runInit();
                }
            } else {
                //save last init script
                settingsWindowHandler.lastInitScript = projectService.initScript;
                //set default tab if null
                settingsWindowHandler.setCurrentGroup($rootScope.settingsTabs.general);
                //set height of settings windows
                //$timeout(function () { $("#settingsDialog .tab-content").css("minHeight", 42 * Object.keys($rootScope.settingsTabs).length); }, 200);
            }
        },

        isStatVisible: localStorage.getItem("statVisible") == "true" ? true : false,
        showStatistics: function () {
            if (settingsWindowHandler.isStatVisible) {
                showAngularStats({
                    "position": "topright",
                    "digestTimeThreshold": 30,
                    "logDigest": false,
                    "logWatches": false,
                    "htmlId": "angularPerformanceStats",
                });

                $("#angularPerformanceStats").css({ right: 140, top: 20 });
            } else {
                showAngularStats(false);
            }

            localStorage.setItem("statVisible", settingsWindowHandler.isStatVisible);
        },

        saveDiSettings: function () {
            localStorage.setItem("diIp", deviceService.ip);
            localStorage.setItem("diSecure", deviceService.secure);
            localStorage.setItem("diPort", deviceService.port);
            localStorage.setItem("offlineMode", settingsWindowHandler.offlineMode);

            bootbox.confirm(localization.currentLocal.settings.reloadSettingsAlert, function (result) {
                if (result) {
                    location.reload();
                } else {
                    popupService.show(localization.currentLocal.settings.loadOnNextStartNote, popupService.types.info);
                }
            });
        },

        selectLanguage: function (lang) {
            localStorage.setItem("language", lang);

            bootbox.confirm(localization.currentLocal.settings.reloadSettingsAlert, function (result) {
                if (result) {
                    location.reload();
                } else {
                    popupService.show(localization.currentLocal.settings.loadOnNextStartNote, popupService.types.info);
                }
            });
        },

        forceScreenBeltShow: localStorage.getItem("forceScreenBeltShow") == "true" ? true : false,
        setScreenBeltShow: function () {
            localStorage.setItem("forceScreenBeltShow", this.forceScreenBeltShow);
        },

        loadLocalStorage: function () {
            this.setViewScale(localStorage.getItem("viewScale") || 0.5);
        },

        //Current tab on the window
        currentTab: null,
        //current group
        currentGroup: null,
        //set current tab
        setCurrentTab: function (tab, group) {
            settingsWindowHandler.currentTab = tab;
            settingsWindowHandler.currentGroup = group;
        },
        //set current tabGroup
        setCurrentGroup: function (group) {
            if (group.children.length == 0) {
                settingsWindowHandler.currentGroup = group;
                settingsWindowHandler.currentTab = group;
            }
        },
        //Current selected node on the nodes tab
        nodesTabSelectedItem: null,
        setNodesTabSelectedItem: function (value) {
            this.nodesTabSelectedItem = value;
        },

        refreshCodemirror: true,
        options: {
            lineNumbers: true,
            lineWrapping: true,
            mode: 'javascript',
        },

        //The content of the search box
        searchString: "",
        setSearchString: function (value) {
            settingsWindowHandler.searchString = value;
        },

        topicDetails: {
            //saved
            saved: false,
            //property repeater html src
            repeater: "views/settings/nodes/topicDetails.html",
            //set details window visibility
            setVisible: function (v, t) {
                this.visible = v;

                if (v) {
                    this.saved = false;
                    this.currentTopic = t;
                    this.originalFriendlyNames = angular.copy(this.currentTopic.deepFriendlyNames);
                }
                else {
                    //if we close without save, restore the original
                    if (!this.saved) {
                        this.currentTopic.deepFriendlyNames = angular.copy(this.originalFriendlyNames);
                    }

                    delete this.currentTopic;
                    delete this.originalFriendlyNames;
                }
            },
            //topic details window visibility
            visible: false,
            //currently selected topic
            currentTopic: null,
            //get properties of objects
            getProperties: function (obj) {
                if (typeof obj !== 'object' || !obj) return [];

                var ret = [];

                //get property names without "_"
                angular.forEach(Object.getOwnPropertyNames(obj), function (key) {
                    if (key.indexOf("_") != 0) {
                        ret.push(key);
                    }
                });

                return ret.sort();
            },
            //save values to friendly cache
            saveFriendlyNames: function () {
                var topic = settingsWindowHandler.topicDetails.currentTopic;

                if (this.originalFriendlyNames)
                    //remove old keys
                    angular.forEach(Object.keys(this.originalFriendlyNames), function (key) {
                        delete variableService.friendlyCache[key];
                    });

                //get node for current topic
                var nodeName = topic.nodeName;
                var meta = projectService.interfaceMetaData.find(topic.path);

                //add new items to friendlyCache
                angular.forEach(Object.keys(this.currentTopic.deepFriendlyNames), function (key) {
                    var friendlyName = topic.deepFriendlyNames[key];
                    var originalName = settingsWindowHandler.topicDetails.originalFriendlyNames == undefined ? null :
                        Object.keys(settingsWindowHandler.topicDetails.originalFriendlyNames).indexOf(key) > -1 ?
                            settingsWindowHandler.topicDetails.originalFriendlyNames[key] : null;

                    projectService.interfaceMetaData.setDeepFriendlyName(topic.path, topic.type, key, friendlyName, originalName);

                    //add a new object to the friendly cache and mark, it is a deep friendly name
                    variableService.friendlyCache[friendlyName] = {
                        __isDeep: true,
                        value: "$rootScope.device.nodes['" + nodeName + "']" + key
                    }
                });

                //close modal
                this.saved = true;
                this.setVisible(false);
            }
        },

        addonGeneralSettings: [],
        addGeneralSetting: function (html, desc) {
            settingsWindowHandler.addonGeneralSettings.push({ html: html, description: desc });
        },

        //ViewScale multiplier for mobile devices
        viewScale: 0.5,
        changeScaleTimeout: null,
        setViewScale: function (value, timeout) {
            settingsWindowHandler.viewScale = Math.min(2, Math.max(0.1, value));
            localStorage.setItem("viewScale", settingsWindowHandler.viewScale);

            if (settingsWindowHandler.changeScaleTimeout) {
                window.clearTimeout(settingsWindowHandler.changeScaleTimeout);
            }

            settingsWindowHandler.changeScaleTimeout = window.setTimeout(function () {
                var viewport = document.querySelector("meta[name=viewport]");
                viewport.setAttribute('content', 'width=device-width, initial-scale=' + settingsWindowHandler.viewScale + ', maximum-scale=' + settingsWindowHandler.viewScale + ', user-scalable=no');
            }, timeout || 0);
        },

        //set the scale of the mobile device to the biggest where everything fits into the screen
        autoScale: function () {

            this.setViewScale(1, 0);

            $timeout(function () {
                var windowSize = { width: $(window).width(), height: $(window).height() };
                var biggestScreenSize = { width: 0, height: 0 };

                //get the biggest frame
                function fitToScreenSize(fidgets, top, left) {
                    angular.forEach(fidgets, function (f) {
                        if (f.fidgets) fitToScreenSize(f.fidgets, f.properties.top, f.properties.left);

                        var size = $rootScope.editHandler.getFidgetSize(f); //we have to get the real size, e.g. the text can be outside of the box
                        var fitToSize = { width: left + f.properties.left + size.width, height: top + f.properties.top + size.height };

                        biggestScreenSize.width = Math.max(biggestScreenSize.width, fitToSize.width);
                        biggestScreenSize.height = Math.max(biggestScreenSize.height, fitToSize.height);
                    });
                }

                //start the calculation
                angular.forEach(projectService.screens, function (s) {
                    fitToScreenSize(s.fidgets, 0, 0);
                });


                //add some margin and the belt
                biggestScreenSize.width += ($rootScope.editHandler.beltWidth + 20); //we have to fit with the belt as well and add some margin
                biggestScreenSize.height += 20; //add some margin

                //get the scale
                var verticalScale = windowSize.height / biggestScreenSize.height, horizontalScale = windowSize.width / biggestScreenSize.width;

                //set the scale and store
                settingsWindowHandler.setViewScale(Math.min(verticalScale, horizontalScale));
            }, 0);
        },

        //Filters the topics and services arrays according to the searchString
        searchInterfaces: function () {
            result = [];

            searched = settingsWindowHandler.searchString;
            var filterFn = function (_interf) {
                if ((_interf.friendlyName && _interf.friendlyName.indexOf(searched) != -1) || _interf.path.indexOf(searched) != -1)
                    result.push(_interf);
            };

            angular.forEach(deviceService.topics, filterFn);
            angular.forEach(deviceService.services, filterFn);

            return result;
        },

        interfaces: {
            header: 'views/settings/nodes/header.html',
            item: 'views/settings/nodes/interface.html'
        },

        // Filters what interfaces to show
        shownInterfaces: function () {
            searching = this.searchString.length > 1;
            return (searching ? this.searchInterfaces() : this.getInterfaces(this.nodesTabSelectedItem));
        },

        // Returns the interfaces for a node
        getInterfaces: function (node) {
            var result = [];
            angular.forEach(node, function (_interf, interfaceName) {
                if (_interf.isInterface)
                    result.push(_interf);
            });
            return result;
        },


        themes: [],
        getTheme: function (name, colors, title) {
            return {
                name: name,
                colors: colors,
                title: title
            }
        }
    };

    if (!settingsWindowHandler.theme) {
        //var theme = localStorage.getItem("theme") || "default";
        var pathToLess = 'styles/themes/default/style.less';
        //settingsWindowHandler.theme = theme;
        $('head').append('<link id="theme" rel="stylesheet/less" href="' + pathToLess + '"/>');
        less.sheets.push($('link[href="' + pathToLess + '"]')[0]);
        less.refresh(true);
    }

    $(window).resize(function () {
        settingsWindowHandler.isVertical = $(window).height() > $(window).width();
    });

    $(window).resize();

    if (!$rootScope.settingsTabs) $rootScope.settingsTabs = {};
    if (!$rootScope.settingsTabs) $rootScope.settingsGroups = {};
    if (!$rootScope.nodeExtras) $rootScope.nodeExtras = [];

    //subtabs
    $rootScope.settingsTabs.operation = { position: 1, source: "views/settings/project.html", title: "Operations", classes: "projectSettingsTab" };
    $rootScope.settingsTabs.init = { position: 2, source: "views/settings/init.html", title: localization.currentLocal.settings.tabs.initScript.title, classes: "settingsScriptTab" };

    //main tabs
    $rootScope.settingsTabs.general = { children: [], position: 1, source: "views/settings/general.html", title: localization.currentLocal.settings.tabs.general.title };
    $rootScope.settingsTabs.nodes = { children: [], position: 3, source: "views/settings/nodes.html", title: localization.currentLocal.settings.tabs.nodes.title, classes: "settingsNodesTab" };
    $rootScope.settingsTabs.connection = { children: [], position: 4, source: "views/settings/connection.html", title: localization.currentLocal.settings.tabs.conn.title, classes: "diSettingsTab" };
    $rootScope.settingsTabs.language = { children: [], position: 6, source: "views/settings/language.html", title: localization.currentLocal.settings.tabs.language.title, classes: "languageSettingsTab" };
    $rootScope.settingsTabs.about = { children: [], position: 9999, source: "views/settings/about.html", title: "About", classes: "aboutSettingsTab" };
    $rootScope.settingsTabs.project = { children: [$rootScope.settingsTabs.init, $rootScope.settingsTabs.operation], position: 5, source: "views/settings/project.html", title: localization.currentLocal.settings.tabs.project.title };
    $rootScope.settingsTabs.addons = { children: [], position: 9998, source: '', title: 'Addons', children: [], hideEmpty: true }

    //function container to extend the online state
    settingsWindowHandler.offlineCheckers = [];
    settingsWindowHandler.checkOffline = function () {
        var offline = settingsWindowHandler.offlineMode;
        angular.forEach(settingsWindowHandler.offlineCheckers, function (c) { if (offline) offline = c(); })
        return offline;
    }

    //software offline property
    Object.defineProperty(settingsWindowHandler, 'isSoftwareOffline', {
        get: function () { return settingsWindowHandler.checkOffline(); }
    });

    $rootScope.$watch(function () { return settingsWindowHandler.pinchEnabled; }, function () { localStorage.setItem("pinchEnabled", settingsWindowHandler.pinchEnabled); })

    return settingsWindowHandler;
}