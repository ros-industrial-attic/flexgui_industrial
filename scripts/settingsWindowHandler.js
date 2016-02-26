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
 
settingsWindowService.$inject = ['projectService', 'deviceService', 'popupService', '$rootScope'];

function settingsWindowService(projectService, deviceService, popupService, $rootScope) {
    
    //Controller for the settings window
    var settingsWindowHandler = {

        tabs: [],
        getTab: function(source, title, classes){
            return {
                title: title,
                source: source
            }
        },
        //The visibility of the window
        demoMode: localStorage.getItem("demoMode") == "true" || !localStorage.getItem("demoMode") ? true : false,
        visible: false,
        setVisible: function (value) {
            settingsWindowHandler.visible = value;

            if (!value) {
                //run changed initscript and save
                if (settingsWindowHandler.lastInitScript != projectService.initScript) {
                    deviceService.saveProject(true);
                    projectService.runInit();
                }
            } else {
                //save last init script
                settingsWindowHandler.lastInitScript = projectService.initScript;
            }
        },

        isStatVisible: localStorage.getItem("statVisible") == "true" ? true : false,
        showStatistics: function(){
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
            localStorage.setItem("diPort", deviceService.port);
            localStorage.setItem("demoMode", settingsWindowHandler.demoMode);

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

        loadLocalStorage: function () {
            this.setViewScale(localStorage.getItem("viewScale") || 0.5);
        },

        //saves the selected theme to local storage and reloads the page
        changeTheme: function (t) {
            localStorage.setItem("theme", t);

            bootbox.confirm(localization.currentLocal.settings.reloadSettingsAlert, function (result) {
                if (result) {
                    location.reload();
                } else {
                    popupService.show(localization.currentLocal.settings.loadOnNextStartNote, popupService.types.info);
                }
            });

        },

        //Current tabIndex on the window
        tabIndex: 2,
        setTabIndex: function (value) {
            settingsWindowHandler.tabIndex = value;
            settingsWindowHandler.refreshEditor();
        },
        refreshEditor: function () {
            settingsWindowHandler.refreshCodemirror = !settingsWindowHandler.refreshCodemirror;
        },

        //Current selected node on the nodes tab
        nodesTabSelectedItem: null,
        setNodesTabSelectedItem: function (value) {
            this.nodesTabSelectedItem = value;
        },

        //Init script editor options
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

        //ViewScale multiplier for mobile devices
        viewScale: 0.5,
        setViewScale: function (value) {
            settingsWindowHandler.viewScale = Math.min(1.5, Math.max(0.5, value));
            localStorage.setItem("viewScale", settingsWindowHandler.viewScale);

            var viewport = document.querySelector("meta[name=viewport]");
            viewport.setAttribute('content', 'width=device-width, initial-scale=' + settingsWindowHandler.viewScale + ', maximum-scale=' + settingsWindowHandler.viewScale + ', user-scalable=no');
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

        //Counts the interfaces that are using the 'name' friendly name.
        countFriendly: function (name) {
            result = 0;

            var countFn = function (_interf) {
                if (_interf.friendlyName == name)
                    result++;
            };

            angular.forEach(deviceService.topics, countFn);
            angular.forEach(deviceService.services, countFn);

            return result;
        },

        //An interface is using duplicated friendly name if more than 1 occurs in the interface list.
        isDupe: function (_interf) {
            return _interf.friendlyName && settingsWindowHandler.countFriendly(_interf.friendlyName) > 1;
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

    if (!$rootScope.settingsTabs) $rootScope.settingsTabs = [];
    
    $rootScope.settingsTabs.push({ source: "views/settings/general.html", title: localization.currentLocal.settings.tabs.general.title});
    $rootScope.settingsTabs.push({ source: "views/settings/init.html", title: localization.currentLocal.settings.tabs.initScript.title, classes: "settingsScriptTab"});
    $rootScope.settingsTabs.push({ source: "views/settings/nodes.html", title: localization.currentLocal.settings.tabs.nodes.title, classes: "settingsNodesTab"});
    $rootScope.settingsTabs.push({ source: "views/settings/connection.html", title: localization.currentLocal.settings.tabs.conn.title, classes: "diSettingsTab"});
    $rootScope.settingsTabs.push({ source: "views/settings/project.html", title: localization.currentLocal.settings.tabs.project.title, classes: "projectSettingsTab" });
    $rootScope.settingsTabs.push({ source: "views/settings/language.html", title: localization.currentLocal.settings.tabs.language.title, classes: "languageSettingsTab" });

    return settingsWindowHandler;
}