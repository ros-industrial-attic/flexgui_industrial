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
localization.languages.push('hu');

//translation
localization.items.hu = {
    flag: 'scripts/localization/flags/hu.GIF',
    language: 'Magyar',
    starting: {
        downloadAddons: "Kiegészítők betöltése... ",
        connectToRos: "Kapcsolódása a ROS Serverhez",
        hideConnect: "Elrejtés"
    },
    licensing: {
        notGenerated: "<h3>Nem jóváhagyott licensz</h3> <p>A licensz jóváhagyásához kérjük várjon!</p>",
    	licenseNotFound: "<h3>Nem található licensz</h3>"
                                + "<p>A regisztráció után lépjen be a <a onclick='window.open(\"@0\", \"_system\");' href='#'>profil oldalára</a> és igényeljen egy Trial licenszt.</p>",
    	licenseExpired: "<h3>Lejárt licensz</h3>"
                                + "<p>Trial licensze lejárt!</p>",
    	userError: "<h3>Hibás bejelentkezés</h3>"
                                + "<h4>Hibás felhasználó név vagy jelszó</h4>"
                                    + "<p>Ha már regisztrált egy felhasználónevet a <a onclick='window.open(\"@0\",\"_system\")' href='#'>FlexGui 4.0 weboldalon</a>, ellenőrizze a felhasználó nevét és jelszavát.</p>"
                                + "<h4>Hibás felhasználó</h4>"
                                    + "<p>Kérjük regisztráljon a <a onclick='window.open(\"@1\", \"_system\")' href='#'>FlexGui 4.0 weboldalon</a></p><p>Regisztráció után lépjen be <a onclick='window.open(\"@1\",\"_system\")' href='#'>profil oldalára</a> és igényeljen egy Trial licenszt.</p>"
    },
    wizard: {
        addScriptTemplate: "Script sablon beszúrása",
        output: "Kimeneti kód",
        param: "Paraméterek",
        select: "Sablon választás",
        title: "Script sablon varázsló",
        templates: {
            createTopic: {
                title: "Topic létrehozása",
                help: "Advertise and optionally subscribe a topic with given type, name and friendly name. The new topic will have the '/wizard/[name]' path.",
                params: {
                    name: "Név",
                    type: "Típus",
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
        emptyList: 'Üres lista',
        background: 'Háttér',
        backgroundColor: 'Háttérszín',
        selectScreenType: 'Válasszon típust'
    },
    project: {
        clearLocal: 'Lokális törlése',
        download: 'Letöltés',
        load: 'Betöltés',
        uploadProject: 'Projekt feltöltése',
        compare: 'Hasonlít',
        availableProjects: 'Elérhető projektek',
        name: 'Név',
        id: 'Id',
        title: 'Projekt beállítások',
        currentProjectTab: 'Aktuális',
        projectBrowserTab: 'Böngésző',
        blockMsg: 'Kérjük várjon...',
        loading: 'Projekt betöltése...',
        saveError: "Hiba a project mentése során. A mégse gombra kattintva kikapcsolható az üzenet és folytatható a munka, az okra kattintással újra megpróbáljuk elmenteni a projektet.",
        notForThisVersion: "A betölteni kívánt projekt verziója (@0) eltér az aktuálisan használt verziótól (@1). Konvertálja?",
        canNotConvert: "A projekt nem konvertálható, létrehoz egy újat?"
    },
    fidgets: {
        extend: {
            variableSelector: {
                subStart: 'Feliratkozás elkezdve a \'@0\' változóra a(z) @1 csomópontban',
                subEnd: 'Feliratkozás kész a \'@0\' változóra a(z) @1 csomópontban',
                subFailed: 'Hiba a feliratkozás során',
                unsubStart: 'Leiratkozás elkezdve a \'@0\' változóról a(z) @1 csomópontban',
                unsubEnd: 'Leiratkozás kész a \'@0\' változóról a(z) @1 csomópontban',
                unsubFailed: 'Hiba a leiratkozás során',
                subButton: 'Feliratkozás',
                unSubButton: 'Leiratkozás',
                refreshButton: 'Frissít',
                title: 'Új váltózó a @0 csomóponthoz'
            }
        },
        messenger: 'Üzenetek',
        fidgetGroup: 'Fidget csoport',
        progressBar: 'Állapotjelző',
        button: 'Gomb',
        checkBox: 'Jelölőnégyzet',
        textInput: 'Szöveg bevitel',
        text: 'Szöveg',
        variableSelector: 'Változók',
        scrollableText: 'Görgethető szöveg',
        slider: 'Csúszka',
        radioButton: 'Rádiógomb',
        fullgauge: 'Mérce',
        boolean: 'Logikai',
        image: 'Kép',
        indicatorLamp: 'Lámpa',
        road: 'Út',
        fence: 'Kerítés',
        camera: 'Kamera',
        device: 'Eszköz',
        genericObstacle: 'Alakzat',
        cameraImage: 'Kamerakép',
        endOfWay: 'Út vége',
        properties: {
            hasScreenBeltValues: {
                show: 'Megjelenítés',
                hide: "Elrejtés"
            },
            alignments: {
                left: 'Balra',
                right: 'Jobbra',
                center: 'Középre',
                justify: 'Sorkizárt'
            },
            _textAlign: "Igazítás",
            _font: "Betűtípus",
            _icon: "Ikon",
            _width: 'Szélesség',
            _height: 'Magasság',
            opacity: 'Láthatóság',
            _angle: 'Forgásszög',
            _value: 'Érték',
            _color: 'Szín',
            _text: 'Szöveg',
            _fontSize: 'Betűméret',
            _fontColor: 'Betűszín',
            _min: 'Minimum',
            _max: 'Maximum',
            _step: 'Lépték',
            _precision: 'Pontosság',
            backgroundColor: 'Háttérszín',
            backgroundType: 'Háttér típusa',
            image: "Kép",
            color: "Szín",
            _options: 'Lista',
            _angleOffset: 'Eltolás',
            _angleArc: 'Szög',
            _lock: 'Csak olvasható',
            scale: 'Skála',
            source: 'Forrás',
            _onColor: 'Bekapcsolt szín',
            _offColor: 'Kikapcsolt szín',
            _blinking: 'Villog',
            _blinkPeriod: 'Villogás gyakorisága',
            _screenLink: 'Képernyő',
            _borderColor: 'Keret szín',
            _borderWidth: 'Keret vastagság',
            onClick: 'Kattintásra',
            name: 'Név',
            _node: 'ROS csomópont neve',
            hasScreenBelt: "Screenbelt láthatósága"
        }
    },
    properties: {
        title: '@0 tulajdonságai',
        aspectFit: 'Képarány megtartása, minden látható',
        aspectCrop: 'Képarány megtartása, körülvágás',
        stretch: 'Kitöltés',
        robot: 'Robot',
        plc: 'PLC',
        onlyForSingleFidget: 'A tulajonságok ablak egyszerre csak egy fidget szerkesztésére használható!'
    },
    settings: {
        title: 'FlexGui Beállítások',
        reloadLoginAlert: 'FlexGui újraindítása és bejelentkezés az új hitelesítő adatokkal?',
        reloadSettingsAlert: 'FlexGui újraindítása az új beállítások használatával?',
        loadOnNextStartNote: 'Az új beállítások újraindítás után lesznek elérhetők',
        tabs: {
            enterprise: {
                title: 'Enterprise',
                trialTitle: 'Trial mód',
                switchTrial: 'Trial mód engedélyezése',
                username: 'Felhasználónév',
                password: 'Jelszó',
                description: 'Próbálja ki sokoldalú megoldásunkat, az ingyenes FlexGui Enterprise-t. További információkért látogasson el <a href="#">weboldalunkra</a>.'
            },
            project: {
                title: 'Projekt',
                uploadNote: 'Projekt feltöltés esetén a jelenlegi projekt felülíródik!',
                uploadConfirm: 'Felül akarja írni az aktuális projektet?',
                cleanConfirm: 'Biztosan törli a jelenlegi projektet és csinál egy újat?',
                newProject: 'Új projekt',
                createNew: 'Létrehozás',
                upload: 'Feltöltés',
                download: 'Letöltés',
                uploadComplete: 'A feltöltés elkészült!',
                savedToMobile: 'A project fájl elmentve a gyökér könyvtárba: ',
                savedFailed: 'Hiba a mentés folyamán',
                noteUseMobileMemory: '<i><u><b>Fontos:</b></u> A belső memóriát használja a projektek átvitele folyamán!</i>'
            },
            language: {
                title: 'Nyelv',
                languageSelectNote: 'Az érték megváltoztatásához újra kell indítani a FlexGuit',
            },
            general: {
                title: 'Általános',
                screenScale: 'Nagyítás',
                small: 'Kicsi',
                medium: 'Közepes',
                large: 'Nagy',
                onScreenHelp: 'Segítség megjelenítése',
                onScreenHelpSwitch: 'Jelölje be, ha szeretné látni a segítségeket.',
                statLabel: "Statisztika",
                statSwitchLabel: "Jelölje be a statisztikai mutatók megjelenítéséhez",
                gridSize: 'Rács méret',
                gridSizeNote: 'Az érték megváltoztatásához újra kell indítani a FlexGuit',
                gridSizeError: 'A méretnek 30 és 200 között kell lennie'
            },
            initScript: {
                title: 'Induló szkript',
                note: 'Induló szkript szerkesztése',
                autoInitException: 'autoInit hiba',
                initException: 'Hiba lépett fel az inicializáció során'
            },
            nodes: {
                title: 'Csomópontok',
                search: 'Keresés...',
                detailsOf: '@0 részletei',
                searchResult: 'Keresés eredménye',
                tooShortError: 'Túl rövid kivejezés',
                noResultMsg: 'Nincs találat \'@0\' kulcsszóra',
                changeScriptTitle: 'ChangeScript a @0 változóhoz',
                changeScriptNote: 'A \'newValue\' és \'oldValue\' paraméterekkel elérhető a frissítés előtti és utáni érték.',
                demoAlert: 'Demo módban ez a funkció nem elérhető',
                nodeUnselected: 'Válasszon ki egy csomópontot a tulajdonságok lekérdezéséhez'
            },
            conn: {
                description: 'Használni kívánt ROS Server beállításai. Offline módhoz jelöld be a demó módot',
                title: 'ROS Server beállítások',
                ip: 'IP',
                port: 'Port',
                demoMode: 'Demó mód',
                demoModeSwitch: 'Jelölje be a demó mód aktiválásához',
                secure: 'Biztonságos kapcsolat',
                secureSwitch: 'Jelölje be a biztonságos (WebSocket Security) kapcsolat aktiválásához'
            },
            messenger: {
            	title: 'Üzenetek'
            },
            mirror: {
                title: 'Tükör mód',
                mirrorModeSwitch: 'Jelölje be, ha aktiválni szeretné a képernyő elküldését.',
            },
            theme: {
                title: "Témák",
                theme: 'Téma',
                themeNote: 'Az érték megváltoztatásához újra kell indítani a FlexGuit',
            }
        }
    },
    messenger: {
        invalidUsernamePassword: 'A felhasználónév/jelszó páros hibás. Kérem elennőrizze és próbálja újra.',
        missingLoginData: 'Hibás beállítások, kérjük a Beállítások/Üzenetek menüben adja meg a helyes értékeket.',
        enterMessage: 'Üzenet írása...',
        expertUsername: "Expert felhasználó neve"
    },
    popup: {
        title: 'FlexGui üzenetek'
    },
    buttons: {
        add: 'Hozzáadás',
        duplicate: 'Másolás',
        cancel: 'Mégse',
        clear: 'Töröl',
        save: 'Mentés',
        close: 'Bezárás',
        closeAll: 'Mind bezárása',
        remove: 'Töröl',
        reconnect: 'Újrakapcsolódás',
        select: 'Kiválaszt',
        removeBackground: 'Töröl',
        pick: 'Választ...',
        toBack: 'Háttérbe küldés',
        backward: 'Hátra köldés eggyel',
        toFront: 'Előtérbe hozás',
        forward: 'Előre hozás eggyel',
        moveUp: 'Fel',
        moveDown: 'Le',
        addFactoryScreen: 'Gyár képernyő',
        addNormalScreen: 'Normál képernyő',
        upload: 'Feltöltés',
        download: 'Letöltés',
        addScreen: 'Új képernyő'
    },
    editMode: {
        openBelt: 'Belt megjelenítése',
        editModeTaken: '<h3>Szerkesztés elvéve/h3>',
        confirmTakeEditMode: '<h3>Szerkesztés elvételének jóváhagyása</h3><p>Jelenleg egy másik felhasználó szerkeszti a projektet, el kívánja venni a szerkesztés jogát?</p>',
        confirmCloseWhenEditing: 'Edit mód kikapcsolása és FlexGui bázárása?',
        switchLabel: 'Szerkesztő',
        settings: 'Beállítások',
        properties: 'Tulajdonságok',
        snapToGrid: 'Rácshoz igazít',
        resize: 'Átméretez',
        rotate: 'Forgat',
        multiSelect: 'Több kijelölése',
        unSelect: 'Kijelölés törlése',
        undo: 'Vissza',
        redo: 'Újra',
        copy: 'Másol',
        cut: 'Kivág',
        paste: 'Beilleszt',
        move: 'Mozgatás',
    },
    help: {
        label: 'Segítség',
        off: 'Segítség kikapcsolása',
        enterprise: {
        	header: 'Enterprise Trial súgó',
            content: '<h3>Trial mód</h3><p>A Trial móddal a FlexGui 4.0 összes funkcióját ingyen használhatja. A Trial módhoz szükséges internetes kapcsolat.</p><h3>Használat</h3><p>A <b>Trial mode</b> engedélyezéséhez kövesse az instrukciókat: <ol><li>Regisztráljon a <a href="https://flexgui4.ppm.no">weboldalunkon</a></li><li>Menjen a saját Profil oldalára</li><li>Igényeljen FlexGui 4.0 Trial licenszt</li></ol></p>'
        },
        screenBelt: {
        	header: 'Képernyő sáv súgó',
            screen: 'Képernyő',
            screenText: 'A képernyő sávon látható az összes projekthez tartozó képernyő. Szimpla kattintásra megnyílik, hosszú kattintásra megnyílnak a beállításai',
            newScreen: 'Új képernyő',
            newScreenText: 'Új képernyőt a képernyő sávon található "+" jel megnyomásával adhat hozzá. A képernyő átnevezhető hosszú kattintás után.',
            properties: 'Tulajdonságok sáv',
            propertiesText: 'Mozgasson egy fidget-et a tulajdonságok sávra, hogy megnyissa a fidget tulajdonságainak ablakát. Ekkor a fidget pozíciója visszaáll a megnyitás előtti helyzetre.'
        },
        initScript: {
        	header: 'Inicializáló szkript súgó',
            text: 'Inicializáló szkriptek megadására szolgál a program indulásakor, például saját változók hozhatók létre segítségével.'
        },
        settings: {
        	header: 'Beállítások ablak súgó',
            scale: 'Nagyítás beállítása',
            scaleText: 'Mobil eszközök alapértelmezett nagyítása állítható be ennek a segítségével.',
            scaleNote: 'Fontos: csak mobil eszközökön használható. Asztali böngészőben kérjük használja a böngésző saját nagyító funkcióját!',
            help: 'Segítségek megjelenítése',
            helpText: 'Az <span class="glyphicon glyphicon-question-sign"></span> ikonok megjelenítésére / elrejtésére szolgál.'
        },
        fidgetBelt: {
        	header: 'Fidget sáv súgó',
            fidgets: 'Fidgetek',
            fidgetsText: 'A fidget sávon található eszközöket fogd-és-vidd módszer segítéségével elhelyezheti a képernyőn.',
            deleteBelt: 'Törlés sáv',
            deleteBeltText: 'A fidget törléséhez mozgassa vissza azt a fidget sáv helyén megjelenő törlés sávra.'
        },
        loginWindow: {
        	header: 'Bejelentkező ablak súgó',
            title: "Bejelentkező ablak",
            content: "Adja meg felhasználó nevét és jelszavát, hogy adminisztrátorként jelentkezzen be. Enélkül vendégként használja a FlexGui-t, vagyis megtekintheti az ablakokat, de nem szerkesztheti azokat."
        },
        connectionSettings: {
        	header: 'ROS szerver beállítások súgó',
            title: "Csatlakozási beállítások",
            content: "Adja meg a ROSBridge szervert futtató gép IP címét. Az alapértelmezett port: 9090"
        },
        nodes: {
        	header: 'Csomópontok súgó',
            title: "Csomópontok",
            content: "<p>Ha sikerült csatlakozni a ROSBridge szerverhez, az aktív csomópontok itt vannak kilistázva. Iratkozzon fel az egyes ROS topic-okra, hogy használni tudja FlexGui-ban az adatokat. </p><p>Ha megad egy topic-nak vagy service-nek egy egyszerű nevet, úgy könnyebben elérheti az adatokat a @egyszeruNev formátumot használva.</p>"
        },
        messenger: {
        	header: 'Üzenetek súgó',
        	title: "Üzenetek",
        	content: "Ahhoz, hogy tudja használni az üzenetküldő rendszert és a videó hívást, kérem adja meg a bejelentkezéshez szükséges információkat."
        },
        language: {
        	header: 'Nyelv beállítások súgó',
        	title: "Nyelv",
        	content: "Kiválaszthatja a kívánt nyelvet, a FlexGui ezután újratölt. Ha nem találja az Önnek megfelelő nyelvet, vegye föl velünk a kapcsolatot a FlexGui.net weboldalon."
        },
        project: {
        	header: 'Projekt súgó',
        	title: "Projekt",
        	content: "Itt feltölthet és letölthet projekteket a könnyebb szállítás és biztonsági mentés érdekében."
        },
        propertiesWindow: {
        	header: 'Tulajdonságok ablak súgó',
        	title: "Tulajdonságok ablak",
        	content: "<p>A Fidget tualjdonságai módosíthatók itt. Minden Fidget-nek egyedi beállítási lehetőségei vannak.</p>"
					+ "<h5>Kattintásra szkript</h5>"
					+ "<p>Ha egy Fidget-nek van Kattintásra tulajdonsága, egy szkript adható meg, ami akkor fut le, amikor a felhasználó kattint/tapint a Fidget-en.</p>"
                    + "<h5>Előtér/háttér gombok</h5>"
                    + "<p>Az előtér/háttér gombok több egymást fedő Fidget sorrendjét módosítják.</p>"
					+ "<ul>"
                    + "<li>Háttérbe küldés: A fidget az ablak legalsó rétegén lesz</li>"
                    + "<li>Hátra köldés eggyel: A fidget egy réteggel lejjebb lesz</li>"
                    + "<li>Előtérbe hozás: A fidget az ablak legfelső rétegén lesz</li>"
                    + "<li>Előre hozás eggyel: A fidget egy réteggel fejlebb lesz</li>"
					+ "</ul>"
        },
        colorPick: {
        	header: 'Szín választó súgó',
        	title: "Szín választó",
        	content: "Válasszon egyet a leginkább használt színek közül. Ezeken kívül saját színt is meg tud adni a HTML kódot használva."
        },
        imageExplorer: {
        	header: 'Kép böngésző súgó',
        	title: "Kép böngésző",
        	content: "Töltse föl a kívánt képet az egyik tárolóba a Feltöltés fül alatt. Válassza ki előbb a tárolót, aztán a feltöltendő képet az útvonal megadásával. Bármely feltöltött képet felhasználhatja a Kép fidget segítségével vagy háttér beállításával."
        },
        fidgetGroup: {
        	header: 'Fidget csoport súgó',
        	title: "Fidget csoport",
        	content: "Több Fidget-et is elhelyezhet ebben a tárolóban. Ezután a Fidget csoportot a tartalmával együtt egyszerre tudja mozgatni, megtartva egymáshoz viszonyított relatív helyzetüket."
        },
        image: {
        	header: 'Kép súgó',
        	title: "Kép",
        	content: "A Kép fidget egy tetszőleges képet jelenít meg a FlexGui ablakán."
        },
        messenger: {
        	header: 'Üzenetküldő súgó',
        	title: "Üzenetküldés bejelentkezése",
        	content: "Itt beállíthatja a felhasználó a bejelentkezési adatait, hogy ebben az ablakban tudja használni a FlexGui üzenetküldő rendszerét. Kérem kérje ezeket az adatokat az Expert Oldal adminisztrátorától!"
        },
        mirrorMode: {
        	header: 'Tükör mód súgó',
        	content: "A tükör mód engedélyezésével megoszthatja valós időben FlexGui képernyőjét és kattintásait/tapintásait az iVAR Expert személlyel. Így az expert könnyebben tud segíteni, hisz látja a képernyőt, illetve a következő kattintásokra javaslatokat tud tenni."
        },
        themes: {
        	header: 'Stílus súgó',
        	content: "Módosítsa a stílust, hogy új kinézetet adjon a FlexGui-nak, megőrizve a funkcionalitásokat. Amennyiben további stílusokat szeretne használni, vegye föl velünk a kapcsolatot a FlexGui.net weboldalon."
        },
        cameraImage: {
        	header: 'Kamera kép súgó',
            content: "A kamera kép fidget megjeleníti az IP kamera képét.<h5>Forrás</h5>Az érték tulajdonság beállítása után a kép megjelenik a fidgeten.<h5>Authentikáció</h5>Amennyiben a kamera képe jelszóval védett, kérjük adja meg a felhasználónév / jelszó páros a felugró ablakban."
        }
    },
    login: {
        login: 'Bejelentkezés',
        username: 'Felhasználó név',
        password: 'Jelszó',
        guest: 'Vendég',
        logout: 'Kijelentkezés',
        fullScreen: 'Teljes képernyő',
        loginError: 'Hibás felhasználónév/jelszó',
        logoutSuccess: 'Sikeres kijelentkezés'
    },
    demo: {
        callError: 'Demó módban nem lehet hívást indítani!',
        subscribeError: 'Demó módban nem lehet változókra fel és leiratkozni!'
    },
    ros: {
    	connectionError: 'Hiba a szerverhez való kapcsolódás során ',
    	connectionErrorBody: 'Nem tudunk a ROS szerverhez csatlakonzni, vagy a kapcsolat megszakadt. Ha újra szeretne csatlakozni, nyomja meg az <b>Újrakapcsolódás</b> gombot, vagy válassza a <b>Demó módot</b> offline munkához.',
    	reconnect: 'Újrakapcsolódás',
    	back: 'Vissza',
    	demoMode: 'Demó mód',
    	demoBody: 'Szeretné megőrizni a <b>jelenlegi</b> projektet? A projekt megőrzése felül fogja írni korábbi offline projektjét!',
    	keepProject: 'Projekt megőrzése',
    	discardProject: 'Projekt elvetése',
        communicationInitError: 'Kommunikációs hiba',
        interfaces: {
            type: 'Típus',
            originalName: 'Név',
            friendlyName: 'Egyszerű név',
            subscribe: 'Feliratkozás',
            changeScript: 'Változáskezelés',
            notYetImplementedError: 'Nincs implementálva',
            dupeError: 'Egy másik interfésznek ugyan ez a neve.'
        }
    },
    images: {
        title: 'Kép böngésző',
        imagesTabTitle: 'Képek',
        uploadTabTitle: 'Feltöltés',
        resizeAlert: 'A kép át lesz méreteze max. 1024x768 felbontásra',
        selectSlot: 'Tároló kiválasztása',
        selectFile: 'Fájl kiválasztása',
        blockMsg: 'Kép feltöltése',
        imageError: 'Csak képfájlok tölthetők fel: JPG, BMP, PNG.'
    },
    timeago: {
        settings: {
            strings: {
                prefixAgo: null,
                prefixFromNow: null,
                suffixAgo: null,
                suffixFromNow: null,
                inPast: 'bármikor',
                seconds: 'épp most',
                minute: '1 perce',
                minutes: '%d perce',
                hour: '1 órája',
                hours: '%d órája',
                day: 'tegnap',
                days: '%d napja',
                month: 'előző hónapban',
                months: '%d hónapja',
                year: 'tavaly',
                years: '%d éve',
                wordSeparator: ' ',
                numbers: []
            }
        }
    }
}