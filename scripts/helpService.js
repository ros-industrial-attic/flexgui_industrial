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

function helpService() {
    var helpMessages = {
        show: localStorage.getItem("showHelpmessages") == "false" ? false : true,
        //Shows the help ?-s around the UI.
        setShow: function (value) {
            helpMessages.show = value;

            localStorage.setItem("showHelpmessages", value);
        },
        open: null,
        //Sets the help message to show. The helpMessage window opens if not null.
        setOpen: function (help) {
            helpMessages.open = help;
        },

        //Metadata for settings
        settings: {
            general: {
                for: localization.currentLocal.help.settings.header,
                source: 'views/help/generalSettings.html'
            },
            initScript: {
                for: localization.currentLocal.help.initScript.header,
                source: 'views/help/initScript.html'
            },
            nodes: {
                for: localization.currentLocal.help.nodes.header,
                source: 'views/help/nodes.html'
            },
            connectionSettings: {
                for: localization.currentLocal.help.connectionSettings.header,
                source: 'views/help/connectionSettings.html'
            },
            project: {
                for: localization.currentLocal.help.project.header,
                source: 'views/help/project.html'
            },
            language: {
                for: localization.currentLocal.help.language.header,
                source: 'views/help/language.html'
            },
            enterprise: {
                for: localization.currentLocal.help.enterprise.header,
                source: 'views/help/enterprise.html'
            },
            diagnostics: {
                for: localization.currentLocal.help.diagnostics.header,
                source: 'views/help/diagnostics_main.html'
            }
        },
        fidgetBelt: {
            for: localization.currentLocal.help.fidgetBelt.header,
            source: 'views/help/fidgetBelt.html'
        },
        screenBelt: {
            for: localization.currentLocal.help.screenBelt.header,
            source: 'views/help/screenBelt.html'
        },
        fidgetGroup: {
            for: localization.currentLocal.help.fidgetGroup.header,
            source: 'views/help/fidgetGroup.html'
        },
        image: {
            for: localization.currentLocal.help.image.header,
            source: 'views/help/image.html'
        },
        propertiesWindow: {
            for: localization.currentLocal.help.propertiesWindow.header,
            source: 'views/help/propertiesWindow.html'
        },
        colorPick: {
            for: localization.currentLocal.help.colorPick.header,
            source: 'views/help/colorPick.html'
        },
        imageExplorer: {
            for: localization.currentLocal.help.imageExplorer.header,
            source: 'views/help/imageExplorer.html'
        },
        loginWindow: {
            for: localization.currentLocal.help.loginWindow.header,
            source: 'views/help/loginWindow.html'
        },
        cameraImage: {
            for: localization.currentLocal.help.cameraImage.header,
            source: 'views/help/cameraImage.html'
        }

    }

    return helpMessages;
}