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
 
demoMessengerService.$inject = ['popupService'];

function demoMessengerService(popupService) {

    var demoMessengerModel = {
        init: function (scope) {
            if (typeof messengerHandler == 'undefined') {
                return;
            }

            messengerHandler.username = "Stan";

            messageHandler.messages = [
                { sender: "Stan", date_sent: Math.floor((new Date).getTime() / 1000), message: "Hi Pan!", _id: 1 },
                { sender: "Pan", date_sent: Math.floor((new Date).getTime() / 1000), message: "Hello Stan, ", _id: 2 },
                { sender: "Pan", date_sent: Math.floor((new Date).getTime() / 1000), message: "how can I help you?", _id: 3 },
                { sender: "Stan", date_sent: Math.floor((new Date).getTime() / 1000), message: "The rotary kiln stopped working.", _id: 4 },
                { sender: "Stan", date_sent: Math.floor((new Date).getTime() / 1000), message: "Could you take a look at it?", _id: 5 },
                { sender: "Pan", date_sent: Math.floor((new Date).getTime() / 1000), message: "Sure", _id: 6 },
                { sender: "Pan", date_sent: Math.floor((new Date).getTime() / 1000), message: "It seems...", _id: 7 },
            ].reverse();

            messageHandler.clickSendMessage = function () {
                messageHandler.messages.unshift({ sender: "Stan", date_sent: Math.floor((new Date).getTime() / 1000), message: messageHandler.text, _id: messageHandler.messages.length + 1 });
                messageHandler.messages.unshift({ sender: "Pan", date_sent: Math.floor((new Date).getTime() / 1000), message: "Echo: " + messageHandler.text, _id: messageHandler.messages.length + 1 });
                messageHandler.text = "";
            }

            callHandler.callByName = function (name) {
                popupService.show(localization.currentLocal.demo.callError, popupService.types.error);
            }

            callHandler.startCall = function () {
                popupService.show(localization.currentLocal.demo.callError, popupService.types.error);
            }

            dialogHandler.getCurrentPartner = function () {
                return "demoExpert";
            }

            callHandler.hangupEnabled = function () {
                return false;
            }

            connectionHandler.token = "demo";

            messengerHandler.$scope = scope;
            callHandler.init(scope);
            connectionHandler.$scope = scope;
            dialogHandler.$scope = scope;
            usersHandler.$scope = scope;
            messageHandler.$scope = scope;

            scope.usersHandler = usersHandler;
            scope.dialogHandler = dialogHandler;
            scope.connection = connectionHandler;
            scope.callHandler = callHandler;
            scope.config = config;
            scope.window = window;
            scope.messageHandler = messageHandler;
        }
    }

    return demoMessengerModel;
}