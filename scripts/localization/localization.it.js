//add english translation to available languages
localization.languages.push('it');

//translation
localization.items.it = {
    flag: 'scripts/localization/flags/it.GIF',
    language: 'Italiano',
    starting: {
        downloadAddons: "Caricamento degli addons... ",
        connectToRos: "Connessione al server ROS",
        hideConnect: "Nascondi"
    },
    licensing: {
        notGenerated: "<h3>Licenza non approvata</h3> <p>La preghiamo di essere paziente, stiamo generando una licenza al più presto!</p>",
        licenseNotFound: "<h3>Licenza non trovata</h3>"
                                + "<p>Dopo la registrazione, vai al tuo <a onclick='window.open(\"@0\", \"_system\");' href='#'>profilo</a> e richiedi una licenza Trial.</p>",
        licenseExpired: "<h3>Licenza scaduta</h3>"
                                + "<p>La tua Licenza Trial non è più valida!</p>",
        userError: "<h3>Informazioni di login sbagliate</h3>"
                                + "<h4>username o password errati</h4>"
                                    + "<p>Se hai un username registrato presso il <a onclick='window.open(\"@0\",\"_system\")' href='#'>sito di FlexGui 4.0</a>, per favore controlla nuovamente che username/password siano corretti.</p>"
                                + "<h4>Username non trovato</h4>"
                                    + "<p>Registrati presso il <a onclick='window.open(\"@1\", \"_system\")' href='#'>sito di FlexGui 4.0</a></p><p>Al temine della registrazione, vai al tuo <a onclick='window.open(\"@1\",\"_system\")' href='#'>profilo</a> e richiedi una licenza Trial.</p>"
    },
    wizard: {
        unknownWizard: "<p>Ci sono scripts che non possono essere eseguiti su questa versione: </p>@0<p><br/>Per maggiori informazioni, visita il nostro <a target='_blank' href='https://www.ppm.no/flexgui4-Home/Index/pricing'>sito</a></p>",
        addScriptTemplate: "Aggiungi uno script template",
        output: "Output code",
        param: "Parametri",
        select: "Seleziona wizard template",
        title: "Script template wizard",
        templates: {
            createTopic: {
                title: "Crea topic",
                help: "Pubblica e opzionalmente iscrive ad un topic di cui vengono specificati tipo, nome e \'nome amico\'. Il nuovo topic ha il percorso della forma: '/wizard/[nome]'",
                params: {
                    name: "Nome",
                    type: "Tipo",
                    subscribe: "Iscriviti",
                    friendlyName: "Nome amico",
                    onChange: "On change script",
                }
            },
            changeScreen: {
                title: "Cambia schermo",
                help: "Cambia lo schermo corrente con quello specificato.",
                params: {
                    screen: "Schermo",
                },
                error: "Errore! Impossibile cambiare ad uno schermo che non esiste: ",
            },
            connectorVariable: {
                title: "Variabile di nodo: inizializza",
                help: "Questo template gestisce automaticamente la variabile di un nodo selezionato. Effettua l'iscrizione e genera l'opportuna variabile locale. Si raccomanda di inserire questo script nello script di inizializzazione.",
                params: {
                    node: "Nodo",
                    variable: "Variabile",
                    friendlyName: "Nome amico",
                }
            },
            getConnectorVariable: {
                title: "Variabile di nodo: get value",
                help: "Questo template restituisce il valore corrente di una variabile di un nodo. Si raccomanda di inserire questo script nella proprietà di un Fidget.",
                params: {
                    node: "Nodo",
                    variable: "Variabile",
                }
            },
            setConnectorVariable: {
                title: "Variabile di nodo: imposta valore",
                help: "Questo template imposta il valore di una variabile di un nodo con un nuovo valore stabilito dall'utente. Il nuovo valore è comunicato al server ROS. Si raccomanda di inserire tale script all'interno di una proprietà 'Al click' di un Fidget.",
                params: {
                    node: "Nodo",
                    variable: "Variabile",
                    value: "Nuovo valore",
                    operation: "Operazione",
                }
            },
            getReadyConnectorVariable: {
                title: "Variabile di nodo: get ready",
                help: "Questo template restituisce True se la variabile di un determinato nodo è pronta per essere scritta. Si raccomanda di inserire questo script nella proprietà di un Fidget.",
                params: {
                    node: "Nodo",
                    variable: "Variabile",
                }
            },
            autoDefine: {
                title: "Defnisci una variabile se non definita",
                help: "Questo template assegna un valore ad una variabile se non è già stata precedentemente inizializzata. Se la variabile è già stata defnita, non succede niente.",
                params: {
                    variable: "Variabile",
                    value: "Valore",
                }
            },
            popup: {
                title: "Visualizza un messaggio in finestra",
                help: "Questo template crea una finestra popup con un messaggio al suo interno definito dall'utente.",
                params: {
                    message: "Messaggio",
                    type: "Tipo",
                }
            },
            timeout: {
                title: "Ritarda uno script",
                help: "Questo template esegue uno script dopo un certo delay.",
                params: {
                    timeout: "Delay (ms)",
                    type: "Funzione",
                    name: "Nome"
                }
            },
            setFunction: {
                title: "Definisci funzione",
                help: "Questo template definisce una funzione personalizzata. La funzione può essere chiamata anche in seguito, in qualunque punto di FlexGui, attraverso il template 'Chiamata di una funzione'.",
                params: {
                    name: "Nome della funzione",
                    type: "Funzione",
                }
            },
            callFunction: {
                title: "Chiamata di una funzione",
                help: "Questo template effettua la chiamata ad una funziona personalizzata. L'utente può scegliere una qualunque funzione definita precedentemente in FlexGui, attraverso il template 'Definisci funzione'.",
                params: {
                    name: "Nome della funzione",
                },
                error: "Errore! Impossibile utilizzare una funzione non definita: ",
            },
            callService: {
                title: "Chiama un servizio",
                help: "Questo template chiama il servizio selezionato offerto da un nodo. Per il suo corretto funzionamento, i parametri devono essere configurati correttamente dopo aver inserito il codice.",
                params: {
                    node: "Nodo",
                    service: "Servizio",
                    parameter: "Parametri",
                    callback: "Callback",
                },
            },
        }
    },
    general: {
        emptyList: 'Lista vuota',
        background: 'Sfondo',
        backgroundColor: 'Colore dello sfondo',
        selectScreenType: 'Seleziona il tipo di schermo'
    },
    project: {
        clearLocal: 'Svuota memoria locale',
        download: 'Salva',
        load: 'Carica',
        uploadProject: 'Carica un progetto',
        compare: 'Confronta',
        availableProjects: 'Progetti disponibili',
        name: 'Nome',
        id: 'Login',
        title: 'Impostazioni',
        currentProjectTab: 'Progetto corrente',
        projectBrowserTab: 'Esplora',
        blockMsg: 'Caricamento...',
        loading: 'Loading project...',
        saveError: 'Il salvataggio del progetto ha riscontrato un errore. Puoi ocntinuare e disabilitare questo messaggio cliccando "Cancella", o puoi tentare di nuovo cliccando "Ok".',
        notForThisVersion: "La versione del progetto(@0) è diversa da quella attuale (@1). Vuoi convertirlo?",
        canNotConvert: "Il progetto non è compatibile con la versione corrente dell\'applicazione. Vuoi crearne uno nuovo?"
    },
    fidgets: {
        extend: {
            variableSelector: {
                subStart: 'Iscrizione iniziata per la variabile @0 del nodo @1',
                subEnd: 'Iscrizione conclusa per la variabile @0 del nodo @1',
                subFailed: 'Iscrizione fallita',
                unsubStart: 'Disiscrizione iniziata per la variabile @0 del nodo @1',
                unsubEnd: 'Disiscrizione conclusa per la variabile @0 del nodo @1',
                unsubFailed: 'Disiscrizione fallita',
                subButton: 'Iscriviti',
                unSubButton: 'Disiscriviti',
                refreshButton: 'Aggiorna',
                title: 'Aggiungi una nuova variabile al nodo @0'
            }
        },
        messenger: 'Messenger',
        fidgetGroup: 'Gruppo di Fidget',
        progressBar: 'Barra di caricamento',
        button: 'Pulsante',
        checkBox: 'Box di scelta',
        textInput: 'Input di testo',
        text: 'Testo',
        variableSelector: 'Variabili',
        scrollableText: 'Testo scrollabile',
        slider: 'Slider',
        radioButton: 'Scelta multipla',
        fullgauge: 'Contatore',
        boolean: 'Boolean',
        image: 'Immagine',
        indicatorLamp: 'Led',
        road: 'Strada',
        fence: 'Recinzione',
        camera: 'Videocamera',
        device: 'Dispositivo',
        genericObstacle: 'Ostacolo',
        cameraImage: 'Immagine videocamera',
        remoteView: 'Remote view',
        endOfWay: 'Fine percorso',
        properties: {
            multipleDiffValueDisabledMsg: "[ Multiedit with different value, double tap to reset. ]",
            _name: "Name",
            layout: "Layout",
            _margin: "Margin",
            hasScreenBeltValues: {
                show: 'Mostra',
                hide: "Nascondi"
            },
            alignments: {
                left: 'Sinistra',
                right: 'Destra',
                center: 'Centrato',
                justify: 'Giustifica'
            },
            _textAlign: "Allinea",
            _fps: 'FPS',
            _fpsValues: ["Basso", "Medio", "Alto"],
            _dockKeyboard: 'Dock keyboard',
            _showKeyboard: 'Force to show keyboard',
            _font: "Font",
            _icon: "Icona",
            _width: 'Larghezza',
            _height: 'Altezza',
            _opacity: 'Opacità',
            _angle: 'Angolo',
            _value: 'Valore',
            _color: 'Colore',
            _text: 'Testo',
            _fontSize: 'Dimensione Testo',
            _fontColor: 'Colore testo',
            _min: 'Minimo',
            _max: 'Massimo',
            _step: 'Step',
            _precision: 'Precisione',
            backgroundColor: 'Sfondo',
            backgroundType: 'Tipo di sfondo',
            image: "Immagine",
            color: "Colore",
            _options: 'Opzioni',
            _angleOffset: 'Angolo iniziale',
            _angleArc: 'Arco di misura',
            _lock: 'Blocca',
            _scale: 'Proporzione',
            source: 'Origine',
            _onColor: 'Colore On',
            _offColor: 'Colore Off',
            _blinking: 'Lampeggiamento',
            _blinkFrequency: 'Frequenza ',
            _screenLink: 'Collegamento ad un altro schermo',
            _borderColor: 'Colore bordi',
            _borderWidth: 'Spessore width',
            onClick: 'Al click',
            name: 'Nome',
            _node: 'Nome del nodo in ROS',
            hasScreenBelt: "Barra degli schermi",
            logo: 'Logo',
            logoWidth: 'Spessore logo',
            logoPosition: 'Posizione logo',
            logoPositions: {
                bottomRight: 'In basso a destra',
                bottomLeft: 'In basso a sinistra',
                topLeft: 'In alto a sinistra',
                topRight: 'In alto a destra'
            },
            _top: 'Alto',
            _left: 'Sinistra',
            _enabled: 'Abilitato'
        }
    },
    properties: {
        title: 'Proprietà @0',
        aspectFit: 'Mantieni aspetto (adatta)',
        aspectCrop: 'Mantieni aspetto (ritaglia)',
        stretch: 'Adatta',
        robot: 'Robot',
        plc: 'PLC',
        onlyForSingleFidget: 'La barra delle proprietà è disponibile per un solo fidget alla volta'
    },
    settings: {
        title: 'Impostazioni FlexGui',
        reloadLoginAlert: 'Ricaricare FlexGui ed effetturare il login con i nuovi dati?',
        reloadSettingsAlert: 'Ricaricare FlexGui ed usare le impostazioni correnti?',
        loadOnNextStartNote: 'FlexGui userà le seguenti impostazioni al prossimo avvio',
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
                repeat: 'Ripeti',
                enabled: 'Attivo',
                name: 'Nome',
                action: 'Azione',
                duplicatedError: "Non puoi salvare ocn questo nome perchè è già in uso. Inserisci un altro nome"
            },
            enterprise: {
                title: 'Enterprise',
                trialTitle: 'Modalità prova',
                switchTrial: 'Seleziona per attivare la modalità di prova',
                username: 'Username',
                password: 'Password',
                description: 'Prova la nostra soluzione completa, FlexGui Enterprise gratis. Per altre informazioni, visita <a href="#">website</a>.'
            },
            project: {
                title: 'Progetto',
                uploadNote: 'Attenzione, caricare il progetto sovrascriverà il progetto corrente!',
                uploadConfirm: 'Vuoi sovrascrivere il progetto corrente?',
                cleanConfirm: 'Vuoi davvero rimuovere il progetto attuale e caricarne uno nuovo?',
                newProject: 'Nuovo progetto',
                createNew: 'Crea',
                upload: 'Carica',
                download: 'Salva',
                uploadComplete: 'Caricamento completato!',
                savedToMobile: 'Il progetto è stato salvato nella directory principale: ',
                savedFailed: 'Salvataggio fallito',
                noteUseMobileMemory: '<i><u><b>Attenzione:</b></u> accedi alla memoria locale per caricare i progetti!</i>',
                uploadImagesConfirm: 'Il progetto contiene immagini, vuoi sovrascrivere quelle esistenti?',
                storageMode: {
                    title: 'Project storage',
                    autoUpdate: 'Enable auto project update',
                    autoUpdateSwitch: 'Check to enable automatic project update with ROS',
                    autoUpdateNote: '<b>Please note:</b> Enabled automatic project update can cause instable concurent using for multiple users.'
                }
            },
            language: {
                title: 'Lingua',
                languageSelectNote: 'Attenzione, FlexGui verrà riavviato!',
            },
            general: {
                title: 'Generale',
                screenScale: 'Cambia le proporzioni dello schermo',
                small: 'Piccolo',
                medium: 'Medio',
                large: 'Grande',
                onScreenHelp: 'Aiuto',
                onScreenHelpSwitch: 'Selezione per abilitare l\'aiuto in finestra',
                statLabel: "Monitor Prestazioni",
                statSwitchLabel: "Selezione per abilitare il Monitor Prestazioni",
                gridSize: 'Dimensione griglia',
                gridSizeNote: 'Attenzione, se cambi tale valore FlexGui verrà riavviato!',
                gridSizeError: 'La dimensione della griglia deve essere tra 30 e 200',
                forceBelt: 'Visualizza barra degli schermi',
                forceBeltSwitchLabel: 'Seleziona per visualizzare sempre la barra degli schermi',
                autoScale: 'Ridimensionamento automatico',
                pinchEnabled: 'Pinch zoom',
                switchPinchEnabled: 'Seleziona per abilitare il pinch-zoom sul tuo dispositivo mobile'
            },
            initScript: {
                title: 'Init script',
                note: 'Scrivi qui il codice che verrà eseguito durante l\'inizializzazione',
                autoInitException: 'autoInit exception',
                initException: 'Errore durante l\'inizializzazione'
            },
            nodes: {
                title: 'Nodi',
                search: 'Cerca...',
                detailsOf: 'Dettagli di @0',
                searchResult: 'Risultato della ricerca',
                tooShortError: 'Espressione di ricerca troppo corta',
                noResultMsg: 'Nessun risultato per la ricerca di: \'@0\'',
                changeScriptTitle: 'ChangeScript per @0',
                changeScriptNote: 'Puoi accedere al nuovo valore a quello precedente con <b>\'newValue\'</b> e <b>\'oldValue\'</b>',
                demoAlert: 'Modalità offline, nessun nodo disponibile',
                nodeUnselected: 'Seleziona un nodo per visualizzarne le proprietà.',
                topicOfflineError: "Questo topic è offline, quindi non è possibile pubblicare un nuovo valore!",
                topicOutOfDateWarning: "Il valore del topic non è stato ancora aggiornato da ROS. Vuoi pubblicare il nuovo valore?"
            },
            conn: {
                title: 'Impostazioni Server ROS',
                description: 'Imposta la posizione del server ROS da utilizzare, così da poter accedere ai suoi nodi. Se vuoi utilizzare FlexGui offline, seleziona la casella sottostante.',
                ip: 'IP',
                port: 'Porta',
                offlineMode: 'Modalità offline',
                offlineModeSwitch: 'Seleziona per disabilitare la connessione a ROS',
                secure: 'Modalità sicura',
                secureSwitch: 'Seleziona per abilitare la modalità sicura (WebSocket Security)',
                addons: 'Addons',
                localAddons: 'Skip addon loading from server'
            },
            messenger: {
                title: 'Messenger'
            },
            mirror: {
                title: 'Modalità specchio',
                mirrorModeSwitch: 'Seleziona per attivare la modalità specchio',
            },
            theme: {
                title: "Temi",
                theme: 'Tema',
                themeNote: 'Attenzione, se cambi tale valore FlexGui verrà riavviato!',
            },
            userMode: {
                title: "Modalità utente",
                modeSwitch: "Seleziona se vuoi restringere l'accesso ai tuoi schermi in FlexGui",
                password: "Password amministratore",
                confirmPassword: "Conferma password",
                passwordError: "Le due password devono coincidere!"
            }
        }
    },
    messenger: {
        invalidUsernamePassword: 'Non riesco ad accedere a iVAR messenger. Per favore controlla username e password.',
        missingLoginData: 'iVAR Messenger non riesce ad effettuare l\'accesso. Configuralo in Impostazioni/Messenger.',
        enterMessage: 'Inserisci messaggio...',
        expertUsername: "Expert username",
        checkToEnableMessenger: "Seleziona per abilitare il messenger incorporato",
        messengerEnabled: "Abilita messenger"

    },
    popup: {
        title: 'FlexGui Messagi'
    },
    timers: {
        alreadyRunningError: 'Questo timer è già attivo!',
        disableAll: 'Disabilita tutti',
        createNew: 'Crea nuovo'
    },
    buttons: {
        start: 'Start',
        stop: 'Stop',
        add: 'Aggiungi',
        edit: 'Modifica',
        duplicate: 'Duplica',
        cancel: 'Annulla',
        clear: 'Cancella',
        save: 'Salva',
        close: 'Chiudi',
        closeAll: 'Chiudi tutto',
        remove: 'Elimina',
        reconnect: 'Riconnetti',
        connect: 'Connetti',
        select: 'Seleziona',
        removeBackground: 'Rimuovi',
        pick: 'Scegli...',
        toBack: 'Sposta in fondo',
        backward: 'Sposta in background',
        toFront: 'Sposta di fronte',
        forward: 'Sposta in avanti',
        moveUp: 'Muovi su',
        moveDown: 'Muovi giù',
        addScreen: 'Aggiungi schermo...',
        addFactoryScreen: 'Schermo di fabbrica',
        addNormalScreen: 'Schermo normale',
        upload: 'Carica',
        download: 'Salva',
        disable: 'Disabilitare'
    },
    editMode: {
        openBelt: 'Apri barra',
        editModeTaken: '<h3>I diritti di modifica sono stati presi da un altro utente.</h3>',
        confirmTakeEditMode: '<h3>Prendi i diritti</h3><p>Un altro utente sta effettuando modifiche, ma solo un utente alla volta può modificare. Vuoi prendere i diritti per effettuare modifiche?</p>',
        confirmCloseWhenEditing: 'Vuoi uscire dalla modalità di modifica?',
        switchLabel: 'Modalità modifica',
        settings: 'Impostazioni',
        properties: 'Proprietà',
        snapToGrid: 'Attiva griglia',
        resize: 'Ridimensiona',
        rotate: 'Ruota',
        multiSelect: 'Selezione multipla',
        unSelect: 'Deseleziona tutto',
        undo: 'Annulla',
        redo: 'Ripeti',
        copy: 'Copia',
        cut: 'Taglia',
        paste: 'Incolla',
        move: 'Muovi',
    },
    help: {
        label: 'Aiuto',
        off: 'Non mostrare l\'aiuto',
        enterprise: {
            header: 'Aiuto per Enterprise Trial',
            content: '<h3>Modalità Trial</h3><p>Nella modalità Trial puoi usare tutte le funzioni di FlexGui 4.0 gratuitamente. La modalità Trial necessita di una connessione internet.</p><h3>Come usarla</h3><p>Per poter utilizzare la <b>Modalità Trial</b> segui le istruzioni seguenti: <ol><li>Registra un nuovo account presso il <a href="https://flexgui4.ppm.no">nostro sito</a></li><li>Vai alla tua pagina del profilo</li><li>Richiedi una licenza Trial per FlexGui 4.0</li></ol></p>'
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
            header: 'Aiuto per la barra degli schermi',
            screen: 'Schermo',
            screenText: 'Sulla barra degli schermi si possono vedere tutti gli schermi di un progetto. Per selezionare uno schermo, clicca sulla sua icona con un click sinistro del mouse. Se il click è prolungato, puoi modificare le sue proprietà.',
            newScreen: 'Nuovo Schermo',
            newScreenText: 'Puoi aggiungere un nuovo schermo cliccando sullo schermo contrassegnato con ' + ' alla fine della lista degli schermi. Puoi rinominare o eliminare gli schermi cliccando su di essi con prolungato click sinistro del mouse dalle loro proprietà.',
            properties: 'Finestra delle proprietà',
            propertiesText: 'Se trascini un fidget sulla barra degli schermi, ritornerà alla sua posizione iniziale e si aprirà la sua finestra delle proprietà.'
        },
        initScript: {
            header: 'Aiuto per lo script di inizializzazione',
            text: 'Qui puoi scrivere il codice di inizializzazione che verrà eseguito all\'avvio del progetto. Per esempio qui si possono dichiarare le variabili locali utilizzate nel progetto.'
		},
        settings: {
            header: 'Aiuto per la finestra delle impostazioni',
            scale: 'Modifica le proporzioni dello schermo',
            scaleText: 'Puoi modificare le dimensioni dello schermo su un dispositivo mobile.',
            scaleNote: 'Ti ricordiamo che sui dispositivi mobili puoi sempre utilizzare il pinch-zozom. Sul desktop puoi ridimensionare la schermata del browser.',
            help: 'Aiuto',
            helpText: 'Puoi cambiare l\'icona <span class="glyphicon glyphicon-question-sign"></span> da on a off.'
        },
        fidgetBelt: {
            header: 'Aiuto per la barra dei Fidget',
            fidgets: 'Fidgets',
            fidgetsText: 'Qui puoi trovare tutti i Fidget utilizzabili e trascinarli nello schermo corrente.',
            deleteBelt: 'Barra del cestino',
            deleteBeltText: 'Se trascini un Fidget di nuovo sulla barra dei Fidget, verrà eliminato. Lo puoi sempre riaggiungere più tardi se necessario.'
        },
        loginWindow: {
            header: 'Aiuto per la finestra di Login',
            title: "Finestra di Login",
            content: "Fornire username e password per effettuare il login come amministratore. In qualità di ospite l'utente può utilizzare l'interfaccia FlexGui, ma non potrà effettuare alcuna modifica agli schermi o alle impostazioni."
        },
        connectionSettings: {
            header: 'Aiuto per le impostanzioni del server ROS',
            title: "Impostazioni di connessione",
            content: "Specificare l'indirizzo del computer che funge da server ROSBridge, in modo tale connettersi a ROS. La porta utilizzata di default è 9090."
        },
        nodes: {
            header: 'Aiuto per i Nodi',
            title: "Nodi",
            content: "<p>Se la connessione al server ROSBridge è stata configurata correttamente, i nodi attivi sono visualizzati nel menu a tendina. Per utilizzare i dati dai topic di ROS in FlexGui, seleziona la casella 'iscriviti' di fianco a ciascuno di essi. </p><p>Dando ai topic un nome 'amico', puoi utilizzarli più comodamente all'interno dei tuoi scritp utilizzando la notazione @nomeAmico </p>"
        },
        messenger: {
            header: 'Aiuto per Messenger',
            title: "Messenger",
            content: "Per usare Messenger per comunicare via chat e video, fornire le informazioni del proprio account."
        },
        language: {
            header: 'Aiuto per la Lingua',
            title: "Lingua",
            content: "Puoi scegliere la tua lingua preferita. FlexGui verrà ricaricato una volta cambiato tale valore. Nel caso la lingua che cerchi non sia presente, contattaci a FlexGui.net."
        },
        project: {
            header: 'Aiuto per Progetto',
            title: "Progetto",
            content: "Puoi caricare e scaricare i tuoi progetti per utilizzarli altrove o per backup."
        },
        propertiesWindow: {
            header: 'Aiuto per la Finestra delle Proprietà',
            title: "Finestra delle Proprietà",
            content: "<p>Qui si possono cambiare le proprietà di un Fidget. Ogni Fidget ha un set di proprietà che si possono cambiare.</p>"
					+ "<h5>Al Click script</h5>"
					+ "<p>Se un Fidget ha il campo 'Al click', uno script può essere inserito e verrà eseguito ogni ovlta che un utente effettua un click sinistro o un tap con il dito sul Fidget in questione.</p>"
                    + "<h5>Pulsanti di posizionamento</h5>"
                    + "<p>I pulsanti di posizionamento servono per organizzare più Fidgets uno sull'altro.</p>"
					+ "<ul>"
                    + "<li>Sposta in fondo: Il Fidget verrà spostato al livello più basso dello schermo</li>"
                    + "<li>Sposta in background: Il Fidget verrà spostato un livello indietro rispetto al suo livello corrente</li>"
                    + "<li>Sposta davanti: Il Fidget verrà spostato al livello più alto dello schermo</li>"
                    + "<li>Sposta in avanti: Il Fidget verrà spostato un livello avanti rispetto al suo livello corrente</li>"
					+ "</ul>"
        },
        colorPick: {
            header: 'Aiuto per Scelta del Colore',
            title: "Scelta del colore",
            content: "Cambia il colore utilizzato scegliendo da una lista dei colori più comuni. Puoi sempre scegliere un colore personalizzato usando il suo codice HTML."
        },
        imageExplorer: {
            header: 'Aiuto per Ricerca Immagini',
            title: "Ricerca Immagini",
            content: "Carica l'immagine desiderata in uno degli slots presenti nella schermata Carica. Seleziona uno slot e poi specifica il percorso dove si trova il file immagine che si vuoi aggiungere al progetto. La stessa immagine può essere utilizzata da più Fidget o come sfondo per più schermi." 
        },
        fidgetGroup: {
            header: 'Aiuto per Gruppo Fidget',
            title: "Gruppo Fidget",
            content: "Nel gruppo di Fidget puoi posizionare più Fidget differenti, come fosse un contenitore. I Fidget all'interno di un Gruppo possono essere spostati assieme, mantenendo invariata la posizione di uno dall'altro."
        },
        image: {
            header: 'Aiuto per Fidget Immagine',
            title: "Immagine",
            content: "Questo Fidget visualizza la tua immagine personalizzata in un qualsiasi schermo."
        },
        messenger: {
            header: 'Aiuto per Messenger',
            title: "Messenger, informazioni login",
            content: "Puoi impostare username e password per poter usare FlexGui Messenger. Richiedi username e passwrod dal tuo amministratore Expert Site!"
        },
        mirrorMode: {
            header: 'Aiuto per Modalità Specchio',
            content: "Attivando la modalità Specchio la tua attività sugli schermi FlexGui e i click/tocchi verranno comunicati a un esperto iVAR. L'utente iVAR potrà così assistere dando istruzioni su dove cliccare, assieme alla comunicazione via Messenger."
        },
        themes: {
            header: 'Aiuto per Temi',
            content: "Selezionare un tema per cambiare l'aspetto di FlexGui, mantenendo il layout e la logica dei programmi invariati. Se si necessita di un tema personalizzato, contattateci a FlexGui.net."
        },
        cameraImage: {
            header: 'Aiuto per Videocamera',
            content: "un Fidget videocamera mostra lo streaming video proveniente da una videocamera IP.<h5>Fonte</h5>Impostando la Fonte con uno streaming .mjpg permetterà di vedere il video.<h5>Autenticazione</h5>Se la videocamera è protetta da password, si prega di fornire username e password nella finestra che comparirà."
        },
        userMode: {
            header: 'Modalità utente',
            content: "Nella modalità utente, puoi restringere l'accesso ai tuoi schermi FlexGui. <h5>Password</h5>Puoi impostare una password per la modalità amministratore. Il valore di default è: \"admin\""
        },
        timers: {
            header: 'Timers',
            content: "Con i timers è possibile gestire i ritardi e gli intervalli di tempo predefiniti. Seleziona <b>ripeti</b> per ripetere il timer continuamente. Il timer verrà eseguito ogni volta fintanto che l'attributo ripeti è selezionato, o il timer viene interrotto. Il minimo intervallo fra due ripetizioni è 30ms."
        }
    },
    login: {
        login: 'Login',
        username: 'Username',
        password: 'Password',
        guest: 'Ospite',
        logout: 'Logout',
        fullScreen: 'Schermo intero',
        loginError: 'username/passord errati',
        logoutSuccess: 'Logout avvenuto con successo'

    },
    demo: {
        callError: 'In modalità demo non è possibile effettuare chiamate.'
    },
    ros: {
        connectionError: 'Problema con la connessione al server. ',
        connectionErrorBody: 'Non è possibile stabilire una connessione al server ROS o la connessione si è interrotta. E\' possibile riprovare a connettersi premendo <b>Riconnetti</b>, altrimenti premere <b>Modalità offline</b> e lavorare offline. <br /> Per maggiori informazioni, visita il nostro sito <a href="https://www.ppm.no/flexgui4-Home/Index/downloads" target="_blank">donwload</a> , dove potrai trovare maggiori informazioni riguardo alla configuarione del tuo server ROS.',
        reconnect: 'Riconnetti',
        back: 'Indietro',
        offlineMode: 'Modalità offline',
        demoBody: 'Desideri tenere il progetto <b>corrente</b>? Così facendo il tuo progetto offline verrà sovrascritto!',
        keepProject: 'Mantieni progetto',
        discardProject: 'Scarta progetto',
        communicationInitError: 'Communication initialization exception',
        versionIsNotLatest: { 
            body: "Il tuo progetto non è aggiornato all'ultima versione. Vuoi aggiornarlo, rischiando di perdere delle modifiche, oppure vuoi sovrascrivere la versione corrente?",
            title: "La versione del progetto non è la più aggiornata",
            overwrite: "Sovrascrivi sul server",
            update: "Aggiorna la mia versione"
        },
        interfaces: {
            type: 'Tipo',
            originalName: 'Nome originale',
            friendlyName: 'Nome "amico"',
            subscribe: 'Iscriviti',
            changeScript: 'Modifica Script',
            notYetImplementedError: 'Non ancora implementato',
            dupeError: 'Un\'altra interfaccia ha lo stesso nome "amico".'
        }
    },
    images: {
        title: 'Ricerca Immagini',
        imagesTabTitle: 'Immagini',
        uploadTabTitle: 'Carica',
        resizeAlert: 'L\'immagine verrà scalata ad una risoluzione massima di 1024x768 pixels',
        selectSlot: 'Seleziona slot',
        selectFile: 'Seleziona file',
        blockMsg: 'Carica immagine',
        imageError: 'Possono essere caricati solo file di tipo immagine. Selezione un file di tipo PNG, BMP o JPG',
        confirmOverwrite: 'Vuoi sovrascrivere l\'immagine esistente?'
    },
    nachiLink: {
        addVariable: "Aggiungi variabile",
        connectionsTab: "Connessioni",
        connectionError: "Impossibile connettersi a @0",
        secure: "Sicura",
        IP: "IP",
        port: "Porta",
        connected: "Connesso",
        Name: "Nome",
        createNew: "Crea nuovo",
        reconnect: "Riconnetti",
        zeroConnection: "Nessuna connessione diretta trovata...",
        nameLocked: "Il nome viene ricevuto dal dispositivo FlexGui connesso e non può essere cambiato"
    },
    timeago: {
        settings: {
            strings: {
                prefixAgo: null,
                prefixFromNow: null,
                suffixAgo: 'fa',
                suffixFromNow: 'da ora',
                inPast: 'tra qualche istante',
                seconds: 'meno di un minuto',
                minute: 'circa un minuto',
                minutes: '%d minuti',
                hour: 'circa un\'ora',
                hours: 'circa %d ore',
                day: 'un giorno',
                days: '%d giorni',
                month: 'circa un mese',
                months: '%d mesi',
                year: 'circa un anno',
                years: '%d anni',
                wordSeparator: ' ',
                numbers: []
            }
        }
    }
}