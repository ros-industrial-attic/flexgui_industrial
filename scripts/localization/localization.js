var localization = {
    //current language
    currentLanguage: localStorage.getItem('language') || 'en',

    //available languages
    languages: [],
    
    format: function (item, params) {
        var reg = /(\@+[0-9]*)/g;
        var matches = [], found;
        while (found = reg.exec(item)) {
            matches.push(found[0]);
        }

        for (var i = 0; i < matches.length; i++) {
            item = item.replace(new RegExp(matches[i], 'g'), params[matches[i].substring(1)]);
        }

        return item;
    },

    //translations
    items: {

    },

    keyStrings: { en: [], hu: [], de: [], ko: [], it: [] }, diff: [],
    getProperties: function(obj, current, lang) {

        if (typeof obj === "string" || !obj) return;

        //get properties of obj
        angular.forEach(Object.keys(obj), function (key) {

            //create property string
            var propString = current + ( current == "" ? "" : "." ) + key;

            //add to keys
            localization.keyStrings[lang].push(propString);

            //go deeper
            localization.getProperties(obj[key], propString, lang);
        });
    },

    getLanguage: function(langObj, key){
        localization.getProperties(langObj, "", key);
        var items = "";
        angular.forEach(localization.keyStrings[key], function (p) {
            var i = "localization.items.en." + p;
            if (typeof eval(i) === 'string')
                items += p + "; " + eval(i) + "\r\n";
        });

        console.log(items);
    },

    compare: function(){
        localization.getProperties(localization.items.en, "", "en");
        localization.getProperties(localization.items.de, "", "de");
        localization.getProperties(localization.items.hu, "", "hu");
        localization.getProperties(localization.items.ko, "", "ko");
        localization.getProperties(localization.items.it, "", "it");

        function arr_diff(a1, a2) {
            var a = [], diff = [];
            for (var i = 0; i < a1.length; i++) {
                a[a1[i]] = true;
            }

            for (var i = 0; i < a2.length; i++) {
                if (a[a2[i]]) {
                    delete a[a2[i]];
                } else {
                    a[a2[i]] = true;
                }
            }

            for (var k in a) {
                diff.push(k);
            }

            return diff;
        };

        console.log("Missing from de: ", arr_diff(localization.keyStrings.en, localization.keyStrings.de));
        console.log("Missing from hu: ", arr_diff(localization.keyStrings.en, localization.keyStrings.hu));
        console.log("Missing from ko: ", arr_diff(localization.keyStrings.en, localization.keyStrings.it));
        console.log("Missing from it: ", arr_diff(localization.keyStrings.en, localization.keyStrings.ko));
    }
}

//property for the view, gets the active items
Object.defineProperty(localization, 'currentLocal', {
    get: function () {
        return localization.items[localization.currentLanguage];
    }
});

