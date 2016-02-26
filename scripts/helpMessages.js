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
                for: 'General settings',
                source: 'views/help/generalSettings.html'
            },
            initScript: {
                for: 'Initialization script',
                source: 'views/help/initScript.html'
            },
            nodes: {
                for: 'ROS Nodes',
                source: 'views/help/nodes.html'
            },
            connectionSettings: {
                for: 'Connection settings',
                source: 'views/help/connectionSettings.html'
            },
            project: {
                for: 'Project',
                source: 'views/help/project.html'
            },
            language: {
                for: 'Language',
                source: 'views/help/language.html'
            }
        },
        fidgetBelt: {
            for: 'Fidget Belt',
            source: 'views/help/fidgetBelt.html'
        },
        screenBelt: {
            for: 'Screen Belt',
            source: 'views/help/screenBelt.html'
        },
        fidgetGroup: {
            for: 'Fidget group fidget',
            source: 'views/help/fidgetGroup.html'
        },
        image: {
            for: 'Image fidget',
            source: 'views/help/image.html'
        },
        propertiesWindow: {
            for: 'Properties window',
            source: 'views/help/propertiesWindow.html'
        },
        colorPick: {
            for: 'Color picker',
            source: 'views/help/colorPick.html'
        },
        imageExplorer: {
            for: 'Image explorer',
            source: 'views/help/imageExplorer.html'
        },
        loginWindow: {
            for: 'Login window',
            source: 'views/help/loginWindow.html'
        },
    }

    return helpMessages;
}