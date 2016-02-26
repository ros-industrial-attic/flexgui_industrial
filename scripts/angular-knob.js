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
 


//angular wrapper for jquery knob
angular.module('jg.knob', []).directive('jgKnob', function () {
    return {
        restrict: 'AE',
        require: 'ngModel',
        //module properties
        scope: {
            displayInput: "=",
            cursor: "=",
            width: "=",
            min: "=",
            max: "=",
            gaugeStep: "=",
            lineCap: "=",
            ngModel:'=',
            angleOffset: "=",
            linecap: "=",
            fgColor: "=",
            angleArc: "=",
            value: "=",
        },
        link: function (scope, elm, attrs, ngModel) {

            ngModel.$render = function () {
                elm.val(ngModel.$viewValue).trigger("change");
            };

            elm.knob({
                displayInput: scope.displayInput,
                cursor: scope.cursor,
                width: scope.width,
                height: scope.width,
                min: scope.min,
                max: scope.max,
                step: scope.gaugeStep,
                angleOffset: scope.angleOffset,
                lineCap: scope.linecap,
                fgColor: scope.fgColor,
                angleArc: scope.angleArc,
                change: function (value) {
                    ngModel.$setViewValue(value);
                }
            });
       
            /* setup the watches for property change */
            scope.$watch('width', function () {
                if (typeof scope.width !== 'undefined') {
                    elm.trigger('configure', { width: scope.width, height: scope.width });
                }
            });

            scope.$watch('fgColor', function () {
                if (typeof scope.fgColor !== 'undefined') {
                    elm.trigger('configure', { fgColor: scope.fgColor, inputColor: scope.fgColor });
                }
            });

            scope.$watch('value', function () {
                if (typeof scope.value !== 'undefined') {
                    elm.val(scope.value).trigger('change');
                }
            });

            scope.$watch('min', function () {
                if (typeof scope.min !== 'undefined') {
                    elm.trigger('configure', { "min": scope.min });
                }
            });

            scope.$watch('max', function () {
                if (typeof scope.max !== 'undefined') {
                    elm.trigger('configure', { "max": scope.max });
                }
            });

            scope.$watch('gaugeStep', function () {
                if (typeof scope.gaugeStep !== 'undefined') {
                    elm.trigger('configure', { "step": scope.gaugeStep });
                }
            });

            scope.$watch('angleArc', function () {
                if (typeof scope.angleArc !== 'undefined') {
                    elm.trigger('configure', { "angleArc": scope.angleArc });
                }
            });

            scope.$watch('angleOffset', function () {
                if (typeof scope.angleOffset !== 'undefined') {
                    elm.trigger('configure', { "angleOffset": scope.angleOffset });
                }
            });
        },
    }
});