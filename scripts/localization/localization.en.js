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
 
//add hungarian translation to available languages
localization.languages.push('en');

//translation
localization.items.en = {
    flag: 'scripts/localization/flags/en.GIF',
    language: 'English',
    general: {
        emptyList: 'Empty list',
        background: 'Background',
        backgroundColor: 'Background color',
        selectScreenType: 'Select screen type'
    },
    project: {
        clearLocal: 'Clear local',
        download: 'Download',
        load: 'Load',
        uploadProject: 'Upload project',
        compare: 'Compare',
        availableProjects: 'Available projects',
        name: 'Name',
        id: 'Id',
        title: 'Project settings',
        currentProjectTab: 'Current project',
        projectBrowserTab: 'Project browser',
        blockMsg: 'Please wait...'
    },
    fidgets: {
        extend: {
            variableSelector: {
                subStart: 'Subscription started to @0 variable for @1 node',
                subEnd: 'Subscription finished to @0 variable for @1 node',
                subFailed: 'Subscription failed',
                unsubStart: 'Unubscription started from @0 variable for @1 node',
                unsubEnd: 'Unubscription finished from @0 variabe for @1 node',
                unsubFailed: 'Unubscription failed',
                subButton: 'Subscribe',
                unSubButton: 'Unsubscribe',
                refreshButton: 'Refresh',
                title: 'Add new variable to @0 node'
            }
        },
        messenger: 'Messenger',
        fidgetGroup: 'Fidget Group',
        progressBar: 'Progress bar',
        button: 'Button',
        checkBox: 'Checkbox',
        textInput: 'Text input',
        text: 'Text',
        variableSelector: 'Variables',
        scrollableText: 'Scrollable text',
        slider: 'Slider',
        radioButton: 'Radio button',
        gauge: 'Gauge',
        boolean: 'Boolean',
        image: 'Image',
        indicatorLamp: 'Indicator lamp',
        road: 'Road',
        fence: 'Fence',
        camera: 'Camera',
        device: 'Device',
        genericObstacle: 'Obstacle',
        cameraImage: 'Camera image',
        endOfWay: 'End of way',
        properties: {
            _width: 'Width',
            _height: 'Height',
            opacity: 'Opacity',
            _angle: 'Angle',
            _value: 'Value',
            _color: 'Color',
            _text: 'Text',
            _fontSize: 'Font size',
            _fontColor: 'Font color',
            _min: 'Minimum',
            _max: 'Maximum',
            _step: 'Step',
            _precision: 'Precision',
            backgroundColor: 'Background color',
            image: "Image",
            color: "Color",
            _options: 'Options',
            _angleOffset: 'Angle offset',
            _angleArc: 'Angle arc',
            _lock: 'Lock',
            scale: 'Scale',
            source: 'Source',
            _onColor: 'On color',
            _offColor: 'Off color',
            _blinking: 'Blinking',
            _blinkPeriod: 'Blink period',
            _screenLink: 'Screen link',
            _borderColor: 'Border color',
            onClick: 'On click',
            name: 'Name',
            _node: 'ROS Node name'
        }
    },
    properties: {
        title: 'Properties of @0',
        aspectFit: 'Preserve aspect fit',
        aspectCrop: 'Preserve aspect crop',
        stretch: 'Stretch',
        robot: 'Robot',
        plc: 'PLC',
        onlyForSingleFidget: 'The properties belt is only available for only one fidget at once!'
    },
    settings: {
        title: 'FlexGui Settings',
        reloadLoginAlert: 'Reload FlexGui and login with the new data?',
        reloadSettingsAlert: 'Reload FlexGui to use the current settings?',
        loadOnNextStartNote: 'FlexGui will use this settings on next start',
        tabs: {
            project: {
                title: 'Project',
                uploadNote: 'Please note, that uploading the project will overwrite the current one!',
                uploadConfirm: 'Do you want to overwrite the current project?',
                upload: 'Upload',
                download: 'Download',
                uploadComplete: 'Upload completed!',
                savedToMobile: 'The project file is saved to your root folder: ',
                savedFailed: 'Save failed',
                noteUseMobileMemory: '<i><u><b>Plase note:</b></u> browse your built in storage to upload projects!</i>'
            },
            language: {
                title: 'Language',
                languageSelectNote: 'Please note, that FlexGui will reload if you change this value!',
            },
            general: {
                title: 'General',
                screenScale: 'Change screen scaling',
                small: 'Small',
                medium: 'Medium',
                large: 'Large',
                onScreenHelp: 'On-screen help',
                onScreenHelpSwitch: 'Check to enable on-screen help',
                statLabel: "Statistics",
                statSwitchLabel: "Check to show statistic chart",
            },
            initScript: {
                title: 'Init script',
                note: 'Place here the initialization script',
                autoInitException: 'autoInit exception',
                initException: 'Error during initialization'
            },
            nodes: {
                title: 'Nodes',
                search: 'Search...',
                detailsOf: 'Details of @0',
                searchResult: 'Search result',
                tooShortError: 'Too short search expression',
                noResultMsg: 'No results for the keyword: \'@0\'',
                demoAlert: 'Demo mode, no nodes are available',
                nodeUnselected: 'Select a node to list properties.'
            },
            conn: {
                title: 'Connection settings',
                ip: 'IP',
                port: 'Port',
                demoMode: 'The Demo Mode is active. To connect to ROS switch the Demo Mode off in the settings.',
                demoModeSwitch: 'Check to enable demo mode'
            },
            messenger: {
                title: 'Messenger'
            },
            theme: {
                title: "Themes",
                theme: 'Theme',
                themeNote: 'Please note, that FlexGui will reload if you change this value!',
            }
        }
    },
    messenger: {
        invalidUsernamePassword: 'Can not login to iVAR messenger. Plase check your username and password.',
        missingLoginData: 'iVAR Messenger can not login. Please set it up in Settings/Messenger.',
        enterMessage: 'Enter message...',
        expertUsername: "Expert username"
    },
    popup: {
        title: 'FlexGui Messages'
    },
    buttons: {
        cancel: 'Cancel',
        clear: 'Clear',
        save: 'Save',
        close: 'Close',
        closeAll: 'Close all',
        remove: 'Delete',
        reconnect: 'Reconnect',
        select: 'Select',
        removeBackground: 'Remove',
        pick: 'Pick...',
        toBack: 'Send to back',
        backward: 'Send backward',
        toFront: 'Bring to front',
        forward: 'Bring forward',
        moveUp: 'Move up',
        moveDown: 'Move down',
        addScreen: 'Add screen...',
        addFactoryScreen: 'Factory screen',
        addNormalScreen: 'Normal screen',
        upload: 'Upload',
        download: 'Download'
    },
    editMode: {
        switchLabel: 'Edit mode',
        settings: 'Settings',
        properties: 'Properties',
        multiSelect: 'Multi select',
        unSelect: 'Unselect all',
        undo: 'Undo',
        redo: 'Redo',
        copy: 'Copy',
        cut: 'Cut',
        paste: 'Paste'
    },
    help: {
        label: 'Help',
        off: 'Don\'t show help messages',
        screenBelt: {
            screen: 'Screen',
            screenText: 'On the Screen Belt you can see all the screens of the project. If you single click one, it will be selected. If you double click one, you can edit it\'s properties.',
            newScreen: 'New screen',
            newScreenText: 'You can add a new screen simply by clicking on the ' + ' marked screen at the end of the screen list. You can rename or delete screens by double clicking them.',
            properties: 'Properties belt',
            propertiesText: 'If you drag a Fidget to the Screen Belt, it will jump back to it\'s original position, and open it\'s propertiesBelt.'
        },
        initScript: {
            text: 'You can write initialization script here that will run when the project starts up, for example local variable declarations.'
        },
        settings: {
            scale: 'Change screen scaling',
            scaleText: 'You can set the screen scaling on a mobile device with these buttons.',
            scaleNote: 'Please note that on mobile devices you can also set the scaling by pinching, on desktop computers you can use the default resize in the browser.',
            help: 'On-screen help',
            helpText: 'You can switch the <span class="glyphicon glyphicon-question-sign"></span> icons on and off.'
        },
        fidgetBelt: {
            fidgets: 'Fidgets',
            fidgetsText: 'You can find all the Fidgets you can use on the Fidget Belt, and drag them onto the screen. Use the scrollwheel on PC or drag on touch screens to see all Fidgets.',
            deleteBelt: 'Delete Belt',
            deleteBeltText: 'If you drag a Fidget back to the Fidget Belt, it will be deleted. Later you can re-add it from the Fidget Belt.'
        },
        loginWindow: {
            title: "Login window",
            content: "Please provide user name and password in order to log in as an administrator. As a guest user you can use the FlexGui interface, but you will not be able to make any changes."
        },
        connectionSettings: {
            title: "Connection settings",
            content: "Specify the address of the computer that runs the ROSBridge server to connect to ROS. The standard port is usually 9090."
        },
        nodes: {
            title: "Nodes",
            content: "<p>If the connection to the ROSBridge server is set up correctly, the active nodes are listed in the dropdown menu. In order to use the data from ROS topics in FlexGui, check the subscribe next to them. </p><p>By giving the topics and services friendly names, you can access them in your scripts using the @friendlyName syntax.</p>"
        },
        messenger: {
            title: "Messenger",
            content: "In order to use the Messenger for chat and video communication please provide your account informations."
        },
        language: {
            title: "Language",
            content: "You can chose your preferred language. FlexGui will reload when you change this value. In case you don't find the language you like, please contact us in FlexGui.net."
        },
        project: {
            title: "Project",
            content: "You can upload and download project files for easy transportation and backup."
        },
        propertiesWindow: {
            title: "Properties window",
            content: "<p>The properties of the Fidget can be changed here. Every Fidget has a custom set of elements to change.</p>"
					+ "<h5>On Click script</h5>"
					+ "<p>If a Fidget has an On Click property, a script can be set which is executed when the user clicks/taps on the Fidget.</p>"
                    + "<h5>Positioning buttons</h5>"
                    + "<p>The positioning buttons are for arranging several overlapping Fidgets.</p>"
					+ "<ul>"
                    + "<li>Send to back: The Fidget will be sent to the lowest layer of the screen</li>"
                    + "<li>Send backwards: The Fidget will be sent one layer down</li>"
                    + "<li>Bring to front: The Fidget will be sent to the topmost layer of the screen</li>"
                    + "<li>Bring forward: The Fidget will be sent one layer up</li>"
					+ "</ul>"
        },
        colorPick: {
            title: "Color picker",
            content: "Change the color of the property using this picker listing the most used colors. You can also choose custom colors using their HTML code."
        },
        imageExplorer: {
            title: "Image Explorer",
            content: "Upload the desired image to one of the image slots in the Upload tab. Select a storage slot first and then specify the location where you want to upload the image from. You can pick an uploaded image to more Image Fidgets or screen backgrounds."
        },
        fidgetGroup: {
            title: "Fidget Group",
            content: "You can place multiple Fidgets into this container. In a Fidget Group Fidgets can be moved together, keeping their relative layout to each other."
        },
        image: {
            title: "Image",
            content: "An Image Fidget displays your custom image on a FlexGui screen."
        },
        messenger: {
            title: "Messenger login data",
            content: "You can set up the user login data on this screen to be able to use the FlexGui Messenger. Please request these from your Expert Site administrator!"
        },
        themes: {
            content: "Click the themes here to change the look of FlexGui, keeping the layout and logic intact. If you need a customized theme, please contact us on FlexGui.net."
        },
        cameraImage: {
            content: "A Camera image Fidget displays your IP camera's video stream.<h5>Source</h5>Setting up the Source property to a .mjpg source will show the video. <h5>Authentication</h5>If your camera is password protected, please provide username and password to the popup window."
        }
    },
    login: {
        login: 'Login',
        username: 'Username',
        password: 'Password',
        guest: 'Guest',
        logout: 'Logout',
        fullScreen: 'Full Screen',
        loginError: 'Wrong username/passord',
        logoutSuccess: 'Logout success'
    },
    demo: {
        callError: 'In demo mode you can not make calls.',
        subscribeError: 'In demo mode you can not subscribe/unsubscribe'
    },
    ros: {
        connectionError: 'FlexGui 4.0 is not able to Connect to the ROS server ',
        communicationInitError: 'Communication initialization exception',
        interfaces: {
            type: 'Type',
            originalName: 'Original name',
            friendlyName: 'Friendly name',
            subscribe: 'Subscribe',
            notYetImplementedError: 'Not yet implemented',
            dupeError: 'Another interface has the same friendly name.'
        }
    },
    images: {
        title: 'Image Explorer',
        imagesTabTitle: 'Images',
        uploadTabTitle: 'Upload',
        resizeAlert: 'The image will be resized to max. 1024x768 resolution',
        selectSlot: 'Select slot',
        selectFile: 'Select file',
        blockMsg: 'Uploading image',
        imageError: 'Only image files can be uploaded, please select a PNG, BMP or JPG file'
    },
    timeago: {
        settings: {
            strings: {
                prefixAgo: null,
                prefixFromNow: null,
                suffixAgo: 'ago',
                suffixFromNow: 'from now',
                inPast: 'any moment now',
                seconds: 'less than a minute',
                minute: 'about a minute',
                minutes: '%d minutes',
                hour: 'about an hour',
                hours: 'about %d hours',
                day: 'a day',
                days: '%d days',
                month: 'about a month',
                months: '%d months',
                year: 'about a year',
                years: '%d years',
                wordSeparator: ' ',
                numbers: []
            }
        }
    }
}