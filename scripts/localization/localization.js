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
    }
}

//property for the view, gets the active items
Object.defineProperty(localization, 'currentLocal', {
    get: function () {
        return localization.items[localization.currentLanguage];
    }
});
