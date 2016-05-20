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

function popupService() {

    //Handles popupMessage related data and operations
    var popupHandler = {
        //List of messages to show. If empty, no message is shown.
        messages: [],
        //Gets the last message that is shown.
        last: function () {
            return popupHandler.messages[popupHandler.messages.length - 1];
        },
        //Enumeration of the 3 types of messages.
        types: {
            //Blue text marked with i sign
            info: { class: "glyphicon-info-sign", name: "info", color: "text-info" },
            //Yellow text marked with - in a circle sign
            warning: { class: "glyphicon-minus-sign", name: "warning", color: "text-warning" },
            //Red text marked with ! sign
            error: { class: "glyphicon-exclamation-sign", name: "error", color: "text-danger" }
        },
        //Adds a new message to the messages list. This will trigger the popupMessage to show up.
        //Without defining the type parameter the default info type will be used.
        show: function (text, type) {
            if (type == undefined)
                type = popupHandler.types.info;

            popupHandler.messages.push({ text: text, type: type });
        },
        //Removes the last message.
        close: function () {
            popupHandler.messages.pop();
        },
        //Removes all messages.
        closeAll: function () {
            popupHandler.messages = [];
        }
    }

    return popupHandler;

}