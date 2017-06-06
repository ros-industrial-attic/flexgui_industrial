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

iconService.$inject = ['$rootScope', '$sce'];

function iconService($rootScope, $sce) {
    var srv = {
        list: {
            "images/edit.png": {
                base: null
            },
            "images/help.png": {
                base: null
            },
            "images/openBelt.png": {
                base: null
            },
            'images/logo_small.png': {
                base: null
            },
            'images/logo.png': {
                base: null
            }
        },
        add: function (icon, base) {
            if (this.list[icon]) return;

            this.list[icon] = {
                base: base
            }
        },
        get: function (icon, original) {
            var item = this.list[icon];
            if (!item) return null;
            var base = (this.useGlobalBase && !original ? this.globalBase : item.base) || "";
            return  $sce.trustAsResourceUrl(base + icon);
        },
        useGlobalBase: false,
        globalBase: null
    }

    $rootScope.icons = srv;

    return srv;
}