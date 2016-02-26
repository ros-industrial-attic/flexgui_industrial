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
 
//add german lang to the languages
localization.languages.push('de');

//german translation
localization.items.de = {
    flag: 'scripts/localization/flags/de.GIF',
    language: 'Deutsch',
    general: {
        emptyList: 'Leere Liste',
        background: 'Hintergrund',
        backgroundColor: 'Hintergrundfarbe',
        selectScreenType: 'Select screen type'
    },
    project: {
        clearLocal: 'Clear local',
        download: 'Download',
        load: 'Load',
        uploadProject: 'Upload Projekt',
        compare: 'Vergleichen',
        availableProjects: 'verfügbare Projekte',
        name: 'Name',
        id: 'Id',
        title: 'Projekteinstellungen',
        currentProjectTab: 'aktuelles Projekt',
        projectBrowserTab: 'Projektbrowser',
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
        progressBar: 'Ladebalken',
        fidgetGroup: 'Fidget Group',
        button: 'Button',
        checkBox: 'Kontrollkästchen',
        textInput: 'Texteingabe',
        variableSelector: 'Variables',
        text: 'Text',
        scrollableText: 'scrollbarer Text',
        slider: 'Schieberegler',
        radioButton: 'Radio button',
        gauge: 'Anzeige',
        boolean: 'Boolean',
        image: 'Bild',
        indicatorLamp: 'Indikatorlampe',
        road: 'Straße',
        fence: 'Zaun',
        camera: 'Kamera',
        device: 'Gerät',
        genericObstacle: 'Hindernis',
        endOfWay: 'Sackgasse',
        cameraImage: 'Camera image',
        properties: {
            _width: 'Breite',
            _height: 'Höhe',
            _angle: 'Winkel',
            _value: 'Wert',
            _color: 'Farbe',
            _text: 'Text',
            _fontSize: 'Schriftgröße',
            _min: 'Minimum',
            opacity: 'Opacity',
            _max: 'Maximum',
            backgroundColor: 'Background color',
            image: "Image",
            color: "Color",
            _step: 'Schritt',
            _precision: 'Präzission',
            _options: 'Optionen',
            _angleOffset: 'Winkelversatz',
            _angleArc: 'Angle arc',
            _lock: 'Schloss',
            scale: 'Skala',
            source: 'Source',
            _onColor: 'Farbe an',
            _offColor: 'Farbe aus',
            _blinking: 'Blinken',
            _blinkPeriod: 'Blinkgeschwindigkeit',
            _screenLink: 'Screen link',
            _borderColor: 'Rahmenfarbe',
            _fontColor: 'Font color',
            onClick: 'bei Betätigung',
            name: 'Name',
            _node: 'ROS Node name'
        }
    },
    properties: {
        title: 'Eigenschaften von @0',
        aspectFit: 'Größe beibehalten',
        aspectCrop: 'Ausschnitt beibehalten',
        stretch: 'strecken',
        robot: 'Roboter',
        plc: 'SPS',
        onlyForSingleFidget: 'The properties belt is only available for only one fidget at once!'
    },
    settings: {
        title: 'FlexGui Einstellungen',
        reloadLoginAlert: 'FlexGui mit den gleichen Daten neu laden?',
        reloadSettingsAlert: 'FlexGui neu laden, um die aktuellen Einstellungen zu benutzen?',
        loadOnNextStartNote: 'FlexGui wird diese Einstellungen beim nächsten start benutzen',
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
                title: 'Sprache',
                languageSelectNote: 'Bitte beachten Sie, dass FlexGui neu geladen wird, wenn Sie diesen Wert verändern!',
            },
            general: {
                title: 'Allgemein',
                screenScale: 'Bildschirmskala verändern',
                small: 'Klein',
                medium: 'Mittel',
                large: 'Groß',
                onScreenHelp: 'Bildschirmhilfe',
                onScreenHelpSwitch: 'Haken für Bildschirmhilfe',
                statLabel: "Statistics",
                statSwitchLabel: "Check to show statistic chart",
            },
            initScript: {
                title: 'Initialisierungsskript',
                note: 'Fügen Sie hier das Initialisierungsskript ein',
                autoInitException: 'autoInit Ausnahme',
                initException: 'Fehler während der Initialisierung'
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
                title: 'Verbindungseinstellungen',
                ip: 'IP',
                port: 'Port',
                demoMode: 'Demomodus',
                demoModeSwitch: 'Haken für Demomodus'
            },
            messenger: {
                title: 'Messenger'
            },
            theme: {
                title: "Themes",
                theme: 'Thema',
                themeNote: 'Bitte beachten Sie, dass FlexGui neu geladen wird, wenn Sie diesen Wert verändern!',
            },
            cameraImage: {
                content: "A Camera image Fidget displays your IP camera's video stream.<h5>Source</h5>Setting up the Source property to a .mjpg source will show the video. <h5>Authentication</h5>If your camera is password protected, please provide username and password to the popup window."
            }
        }
    },
    messenger: {
        invalidUsernamePassword: 'Verbindung zum Messanger nicht möglich. Bitte überprüfen Sie Benutzername und Kennwort',
        missingLoginData: 'iVAR Messenger kann keine Verbindung aufbauen. Bitte richten Sie diesen in den Einstellungen/Messanger auf.',
        enterMessage: 'Enter message...',
        expertUsername: "Expert username"
    },
    popup: {
        title: 'FlexGui Nachrichten'
    },
    buttons: {
        cancel: 'Abbruch',
        clear: 'Clear',
        save: 'Speichern',
        close: 'Schließen',
        closeAll: 'Alle Schließen',
        remove: 'Löschen',
        reconnect: 'Wiederverbinden',
        select: 'Auswählen',
        removeBackground: 'Entfernen',
        pick: 'Wählen...',
        toBack: 'Send to back',
        backward: 'Send backward',
        toFront: 'Bring to front',
        forward: 'Bring forward',
        moveUp: 'nach oben',
        moveDown: 'nach unten',
        addScreen: 'neues Fenster...',
        addNormalScreen: 'Normalfenster',
        addFactoryScreen: 'Fabrikfenster',
        upload: 'Upload',
        download: 'Download'
    },
    editMode: {
        switchLabel: 'Editierungsmodus',
        settings: 'Einstellungen',
        properties: 'Eigenschaften',
        multiSelect: 'Multi select',
        unSelect: 'alle deselektieren',
        undo: 'Rückgängig',
        redo: 'Widerholen',
        copy: 'Kopieren',
        cut: 'Ausschneiden',
        paste: 'Einfügen'
    },
    help: {
        label: 'Hilfe',
        off: 'Bitte keine Hilfenachrichten anzeigen',
        screenBelt: {
            screen: 'Screen',
            screenText: 'Auf dem Sreen Belt können sie alle Fenster des Projekts sehen. Wenn Sie auf einen klicken, wird es ausgewählt. Wenn Sie doppelt klicken, können Sie die Eigenschaften bearbeiten.',
            newScreen: 'Neues Fenster',
            newScreenText: 'Sie können weitere Fenster hinzufügen, indem Sie auf das ' + '-Symbol am Ende der Fensterliste klicken. Sie können die Fenster benennen oder entfernen indem Sie auf doppelt auf sie klicken.',
            properties: 'Properties belt',
            propertiesText: 'Wenn Sie ein Fidget auf den Screen Belt ziehen, springt es zurück zu seiner Ursprungsposition und seine Eigenschaften werden geöffnet.'
        },
        initScript: {
            text: 'Sie können hier ein Initialisierungsskript erzeugen, dass ausgeführt wird, wenn das Projekt gestartet wird. Zum Beispiel lokale Variablendeklarationen.'
        },
        settings: {
            scale: 'Fenstergröße ändern',
            scaleText: 'Auf einem mobilen Gerät können Sie die Fenstergröße mit diesen Knöpfen verändern.',
            scaleNote: 'Bitte beachten Sie, dass die Größe der Fenster auf mobilen Geräten durch Multi-touch verändert werden können. Auf Desktop-Computern können Sie die Zoom-Funktion Ihres Browsers verwenden.',
            help: 'Bildschirmhilfe',
            helpText: 'Sie können die <span class="glyphicon glyphicon-question-sign"></span> Icons an- und ausschalten.'
        },
        fidgetBelt: {
            fidgets: 'Fidgets',
            fidgetsText: 'Sie können alle Fidgets im Fidget Belt finden und diese in das Fenster ziehen.',
            deleteBelt: 'Belt löschen',
            deleteBeltText: 'Wenn Sie ein Fidget zurück auf den Fidget Belt ziehen, wird dieses gelöscht. Später können Sie es wieder vom Fidget Belt hinzufügen.'
        },
        loginWindow: {
            title: "Login window",
            content: "Please provide login and password in order to log in as an admin. As a guest user you can use the FlexGui interface but you will not be able to make any changes"
        },
        connectionSettings: {
            title: "Connection settings",
            content: "Specify the IP of the computer that runs the ROSbridge-Server. The standard-Port is 9090"
        },
        nodes: {
            title: "Nodes",
            content: "If the connection to the ROSbridge-server is setup correctly, the active nodes are listed in the dropdown menu. In order to use the data from Topics in FlexGui they can be accessed by checking the Subscribe checkbox and renaming the variables"
        },
        messenger: {
            title: "Messenger",
            content: "In order to use the Messenger for chat and video communication please provide your account informations."
        },
        language: {
            title: "Language",
            content: "You can chose your preferred language. FlexGui will reload when you change this value"
        },
        project: {
            title: "Project",
            content: "You can upload and download project files for easy transportation and backup."
        },
        propertiesWindow: {
            title: "Properties window",
            content: "<p>The properties of the Fidget can be changed here. Every Fidget has a custom set of elements to change.</p><h5>on Click help</h5><p>If a Fidget has an on Click property, a script can be set which is being executed when the user clicks on the Fidget</p>"
                    + "<h5>Positioning buttons</h5>"
                    + "<p>The positioning buttons are fore arranging several overlapping Fidgets <br />"
                    + "Send to back: The Fidget will be sent to the lowest layer of the screen <br />"
                    + "Send backwards: The Fidget will be sent one layer down <br />"
                    + "Bring to front: The Fidget will be sent to the topmost layer of the screen <br />"
                    + "Bring forward: The Fidget will be sent one layer up</p> <br />"
        },
        colorPick: {
            title: "Color pick",
            content: "The element will appear in the color you pick from the color palette"
        },
        imageExplorer: {
            title: "Image Explorer",
            content: "Upload the desired image to one of the image slots in the Upload tab. Select a slot first and then specify the location where to upload the image from. Select the desired in the Images tab such that it appears on the screen belt."
        },
        fidgetGroup: {
            title: "Fidget Group",
            content: "Place multiple Fidgets into this container. Fidgets are moved in one unit"
        },
        image: {
            title: "Image",
            content: "Select an image to be displayed on the FlexGui Screen"
        },
        messenger: {
            title: "Messenger",
            content: "Communicate with a remote expert. Set up the messenger user information first by navigating to Settings - Messenger in the Edit belt"
        },
        themes: {
            content: "Themes is an addon for FlexGui 4.0 and enables the user to change color themes."
        }
    },
    login: {
        login: 'Login',
        username: 'Benutzername',
        password: 'Passwort',
        guest: 'Gast',
        logout: 'Logout',
        fullScreen: 'Vollbild',
        loginError: 'Falscher Benutzername oder falsches Passwort',
        logoutSuccess: 'Logout erfolgreich'
    },
    demo: {
        callError: 'Im Demo-Modus können Sie keine Anrufe tätigen.',
        subscribeError: 'Im Demo-Modus können Sie nicht subscriben/unsubscriben'
    },
    ros: {
        connectionError: 'Beim Verbinden mit dem Server ist ein Problem aufgetreten. ',
        communicationInitError: 'Ausnahme bei der Kommunikationsinitialisierung',
        interfaces: {
            type: 'Typ',
            originalName: 'ursprünglicher Name',
            friendlyName: 'freundlicher Name',
            subscribe: 'Subscribe',
            notYetImplementedError: 'Noch nicht implementiert',
            dupeError: 'Ein anderes Interface hat den selben freundlichen Namen.'
        }
    },
    images: {
        title: 'Gespeicherte Bilder',
        imagesTabTitle: 'Bilder',
        uploadTabTitle: 'Upload',
        resizeAlert: 'Das Bild wird auf max. 1024x768 verkleinert',
        selectSlot: 'Wählen Sie den Slot',
        selectFile: 'Datei wählen',
        blockMsg: 'Bild wird hochgeladen',
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
