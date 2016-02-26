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
 
scriptManagerService.$inject = ['popupService', 'variableService'];

function scriptManagerService(popupService, variableService) {

    var scriptManager = {
        toReplace:
    [
    { from: '#autoInit', to: 'scriptManagerService.autoInit' },
    { from: '#setScreen', to: '$scope.onScreenClick' },
    { from: '#message', to: 'popupService.show' },
    { from: '#warningMessage', to: 'popupService.types.warning' },
    { from: '#infoMessage', to: 'popupService.types.info' },
    { from: '#errorMessage', to: 'popupService.types.error' },
    { from: '#friendly', to: 'variableService.friendlyCache' },
    { from: '#nodes', to: 'deviceService.nodes' },
    { from: '#ros', to: 'variableService.ros' },
    ],

        compile: function (script) {
            for (var i = 0; i < scriptManager.toReplace.length; i++)
                script = scriptManager.replaceAll(script, scriptManager.toReplace[i].from, scriptManager.toReplace[i].to);

            //replace friendlyCache variables
            var friendlyNameVars = scriptManager.getAllFriendlyVars(script);
            for (var i = 0; i < friendlyNameVars.length; i++) {
                script = scriptManager.replaceAll(script, friendlyNameVars[i], "variableService.friendlyCache['" + friendlyNameVars[i].substring(1) + "']");
            }

            return script;
        },

        getAllFriendlyVars: function (script) {
            var reg = /(\@+[a-zA-Z_][a-zA-Z0-9_]*)/g;
            var matches = [], found;
            while (found = reg.exec(script)) {
                matches.push(found[0]);
            }
            return matches;
        },


        autoInit: function (name, value) {
            try {
                if (eval("typeof(" + name + ")== 'undefined'")) {
                    if (typeof value === 'string' || value instanceof String)
                        value = "'" + value + "'";

                    var script = "";

                    if (typeof value === 'object') {
                        script = name + "= JSON.parse('" + JSON.stringify(value) + "')";
                    } else {
                        script = name + "=" + value;
                    }

                    eval(script);
                }
            }
            catch (ex) {
                popupService.show(localization.currentLocal.settings.tabs.initScript.autoInitException + ": " + ex.message, popupService.types.error);
            }
        },

        replaceAll: function (string, find, replace) {
            if (string == null || string == undefined) return;
            if (typeof string == "string")
                return string.replace(new RegExp(find, 'g'), replace);
            else {
                return string;
            }
        },
    }

    return scriptManager;
}