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

fidgetService.$inject = ['enumService', 'variableService', 'colorPickerService', 'scriptManagerService', '$sce', '$http', '$timeout', '$rootScope'];

function fidgetService(enumService, variableService, colorPickerService, scriptManagerService, $sce, $http, $timeout, $rootScope) {
    var fidgets = {
        getFidget: function (root, source, left, top, properties, icon, name, template) {
            var result = {
                root: root,
                source: source,
                properties: angular.copy(properties),
                icon: icon,
                name: name,
                template: template
            };
            result.properties._left = left;
            result.properties._top = top;

            if (result.source == "fidgetGroup") {
                result.fidgets = [];
            }

            fidgets.defineProperties(result);

            //adding onClick to all fidgets, if not defined explicitely

            return result;
        },

        //stores if the property is a script or not
        //determining this costs a lot, we should not repeat
        scriptDict: {},

        //template not found for these fidgets, possibly they are from an addon, check later
        templatelessFidgets: [],
        nextTemplateCheck: null,
        templateCheckCount: 10,
        reCheckTemplate: function () {
            fidgets.templateCheckCount--;
            angular.forEach(fidgets.templatelessFidgets, function (fidget) {
                //watch for available templates
                if (fidgets.templates[fidget.source]) {
                    //set template
                    fidget.template = fidgets.templates[fidget.source];

                    //remove template from array
                    fidgets.templatelessFidgets.splice(fidgets.templatelessFidgets.indexOf(fidget), 1);
                } else {
                    //fidget template still not found
                }
            });

            //recheck after some time
            if (fidgets.templatelessFidgets.length > 0 && fidgets.templateCheckCount > 0) {
                if (fidgets.nextTemplateCheck) {
                    window.clearTimeout(fidgets.nextTemplateCheck);
                    fidgets.nextTemplateCheck = null;
                }

                fidgets.nextTemplateCheck = window.setTimeout(fidgets.reCheckTemplate, 1000);
            }
        },
        calculateSizeAndPosProperty: function (fidget, propertyName, currentValue, sizeAndPos) {
            //get all of the % parts
            var reg = /(\d*%)/g;
            var matches = [], values = [], found;
            while (found = reg.exec(currentValue)) {
                matches.push(found[0]);
            }

            var originalValue = currentValue;
            angular.forEach(matches, function (m) {
                //calculate from property
                var cprop = sizeAndPos[sizeAndPos.indexOf(propertyName) % 2];
                //parent property value
                var pprop = fidget.containerLevel == 1 ? parseInt($("#currentScreen").css(cprop.substring(1))) : fidget.parent.properties[cprop.substring(1)];

                if (["fidgetGroup"].indexOf(fidget.parent.source) > -1) {
                    pprop = pprop - 2 * fidget.parent.properties["borderWidth"];
                }

                //use the css prop of the screen if the parent is the current screen
                //else the container's property
                var v = parseInt(pprop * (m.substring(0, m.length - 1) / 100)); // + "/* cprop: " + cprop + "; pprop: " + pprop + " */";
                //replace the calculated value
                currentValue = scriptManager.replaceAll(currentValue, m, v);
            });

            try{
                return Number(eval(scriptManagerService.compile(currentValue)));
            } catch (e) {

            }
        },

        //define properties for "private" (props starts with '_') members and sets up the comm. with the device
        defineProperties: function (fidget, isTemplate) {
            //generate unique id for the fidget if it is null
            if (!fidget.id)
                fidget.id = "fidget_" + variableService.guid();

            //if we are loading a html from the trial server, it is in a different "domain", we have to trust that domain manually
            //to handle everything on the same way, we can trust in every fidget's URL
            if (isTemplate) {
                fidget.trustedUrl = $sce.trustAsResourceUrl(fidget.root + fidget.source + ".html");
            } else {
                fidget.template = fidgets.templates[fidget.source];
                //if the template is not loaded
                if (!fidget.template) {
                    //set a default template
                    fidget.template = fidgets.getTemplate("views/fidgets/", "default", { _width: 200, _height: 200 }, enumService.screenTypesEnum.All);
                    //add to templateless fidgets for later recheck
                    fidgets.templatelessFidgets.push(fidget);
                }
            }

            var fidgetGet = function (fidget, properties, propertyName) {
                if ([null, undefined, ""].indexOf(properties[propertyName]) != -1) {
                    return;
                }

                function isFloat(n) {
                    return n == Number(n) && n % 1 !== 0 && !isBoolan(n) && n !== "";
                }

                function isInteger(n) {
                    return n == Number(n) && n % 1 === 0 && !isBoolan(n) && n !== "";
                }

                function isBoolan(b) {
                    //var val = JSON.parse(JSON.stringify(b));
                    return (b === true || b === false || b === "true" || b === "false") && b !== "";
                }

                var currentValue = properties[propertyName];
                var sizeAndPos = ["_height", "_width", "_top", "_left"];

                //percentage check in position and size and convert value
                if (sizeAndPos.indexOf(propertyName) > -1 &&
                    !isFloat(currentValue) &&
                    !isInteger(currentValue) &&
                    currentValue.toString().indexOf("%") > -1) {

                    return fidgets.calculateSizeAndPosProperty(fidget, propertyName, currentValue, sizeAndPos);
                }

                if (!(currentValue in fidgets.scriptDict)) {
                    if (variableService == undefined || currentValue === 0)
                        fidgets.scriptDict[currentValue] = false;
                    else {
                        try {
                            eval(scriptManagerService.compile(currentValue));
                            fidgets.scriptDict[currentValue] = true;
                        }
                        catch (e) {
                            fidgets.scriptDict[currentValue] = false;
                        }
                    }
                }

                if (fidgets.scriptDict[currentValue]) {
                    var value = eval(scriptManagerService.compile(currentValue));

                    if (["object", "function"].indexOf(typeof value) > -1) {
                        //if it is not a simple object, return with the string
                        return currentValue;
                    }

                    if (isFloat(value)) {
                        return Number(Number(value).toFixed(3));
                    } else if (isInteger(value)) {
                        return Number(value);
                    } else if (isBoolan(value)) {
                        return value == "true" || value == true || value == 1;
                    }
                    else {
                        return decodeURI(value);
                    }
                }
                else
                    return currentValue;
            };

            var fidgetSet = function (fidget, properties, propertyName, v) {
                //if the _value is empty, we can return
                if ([null, undefined, ""].indexOf(properties[propertyName]) != -1) {
                    return;
                }

                try {
                    //compile property to be able to use friendly names
                    var compiledProp = scriptManagerService.compile(properties[propertyName]);
                    if (eval("typeof " + compiledProp + " == 'string'") || fidget.source == "textInput") {
                        eval(compiledProp + "= \"" + encodeURI(v) + "\"");
                    } else {
                        eval(compiledProp + "= " + v);
                    }

                } catch (e) {
                    properties[propertyName] = v;
                }
            };

            for (var property in fidget.properties) {
                if (property.lastIndexOf("_", 0) === 0) {

                    //private property, create public getter setter for the angular ng-model 2 way binding. 
                    //with the getter we can get the value from the device if possible
                    //with the setter we can update the value on the device if possible

                    //The definition is done this way to have definition-time info about the calling variable. 
                    //Without this we would not know who called the getter as 'this' refers to the object itself, not the getter or the property.
                    var definePropertyfidget = "Object.defineProperty(fidget.properties, property.substring(1), { configurable: true,";
                    definePropertyfidget += "get: function () { return fidgetGet(fidget, this, \"" + property + "\")},";
                    definePropertyfidget += "set: function (v) { return fidgetSet(fidget, this, \"" + property + "\", v)}})";

                    eval(definePropertyfidget);
                }
            }
        },

        getTemplate: function (root, source, properties, forScreenType, icon, propertyLabels) {
            var template = {
                root: root,
                icon: icon,
                forScreenType: forScreenType,
                source: source,
                hidden: forScreenType == enumService.screenTypesEnum.Factory,
                properties: properties,
                name: localization.currentLocal.fidgets[source],
                propertyLabels: propertyLabels
            };

            //define common properties
            template.properties["_top"] = 0;
            template.properties["_left"] = 0;
            template.properties["_enabled"] = true;

            fidgets.defineProperties(template, true);

            return template;
        }
    };

    fidgets.fonts = ['inherit', '"Courier New", Courier, monospace', '"Lucida Console", Monaco, monospace', 'Verdana, Geneva, sans-serif', 'Arial, Helvetica, sans-serif', '"Arial Black", Gadget, sans-serif', 'Impact, Charcoal, sans-serif', 'Georgia, serif', '"Times New Roman", Times, serif', '"Palatino Linotype", "Book Antiqua", Palatino, serif'];

    fidgets.templates = {
        "fidgetGroup": fidgets.getTemplate("views/fidgets/", "fidgetGroup", { layout: "", _margin: 10, _width: 200, _height: 200, _color: '#D1D1D1', _opacity: 0.7, _borderColor: "#000000", _borderWidth: "0" }, enumService.screenTypesEnum.All, "images/fidgets/box.png"),
        "progressBar": fidgets.getTemplate("views/fidgets/", "progressBar", { _width: 100, _height: 30, _value: "variableService.demo.int", _color: '#ff0000', _fontColor: '' }, enumService.screenTypesEnum.Normal),
        "button": fidgets.getTemplate("views/fidgets/", "button", { _width: 100, _height: 30, _text: "Click me", _font: "inherit", _fontSize: 12, _color: "", onClick: "#message('Default button action.')" }, enumService.screenTypesEnum.Normal),
        "checkBox": fidgets.getTemplate("views/fidgets/", "checkBox", { _width: 100, _height: 30, _text: "Check me", _value: "variableService.demo.bool", _fontColor: "#000000", _font: "inherit", _fontSize: 16 }, enumService.screenTypesEnum.Normal),
        "textInput": fidgets.getTemplate("views/fidgets/", "textInput", { _width: 100, _height: 30, _text: "variableService.demo.string" }, enumService.screenTypesEnum.Normal, "images/fidgets/textinput.png"),
        "text": fidgets.getTemplate("views/fidgets/", "text", { _textAlign: "left", _font: "inherit", _width: 100, _height: 25, _fontSize: 16, _color: "#000000", _text: "variableService.demo.string" }, enumService.screenTypesEnum.All, "images/fidgets/text.png"),
        "scrollableText": fidgets.getTemplate("views/fidgets/", "scrollableText", { _textAlign: "left", _font: "inherit", _width: 100, _height: 100, _fontSize: 12, _color: "#000000", _text: "variableService.demo.string" }, enumService.screenTypesEnum.All, "images/fidgets/multilinetext.png"),
        "slider": fidgets.getTemplate("views/fidgets/", "slider", { _width: 100, _height: 30, _value: "variableService.demo.int", _min: 0, _max: 100, _step: 0.1 }, enumService.screenTypesEnum.Normal),
        "radioButton": fidgets.getTemplate("views/fidgets/", "radioButton", { _width: 100, _height: 100, _value: "'Option1'", _options: 'Option1,Option2', _font: "inherit", _fontSize: 16, _fontColor: "#000000" }, enumService.screenTypesEnum.Normal),
        "fullgauge": fidgets.getTemplate("views/fidgets/", "fullgauge", { _width: 80, _height: 80, _value: "variableService.demo.int", _color: '#ff0000', _angleOffset: 0, _angleArc: 360, _step: 0.1, _min: 0.0, _max: 100.0, _lock: false }, enumService.screenTypesEnum.Normal),
        "boolean": fidgets.getTemplate("views/fidgets/", "boolean", { _width: 100, _height: 30, _font: "inherit", _fontSize: 16, _color: "#000000", _text: "Bool value", _value: "variableService.demo.bool" }, enumService.screenTypesEnum.Normal),
        "image": fidgets.getTemplate("views/fidgets/", "image", { _width: 100, _height: 100, _value: "variableService.demo.image", scale: 'aspectFit' }, enumService.screenTypesEnum.Normal, "images/image-not-found.png"),
        "indicatorLamp": fidgets.getTemplate("views/fidgets/", "indicatorLamp", { _width: 100, _height: 30, _text: "Indicate", _value: "variableService.demo.bool", _onColor: '#00ff00', _offColor: '#ff0000', _fontColor: "#000000", _blinking: false, _blinkFrequency: 1 }, enumService.screenTypesEnum.Normal)
    };

    $rootScope.$watch(function () { return fidgets.templatelessFidgets.length; }, function () {
        fidgets.templateCheckCount = 10;
        fidgets.reCheckTemplate();
    });

    return fidgets;
}