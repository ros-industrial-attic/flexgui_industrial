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
 
clipboardService.$inject = ['projectService', 'deviceService', 'fidgetService'];

function clipboardService(projectService, deviceService, fidgetService) {
    var clipboardHandler = {
        //fidgets on the clipboard
        clipboard: [],
        alma: false,
        //copy selected items
        copy: function (fidgets) {
            clipboardHandler.clipboard = [];
            clipboardHandler.alma = !clipboardHandler.alma;
            angular.copy(fidgets, clipboardHandler.clipboard);
        },

        //cut selected items
        cut: function (fidgets) {
            clipboardHandler.copy(fidgets);

            angular.forEach(fidgets, function (fidget) {
                projectService.deleteFidget(fidget.parent, fidget);
            });

            deviceService.saveProject(true);
        },

        pasted: [],
        //paste items from clipboard
        paste: function (destinationContainer) {
            clipboardHandler.pasted = [];

            for (var i = 0; i < clipboardHandler.clipboard.length; i++) {
                var fidget = clipboardHandler.clipboard[i];
                clipboardHandler.pasteChild(fidget, destinationContainer, fidget.top, destinationContainer == projectService.currentScreen && fidget.left < $(".editBelt").width() ? $(".editBelt").width() : fidget.left);
            }

            deviceService.saveProject(true);
        },

        pasteChild: function (fidget, parent, top, left) {
            var newFidget = fidgetService.getFidget(fidget.root, fidget.source, left, top, fidget.properties, fidget.icon, fidget.name);
            newFidget.parent = parent;
            parent.fidgets.push(newFidget);
            clipboardHandler.pasted.push(newFidget);
            angular.forEach(fidget.fidgets, function (f) {
                clipboardHandler.pasteChild(f, newFidget, f.top, f.left);
            });
        }
    }

    return clipboardHandler;
}