//add english translation to available languages
localization.languages.push('en');

//translation
localization.items.en = {
    flag: 'scripts/localization/flags/en.GIF',
    language: 'English',
    starting: {
        downloadAddons: "Loading addons... ",
        connectToRos: "Connecting to ROS Server",
        hideConnect: "Hide"
    },
    licensing: {
        notGenerated: "<h3>License is not approved</h3> <p>Please be patient, we will generate your license soon!</p>",
        licenseNotFound: "<h3>License is not found</h3>"
                                + "<p>After the registration go to your <a onclick='window.open(\"@0\", \"_system\");' href='#'>profile</a> and request a trial license.</p>",
        licenseExpired: "<h3>License is expired</h3>"
                                + "<p>Your trial liense is expired!</p>",
        userError: "<h3>Invalid login data</h3>"
                                + "<h4>Wrong username or password</h4>"
                                    + "<p>If you have a registered username on <a onclick='window.open(\"@0\",\"_system\")' href='#'>FlexGui 4.0 website</a>, please check your username and password again.</p>"
                                + "<h4>User not found</h4>"
                                    + "<p>Please register on <a onclick='window.open(\"@1\", \"_system\")' href='#'>FlexGui 4.0 website</a></p><p>After the registration go to your <a onclick='window.open(\"@1\",\"_system\")' href='#'>profile</a> and request a trial license.</p>"
    },
    wizard: {
        unknownWizard: "<p>You have scripts, which won't run in this version: </p>@0<p><br/>For more information, please visit our <a target='_blank' href='https://www.ppm.no/flexgui4-Home/Index/pricing'>website</a></p>",
        addScriptTemplate: "Add script template",
        output: "Output code",
        param: "Parameters",
        select: "Select wizard template",
        title: "Script template wizard",
        templates: {
            createTopic: {
                title: "Create topic",
                help: "Advertise and optionally subscribe a topic with given type, name and friendly name. The new topic will have the '/wizard/[name]' path.",
                params: {
                    name: "Name",
                    type: "Type",
                    subscribe: "Subscribe",
                    friendlyName: "Friendly name",
                    onChange: "On change script",
                }
            },
            changeScreen: {
                title: "Change screen",
                help: "Changes current screen to the selected one.",
                params: {
                    screen: "Screen",
                },
                error: "Error! Can't change to non-existing screen: ",
            },
            connectorVariable: {
                title: "Connector node's variable: initialize",
                help: "This template automatically handles the node's selected variable. It subscribes properly and creates the necessary local variables. It is recommended to put this in Init script.",
                params: {
                    node: "Node",
                    variable: "Variable",
                    friendlyName: "Friendly name",
                }
            },
            getConnectorVariable: {
                title: "Connector node's variable: get value",
                help: "This template returns with the current local data of a node's selected variable. It is recommended to put this to a property of a Fidget",
                params: {
                    node: "Node",
                    variable: "Variable",
                }
            },
            setConnectorVariable: {
                title: "Connector node's variable: set value",
                help: "This template sets local data of a node's selected variable to a new value and sends it to ROS. It is recommended to put this into an 'onClick' event of a button Fidget.",
                params: {
                    node: "Node",
                    variable: "Variable",
                    value: "New value",
                    operation: "Operation",
                }
            },
            getReadyConnectorVariable: {
                title: "Connector node's variable: get ready",
                help: "This template returns true if a node's selected variable is ready to write. It is recommended to put this to a property of a Fidget",
                params: {
                    node: "Node",
                    variable: "Variable",
                }
            },
            autoDefine: {
                title: "Define a variable if undefined",
                help: "This template sets a value to a variable if it is not defined yet. If the variable is already defined, then nothing happens.",
                params: {
                    variable: "Variable",
                    value: "Value",
                }
            },
            popup: {
                title: "Show a popup message",
                help: "This template shows a popup message with some text in it.",
                params: {
                    message: "Message",
                    type: "Type",
                }
            },
            timeout: {
                title: "Delay a script",
                help: "This template runs a script delayed.",
                params: {
                    timeout: "Delay (ms)",
                    type: "Function",
                    name: "Name"
                }
            },
            setFunction: {
                title: "Define a function",
                help: "This template defines a custom function. The function can be called later, anywhere in FlexGui using the 'Call a function' template.",
                params: {
                    name: "Name of function",
                    type: "Function",
                }
            },
            publishTopic: {
                title: "Publish topic",
                help: "Publish a value to a topic, if the topic is not existing, advertise the topic and then publish a value.",
                params: {
                    path: "Path",
                    value: "Value",
                    type: "Type"
                }
            },
            callFunction: {
                title: "Call a function",
                help: "This template calls a custom function. You can choose any function you defined earlier, anywhere in FlexGui using the 'Define a function' template.",
                params: {
                    name: "Name of function",
                },
                error: "Error! Can't call non-defined function: ",
            },
            callService: {
                title: "Call a service",
                help: "This template calls the selected service of a node. To make it work correctly you have to set the parameter correctly after inserting the code.",
                params: {
                    node: "Node",
                    service: "Service",
                    parameter: "Parameter",
                    callback: "Callback",
                },
            },
        }
    },
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
        blockMsg: 'Please wait...',
        loading: 'Loading project...',
        saveError: "The project save might failed. You can continue and disable this message by pressing Cancel, or you can try to save again by pressing Ok.",
        notForThisVersion: "The project's application version (@0) is different than the current one (@1). Do you want to convert it?",
        canNotConvert: "The project is not suitable for the current application version, do you want to create a new one?"
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
        fullgauge: 'Gauge',
        boolean: 'Boolean',
        image: 'Image',
        indicatorLamp: 'Indicator lamp',
        road: 'Road',
        fence: 'Fence',
        camera: 'Camera',
        device: 'Device',
        genericObstacle: 'Obstacle',
        cameraImage: 'Camera image',
        remoteView: 'Remote view',
        endOfWay: 'End of way',
        properties: {
            multipleDiffValueDisabledMsg: "[ Multiedit with different value, double tap to reset. ]",
            _name: "Name",
            layout: "Layout",
            _margin: "Margin",
            layoutValues: {
                vertical: "Vertical",
                horizontal: "Horizontal"
            },
            hasScreenBeltValues: {
                show: 'Show',
                hide: "Hide"
            },
            alignments: {
                left: 'Left',
                right: 'Right',
                center: 'Center',
                justify: 'Justify'
            },
            _textAlign: "Align",
            _fps: 'FPS',
            _fpsValues: ["Low", "Medium", "High"],
            _dockKeyboard: 'Dock keyboard',
            _showKeyboard: 'Force to show keyboard',
            _font: "Font",
            _icon: "Icon",
            _width: 'Width',
            _height: 'Height',
            _opacity: 'Opacity',
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
            backgroundType: 'Background type',
            image: "Image",
            color: "Color",
            _options: 'Options',
            _angleOffset: 'Angle offset',
            _angleArc: 'Angle arc',
            _lock: 'Lock',
            scale: 'Scale',
            _scale: 'Scale',
            source: 'Source',
            _onColor: 'On color',
            _offColor: 'Off color',
            _blinking: 'Blinking',
            _blinkFrequency: 'Blink frequency',
            _screenLink: 'Screen link',
            _borderColor: 'Border color',
            _borderWidth: 'Border width',
            onClick: 'On click',
            name: 'Name',
            _node: 'ROS Node name',
            hasScreenBelt: "Has screen belt",
            logo: 'Logo',
            logoWidth: 'Logo width',
            logoPosition: 'Logo position',
            logoPositions: {
                bottomRight: 'Bottom - Right',
                bottomLeft: 'Bottom - Left',
                topLeft: 'Top - Left',
                topRight: 'Top - Right'
            },
            _top: 'Top',
            _left: 'Left',
            _enabled: 'Enabled'
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
            backup: {
                title: 'Backups',
                restore: 'Restore',
                size: 'Size',
                date: 'Date',
                failed: 'Backup failed, because the localStorage is full.',
                keepLast: 'Keep last only',
                disableBackup: 'Disable backup',
                enableBackup: 'Check to enable backup'
            },
            timers: {
                title: 'Timers',
                delay: 'Delay',
                repeat: 'Repeat',
                enabled: 'Enabled',
                name: 'Name',
                action: 'Action',
                duplicatedError: "You can not save with this name, because it is already exists in the friendly variable cache. Plase select another one!"
            },
            enterprise: {
                title: 'Enterprise',
                trialTitle: 'Trial mode',
                switchTrial: 'Check to enable trial mode',
                username: 'Username',
                password: 'Password',
                description: 'Try our all round solution, FlexGui Enterprise for free. For further info, please visit our <a href="#">website</a>.'
            },
            project: {
                title: 'Project',
                uploadNote: 'Please note, that uploading the project will overwrite the current one!',
                uploadConfirm: 'Do you want to overwrite the current project?',
                cleanConfirm: 'Do you really want to remove the current project and load a new one?',
                newProject: 'New project',
                createNew: 'Create',
                upload: 'Upload',
                download: 'Download',
                uploadComplete: 'Upload completed!',
                savedToMobile: 'The project file is saved to your root folder: ',
                savedFailed: 'Save failed',
                noteUseMobileMemory: '<i><u><b>Please note:</b></u> browse your built in storage to upload projects!</i>',
                uploadImagesConfirm: 'The project contains images, do you want to overwrite the existing ones?',
                storageMode: {
                    title: 'Project storage',
                    autoUpdate: 'Enable auto project update',
                    autoUpdateSwitch: 'Check to enable automatic project update with ROS',
                    autoUpdateNote: '<b>Please note:</b> Enabled automatic project update can cause instable concurent using for multiple users.'
                }
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
                statLabel: "Performance Monitor",
                statSwitchLabel: "Check to enable Performance Monitor",
                gridSize: 'Gridsize',
                gridSizeNote: 'Please note, that FlexGui will reload if you change this value!',
                gridSizeError: 'The size has to be between 30 and 200',
                forceBelt: 'Force Screen Belt',
                forceBeltSwitchLabel: 'Set to force to show the Screen Belt',
                autoScale: 'Auto scale',
                pinchEnabled: 'Pinch zoom',
                switchPinchEnabled: 'Check here if you want to enable pinch zoom on your mobile device'
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
                changeScriptTitle: 'ChangeScript for @0',
                changeScriptNote: 'You can access to the new and the old value directly, with  <b>\'newValue\'</b> and <b>\'oldValue\'</b> parameters',
                demoAlert: 'Offline mode, no nodes are available',
                nodeUnselected: 'Select a node to list properties.',
                topicOfflineError: "This topic is currently offline, so you can not publish a new value!",
                topicOutOfDateWarning: "This topic's value is not updated from ROS yet. Do you want to publish this new value?"
            },
            conn: {
                title: 'ROS Server Settings',
                description: 'Set the location of the ROS server to use, so you can access the nodes on it. If you want to use FlexGui offline, check the box below.',
                ip: 'IP',
                port: 'Port',
                offlineMode: 'Offline mode',
                offlineModeSwitch: 'Check to disable ROS connection',
                secure: 'Secure mode',
                secureSwitch: 'Check to enable secure mode (WebSocket Security)',
                addons: 'Addons',
                localAddons: 'Skip addon loading from server'
            },
            messenger: {
                title: 'Messenger'
            },
            mirror: {
                title: 'Mirror mode',
                mirrorModeSwitch: 'Check to enable mirror mode',
            },
            theme: {
                title: "Themes",
                theme: 'Theme',
                themeNote: 'Please note, that FlexGui will reload if you change this value!',
            },
            userMode: {
                title: "User mode",
                modeSwitch: "Check this if you want to restrict of usage of your FG screens",
                password: "Administrator password",
                confirmPassword: "Confirm password",
                passwordError: "The two password fields must match!"
            }
        }
    },
    messenger: {
        invalidUsernamePassword: 'Can not login to iVAR messenger. Plase check your username and password.',
        missingLoginData: 'iVAR Messenger can not login. Please set it up in Settings/Messenger.',
        enterMessage: 'Enter message...',
        expertUsername: "Expert username",
        checkToEnableMessenger: "Check to enable built-in messenger",
        messengerEnabled: "Enable messenger"

    },
    popup: {
        title: 'FlexGui Messages'
    },
    timers: {
        alreadyRunningError: 'This timer is already running!',
        disableAll: 'Disable all',
        createNew: 'Create new'
    },
    buttons: {
        start: 'Start',
        stop: 'Stop',
        add: 'Add',
        edit: 'Edit',
        duplicate: 'Duplicate',
        cancel: 'Cancel',
        clear: 'Clear',
        save: 'Save',
        close: 'Close',
        closeAll: 'Close all',
        remove: 'Delete',
        reconnect: 'Reconnect',
        connect: 'Connect',
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
        download: 'Download',
        disable: 'Disable'
    },
    editMode: {
        openBelt: 'Open belt',
        editModeTaken: '<h3>The edit right is taken by someone else.</h3>',
        confirmTakeEditMode: '<h3>Take edit mode confirmation</h3><p>Someone else is editing right now, but only one person can edit at the same time. Do you want to take the edit right?</p>',
        confirmCloseWhenEditing: 'Do you want to leave edit mode?',
        switchLabel: 'Edit mode',
        settings: 'Settings',
        properties: 'Properties',
        snapToGrid: 'Snap to grid',
        resize: 'Resize',
        rotate: 'Rotate',
        multiSelect: 'Multi select',
        unSelect: 'Unselect all',
        undo: 'Undo',
        redo: 'Redo',
        copy: 'Copy',
        cut: 'Cut',
        paste: 'Paste',
        move: 'Move',
    },
    help: {
        label: 'Help',
        off: 'Don\'t show help messages',
        enterprise: {
            header: 'Help for Enterprise Trial',
            content: '<h3>Trial mode</h3><p>With Trial mode you can use all function of FlexGui 4.0 for free. The trial mode requires internet connection.</p><h3>How to use</h3><p>To be able to enable <b>Trial mode</b> you will need to follow these instructions: <ol><li>Register an account on <a href="https://flexgui4.ppm.no">our website</a></li><li>Go to your Profile page</li><li>Request a trial license for FlexGui 4.0</li></ol></p>'
        },
        diagnostics: {
            content: "<p>In diagnostics you can create sequences to test your environment.</p><h4>Create/Edit</h4><p>To create a new item, press the <b>Add new button</b> and follow the insturctions. If you want to edit and already existing item, press the small pen icon in the end of the line. You can also reorder your test sequence by pressing the up and down icons.</p><h4>Run</h4><p>Press <b>Run test</b> button to start the selected tests. You can add/remove items from the sequence by click on the checkbox in front of the test</p>",
            header: "Diagnostics"
        },
        diagnosticsEditor: {
            content: "<p>In test editor you can choose a built in script and set up its parameters or write a custom script.</p><h4>Custom script</h4><i><b><u>Please note:</u></b> use the following variables for optimal result</i><ul><li><b>test.result:</b> thiw will be shown on the UI under the name of your script</li><li><b>srv.testFinished();</b> Call this function when your script finished to be able to jump to the next test.</li><li><b>$rootScope.$apply();</b> call this function, when the script ends if you have any async calls (timeout, interval or e.g. waiting for a ROS event to end)</li></ul>",
            header: "Diagnostics editor"
        },
        screenBelt: {
            header: 'Help for Screen Belt',
            screen: 'Screen',
            screenText: 'On the Screen Belt you can see all the screens of the project. If you single click one, it will be selected. If you double click one, you can edit it\'s properties.',
            newScreen: 'New screen',
            newScreenText: 'You can add a new screen simply by clicking on the ' + ' marked screen at the end of the screen list. You can rename or delete screens by double clicking them.',
            properties: 'Properties belt',
            propertiesText: 'If you drag a Fidget to the Screen Belt, it will jump back to it\'s original position, and open it\'s propertiesBelt.'
        },
        initScript: {
            header: 'Help for Init Script',
            text: 'You can write initialization script here that will run when the project starts up, for example local variable declarations.'
        },
        settings: {
            header: 'Help for Settings Window',
            scale: 'Change screen scaling',
            scaleText: 'You can set the screen scaling on a mobile device with these buttons.',
            scaleNote: 'Please note that on mobile devices you can also set the scaling by pinching, on desktop computers you can use the default resize in the browser.',
            help: 'On-screen help',
            helpText: 'You can switch the <span class="glyphicon glyphicon-question-sign"></span> icons on and off.'
        },
        fidgetBelt: {
            header: 'Help for Fidget Belt',
            fidgets: 'Fidgets',
            fidgetsText: 'You can find all the Fidgets you can use on the Fidget Belt, and drag them onto the screen. Use the scrollwheel on PC or drag on touch screens to see all Fidgets.',
            deleteBelt: 'Delete Belt',
            deleteBeltText: 'If you drag a Fidget back to the Fidget Belt, it will be deleted. Later you can re-add it from the Fidget Belt.'
        },
        loginWindow: {
            header: 'Help for Login Window',
            title: "Login window",
            content: "Please provide user name and password in order to log in as an administrator. As a guest user you can use the FlexGui interface, but you will not be able to make any changes."
        },
        connectionSettings: {
            header: 'Help for ROS Server Settings',
            title: "Connection settings",
            content: "Specify the address of the computer that runs the ROSBridge server to connect to ROS. The standard port is usually 9090."
        },
        nodes: {
            header: 'Help for Nodes',
            title: "Nodes",
            content: "<p>If the connection to the ROSBridge server is set up correctly, the active nodes are listed in the dropdown menu. In order to use the data from ROS topics in FlexGui, check the subscribe next to them. </p><p>By giving the topics and services friendly names, you can access them in your scripts using the @friendlyName syntax.</p>"
        },
        messenger: {
            header: 'Help for Messenger',
            title: "Messenger",
            content: "In order to use the Messenger for chat and video communication please provide your account informations."
        },
        language: {
            header: 'Help for Languages',
            title: "Language",
            content: "You can chose your preferred language. FlexGui will reload when you change this value. In case you don't find the language you like, please contact us in FlexGui.net."
        },
        project: {
            header: 'Help for Project',
            title: "Project",
            content: "You can upload and download project files for easy transportation and backup."
        },
        propertiesWindow: {
            header: 'Help for Properties Window',
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
            header: 'Help for Color Picker',
            title: "Color picker",
            content: "Change the color of the property using this picker listing the most used colors. You can also choose custom colors using their HTML code."
        },
        imageExplorer: {
            header: 'Help for Image Explorer',
            title: "Image Explorer",
            content: "Upload the desired image to one of the image slots in the Upload tab. Select a storage slot first and then specify the location where you want to upload the image from. You can pick an uploaded image to more Image Fidgets or screen backgrounds."
        },
        fidgetGroup: {
            header: 'Help for Fidget Group',
            title: "Fidget Group",
            content: "You can place multiple Fidgets into this container. In a Fidget Group Fidgets can be moved together, keeping their relative layout to each other."
        },
        image: {
            header: 'Help for Image Fidget',
            title: "Image",
            content: "An Image Fidget displays your custom image on a FlexGui screen."
        },
        messenger: {
            header: 'Help for Messenger',
            title: "Messenger login data",
            content: "You can set up the user login data on this screen to be able to use the FlexGui Messenger. Please request these from your Expert Site administrator!"
        },
        mirrorMode: {
            header: 'Help for Mirror Mode',
            content: "Enabling mirror mode will send your live FlexGui screen and local clicks/touches to the iVAR Expert. This way the expert can see your FlexGui and help using click recommendations and the messenger."
        },
        themes: {
            header: 'Help for Themes',
            content: "Click the themes here to change the look of FlexGui, keeping the layout and logic intact. If you need a customized theme, please contact us on FlexGui.net."
        },
        cameraImage: {
            header: 'Help for Camera Image',
            content: "A Camera image Fidget displays your IP camera's video stream.<h5>Source</h5>Setting up the Source property to a .mjpg source will show the video. <h5>Authentication</h5>If your camera is password protected, please provide username and password to the popup window."
        },
        userMode: {
            header: 'User mode',
            content: 'With user mode, you can restrict the usage of your FG screens. <h5>Password</h5>You can setup the password for the administrator mode. The default value is: \"admin\"'
        },
        timers: {
            header: 'Timers',
            content: 'With timers you can manage the used timeouts and intervals. Check <b>repeat</b> to create an interval. An interval will run as long as the repeat is checked or the timeout is stopped. The minimum delay of a timeout is 30ms.'
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
        callError: 'In offline mode you can not make calls.'
    },
    ros: {
        connectionError: 'FlexGui 4.0 is not able to Connect to the ROS server ',
        connectionErrorBody: 'We can not connect to ROS Server or the connection is lost. If you want to try to reconnect, press the <b>Reconnect</b> button, or go to <b>Offline mode</b> and work offline. <br /> For further information, please visit our website\'s <a href="https://www.ppm.no/flexgui4-Home/Index/downloads" target="_blank">donwload</a> section, where you can find more info about the ROS server setup.',
        reconnect: 'Reconnect',
        back: 'Back',
        offlineMode: 'Offline mode',
        demoBody: 'Do you want to keep the <b>current</b> project? Keeping current project will overwrite your offline project!',
        keepProject: 'Keep project',
        discardProject: 'Discard project',
        communicationInitError: 'Communication initialization exception',
        versionIsNotLatest: {
            body: "Your project is not the latest version, do you want to update, which can cause losses in your changes or overwrite the current version?",
            title: "Project version is not the latest",
            overwrite: "Overwrite on server",
            update: "Update mine"
        },
        interfaces: {
            type: 'Type',
            originalName: 'Original name',
            friendlyName: 'Friendly name',
            subscribe: 'Subscribe',
            changeScript: 'Change script',
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
        imageError: 'Only image files can be uploaded, please select a PNG, BMP or JPG file',
        confirmOverwrite: 'Do you want to overwrite an existing image?'
    },
    nachiLink: {
        addVariable: "Add variable",
        connectionsTab: "Connections",
        connectionError: "Can't connect to @0",
        secure: "Secure",
        IP: "IP",
        port: "Port",
        connected: "Connected",
        Name: "Name",
        createNew: "Create new",
        reconnect: "Reconnect",
        zeroConnection: "No direct connections found...",
        nameLocked: "The name is received from the connected FlexGui, cannot be changed"
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
    },
    diagnostics: {
        cancel: "Cancel",
        close: "Close",
        save: "Save",
        editTest: "Edit test",
        newtest: "New test",
        userDefineCheck: "Check this if you want to make an own script",
        name: "Name",
        script: "Script",
        params: "Parameters",
        selected: "Selected",
        tests: {
            stressTest: {
                name: "Stress test",
                description: "Calls a selected service N times",
                params: {
                    n: { description: 'Call the service N times' },
                    servicePath: { description: 'Service path, e.g: /rosapi/publishers' },
                    params: { description: 'Service parameters in JSON format, e.g.: {"paramName": "value"}' },
                    limit: { desciption: 'The max response time should be lower then the given limit.' }
                }
            },
            getTopicRespTime: {
                name: "ROS topics response time",
                description: "Runs the rosapi/topics service and measures the time between the request and the response.",
                params: {
                    limit: { desciption: 'The max response time should be lower then the given limit.' }
                },
            },
            getServiceRespTime: {
                name: "ROS services response time",
                description: "Runs the rosapi/services service and measures the time between the request and the response.",
                params: {
                    limit: { desciption: 'The max response time should be lower then the given limit.' }
                }
            },
            topicUpdateRate: {
                name: "Topic update rate",
                description: "Calculates the average update time of the topics in a selected node",
                params: {
                    nodeName: { description: 'The name of the tested node, e.g. FlexGuiNode' },
                    timeout: { description: 'Length of the measurement in sec' },
                    limit: { desciption: 'The refresh time should be lower then the given limit.' }
                }
            },
            offlineTopics: {
                name: "Offline topics",
                description: "Gets the offline topics in a selected node",
                params: {
                    nodeName: { description: 'The name of the tested node, e.g. FlexGuiNode' }
                }
            },
            serviceCallRespTime: {
                name: 'Service call response time',
                description: "Calls a selected service and measures the time (ms) between the request and the response.",
                params: {
                    servicePath: { description: 'Service path, e.g: /rosapi/publishers' },
                    params: { description: 'Service parameters in JSON format, e.g.: {"paramName": "value"}' },
                    limit: { desciption: 'The max response time should be lower then the given limit.' }
                }
            },
            rosConnection: {
                name: 'ROS connection',
                description: "Check if ROS is connected",
                params: {
                    limit: { desciption: 'The max response time should be lower then the given limit.' }
                }
            }
        },
        resultTitle: "Diagnostics result",
    }
}