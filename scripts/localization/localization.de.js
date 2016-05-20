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
	licensing: {
        notGenerated: "<h3>License is not approved</h3> <p>Please be patient, we will generate your license soon!</p>",
        licenseNotFound: "<h3>Lizenz wurde nicht gefunden</h3>"
                                + "<p>Nach der Registrierung gehen Sie bitte in Ihr <a onclick='window.open(\"@0\", \"_system\");' href='#'>Profil</a> und fordern Sie eine Demo-Lizenz an.</p>",
        licenseExpired: "<h3>Lizenz abgelaufen</h3>"
                                + "<p>Ihre Demo-Lizenz ist abgelaufen!</p>",
        userError: "<h3>Falsche Login-Daten</h3>"
                                + "<h4>Falscher Benutzername und Passwort</h4>"
                                    + "<p>Falls Sie auf der <a onclick='window.open(\"@0\",\"_system\")' href='#'>FlexGui 4.0 Webseite</a> einen Benutzernamen angefordert haben, überprüfen Sie bitte nochmals Benutzername und Passwort.</p>"
                                + "<h4>Benutzer nicht gefunden</h4>"
                                    + "<p>Bitte registrieren Sie sich auf der <a onclick='window.open(\"@1\", \"_system\")' href='#'>FlexGui 4.0 Webseite</a></p><p> Nach der Registrierung gehen Sie bitte auf Ihr <a onclick='window.open(\"@1\",\"_system\")' href='#'>Profil</a> und fordern Sie eine Demo-Lizenz an.</p>"
	},
	wizard: {
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
        emptyList: 'Leere Liste',
        background: 'Hintergrund',
        backgroundColor: 'Hintergrundfarbe',
        selectScreenType: 'Wählen Sie die Screenart'
    },
    project: {
        clearLocal: 'Lokalen Speicher leeren',
        download: 'Download',
        load: 'Load',
        uploadProject: 'Projekt hochladen',
        compare: 'Vergleichen',
        availableProjects: 'Verfügbare Projekte',
        name: 'Name',
        id: 'Id',
        title: 'Projekteinstellungen',
        currentProjectTab: 'Aktuelles Projekt',
        projectBrowserTab: 'Projektbrowser',
        blockMsg: 'Bitte warten...',
        notForThisVersion: "The project's application version (@0) is different than the current one (@1). Do you want to convert it?",
        canNotConvert: "The project is not suitable for the current application version, do you want to create a new one?",
        loading: 'Loading project...',
        saveError: "Speicherung des Projekts fehlgeschlagen. Sie können fortfahren und diese Nachricht mit Cancel deaktivieren, oder mit Ok ein weiteres mal versuchen das Projekt zu speichern."
    },
    fidgets: {
        extend: {
            variableSelector: {
                subStart: 'Subscription für Variable @0 von @1 Node gestartet',
                subEnd: 'Subscription für Variable @0 von @1 Node beendet',
                subFailed: 'Subscription fehlgeschlagen',
                unsubStart: 'Unubscription für Variable @0 von @1 Node gestartet',
                unsubEnd: 'Unubscription für Variable @0 von @1 Node beendet',
                unsubFailed: 'Unubscription fehlgeschlagen',
                subButton: 'Subscribe',
                unSubButton: 'Unsubscribe',
                refreshButton: 'Aktualisieren',
                title: 'Neue Variable zu @0 Node hinzufügen'
            }
        },
        messenger: 'Messenger',
        progressBar: 'Ladebalken',
        fidgetGroup: 'Fidgetgruppe',
        button: 'Button',
        checkBox: 'Kontrollbox',
        textInput: 'Texteingabe',
        variableSelector: 'Variablen',
        text: 'Text',
        scrollableText: 'Scrollbarer Text',
        slider: 'Regler',
        radioButton: 'Radiobutton',
        fullgauge: 'Anzeige',
        boolean: 'Boolean',
        image: 'Bild',
        indicatorLamp: 'Indikatorlampe',
        road: 'Weg',
        fence: 'Zaun',
        camera: 'Kamera',
        device: 'Gerät',
        genericObstacle: 'Hindernis',
        endOfWay: 'Sackgasse',
        cameraImage: 'Kamerabild',
        properties: {
            hasScreenBeltValues: {
                show: 'Show',
                hide: "Hide"
            },
            _width: 'Breite',
            _height: 'Höhe',
            _angle: 'Winkel',
            _value: 'Wert',
            _color: 'Farbe',
            _text: 'Text',
            _fontSize: 'Schriftgröße',
            _min: 'Minimum',
            opacity: 'Deckkraft',
            _max: 'Maximum',
            backgroundColor: 'Hintergrundfarbe',
            backgroundType: 'Hintergrundart',
            image: "Bild",
            color: "Farbe",
            _step: 'Schritt',
            _precision: 'Präzission',
            _options: 'Optionen',
            _angleOffset: 'Winkelversatz',
            _angleArc: 'Winkelanzeige',
            _lock: 'Sperre',
            scale: 'Skala',
            source: 'Quelle',
            _onColor: 'Farbe an',
            _offColor: 'Farbe aus',
            _blinking: 'Blinken',
            _blinkPeriod: 'Blinkfrequenz',
            _screenLink: 'Screenverknüfpung',
            _borderColor: 'Rahmenfarbe',
            _borderWidth: 'Rahmenbreite',
            _fontColor: 'Schriftfarbe',
            onClick: 'Bei Betätigung',
            name: 'Name',
            _node: 'ROS-Node-Name',
            hasScreenBelt: "Has screen belt"
        }
    },
    properties: {
        title: 'Eigenschaften von @0',
        aspectFit: 'Größe beibehalten',
        aspectCrop: 'Ausschnitt beibehalten',
        stretch: 'Strecken',
        robot: 'Roboter',
        plc: 'SPS',
        onlyForSingleFidget: 'Der Properties-Belt ist immer nur für ein einzelnes Fidget verfügbar!'
    },
    settings: {
        title: 'FlexGui Einstellungen',
        reloadLoginAlert: 'FlexGui mit den gleichen Daten neu laden?',
        reloadSettingsAlert: 'FlexGui neu laden, um die aktuellen Einstellungen zu benutzen?',
        loadOnNextStartNote: 'FlexGui wird diese Einstellungen beim nächsten start benutzen',
        tabs: {
            enterprise: {
                title: 'Enterprise',
                trialTitle: 'Demomodus',
                switchTrial: 'Demomodus an',
                username: 'Benutzername',
                password: 'Passwort',
                description: 'Probieren Sie unsere umfassende Lösung, FlexGui Enterprise, gratis. Für mehr Informationen, besuchen Sie unsere <a href="#">Webseite</a>.'
            },
            project: {
                title: 'Projekt',
                uploadNote: 'Bitte beachten Sie, dass Sie beim hochladen das aktuelle Projekt überschreiben!',
                uploadConfirm: 'Möchten Sie das aktuelle Projekt überschreiben?',
                cleanConfirm: 'Möchten Sie wirklich das aktuelle Projekt zu entfernen und eine neue laden?',
                newProject: 'Neues Projekt',
                createNew: 'Schaffen',
                upload: 'Upload',
                download: 'Download',
                uploadComplete: 'Upload fertig!',
                savedToMobile: 'Die Projektdatei ist in Ihrem Root-Ordner gespeichert: ',
                savedFailed: 'Speichern fehlgeschlagen',
                noteUseMobileMemory: '<i><u><b>Bitte beachten Sie:</b></u> navigieren Sie in Ihrem Ordnerverzeichnis um Projekte hochzuladen!</i>'
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
                onScreenHelpSwitch: 'Bildschirmhilfe an',
                statLabel: "Performance-Monitor",
                statSwitchLabel: "Performance-Monitor an",
                gridSize: 'Rastergröße',
                gridSizeNote: 'Bitte beachten Sie, dass FlexGui neu geladen wird, wenn Sie diesen Wert verändern!',
                gridSizeError: 'Der Wert muss zwischen 30 und 200 liegen'
            },
            initScript: {
                title: 'Initialisierungsskript',
                note: 'Fügen Sie hier das Initialisierungsskript ein',
                autoInitException: 'autoInit-Exception',
                initException: 'Fehler während der Initialisierung'
            },
            nodes: {
                title: 'ROS-Knoten',
                search: 'Suchen...',
                detailsOf: 'Details von @0',
                searchResult: 'Suchergebnis',
                tooShortError: 'Zu kurze Suchanfrage',
                noResultMsg: 'Keine Ergebnisse für: \'@0\'',
                changeScriptTitle: 'ChangeScript für @0',
                changeScriptNote: 'Sie können den alten und neuen Wert direkt mit \'newValue\' und \'oldValue\' Parametern.',
                demoAlert: 'Demomodus - keine Knoten verfügbar',
                nodeUnselected: 'Wählen Sie einen Knoten, um die Eigenschaften anzuzeigen.'
            },
            conn: {
                title: 'ROS-Server Einstellungen',
                description: 'Geben Sie die IP des ROS-Servers an um die aktiven Nodes zu sehen. Wenn Sie FlexGui offline benutzen möchten, setzen Sie bitte unten den Haken.',
                ip: 'IP',
                port: 'Port',
                demoMode: 'Demomodus',
                demoModeSwitch: 'Haken für Demomodus',
                secure: 'Sicherer Modus',
                secureSwitch: 'Sicherer Modus an'
            },
            messenger: {
                title: 'Messenger'
            },
            mirror: {
                title: 'Spiegelmodus',
                mirrorModeSwitch: 'Spiegelmodus an',
            },
            theme: {
                title: "Themes",
                theme: 'Theme',
                themeNote: 'Bitte beachten Sie, dass FlexGui neu geladen wird, wenn Sie diesen Wert verändern!',
            }
        }
    },
    messenger: {
        invalidUsernamePassword: 'Verbindung zum Messanger nicht möglich. Bitte überprüfen Sie Benutzername und Kennwort',
        missingLoginData: 'iVAR-Messenger kann keine Verbindung aufbauen. Bitte richten Sie diese in den Einstellungen/Messanger ein.',
        enterMessage: 'Nachricht eingeben...',
        expertUsername: "Experten-Benutzername"
    },
    popup: {
        title: 'FlexGui Nachrichten'
    },
    buttons: {
        add: 'Add',
        duplicate: 'Duplikat',
        cancel: 'Abbruch',
        clear: 'Leeren',
        save: 'Speichern',
        close: 'Schließen',
        closeAll: 'Alle schließen',
        remove: 'Löschen',
        reconnect: 'Wiederverbinden',
        select: 'Auswählen',
        removeBackground: 'Entfernen',
        pick: 'Wählen...',
        toBack: 'In den Hintergrund',
        backward: 'Nach hinten bringen',
        toFront: 'In den Vordergrund',
        forward: 'Nach vorne bringen',
        moveUp: 'nach oben',
        moveDown: 'nach unten',
        addScreen: 'neuer Screen...',
        addNormalScreen: 'Normaler Screen',
        addFactoryScreen: 'Fabrik-Screen',
        upload: 'Upload',
        download: 'Download'
    },
    editMode: {
        openBelt: 'Open belt',
        editModeTaken: '<h3>The edit right is taken by someone else.</h3>',
        confirmTakeEditMode: '<h3>Take edit mode confirmation</h3><p>Someone else is editing right now, but only one person can edit at the same time. Do you want to take the edit right?</p>',
        confirmCloseWhenEditing: 'Do you want to leave edit mode and close FlexGui?',
        switchLabel: 'Editmodus',
        settings: 'Einstellungen',
        properties: 'Eigenschaften',
        snapToGrid: 'Gitter',
        resize: 'Größe ändern',
        rotate: 'Rotieren',
        multiSelect: 'Multi-Select',
        unSelect: 'Alle abwählen',
        undo: 'Rückgängig',
        redo: 'Widerholen',
        copy: 'Kopieren',
        cut: 'Ausschneiden',
        paste: 'Einfügen',
        move: 'Bewegen',
    },
    help: {
        label: 'Hilfe',
        off: 'Bitte keine Hilfenachrichten anzeigen',
        enterprise: {
			header: 'Hilfe für Enterprise-Demo',
            content: '<h3>Demomodus</h3><p>Im Demomodus können Sie alle Funktionen von FlexGui 4.0 kostenlos testen. Der Demomodus setzt eine aktive Internetverbindung voraus.</p><h3>Anleitung</h3><p>Um den <b>Demomodus</b> zu aktivieren, müssen Sie folgende Schritte durchführen: <ol><li>Legen Sie einen Account auf unserer <a href="https://flexgui4.ppm.no">unserer Webseite</a> an</li><li>Gehen Sie auf Ihre Profilseite</li><li>Fordern Sie eine Demo-Lizenz für FlexGui 4.0 an</li><li>Geben Sie in den Einstellungen Benutzername und Passwort an</li></ol></p>'
        },
        screenBelt: {
			header: 'Hilfe für Screen Belt',
            screen: 'Screen',
            screenText: 'Auf dem Screen Belt können sie alle Fenster des Projekts sehen. Wenn Sie auf einen klicken, wird es ausgewählt. Wenn Sie doppelt klicken, können Sie die Eigenschaften bearbeiten.',
            newScreen: 'Neuer Screen',
            newScreenText: 'Sie können weitere Fenster hinzufügen, indem Sie auf das ' + '-Symbol am Ende der Fensterliste klicken. Sie können die Fenster benennen oder entfernen indem Sie auf doppelt auf sie klicken.',
            properties: 'Properties belt',
            propertiesText: 'Wenn Sie ein Fidget auf den Screen Belt ziehen, springt es zurück zu seiner Ursprungsposition und seine Eigenschaften werden geöffnet.'
        },
        initScript: {
			header: 'Hilfe für Initialisierungsskript',
            text: 'Sie können hier ein Initialisierungsskript erzeugen, dass ausgeführt wird, wenn das Projekt gestartet wird. Zum Beispiel lokale Variablendeklarationen.'
        },
        settings: {
			header: 'Hilfe für Einstellungen',
            scale: 'Fenstergröße ändern',
            scaleText: 'Auf einem mobilen Gerät können Sie die Fenstergröße mit diesen Knöpfen verändern.',
            scaleNote: 'Bitte beachten Sie, dass die Größe der Fenster auf mobilen Geräten durch Multi-touch verändert werden können. Auf Desktop-Computern können Sie die Zoom-Funktion Ihres Browsers verwenden.',
            help: 'Bildschirmhilfe',
            helpText: 'Sie können die <span class="glyphicon glyphicon-question-sign"></span> Icons an- und ausschalten.'
        },
        fidgetBelt: {
			header: 'Hilfe für Fidget Belt',
            fidgets: 'Fidgets',
            fidgetsText: 'Sie können alle Fidgets im Fidget Belt finden und diese in das Fenster ziehen.',
            deleteBelt: 'Belt löschen',
            deleteBeltText: 'Wenn Sie ein Fidget zurück auf den Fidget Belt ziehen, wird dieses gelöscht. Später können Sie es wieder vom Fidget Belt hinzufügen.'
        },
        loginWindow: {
			header: 'Hilfe für Login-Fenster',
            title: "Login Fenster",
            content: "Bitte geben Sie Login und Passwort an um sich als Administrator einzuloggen. Als Gast können Sie das FlexGui-Interface benutzen, jedoch keine Änderungen vornehmen."
        },
        connectionSettings: {
			header: 'Hilfe für Verbindungseinstellungen',
            title: "Verbindungseinstellungen",
            content: "Geben Sie die IP des Computers an, auf dem der ROSbrdige-Server läuft. Der Standartport is 9090."
        },
        nodes: {
			header: 'Hilfe für ROS-Knoten',
            title: "ROS-Knoten",
            content: "Sofern die Verbindung zum ROSbrdige-Server erfolgreich war, werden die aktiven ROS-Knoten im Dropdown-Menü angezeigt. Um die Daten von Topics in FlexGui zu benutzen, können Sie durch das Setzen des Checkmarks und Umbenennung der Variable subscribt werden."
        },
        messenger: {
			header: 'Hilfe für Messenger',
            title: "Messenger",
            content: "Um den Messenger für Video und Chatnachrichten zu benutzen, geben Sie bitte Ihre Accountinformationen an."
        },
        language: {
			header: 'Hilfe für Sprache',
            title: "Sprache",
            content: "Sie können Ihre bevorzugte Sprache auswählen. FlexGui wird neu geladen, wenn Sie diesen Wert verändern."
        },
        project: {
			header: 'Hilfe für Projekt',
            title: "Projekt",
            content: "Um aktive Projekte zu sichern können Sie diese hoch- und runterladen."
        },
        propertiesWindow: {
			header: 'Hilfe für Eigenschaften',
            title: "Eigenschaften",
            content: "<p>Hier können die Eigenschaften der Fidgets geändert werden. Jedes Fidget hat bestimmte Elemente, die geändert werden können.</p><h5>on Click help</h5><p> Fals ein Fidget eine \"bei Betätigung\"-Eigenschaft hat, kann ein Skript definiert werden, dass ausgeführt werden wenn der Benutzer auf das Fidget klickt</p>"
                        + "<h5>Positionsbuttons</h5>"
                        + "<p>Die Positionsbuttons können für das Arrangieren überlappender Fidgets verwendet werden <br />"
                        + "In den Hintergrund: Das Fidget wird auf die niedrigste Ebene des Screens verschoben <br />"
                        + "Nach hinten bringen: Das Fidget wird eine Ebene nach unten verschoben <br />"
                        + "In den Fordergrund: Das Fidget wird auf die höchste Ebene des Screens verschoben <br />"
                        + "Nach vorne bringen: Das Fidget wird eine Ebene nach oben verschoben</p> <br />"
        },
        colorPick: {
			header: 'Hilfe für Farbauswahl',
            title: "Farbwahl",
            content: "Das Element erscheint in der Farbe, die Sie von der Farbpalette auswählen"
        },
        imageExplorer: {
			header: 'Hilfe für Bilder-Explorer',
            title: "Bilder-Explorer",
            content: "Laden Sie das gewünschte Bild in einen der Slots im Upload-Reiter. Wählen Sie zunächst einen Slot und geben Sie anschließend den Pfad des gewünschten Bildes an"
        },
        fidgetGroup: {
			header: 'Hilfe für Fidgetgruppe',
            title: "Fidgetgruppe",
            content: "Platzieren Sie mehrere Fidgets in diesem Kontainer. Die Fidgets werden als Einheit bewegt"
        },
        image: {
			header: 'Hilfe für Bild-Fidget',
            title: "Bild",
            content: "Wählen Sie ein Bild, dass auf dem FlexGui-Screen gezeigt werden soll"
        },
        messenger: {
			header: 'Hilfe für Messenger',
            title: "Messenger",
            content: "Kommunizieren Sie mit einem remote expert. Geben Sie die Benutzerinformationen an indem Sie zu Settings - Messenger im Edit belt navigieren"
        },
        mirrorMode: {
			header: 'Hilfe für Spiegelmodus',
			//title: "Spiegelmodus"
            content: "Wenn Sie den Spiegelmodus aktivieren, werden Screenshots und Mausklicks an die iVAR Expert Site gesendet. Der Experte kann Klickvorschläge senden und dem Benutzer bei der Bedienung von FlexGui 4.0 helfen"
        },
        themes: {
			header: 'Hilfe für Themes',
			//title: "Themes"
            content: "Themes is ein Addon für FlexGui 4.0 und erlaub es dem Benutzer die Farbschemen zu ändern."
        },
        cameraImage: {
			header: 'Hilfe für Kamerabild-Fidget',
			//title: "Kamerabild-Fidget"
            content: "Ein Kamerabild-Fidget zeigt den Stream Ihrer IP-Kamera.<h5>Quelle</h5> Mit dem Einstellen der Quelle auf eine .mjpg-Quelle sehen Sie das Video. <h5>Anmeldung</h5> Sofern Ihre Kamera passwortgeschützt ist, geben Sie bitte die Accountinformationen im Popup-Fenster ein."
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
		connectionError: 'FlexGui kann sich nicht mit dem ROS-Server verbinden',
        connectionErrorBody: 'Wir können die Verbindung zum ROS-Server nicht aufbauen oder die Verbindung ist unterbrochen. Wenn Sie wiederverbinden möchten klicken Sie deb <b>Wiederverbinden</b>-Button, oder wechseln Sie in den <b>Demomodus</b> um offline zu arbeiten.',
        reconnect: 'Wiederverbinden',
		back: 'Zurück',
		demoMode: 'Demomodus',
		demoBody: 'Möchten Sie das <b>aktuelle</b> Projekt behalten? Wenn Sie das aktuelle Projekt behalten, wird dies das offline Projekt überschreiben!',
		keepProject: 'Projekt behalten',
		discardProject: 'Projekt verwerfen',
		communicationInitError: 'Fehler bei der Kommunikationsinitialisierung',
        interfaces: {
            type: 'Typ',
            originalName: 'ursprünglicher Name',
            friendlyName: 'freundlicher Name',
            subscribe: 'Subscribe',
            changeScript: 'Skript ändern',
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
        imageError: 'Es können nur Bilddateien hochgeladen werden, bitte wäheln Sie eine PNG, BMP oder JPG-Datei'
    },
    timeago: {
        settings: {
            strings: {
                prefixAgo: null,
                prefixFromNow: null,
                suffixAgo: 'ago',
                suffixFromNow: 'von jetzt',
                inPast: 'jeden Augenblick',
                seconds: 'weniger als eine Minute',
                minute: 'ungefähr eine Minute',
                minutes: '%d Minuten',
                hour: 'ungefähr eine Studne',
                hours: 'ungefähr %d Stunden',
                day: 'ein Tag',
                days: '%d Tage',
                month: 'ungefähr einen Monat',
                months: '%d Monate',
                year: 'ungefähr ein Jahr',
                years: '%d Jahre',
                wordSeparator: ' ',
                numbers: []
            }
        }
    }
}
