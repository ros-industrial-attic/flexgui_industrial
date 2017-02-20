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
        unknownWizard: "<p>Vannak scriptek, amik nem futnak a jelenlegi verzión: </p>@0<p><br/>További információk <a target='_blank' href='https://www.ppm.no/flexgui4-Home/Index/pricing'>weboldalunkon</a> találhatók.</p>",
        addScriptTemplate: "Szkript sablon beszúrása",
        output: "Kimeneti kód",
        param: "Paraméterek",
        select: "Sablon választás",
        title: "Szkript sablon varázsló",
        templates: {
            createTopic: {
                title: "Topic létrehozása",
                help: "Egy topic hirdetése és opcionális feliratkozása a megadott típussal, névvel és egyszerű névvel. Az új topic útvonala '/wizard/[name]' lesz.",
                params: {
                    name: "Név",
                    type: "Típus",
                	subscribe: "Feliratkozás",
                	friendlyName: "Egyszerű név",
                	onChange: "Módosításkor lefutó szkript",
                }
            },
            changeScreen: {
            	title: "Képernyő váltás",
            	help: "Váltson képernyőt a kijelöltre.",
            	params: {
            		screen: "Képernyő",
            	},
            	error: "Hiba! Nem lehet nem létező képernyőre váltani: ",
            },
            connectorVariable: {
            	title: "Csatlakozó csomópont változója: inicializáció",
            	help: "Ez a sablon automatikusan kezeli a csomópont kiválasztott változóját. Megfelelően feliratkozik és létrehozza a szükséges lokális változókat. Javasolt ezt a sablont az induló szkript-be tenni.",
            	params: {
            		node: "Csomópont",
            		variable: "Változó",
            		friendlyName: "Egyszerű név",
            	}
            },
            getConnectorVariable: {
            	title: "Csatlakozó csomópont változója: érték lekérdezés",
            	help: "Ez a sablon visszatér a csomópont kiválasztott változójának lokálisan mentett értékével. Fidget tulajdonságok között célszerű ezt a függvényt használni.",
            	params: {
            		node: "Csomópont",
            		variable: "Változó",
            	}
            },
            setConnectorVariable: {
            	title: "Csatlakozó csomópont változója: érték beállítás",
            	help: "Ez a sablon beállítja a csomópont kiválasztott változójának lokálisan mentett értékét, majd szinkronizálja a ROS-al. Ezt a függvényt lehet a 'kattintás' eseményéhez rendelni például egy gomb Fidget-nek.",
            	params: {
            		node: "Csomópont",
            		variable: "Változó",
            		value: "Új érték",
            		operation: "Művelet",
            	}
            },
            getReadyConnectorVariable: {
            	title: "Csatlakozó csomópont változója: írásra kész",
            	help: "Ez a sablon igazzal tér vissza, ha a csomópont kiválasztott változója kész az írásra. Fidget tulajdonságok között célszerű ezt a függvényt használni.",
            	params: {
            		node: "Csomópont",
            		variable: "Változó",
            	}
            },
            autoDefine: {
            	title: "Változó definiálása, ha az még nem létezik",
            	help: "Ez a sablon ad egy változónak egy új értéket, ha az a változó még nem létezik. Ha a változó már létezik, semmi nem történik.",
            	params: {
            		variable: "Változó",
            		value: "Érték",
            	}
            },
            popup: {
            	title: "Felugró ablak megjelenítése",
            	help: "Ez a sablon egy szöveges felugró ablakot jelenít meg.",
            	params: {
            		message: "Üzenet",
            		type: "Típus",
            	}
            },
            timeout: {
            	title: "Szkript késleltetése",
            	help: "Ez a sablon egy szkript-et késleltet",
            	params: {
            		timeout: "Késleltetés (millisec)",
            		type: "Funkció",
            		name: "Név"
            	}
            },
            setFunction: {
            	title: "Funkció definiálása",
            	help: "Ez a sablon egy tetszőleges funkciót definiál. Ez a funkció később bárhol meghívható a FlexGui-n belül, a 'Funkció meghívása' sablonnal.",
            	params: {
            		name: "Funkció neve",
            		type: "Funkció",
            	}
            },
            publishTopic: {
                title: "Topic értékadás",
                help: "Amennyiben a topic létezik, új értéket rendel hozzá, amennyiben nem, létrehozza a topicot a választott értékkel és típussal.",
                params: {
                    path: "Útvonal",
                    value: "Érték",
                    type: "Típus"
                }
            },
            callFunction: {
            	title: "Funkció meghívása",
            	help: "Ez a sablon meghív egy tetszőleges funkciót. Bármely funkciót meg lehet hívni, amely a 'Funkció definiálása' sablonnal lett meghívva bárhol a FlexGui-ban.",
            	params: {
            		name: "Funkció neve",
            	},
            	error: "Hiba! Nem definiált funkciót nem lehet meghívni: ",
            },
            callService: {
            	title: "Szolgáltatás hívása",
            	help: "Ez a sablon meghívja a csomópont választott kiválasztott szolgáltatását. Ahhoz, hogy jól működjön a funkció, a paraméterek formátumát pontosan kell megadni a kód injektálás után.",
            	params: {
            		node: "Csomópont",
            		service: "Szolgáltatás",
            		parameter: "Paraméter",
            		callback: "Visszatérő függvény",
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
        remoteView: 'Remote view',
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
            _fps: 'FPS',
            _fpsValues: ["Alacsony", "Közepes", "Magas"],
            _dockKeyboard: 'Dokkoló billentyűzet',
            _showKeyboard: 'Mindig mutassa a billentyűzetet',
            _font: "Betűtípus",
            _icon: "Ikon",
            _width: 'Szélesség',
            _height: 'Magasság',
            _opacity: 'Láthatóság',
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
            _scale: 'Skála',
            source: 'Forrás',
            _onColor: 'Bekapcsolt szín',
            _offColor: 'Kikapcsolt szín',
            _blinking: 'Villog',
            _blinkFrequency: 'Villogás gyakorisága (Hz)',
            _screenLink: 'Képernyő',
            _borderColor: 'Keret szín',
            _borderWidth: 'Keret vastagság',
            onClick: 'Kattintásra',
            name: 'Név',
            _node: 'ROS csomópont neve',
            hasScreenBelt: "Screenbelt láthatósága",
            logo: 'Logó',
            logoWidth: 'Logó szélesség',
            logoPosition: 'Logó pozíció',
            logoPositions: {
                bottomRight: 'Jobb lent',
                bottomLeft: 'Bal lent',
                topLeft: 'Bal fent',
                topRight: 'Jobb fent'
            },
            _top: 'Teteje',
            _left: 'Bal széle',
            _enabled: 'Engedélyezett'
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
            backup: {
                title: 'Automatikus mentés',
                restore: 'Visszaállítás',
                size: 'Méret',
                date: 'Időpont',
                failed: 'A mentés sikertelen, mert a tárhely megtelt',
                keepLast: 'Csak az utolsó megtartása',
                disableBackup: 'Mentés kikapcsolása',
                enableBackup: 'Mentés bekapcsolva'
            },
            timers: {
                title: 'Időzítők',
                delay: 'Késleltetés',
                repeat: 'Ismétlés',
                enabled: 'Engedélyezett',
                name: 'Név',
                action: 'Akció',
                duplicatedError: 'A megadott névvel már van létrehozva a Friendly változók között elem. Kérjük válasszon másikat!'
            },
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
                noteUseMobileMemory: '<i><u><b>Fontos:</b></u> A belső memóriát használja a projektek átvitele folyamán!</i>',
                uploadImagesConfirm: 'Felülírja az aktuális képeket a projektben levőkkel?'
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
                gridSizeError: 'A méretnek 30 és 200 között kell lennie',
                forceBelt: 'Erőltesse a képernyő sávot',
                forceBeltSwitchLabel: 'Ennek beállításával a képernyő sáv mindenképp meg fog jelenni',
                autoScale: 'Automatikus méretezés',
                pinchEnabled: 'Kétujjas nagyítás',
                switchPinchEnabled: 'Itt lehet jelölni, hogy a kétujjas nagyítás engedélyezve legyen-e a mobil eszközökön'
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
                nodeUnselected: 'Válasszon ki egy csomópontot a tulajdonságok lekérdezéséhez',
                topicOfflineError: "A topic jelenleg nem elérhető, ezért az értéket nem lehet megváltoztatni!",
                topicOutOfDateWarning: "A topic még nem volt frissítve az indítás óta, így elképzelhető hogy nem az aktuális értéket mutatja. Elküldi a beállított értéket a szervernek?"
            },
            conn: {
                description: 'Használni kívánt ROS Server beállításai. Offline módhoz jelöld be a demó módot',
                title: 'ROS Server beállítások',
                ip: 'IP',
                port: 'Port',
                offlineMode: 'Demó mód',
                offlineModeSwitch: 'Jelölje be a demó mód aktiválásához',
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
            },
            userMode: {
                title: "Felhasználó mód",
                modeSwitch: "Itt lehet korlátozni a FlexGui képernyők elérését",
                password: "Rendszergazdai jelszó",
                confirmPassword: "Jelszó ellenőrzés",
                passwordError: "A két jelszó mező nem egyezik!"
            }
        }
    },
    messenger: {
        invalidUsernamePassword: 'A felhasználónév/jelszó páros hibás. Kérem elennőrizze és próbálja újra.',
        missingLoginData: 'Hibás beállítások, kérjük a Beállítások/Üzenetek menüben adja meg a helyes értékeket.',
        enterMessage: 'Üzenet írása...',
        expertUsername: "Expert felhasználó neve",
        checkToEnableMessenger: "A beépített üzenetküldő engedélyezésének ki-be kapcsolása",
        messengerEnabled: "Engedélyezze a beépített üzenetküldőt"
    },
    popup: {
        title: 'FlexGui üzenetek'
    },
    timers: {
        alreadyRunningError: 'Ez az időzítő már fut!',
        disableAll: 'Mind leállítása',
        createNew: 'Új létrehozása'
    },
    buttons: {
        start: 'Indítás',
        stop: 'Megállítás',
        add: 'Hozzáadás',
        edit: 'Szerkesztés',
        duplicate: 'Másolás',
        cancel: 'Mégse',
        clear: 'Töröl',
        save: 'Mentés',
        close: 'Bezárás',
        closeAll: 'Mind bezárása',
        remove: 'Töröl',
        reconnect: 'Újrakapcsolódás',
        connect: 'Kapcsolódás',
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
        addScreen: 'Új képernyő',
        disable: 'Letiltás'
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
            text: 'Inicializáló szkript-ek megadására szolgál a program indulásakor, például saját változók hozhatók létre segítségével.'
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
        },
        userMode: {
            header: 'Felhasználó mód',
            content: 'Itt lehet korlátozni a FlexGui képernyők elérését. <h5>Jelszó</h5>Be lehet állítani egy jelszót az adminisztrátor módhoz. Az alapértelmezett jelszó: \"admin\"'
        },
        timers: {
            header: 'Időzítők',
            content: 'Időzítőkkel késleltetéseket és ismételt időintervallumokat lehet beállítani. Az <b>ismétlés</b> kijelölésével lehet intervallumot beállítani. Az intervallum folyamatosan ismétli magát addig, amíg a gomb ki van pipálva, vagy az időzítő nincs kézzel megállítva. Az időzítő minimum ideje 30 millisec.'
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
        callError: 'Demó módban nem lehet hívást indítani!'
    },
    ros: {
    	connectionError: 'Hiba a szerverhez való kapcsolódás során ',
    	connectionErrorBody: 'Nem tudunk a ROS szerverhez csatlakonzni, vagy a kapcsolat megszakadt. Ha újra szeretne csatlakozni, nyomja meg az <b>Újrakapcsolódás</b> gombot, vagy válassza a <b>Demó módot</b> offline munkához. <br /> További információért keresse fel weboldalunk  <a href="https://www.ppm.no/flexgui4-Home/Index/downloads">letöltések</a> aldoldalát, ahol további információkkal szolgálunk a ROS serverek beállítását illetően.',
    	reconnect: 'Újrakapcsolódás',
    	back: 'Vissza',
    	offlineMode: 'Demó mód',
    	demoBody: 'Szeretné megőrizni a <b>jelenlegi</b> projektet? A projekt megőrzése felül fogja írni korábbi offline projektjét!',
    	keepProject: 'Projekt megőrzése',
    	discardProject: 'Projekt elvetése',
    	communicationInitError: 'Kommunikációs hiba',
    	versionIsNotLatest: {
    	    body: "Ez a projekt nem a legfrissebb verziójú FlexGui-val lett elmentve. Szeretné a projektet frissíteni, aminek során esetleges változtatások vagy felülírások történhetnek a projektben?",
    	    title: "A projekt verziója nem a legfrissebb",
    	    overwrite: "Írja felül a szerveren",
    	    update: "Frissítse a lokális verziót"
    	},
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
    nachiLink: {
        addVariable: "Változó hozzáadása",
        connectionsTab: "Kapcsolatok",
        connectionError: "Nem lehet kapcsolódni: @0",
        secure: "Biztonságos",
        IP: "IP",
        port: "Port",
        connected: "Kapcsolódva",
        Name: "Név",
        createNew: "Új létrehozása",
        reconnect: "Újrakapcsolódás",
        zeroConnection: "Nincsenek direkt kapcsolatok...",
        nameLocked: "A név a csatlakozott FlexGui-tól származik, nem lehet megváltoztatni"
    },
    images: {
        title: 'Kép böngésző',
        imagesTabTitle: 'Képek',
        uploadTabTitle: 'Feltöltés',
        resizeAlert: 'A kép át lesz méreteze max. 1024x768 felbontásra',
        selectSlot: 'Tároló kiválasztása',
        selectFile: 'Fájl kiválasztása',
        blockMsg: 'Kép feltöltése',
        imageError: 'Csak képfájlok tölthetők fel: JPG, BMP, PNG.',
        confirmOverwrite: 'Felülírja az aktuális képet?'
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
    },
    diagnostics: {
        cancel: "Mégse",
        close: "Bezárás",
        save: "Mentés",
        editTest: "Teszt szerkesztése",
        newtest: "Új teszt",
        userDefineCheck: "Saját szkript-et szeretnék írni",
        name: "Név",
        script: "Szkript",
        params: "Paraméterek",
        selected: "Kiválasztott",
        tests: {
            stressTest: {
                name: "Igénybevétel tesztje",
                description: "A kiválasztott szolgáltatást meghívja N-szer",
                params: {
                    n: { description: 'A szolgáltatást meghívja N-szer' },
                    servicePath: { description: 'Szolgáltatás útja, pl.: /rosapi/publishers' },
                    params: { description: 'Szolgáltatás paraméterei JSON formátumban, pl.: {"paramName": "value"}' },
                    limit: { desciption: 'A teszt sikeres, ha a maximális visszajelzés ideje kisebb, mint a beállított limit.' }
                }
            },
            getTopicRespTime: {
                name: "ROS topikok visszajelzési ideje",
                description: "Lefuttatja a rosapi/topics szolgáltatást és leméri a kérés és visszajelzés között eltelt időt.",
                params: {
                    limit: { desciption: 'A teszt sikeres, ha a maximális visszajelzés ideje kisebb, mint a beállított limit.' }
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
                name: "Topic frissítési ráta",
                description: "Kiszámolja az átlagos frissítési idejét a választott csomópont topikjainak",
                params: {
                    nodeName: { description: 'A tesztelt csomópont neve, pl.: FlexGuiNode' },
                    timeout: { description: 'A mérés hossza másodpercekben megadva' },
                    limit: { desciption: 'A teszt sikeres, ha a frissítés ideje kisebb, mint a beállított limit.' }
                }
            },
            offlineTopics: {
                name: "Offline topikok",
                description: "Lekérdezi az offline topikjait a kiválasztott csomópontnak",
                params: {
                    nodeName: { description: 'A tesztelt csomópont neve, pl.: FlexGuiNode' }
                }
            },
            serviceCallRespTime: {
                name: 'Szolgáltatás visszajelzésének ideje',
                description: "Meghívja a kiválasztott szolgáltatást és leméri a kérés és visszajelzés idejét millisec-ben mérve.",
                params: {
                    servicePath: { description: 'Szolgáltatás útvonala, pl.: /rosapi/publishers' },
                    params: { description: 'Szolgáltatás paraméterei JSON formátumban, pl.: {"paramName": "value"}' },
                    limit: { desciption: 'A teszt sikeres, ha a maximális visszajelzés ideje kisebb, mint a beállított limit.' }
                }
            },
            rosConnection: {
                name: 'ROS kapcsolat',
                description: "ROS kapcsolódás ellenőrzése",
                params: {
                    limit: { desciption: 'A maximum válaszidőnek az érték alatt kell maradnia (ms).' }
                }
            }
        },
        resultTitle: "Diagnosztika eredményei",
    }
}