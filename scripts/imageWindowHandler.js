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

imageService.$inject = ['deviceService', 'settingsWindowService', 'variableService', 'popupService', 'editorService'];

function imageService(deviceService, settingsWindowService, variableService, popupService, editorService) {
    var editHandler = editorService;

    //Subcontroller for the image operations
    var imageHandler = {
        init: function (scope) {
            imageHandler.scope = scope;
            imageHandler.setSlots();
        },

        //The visibility of the window
        visible: false,
        setVisible: function (value) {
            imageHandler.visible = value;
        },

        //open image explorer and set the updateable input: which html should be updated after selecting an image, 
        //e.g.: if the user wants to set the background, the updated input has to be the screen's property
        //but if the user wants to set an image's source, it has to be the property of that image, so the hidden input in the prop. window
        openImageExplorer: function (el) {
            //try to get the current background
            try {
                var image = eval(eval(el));
                for (var i = 0; i < this.slots.length; i++) {
                    if (this.slots[i].base64 == image) {
                        this.selectedImage = this.slots[i].name;
                    }
                }
            } catch (e) {
                this.selectedImage = null;
            }

            imageHandler.updateElement = el;
            imageHandler.setVisible(true);
        },

        //returns the value of a friendly cached image
        getImageFromFriendlyCache: function (str) {
            if (str && str.indexOf("data:image/") > -1) return str;

            return eval(str);
        },

        slots: [],
        setSlots: function () {
            for (var i = 1; i < 21; i++) {
                imageHandler.slots.push({});
                imageHandler.getImage("image" + i, i - 1);
            }
        },

        getSlot: function (name) {
            var slot = null;

            for (var i = 0; i < imageHandler.slots.length; i++) {
                if (imageHandler.slots[i].name == name) {
                    slot = imageHandler.slots[i];
                }
            }

            return slot;
        },

        getImage: function (name, i) {
            deviceService.callService("/rosapi/get_param", { name: name }, function (result) {
                var value = JSON.parse(result.value);
                var base64 = value == null ? null : value.base64;
                var slot = { name: name, base64: base64 };

                variableService.friendlyCache[name] = slot;
                imageHandler.slots[i] = slot;
                imageHandler.scope.$apply;
            });
        },

        //set selected image
        selectedImage: null,
        setSelectedImage: function (img) {
            imageHandler.selectedImage = img.name;
        },

        //select image: setup the updateElement's value and close image explorer window
        selectImage: function () {
            eval("imageHandler.scope." + imageHandler.updateElement + " = \"variableService.friendlyCache['" + imageHandler.selectedImage + "'].base64\";");
            imageHandler.setVisible(false);
        },

        isValidImage: function (src) {
            var ret = src != 'null' &&
                src != null &&
                src != undefined &&
                imageHandler.getImageFromFriendlyCache(src) &&
                imageHandler.getImageFromFriendlyCache(src) != 'null'

            return ret;
        },

        //friendlyName of the variable where we want to save the image
        currentImage: null,

        //returns false if there any no uploaded images
        isEmpty: function () {
            var ret = true;
            angular.forEach(imageHandler.slots, function (slot) {
                if (slot.base64 && slot.base64.indexOf("data:image") === 0)
                    ret = false;
            });
            return ret;
        },

        //tabHandling
        tabIndex: 0,
        setTabIndex: function (value) {
            imageHandler.tabIndex = value;
        },

        //removes the image 
        removeImage: function (path) {
            variableService.friendlyCache[path].base64 = null;
            if (!settingsWindowService.demoMode) {
                deviceService.nodes.rosapi.delete_param.call({ name: path });
            } else {
                localStorage.removeItem("flexgui4_images_" + path);
            }
            imageHandler.selectedImage = null;
        },

        //uploads an image
        uploadImage: function (file) {
            if (file.type.indexOf("image") == -1) {
                popupService.show(localization.currentLocal.images.imageError, popupService.types.error);
                return;
            }

            imageHandler.scope.blockUI(localization.currentLocal.images.blockMsg);
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            var img = new Image;
            img.src = URL.createObjectURL(file);
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);
                resized = document.createElement('canvas');

                //keep aspect
                resized.width = img.width > img.height ? 1024 : 768;
                resized.height = resized.width / img.width * img.height;
                canvasResize(canvas, resized, function () {
                    var base64 = resized.toDataURL("image/png");
                    var slot = imageHandler.getSlot(imageHandler.currentImage);

                    if (slot) {
                        if (!settingsWindowService.demoMode) {
                            deviceService.nodes.rosapi.set_param.call({ name: imageHandler.currentImage, value: JSON.stringify({ base64: base64 }) });
                        } else {
                            localStorage.setItem("flexgui4_images_" + imageHandler.currentImage, base64);
                        }
                        slot.base64 = base64;
                        variableService.friendlyCache[imageHandler.currentImage] = slot;
                    }

                    imageHandler.scope.$apply();
                    imageHandler.scope.unBlockUI();
                    imageHandler.setSelectedImage(variableService.friendlyCache[imageHandler.currentImage]);
                    imageHandler.setTabIndex(0);
                });
            }
        },
    }

    return imageHandler;
}