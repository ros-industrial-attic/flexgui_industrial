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

historyService.$inject = ['projectService'];

function historyService(projectService) {

    var historyHandler = {
        //history
        history: [],

        //state index in the saved history
        currentHistoryIndex: -1,

        //load project state
        loadState: function (proj, callback) {
            if (!proj) return;

            var forceScreenBelt = projectService.forceScreenBelt;
            projectService.load(proj);
            projectService.forceScreenBelt = forceScreenBelt;
        },

        clearHistory: function(){
            historyHandler.currentHistoryIndex = -1;
            historyHandler.history = [];
        },

        //restore prev state
        undo: function () {
            historyHandler.currentHistoryIndex--;
            historyHandler.loadState(projectService.parseJSON(historyHandler.history[historyHandler.currentHistoryIndex]));
        },

        //restore next state
        redo: function () {
            historyHandler.currentHistoryIndex++;
            historyHandler.loadState(projectService.parseJSON(historyHandler.history[historyHandler.currentHistoryIndex]));
        },

        //save current project state to history
        saveState: function () {
            if (historyHandler.currentHistoryIndex < historyHandler.history.length) {
                historyHandler.history.splice(historyHandler.currentHistoryIndex + 1, historyHandler.history.length - historyHandler.currentHistoryIndex + 1);
            }
            var seen = [];
            historyHandler.history.push(projectService.toJSON(null, false));
            historyHandler.currentHistoryIndex = historyHandler.history.length - 1;
        }
    }

    return historyHandler;
}