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
    starting: {
        downloadAddons: "Loading addons... ",
        connectToRos: "Connecting to ROS Server",
        hideConnect: "Hide"
    },
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
	    unknownWizard: "<p>You have scripts, which won't run in this version: </p>@0<p><br/>For more information, please visit our <a target='_blank' href='https://www.ppm.no/flexgui4-Home/Index/pricing'>website</a></p>",
	    addScriptTemplate: "Add script template",
	    output: "Output code",
	    param: "Parameters",
	    select: "Select wizard template",
	    title: "Script template wizard",
	    templates: {
	        createTopic: {
	            title: "Topic erstellen",
	            help: "Erstellt und optinal subscribt ein Topic mit einem definierten Typ, Namen und Freundlichem Namen. Der neue Topic wird den '/wizard/[name]' Pfad haben.",
	            params: {
	                name: "Name",
	                type: "Typ",
	                subscribe: "Subscribe",
	                friendlyName: "Freundlicher Name",
	                onChange: "On change-Skript",
	            }
	        },
	        changeScreen: {
	        	title: "Screen wechseln",
	        	help: "Wechselt den aktuellen Screen zu dem ausgewählten.",
	        	params: {
	        		screen: "Screen",
	        	},
	        	error: "Error! Es ist nicht möglich zu einem nicht existierenden Screen zu wechseln: ",
	        },
	        connectorVariable: {
	        	title: "Verbindungs-Node Variable: Initialisierung",
	        	help: "Diese Vorlage handhabt die ausgewählte Variable einer Node automatisch. Sie subscribt und erstellt die notwendigen lokalen Variablen automatisch. Es wird empfohlen dies in das Init-Skript zu integrieren.",
	        	params: {
	        		node: "Node",
	        		variable: "Variable",
	        		friendlyName: "Friendly name",
	        	}
	        },
	        getConnectorVariable: {
	        	title: "Verbindungs-Node Variable: Wert ermitteln",
	        	help: "Diese Vorlage ermittelt den aktuellen Wert einer ausgewählten Variable einer Node. Es wird empfohlen dies in die Eigenschaften eines Fidgets zu integrieren",
	        	params: {
	        		node: "Node",
	        		variable: "Variable",
	        	}
	        },
	        setConnectorVariable: {
	        	title: "Verbindungs-Node Variable: neuen Wert setzen",
	        	help: "Diese Vorlage setzt die lokalen Daten einer Variable einer Nodde auf einen neuen Wert und sendet disen an ROS. Es wird empfohlen dies in ein 'onClick'-Event oder ein button Fidget zu integrieren.",
	        	params: {
	        		node: "Node",
	        		variable: "Variable",
	        		value: "Neuer Wert",
	        		operation: "Handlung",
	        	}
	        },
	        getReadyConnectorVariable: {
	        	title: "Connector node's variable: get ready",
	        	help: "This template returns true if a node's selected variable is ready to write. It is recommended to put this to a property of a Fidget",
	        	params: {
	        		node: "Node",
	        		variable: "Variable"
	        	}
	        },
	        autoDefine: {
	        	title: "Definiert eine Variable sofern undefieniert",
	        	help: "Diese Vorlage weist der Variable einen Wert zu, sofern die Variable undefiniert ist. Sollte die Variable schon definiert sein, geschieht nichts.",
	        	params: {
	        		variable: "Variable",
	        		value: "Wert",
	        	}
	        },
	        popup: {
	        	title: "Popup-Nachricht zeigen",
	        	help: "Diese Vorlage lässt eine Popup-Nachricht mit Text zeigen",
	        	params: {
	        		message: "Nachricht",
	        		type: "Typ",
	        	}
	        },
	        timeout: {
	        	title: "Verzögerungsskript",
	        	help: "Diese Vorlage lässt ein Skript verzögert starten",
	        	params: {
	        		timeout: "Verzögerung (ms)",
	        		type: "Function",
                    name: "Name"
	        	}
	        },
	        setFunction: {
	        	title: "Eine Funktion definieren",
	        	help: "Die Vorlage definiert eine selbsterstellte Funktion. Die Funktion kann später in FlexGui über die 'Funktion aufrufen'-Vorlage aufgerufen werden.",
	        	params: {
	        		name: "Name der Funktion",
	        		type: "Funktion",
	        	}
	        },
	        publishTopic: {
	            title: "Topic publishen",
	            help: "Ein Wert auf einen Topic publishen. Sofern das Topic nicht exisitiert, weisen Sie das Topic zu und publishen Sie den Wert.",
	            params: {
	                path: "Pfad",
	                value: "Wert",
	                type: "Typ"
	            }
	        },
	        callFunction: {
	        	title: "Funktion aufrufen",
	        	help: "Diese Vorlage ruft eine selbsterstellte Funktion auf. Sie können jede Funktion, die Sie vorher definiert haben, auswählen.",
	        	params: {
	        		name: "Name der Funktion",
	        	},
	        	error: "Error! Funktion ist nicht definiert: ",
	        },
	        callService: {
	        	title: "Einen Service aufrufen",
	        	help: "Diese Vorlage ruft den gewählten Service einer Node auf. Bitte setzen Sie die richten Parameter.",
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
        notForThisVersion: "Die Version des Projekts (@0) unterscheidet sich von der aktuellen Version der Anwendung (@1). Möchten Sie diese konvertieren?",
        canNotConvert: "Das Projekt ist mit die aktuelle Version der Anwendung nicht kompatibel. Möchten Sie ein neues Projekt erstellen?",
        loading: 'Projekt wird geladen...',
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
        cameraImage: 'Kamera',
        remoteView: 'Remote view',
        properties: {
            hasScreenBeltValues: {
                show: 'Zeigen',
                hide: "Ausblenden"
            },
            alignments: {
                left: 'Links',
                right: 'Rechts',
                center: 'Mitte',
                justify: 'justieren'
            },
            _textAlign: "Ausrichten",
            _fps: 'FPS',
            _fpsValues: ["Niedrig", "Niedrig", "Hoch"],
            _dockKeyboard: 'Dock keyboard',
            _showKeyboard: 'Force to show keyboard',
            _font: "Schriftart",
            _icon: "Icon",
            _width: 'Breite',
            _height: 'Höhe',
            _angle: 'Winkel',
            _value: 'Wert',
            _color: 'Farbe',
            _text: 'Text',
            _fontSize: 'Schriftgröße',
            _min: 'Minimum',
            _opacity: 'Deckkraft',
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
            _scale: 'Skala',
            source: 'Quelle',
            _onColor: 'Farbe an',
            _offColor: 'Farbe aus',
            _blinking: 'Blinken',
            _blinkFrequency: 'Blinkfrequenz',
            _screenLink: 'Screenverknüfpung',
            _borderColor: 'Rahmenfarbe',
            _borderWidth: 'Rahmenbreite',
            _fontColor: 'Schriftfarbe',
            onClick: 'Bei Betätigung',
            name: 'Name',
            _node: 'ROS-Node-Name',
            hasScreenBelt: "Hat Screen-Belt",
            logo: 'Logo',
            logoWidth: 'Logobreite',
            logoPosition: 'Logoposition',
            logoPositions: {
                bottomRight: 'Unten - Rechts',
                bottomLeft: 'Unten - Links',
                topLeft: 'Oben - Links',
                topRight: 'Oben - Rechts'
            },
            _top: 'Oben',
            _left: 'Links',
            _enabled: 'Aktiviert'
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
                title: 'Timer',
                delay: 'Verzögerung',
                repeat: 'Wiederholen',
                enabled: 'Aktiviert',
                name: 'Name',
                action: 'Aktion',
                duplicatedError: "Sie können mit diesem Namen nicht Speichern, weil der Name schon vergeben ist. Bitte wählen Sie einen anderen um speichern zu können.!"
            },
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
                createNew: 'Neu',
                upload: 'Upload',
                download: 'Download',
                uploadComplete: 'Upload fertig!',
                savedToMobile: 'Die Projektdatei ist in Ihrem Root-Ordner gespeichert: ',
                savedFailed: 'Speichern fehlgeschlagen',
                noteUseMobileMemory: '<i><u><b>Bitte beachten Sie:</b></u> navigieren Sie in Ihrem Ordnerverzeichnis um Projekte hochzuladen!</i>',
                uploadImagesConfirm: 'Das Project beinhaltet Bilder. Möchten Sie die existierenden Bilder überschreiben?'
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
                gridSizeError: 'Der Wert muss zwischen 30 und 200 liegen',
                forceBelt: 'Screen Belt immer sichtbar',
                forceBeltSwitchLabel: 'Screen Belt immer sichtbar an',
                autoScale: 'Automatisch Skalieren',
                pinchEnabled: 'Pinch-Zoom',
                switchPinchEnabled: 'Pinch-Zoom auf mobilem Gerät aktivieren'
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
                nodeUnselected: 'Wählen Sie einen Knoten, um die Eigenschaften anzuzeigen.',
                topicOfflineError: "Diser Topic ist zurzeit Offline. Sie können keinen neuen Wert publishen!",
                topicOutOfDateWarning: "Der Wert diese Topics ist noch nicht von ROS upgedatet. Möchten Sie den neuen Wert publishen?"
            },
            conn: {
                title: 'ROS-Server Einstellungen',
                description: 'Geben Sie die IP des ROS-Servers an um die aktiven Nodes zu sehen. Wenn Sie FlexGui offline benutzen möchten, setzen Sie bitte unten den Haken.',
                ip: 'IP',
                port: 'Port',
                offlineMode: 'Demomodus',
                offlineModeSwitch: 'Demomodus an',
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
            },
            userMode: {
                title: "Nutzermodi",
                modeSwitch: "FG Screens nur für bestimmte Nutzer freigeben",
                password: "Admin-Passwort",
                confirmPassword: "Passwort bestätitgen",
                passwordError: "Die beiden Passwortfelder müssen übereinstimmen!"
            }
        }
    },
    messenger: {
        invalidUsernamePassword: 'Verbindung zum Messanger nicht möglich. Bitte überprüfen Sie Benutzername und Kennwort',
        missingLoginData: 'iVAR-Messenger kann keine Verbindung aufbauen. Bitte richten Sie diese in den Einstellungen/Messanger ein.',
        enterMessage: 'Nachricht eingeben...',
        expertUsername: "Experten-Benutzername",
        checkToEnableMessenger: "Eingebetteten Messenger aktivieren",
        messengerEnabled: "Enable messenger"
    },
    popup: {
        title: 'FlexGui Nachrichten'
    },
    timers: {
        alreadyRunningError: 'Dieser Timer läuft bereits!',
        disableAll: 'Alle Deaktivieren',
        createNew: 'Neuer Timer'
    },
    buttons: {
        start: 'Start',
        stop: 'Stop',
        add: 'Hinzufügen',
        edit: 'Edit',
        duplicate: 'Duplikat',
        cancel: 'Abbruch',
        clear: 'Leeren',
        save: 'Speichern',
        close: 'Schließen',
        closeAll: 'Alle schließen',
        remove: 'Löschen',
        reconnect: 'Wiederverbinden',
        connect: 'Verbinden',
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
        download: 'Download',
        disable: 'Deaktivieren'
    },
    editMode: {
        openBelt: 'Open belt',
        editModeTaken: '<h3>Die Edit-Rechte wurden von jemandem abgenommen.</h3>',
        confirmTakeEditMode: '<h3>Edit-Rechte Abnehmen</h3><p>Jemand editiert gerade, aber nur eine Person kann zur gleichen Zeit editieren.Möchten Sie die Edit-Rechte abnehmen?</p>',
        confirmCloseWhenEditing: 'Möchten Sie den Editiermodus verlassen und FlexGui schließen?',
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
            content: "Kommunizieren Sie mit einem Remote-Expert. Geben Sie die Benutzerinformationen ein, indem Sie zu Settings - Messenger im Edit belt navigieren"
        },
        mirrorMode: {
			header: 'Hilfe für Spiegelmodus',
			//title: "Spiegelmodus"
            content: "Wenn Sie den Spiegelmodus aktivieren, werden Screenshots und Mausklicks an die iVAR Expert Site gesendet. Der Experte kann Klickvorschläge senden und dem Benutzer bei der Bedienung von FlexGui 4.0 helfen"
        },
        themes: {
			header: 'Hilfe für Themes',
			//title: "Themes"
            content: "Themes is ein Addon für FlexGui 4.0 und erlaubt es dem Benutzer die Farbschemen zu ändern."
        },
        cameraImage: {
			header: 'Hilfe für Kamera-Fidget',
			//title: "Kamera-Fidget"
            content: "Ein Kamera-Fidget zeigt den Stream Ihrer IP-Kamera.<h5>Quelle</h5> Mit dem Einstellen der Quelle auf eine .mjpg-Quelle sehen Sie das Video. <h5>Anmeldung</h5> Sofern Ihre Kamera passwortgeschützt ist, geben Sie bitte die Accountinformationen im Popup-Fenster ein."
        },
        userMode: {
            header: 'Nutzermodi',
            content: 'Mit Nutzermodi können Sie Screens für einzelne Nutzter freigeben. <h5>Passwort</h5> Sie können das Passwort für den Administratormodus setzen. Das Standardpasswort ist: \"admin\"'
        },
        timers: {
            header: 'Timer',
            content: 'Mit Timer können Sie Timeouts und Intervalle verwalten. Setzen Sie <b>wiederholen</b> um ein Intervall zu erzeugen. Ein Intervall wird  An interval will run as long as the repeat is checked or the timeout is stopped. The minimum delay of a timeout is 30ms.'
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
        callError: 'Im Demo-Modus können Sie keine Anrufe tätigen.'
    },
    ros: {
		connectionError: 'FlexGui kann sich nicht mit dem ROS-Server verbinden',
		connectionErrorBody: 'Wir können die Verbindung zum ROS-Server nicht aufbauen oder die Verbindung ist unterbrochen. Wenn Sie wiederverbinden möchten klicken Sie deb <b>Wiederverbinden</b>-Button, oder wechseln Sie in den <b>Demomodus</b> um offline zu arbeiten.<br /> For further information, please visit our website\'s <a href="https://www.ppm.no/flexgui4-Home/Index/downloads" target="_blank">donwload</a> section, where you can find more info about the ROS server setup.',
        reconnect: 'Wiederverbinden',
		back: 'Zurück',
		offlineMode: 'Demomodus',
		demoBody: 'Möchten Sie das <b>aktuelle</b> Projekt behalten? Wenn Sie das aktuelle Projekt behalten, wird dies das offline Projekt überschreiben!',
		keepProject: 'Projekt behalten',
		discardProject: 'Projekt verwerfen',
		communicationInitError: 'Fehler bei der Kommunikationsinitialisierung',
		versionIsNotLatest: {
		    body: "Ihr Projekt ist nicht auf dem neuesten Stand. Möchten Sie das Projekt updaten, was bedeuten kann, dass Sie Ihre Änderungen verlieren können, oder das Projekt überschreiben?",
		    title: "Projekt ist nicht auf dem neuesten Stand",
		    overwrite: "Auf Server überschreiben",
		    update: "Mein Projekt updaten"
		},
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
        imageError: 'Es können nur Bilddateien hochgeladen werden, bitte wäheln Sie eine PNG, BMP oder JPG-Datei',
        confirmOverwrite: 'Möchten Sie ein existierendes Bild überschreiben?'
    },
    nachiLink: {
        addVariable: "Variable hinzufügen",
        connectionsTab: "Verbindungen",
        connectionError: "Verbindung zu @0 nicht möglich",
        secure: "Sicher",
        IP: "IP",
        port: "Port",
        connected: "Verbunden",
        Name: "Name",
        createNew: "Neu",
        reconnect: "Wiederverbinden",
        zeroConnection: "Keine Direct Connection gefunden",
        nameLocked: " Der Name wird von FlexGui erhalten und kann nicht geändert werden"
    },
    diagnostics: {
        cancel: "Abbrechen",
        close: "Schließen",
        save: "Speichern",
        editTest: "Test editieren",
        newtest: "Neuer Test",
        userDefineCheck: "Eigenes Skript an",
        name: "Name",
        script: "Skript",
        params: "Parameter",
        selected: "Ausgewählt",
        tests: {
            stressTest: {
                name: "Stresstest",
                description: "Ruft einen Service N mal auf",
                params: {
                    n: { description: 'Ruft einen Service N mal auf' },
                    servicePath: { description: 'Service Pfad, z.B.: /rosapi/publishers' },
                    params: { description: 'Serviceparameter im JSON Format, z.B.: {"paramName": "value"}' },
                    limit: { desciption: 'Die maximale Antwortezeit sollte geringer als das vorgegebene Limit sein.' }
                }
            },
            getTopicRespTime: {
                name: "Antwortezeit von ROS-Topics",
                description: "Started den ROSAPI/Topic-Service und misst die Zeit zwischen Anfrage und Antwort.",
                params: {
                    limit: { desciption: 'Die maximale Antwortzeit sollte geringer als das vorgegebene Limit sein.' }
                },
            },
            getServiceRespTime: {
                name: "Antwortezeit des ROS-Services",
                description: "Started den ROSAPI/Topic-Service und misst die Zeit zwischen Anfrage und Antwort.",
                params: {
                    limit: { desciption: 'Die maximale Antwortzeit sollte geringer als das vorgegebene Limit sein.' }
                }
            },
            topicUpdateRate: {
                name: "Update-Rate der Topics",
                description: "Berechnet die mittlere Update-Zeit der Topics einer gewählteen Node.",
                params: {
                    nodeName: { description: 'Der Name zu testenden Node, z.B. FlexGuiNode' },
                    timeout: { description: 'Gemessene Zeit in Sekunden.' },
                    limit: { desciption: 'Die maximale Antwortezeit sollte geringer als das vorgegebene Limit sein.' }
                }
            },
            offlineTopics: {
                name: "Offline-Topics",
                description: "Erhält die Offline-Topics einer gewählten Node",
                params: {
                    nodeName: { description: 'Der Name zu testenden Node, z.B. FlexGuiNode' }
                }
            },
            serviceCallRespTime: {
                name: 'Antwortezeit von Service-Calls',
                description: "Ruft einen gewählten Service auf und misst die Zeit in ms zwischen Anfrage und Antwort.",
                params: {
                    servicePath: { description: 'Service-Pfad, z.B.: /rosapi/publishers' },
                    params: { description: 'Service-Parameter in JSON-Format, z.B.: {"paramName": "value"}' },
                    limit: { desciption: 'Die maximale Antwortezeit sollte geringer als das vorgegebene Limit sein.' }
                }
            },
            rosConnection: {
                name: 'ROS-Verbindung',
                description: "Überprüfen Sie, ob ROS verbunden ist.",
                params: {
                    limit: { desciption: 'Die maximale Antwortezeit sollte geringer als das vorgegebene Limit sein.' }
                }
            }
        },
        resultTitle: "Ergebnis der Diagnose",
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
