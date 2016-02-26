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
    general: {
        emptyList: 'Üres lista',
        background: 'Háttér',
        backgroundColor: 'Háttér szín',
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
        blockMsg: 'Kérjük várjon...'
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
        messenger: 'Messenger',
        progressBar: 'Állapotjelző',
        fidgetGroup: 'Fidget Group',
        button: 'Gomb',
        checkBox: 'Jelölőnégyzet',
        textInput: 'Szöveg bevitel',
        text: 'Szöveg',
        variableSelector: 'Változók',
        scrollableText: 'Görgethető szöveg',
        slider: 'Csúszka',
        radioButton: 'Rádiógomb',
        gauge: 'Mérce',
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
            _width: 'Szélesség',
            _height: 'Magasság',
            _angle: 'Forgatás',
            _value: 'Érték',
            _color: 'Szín',
            _text: 'Szöveg',
            _fontSize: 'Betűméret',
            _min: 'Minimum',
            _max: 'Maximum',
            _step: 'Lépték',
            _precision: 'Pontosság',
            _options: 'Lista',
            opacity: 'Átlátszóság',
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
            _fontColor: 'Betű szín',
            onClick: 'Kattintás',
            backgroundColor: 'Background color',
            image: "Image",
            color: "Color",
            name: 'Név',
            _node: 'ROS Node name'
        }
    },
    properties: {
        title: '@0 tulajdonságai',
        aspectFit: 'Képarány megtartása, minden látható',
        aspectCrop: 'Képarány megtartása, vágás',
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
            project: {
                title: 'Projekt',
                uploadNote: 'Projekt feltöltés esetén a jelenlegi projekt felülíródik!',
                uploadConfirm: 'Felül akarja írni az aktuális projektet?',
                upload: 'Feltöltés',
                download: 'Letöltés',
                uploadComplete: 'A feltöltés elkészült!',
                savedToMobile: 'A project fájl elmentve a gyökér könyvtárba: ',
                savedFailed: 'Hiba a mentés folyamán',
                noteUseMobileMemory: '<i><u><b>Fontos:</b></u> A belső memóriát használja a projektek átvitele folyamán!</i>'
            },
            language: {
                title: 'Language',
                languageSelectNote: 'Please note, that FlexGui will reload if you change this value!',
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
                demoAlert: 'Demo módban ez a funkció nem elérhető',
                nodeUnselected: 'Válasszon ki egy csomópontot a tulajdonságok lekérdezéséhez'
            },
            conn: {
                title: 'Csatlakozási beállítások',
                ip: 'IP',
                port: 'Port',
                demoMode: 'Demó mód',
                demoModeSwitch: 'Jelölje be a demó mód aktiválásához'
            },
            messenger: {
                title: 'Messenger'
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
        missingLoginData: 'Hiányzó messenger beállítások, kérjük a beállítások menübent adja meg a helyes értékeket.',
        enterMessage: 'Üzenet írása...',
        expertUsername: "Expert felhasználó neve"
    },
    popup: {
        title: 'FlexGui üzenetek'
    },
    buttons: {
        cancel: 'Mégse',
        clear: 'Ürít',
        save: 'Mentés',
        close: 'Bezárás',
        closeAll: 'Mind bezárása',
        remove: 'Töröl',
        reconnect: 'Újrakapcsolódás',
        select: 'Kiválaszt',
        removeBackground: 'Töröl',
        pick: 'Választ...',
        toBack: 'Háttérbe küldés',
        backward: 'Hátra köldés egyel',
        toFront: 'Előtérbe hozás',
        forward: 'Előre hozás egyel',
        moveUp: 'Fel',
        moveDown: 'Le',
        addScreen: 'Új képernyő...',
        addFactoryScreen: 'Gyár',
        login: 'Login',
        addNormalScreen: 'Normál',
        upload: 'Feltöltés',
        download: 'Letöltés'
    },
    editMode: {
        switchLabel: 'Szerkesztő',
        settings: 'Beállítások',
        properties: 'Tulajdonságok',
        multiSelect: 'Több kijelölése',
        unSelect: 'Kijelölés törlése',
        undo: 'Vissza',
        redo: 'Újra',
        copy: 'Másol',
        cut: 'Kivág',
        paste: 'Beilleszt'
    },
    help: {
        label: 'Segítség',
        off: 'Segítség kikapcsolása',
        screenBelt: {
            screen: 'Képernyő',
            screenText: 'A képernyő sávon látható az összes projekthez tartozó képernyő. Szimpla kattintásra megnyílik, hosszú kattintásra megnyílnak a beállításai',
            newScreen: 'Új képernyő',
            newScreenText: 'Új képernyőt a képernyő sávon található "+" jel megnyomásával adhat hozzá. A képernyő átnevezhető hosszú kattintás után.',
            properties: 'Tulajdonságok sáv',
            propertiesText: 'A Fidgetek tulajdonságok beltre történő mozgatásával megnyitható a fidgetek tulajdonságai ablak. A fidget pozíciója visszaáll a megnyitás előtti helyzetre.'
        },
        initScript: {
            text: 'Inicializáló szkriptek megadására szolgál program indulásakor, például saját változók hozhatók létre segítségével.'
        },
        settings: {
            scale: 'Zoom beállítása',
            scaleText: 'Mobil eszközök alapértelmezett zoomolása állítható be ennek a segítségével.',
            scaleNote: 'Fontos: csak mobil eszközökön használható. Asztali böngészőben kérjük használja a böngésző zoom funkcióját!',
            help: 'Segítségek megjelenítése',
            helpText: 'Az <span class="glyphicon glyphicon-question-sign"></span> ikonok megjelenítésére / elrejtésére szolgál.'
        },
        fidgetBelt: {
            fidgets: 'Fidgetek',
            fidgetsText: 'A fidget sávon található eszközöket drag and drop segítéségével elhelyezheti a képernyőn.',
            deleteBelt: 'Törlés sáv',
            deleteBeltText: 'A törlés sávra húzással törölhető az adott fidget.'
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
        },
        cameraImage: {
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
        connectionError: 'Hiba a ROS serverhez történő kapcsolódás során ',
        communicationInitError: 'Kommunikációs hiba',
        interfaces: {
            type: 'Típus',
            originalName: 'Név',
            friendlyName: 'Elnevezés',
            subscribe: 'Feliratkozás',
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