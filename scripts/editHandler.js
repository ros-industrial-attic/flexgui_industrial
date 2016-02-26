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
 
editorService.$inject = ['$timeout', '$rootScope', '$window', 'historyService', 'projectService', 'enumService', 'fidgetService', 'deviceService', 'clipboardService', 'settingsWindowService', 'popupService'];

function editorService(
    $timeout,
    $rootScope,
    $window,
    historyService,
    projectService,
    enumService,
    fidgetService,
    deviceService,
    clipboardService,
    settingsWindowService,
    popupService) {

    var editHandler = {
        //edit mode on/off
        isEditMode: false,

        //is mouse down
        isMouseDown: false,

        //multiple fidget selection
        isMultiSelect: false,

        //last mouse down position
        mouseDownPos: { left: 0, top: 0 },

        //pixel move count on keypress
        deltaMove: 1,

        //remove selection if it is outside of the tap area
        clearSelectionTimer: null,

        //the currently dragged fidgets list
        selectedFidgets: [],

        //edit actions
        actions: [],

        //touch area
        safetyDistance: 50,

        //active container
        activeContainer: projectService.getCurrentScreen(),

        //creates an action object
        getAction: function (label, onTap, icon, forScreenType) {
            return {
                label: label,
                icon: icon,
                onTap: onTap,
                enabled: true,
                forScreenType: forScreenType || enumService.screenTypesEnum.All
            };
        },

        /*MODE SWITCHES*/

        //switch the edit mode
        switchEditMode: function () {
            editHandler.isEditMode = !editHandler.isEditMode;
            editHandler.isMultiSelect = false;
            editHandler.selectedFidgets = [];

            if (editHandler.isEditMode) {
                //Save the original state, so we can undo changes
                if (historyService.history.length == 0) {
                    deviceService.saveProject(true);
                }

                //to be able to catch keyboard events, we have to set the tabindex to 0
                $(".main").attr("tabindex", 0);

                editHandler.addWatchers();
            } else {
                //remove key capture capabilities
                $(".main").removeAttr("tabindex");

                //create the index image at the end of the digest loop to be as fresh as possible
                $timeout(function () {
                    projectService.generateIndexImage(projectService.currentScreen,
                        function () {
                            deviceService.saveProject();

                            //deregister watchers
                            angular.forEach(editHandler.watchers, function (w) { w(); });

                        });
                }, 0, false);
            }

            $("#angularPerformanceStats").css({ right: 20 + (editHandler.isEditMode ? editHandler.beltWidth : 0), top: 20 });
        },

        //switch fidget selection mode
        switchMultiSelect: function () {
            editHandler.isMultiSelect = !editHandler.isMultiSelect;

            if (!editHandler.isMultiSelect && editHandler.selectedFidgets.length > 1) {
                editHandler.selectedFidgets = [editHandler.selectedFidgets.pop()]
            }
        },

        /*END OF MODE SWITCHES*/

        //remove current selection
        unselectAll: function () {
            editHandler.selectedFidgets = [];
        },


        //disables to remove the selection clear, called when it is not a screen tap (e.g.: tap -> panstart switch)
        disableClearSelection: function () {
            if (editHandler.clearSelectionTimer) {
                clearTimeout(editHandler.clearSelectionTimer);
                delete editHandler.clearSelectionTimer;
            }
        },

        //get mouse position from mouse event
        getMousePos: function ($event) {
            if ($event == undefined)
                var ret = {
                    x: event.clientX,
                    y: event.clientY
                }
            else
                var ret = $event.center;

            if (ret.top) ret.y = ret.top;
            if (ret.left) ret.x = ret.left;

            delete ret.top;
            delete ret.left;

            return ret;
        },

        /*On screen events*/
        lastMouseAction: null,
        //tap event for the whole screen
        onScreenTap: function ($event) {
            var mousePos = editHandler.getMousePos($event);
            //Send the mouse action to the expert
            editHandler.lastMouseAction = mousePos;

            if (!editHandler.isEditMode)
                return;

            var closestFidget = editHandler.getClosestFidget(mousePos, $event);

            if (closestFidget) {
                editHandler.onFidgetMouseDown(closestFidget, $event, true);
            } else {
                editHandler.clearSelectionTimer = setTimeout(function () {
                    editHandler.selectedFidgets = [];
                }, 20);
            }
        },

        //return the fidget's size
        getFidgetSize: function (fidget) {
            //hack the size of the fidget
            if (fidget.source == "text") {
                return { width: $("#" + fidget.id).width(), height: $("#" + fidget.id).height() }
            }

            return {
                width: fidget.properties.width,
                height: fidget.properties.height
            };
        },

        //get closest fidget under the cursor
        getClosestFidget: function (mousePos, $event, skipSelected) {
            var fidgets = []; //projectService.currentScreen.fidgets; //editHandler.selectedFidgets;

            function getFidgets(container, top, left) {
                angular.forEach(container.fidgets, function (fidget) {
                    fidget.absoluteOffset = {
                        top: fidget.top + top,
                        left: fidget.left + left
                    };
                    fidgets.push(fidget);

                    if (fidget.source == "fidgetGroup") {
                        getFidgets(fidget, fidget.absoluteOffset.top, fidget.absoluteOffset.left);
                    }
                });
            }

            function rot(x, y, angle) {
                angle = [null, undefined].indexOf(angle) == -1 ? 0 : angle;
                var rad = angle * Math.PI / 180;
                var rx = Math.cos(rad) * x + Math.sin(rad) * y;
                var ry = Math.cos(rad) * y - Math.sin(rad) * x;
                return { x: rx, y: ry };
            }

            getFidgets(projectService.currentScreen, 0, 0);

            var nearToFidget = false;
            //reverse search for HTML order -> search for direct hits
            for (var i = fidgets.length - 1; i >= 0; i--) {
                var fidget = fidgets[i];
                var size = editHandler.getFidgetSize(fidget);
                if (editHandler.selectedFidgets.indexOf(fidget) > -1 && skipSelected) continue;

                var directClickArea = {
                    x1: fidget.absoluteOffset.left,
                    x2: fidget.absoluteOffset.left + size.width,
                    y1: fidget.absoluteOffset.top,
                    y2: fidget.absoluteOffset.top + size.height
                };

                var center = {
                    x: fidget.absoluteOffset.left + size.width / 2,
                    y: fidget.absoluteOffset.top + size.height / 2
                };

                var rotMouse = rot(mousePos.x - center.x, mousePos.y - center.y, fidget.properties.angle || 0);
                rotMouse.x += center.x;
                rotMouse.y += center.y;

                if (directClickArea.x1 <= rotMouse.x && directClickArea.x2 >= rotMouse.x && directClickArea.y1 <= rotMouse.y && directClickArea.y2 >= rotMouse.y) {
                    return fidget;
                }
            }

            //go for safety distance
            var closestDistance = editHandler.safetyDistance + 1;
            var closestFidget;

            for (var i = fidgets.length - 1; i >= 0; i--) {
                var fidget = fidgets[i];
                var size = editHandler.getFidgetSize(fidget);

                var center = {
                    x: fidget.absoluteOffset.left + size.width / 2,
                    y: fidget.absoluteOffset.top + size.height / 2
                };

                var rotMouse = rot(mousePos.x - center.x, mousePos.y - center.y, fidget.properties.angle || parseInt(0));
                rotMouse.x += center.x;
                rotMouse.y += center.y;

                if (editHandler.selectedFidgets.indexOf(fidget) > -1 && skipSelected) continue;

                var acceptedArea = {
                    x1: fidget.absoluteOffset.left - editHandler.safetyDistance,
                    x2: fidget.absoluteOffset.left + editHandler.safetyDistance + size.width,
                    y1: fidget.absoluteOffset.top - editHandler.safetyDistance,
                    y2: fidget.absoluteOffset.top + size.height + editHandler.safetyDistance
                };

                if (acceptedArea.x1 <= rotMouse.x && acceptedArea.x2 >= rotMouse.x && acceptedArea.y1 <= rotMouse.y && acceptedArea.y2 >= rotMouse.y) {
                    var topY = editHandler.safetyDistance - (rotMouse.y - acceptedArea.y1);
                    var bottomY = editHandler.safetyDistance - (acceptedArea.y2 - rotMouse.y);
                    var rightX = editHandler.safetyDistance - (acceptedArea.x2 - rotMouse.x);
                    var leftX = editHandler.safetyDistance - (rotMouse.x - acceptedArea.x1);

                    if (closestDistance > Math.min(Math.max(topY, bottomY, leftX, rightX), closestDistance)) {
                        closestDistance = Math.max(topY, bottomY, leftX, rightX);
                        closestFidget = fidget;
                    }
                }
            }

            return closestFidget;
        },

        _tempFidget: null,

        propertiesWindowVisible: false,
        setPropertiesWindowVisible: function (value, doNotSave) {
            if (value) {
                editHandler._tempFidget = angular.copy(editHandler.editedFidget);
            } else {
                var saveProject = false;
                var properties = [];

                if (editHandler.editedFidget == projectService.currentScreen) {
                    saveProject = true;
                } else {
                    for (var k in fidgetService.templates) {
                        if (fidgetService.templates[k].source == editHandler.editedFidget.source) {
                            for (var p in fidgetService.templates[k].properties)
                                properties.push(p);

                            if (fidgetService.templates[k].properties.onClick == undefined) {
                                properties.push("onClick");
                            }

                            break;
                        }
                    }
                }

                angular.forEach(properties, function (p) {
                    var oldValue = editHandler._tempFidget.properties[p];
                    var newValue = editHandler.editedFidget.properties[p]

                    if (oldValue != newValue) saveProject = true;
                });

                //only save if any of the props changed
                if (saveProject && !doNotSave) {
                    //save history
                    projectService.generateIndexImage(projectService.currentScreen, function () {
                        deviceService.saveProject(true);
                    });
                } else if (doNotSave) {
                    //load back
                    historyService.loadState(historyService.history[historyService.currentHistoryIndex]);
                }
            }

            editHandler.propertiesWindowVisible = value;
        },


        //mouse down event
        onMouseDown: function ($event) {
            if (!editHandler.isEditMode) return;

            var mousePos = editHandler.getMousePos($event);
            var closest = editHandler.getClosestFidget(mousePos, $event);
            if ((mousePos.x < editHandler.beltWidth || mousePos.x > $(window).width() - editHandler.beltWidth) && !closest) {
                return;
            }

            if (closest) editHandler.onFidgetMouseDown(closest, $event, false);

            editHandler.disableClearSelection();
            editHandler.isMouseDown = true;
            editHandler.mouseDownPos = { x: mousePos.x, y: mousePos.y };
        },

        windowWidth: $window.innerWidth,

        //mouse up event
        onMouseUp: function ($event) {
            if (!editHandler.isEditMode || !editHandler.mouseDownPos || !editHandler.isMouseDown) return;

            var mousePos = editHandler.getMousePos($event);
            var updatePos = true;

            //delete fidgets if the mouse is over the delete belt
            if (mousePos.x > editHandler.windowWidth - editHandler.beltWidth) {
                for (var i = 0; i < editHandler.selectedFidgets.length; i++) {
                    projectService.deleteFidget(editHandler.selectedFidgets[i].parent, editHandler.selectedFidgets[i]);
                }

                editHandler.selectedFidgets = [];
                deviceService.saveProject(true);
            } else {
                //open property window if there is only 1 selected fidget and the mouse is over the prop belt
                var left = 0, top = 0;
                if (mousePos.x < editHandler.beltWidth) {
                    updatePos = false;
                    left = editHandler.selectedFidgets[0].posBeforeDrag.left;
                    top = editHandler.selectedFidgets[0].posBeforeDrag.top;
                    if (editHandler.selectedFidgets.length == 1) {
                        editHandler.editedFidget = editHandler.selectedFidgets[0];
                        editHandler.setPropertiesWindowVisible(true);
                    } else {
                        popupService.show(localization.currentLocal.properties.onlyForSingleFidget);
                    }
                }

                //update pos
                if (updatePos) {
                    for (var i = 0; i < editHandler.selectedFidgets.length; i++) {
                        var fidget = editHandler.selectedFidgets[i];

                        if (editHandler.activeContainer != fidget.parent && editHandler.activeContainer && editHandler.activeContainer.fidgets) {
                            var oldParent = fidget.parent;

                            projectService.deleteFidget(fidget.parent, fidget);
                            editHandler.activeContainer.fidgets.push(fidget);
                            fidget.parent = editHandler.activeContainer;
                            fidget.containerLevel = fidget.parent.containerLevel + 1;

                            var offset = { top: fidget.top, left: fidget.left };

                            function shiftOffset(parent, d) {
                                while (parent) {
                                    offset.top = offset.top + d * (parent.top || 0);
                                    offset.left = offset.left + d * (parent.left || 0);
                                    parent = parent.parent;
                                }
                            }

                            shiftOffset(fidget.parent, -1);
                            shiftOffset(oldParent, 1);

                            fidget.top = offset.top;
                            fidget.left = offset.left;
                        }


                        fidget.posBeforeDrag.left = fidget.left;
                        fidget.posBeforeDrag.top = fidget.top;
                        editHandler.selectedFidgets[i] = fidget;
                        deviceService.saveProject(true);
                    }

                } else {
                    //restore original position
                    for (var i = 0; i < editHandler.selectedFidgets.length; i++) {
                        var fidget = editHandler.selectedFidgets[i];
                        fidget.left = fidget.posBeforeDrag.left;
                        fidget.top = fidget.posBeforeDrag.top;
                    }
                }
            }

            editHandler.isMouseDown = false;
            delete editHandler.activeContainer;
        },

        //mouse down on fidget: put the fidget to the selection depending on the selection mode
        onFidgetMouseDown: function (fidget, $event, canRemoveSeletion) {
            if (!editHandler.isEditMode) return;
            //fastrotate with between 0-90
            if ($event.tapCount % 2 == 0) {
                if (fidget.properties.angle !== "undefined") {
                    fidget.properties._angle = (Math.floor(fidget.properties.angle / 90) * 90 + 90) % 360;
                }

                return;
            }

            editHandler.disableClearSelection();

            if ($event.tapCount === 1 || $event.type === "panstart") {
                if (editHandler.isMultiSelect) {
                    if (editHandler.selectedFidgets.indexOf(fidget) == -1) {

                        var sameContainer = true;
                        angular.forEach(editHandler.selectedFidgets, function (f) {
                            if (f.parent != fidget.parent) sameContainer = false;
                        });
                        if (!sameContainer) editHandler.selectedFidgets = [];

                        fidget.posBeforeDrag = { left: fidget.left, top: fidget.top };
                        editHandler.selectedFidgets.push(fidget);
                    }
                    else if (canRemoveSeletion) {
                        editHandler.selectedFidgets.splice(editHandler.selectedFidgets.indexOf(fidget), 1);
                        delete fidget.posBeforeDrag;
                    }
                } else {
                    editHandler.selectedFidgets = [];
                    editHandler.selectedFidgets.push(fidget);
                    editHandler.selectedFidgets[0].posBeforeDrag = { left: fidget.left, top: fidget.top };
                }
            }
            $event.preventDefault();
        },

        //drag fidget from the belt
        onFidgetTemplateMouseDown: function (template, $event) {
            editHandler.disableClearSelection();

            if (!editHandler.isEditMode) return;

            editHandler.selectedFidgets = [];
            var fidget = fidgetService.getFidget(template.root, template.source, editHandler.getMousePos($event).x - template.properties.width / 2, editHandler.getMousePos($event).y - template.properties.height / 2, template.properties, template.icon, template.name);
            fidget.parent = projectService.currentScreen;
            fidget.containerLevel = 1;
            projectService.currentScreen.fidgets.push(fidget);
            editHandler.selectedFidgets.push(fidget);
            editHandler.selectedFidgets[0].posBeforeDrag = { left: fidget.left, top: fidget.top };

            editHandler.isMultiSelect = false;
            editHandler.isInRotate = false;
            editHandler.isResizeMode = false;
        },

        //key down event (rotate or move fidget)
        onKeyDown: function ($event) {

            if (!editHandler.isEditMode) return;

            var Keys = {
                Left: 37,
                Up: 38,
                Right: 39,
                Down: 40
            }

            if ([Keys.Left, Keys.Up, Keys.Down, Keys.Right].indexOf($event.keyCode) != -1) {
                for (var i = 0; i < editHandler.selectedFidgets.length; i++) {
                    if (!$event.ctrlKey) {
                        //MOVE
                        switch ($event.keyCode) {
                            case Keys.Left:
                                editHandler.selectedFidgets[i].left -= editHandler.deltaMove;
                                break;
                            case Keys.Right:
                                editHandler.selectedFidgets[i].left += editHandler.deltaMove;
                                break;
                            case Keys.Up:
                                editHandler.selectedFidgets[i].top -= editHandler.deltaMove;
                                break;
                            case Keys.Down:
                                editHandler.selectedFidgets[i].top += editHandler.deltaMove;
                                break;
                        }
                    }
                }
            }
        },

        //key up event, reset the deltaMove for the rotatio / fidget move
        onKeyUp: function ($event) {
            editHandler.deltaMove = 1;
        },

        //drag event handler, move the fidget
        onMouseMove: function ($event) {
            if (!editHandler.isEditMode || !editHandler.mouseDownPos || !editHandler.isMouseDown) return;
            var mousePos = editHandler.getMousePos($event);
            var container = editHandler.getClosestFidget(mousePos, $event, true);

            if (container && editHandler.selectedFidgets.indexOf(container.parent) == -1 && container.source == "fidgetGroup") {
                editHandler.activeContainer = container;
            } else {
                if (container && editHandler.selectedFidgets.indexOf(container.parent) == -1 && container.source != "fidgetGroup") {
                    editHandler.activeContainer = container.parent;
                } else {
                    editHandler.activeContainer = projectService.currentScreen;
                }
            }

            if (!editHandler.isInRotate && (!editHandler.isResizeMode || !editHandler.inResize)) {
                for (var i = 0; i < editHandler.selectedFidgets.length; i++) {
                    var fidget = editHandler.selectedFidgets[i];
                    fidget.left = fidget.posBeforeDrag.left + mousePos.x - editHandler.mouseDownPos.x;
                    fidget.top = fidget.posBeforeDrag.top + mousePos.y - editHandler.mouseDownPos.y;
                }
            }
        },
        /*End of onscreen events*/

        watchers: [],

        addWatchers: function () {
            editHandler.watchers.push($rootScope.$watch(function () { return editHandler.isMultiSelect; }, function (nv, ov) { if (nv != ov) editHandler.actions.select.sticked = nv; }));

            editHandler.watchers.push($rootScope.$watch(function () {
                return clipboardService.clipboard.length;
            }, function (nv, ov) {
                if (nv != ov) editHandler.actions.paste.enabled = clipboardService.clipboard.length > 0;
            }));

            editHandler.watchers.push($rootScope.$watch(function () {
                return editHandler.selectedFidgets.length;
            }, function (nv, ov) {
                if (nv != ov) {
                    editHandler.actions.copy.enabled = editHandler.selectedFidgets.length > 0;
                    editHandler.actions.cut.enabled = editHandler.selectedFidgets.length > 0;
                }
            }));
            editHandler.watchers.push($rootScope.$watch(function () {
                return historyService.currentHistoryIndex;
            }, function (nv, ov) {
                if (nv != ov) {
                    editHandler.actions.undo.enabled = historyService.currentHistoryIndex > 0;
                    editHandler.actions.redo.enabled = historyService.currentHistoryIndex < (historyService.history.length - 1);
                }
            }));
            editHandler.watchers.push($rootScope.$watch(function () {
                return historyService.history.length;
            }, function (nv, ov) {
                if (nv != ov) {
                    editHandler.actions.undo.enabled = historyService.currentHistoryIndex > 0;
                    editHandler.actions.redo.enabled = historyService.currentHistoryIndex < (nv - 1);
                }
            }));
            editHandler.watchers.push($rootScope.$watch(function () {
                return $window.innerWidth;
            }, function (value) {
                editHandler.windowWidth = value;
            }));
        },

        init: function (beltWidth) {
            editHandler.beltWidth = beltWidth;

            $rootScope.$watch(function () {
                return projectService.screens.length;
            }, function (nv, ov) {
                if (nv == 0 && nv != ov) {
                    projectService.showAddScreen(true);
                    projectService.currentScreen = null;
                }
            });

            $rootScope.$watchGroup([
                function () {
                    return editHandler.isMouseDown;
                },
                function () {
                    return editHandler.selectedFidgets.length;
                },
                function () {
                    return editHandler.selectedFidgets;
                },
                function () {
                    try {
                        return projectService.currentScreen.type;
                    }
                    catch (e) {
                        return projectService.currentScreen;
                    }
                },
                function () {
                    return projectService.currentScreen;
                }],
                function (nvs, ovs) {
                    var changed = false;
                    if (!projectService.currentScreen) return;

                    for (var i = 0; i < nvs.length; i++) {
                        if (nvs[i] != ovs[i]) {
                            changed = true;
                            break;
                        }
                    }

                    if (changed) {
                        angular.forEach(editHandler.actions, function (action) {
                            action.hidden = [projectService.currentScreen.type, enumService.screenTypesEnum.All].indexOf(action.forScreenType) == -1;
                        });

                        angular.forEach(fidgetService.templates, function (fidget) {
                            fidget.hidden = [projectService.currentScreen.type, enumService.screenTypesEnum.All].indexOf(fidget.forScreenType) == -1;
                        });
                    }
                }, true);
        }
    }

    //add actions to editBelt
    editHandler.actions = {
        settings: editHandler.getAction(localization.currentLocal.editMode.settings, function () { settingsWindowService.setVisible(true); }, 'images/settings.png'),
        select: editHandler.getAction(localization.currentLocal.editMode.multiSelect, editHandler.switchMultiSelect, 'images/select.png'),
        unselect: editHandler.getAction(localization.currentLocal.editMode.unSelect, editHandler.unselectAll, 'images/unselect.png'),
        undo: editHandler.getAction(localization.currentLocal.editMode.undo, function () { historyService.undo(); editHandler.selectedFidgets = []; editHandler.clipboard = []; }, 'images/undo.png'),
        redo: editHandler.getAction(localization.currentLocal.editMode.redo, function () { historyService.redo(); editHandler.selectedFidgets = []; editHandler.clipboard = []; }, 'images/redo.png'),
        copy: editHandler.getAction(localization.currentLocal.editMode.copy, function () { clipboardService.copy(editHandler.selectedFidgets); }, 'images/copy.png'),
        cut: editHandler.getAction(localization.currentLocal.editMode.cut, function () { clipboardService.cut(editHandler.selectedFidgets); editHandler.selectedFidgets = []; }, 'images/cut.png'),
        paste: editHandler.getAction(localization.currentLocal.editMode.paste, function () {
            clipboardService.paste(editHandler.selectedFidgets.length > 0 && editHandler.selectedFidgets[0].source == "fidgetGroup" ? editHandler.selectedFidgets[0] : projectService.currentScreen);
            //add to selected here;
            editHandler.selectedFidgets = clipboardService.pasted;
            angular.forEach(editHandler.selectedFidgets, function (fidget) {
                fidget.posBeforeDrag = { left: fidget.left, top: fidget.top };
            });
        }, 'images/paste.png')
    };

    editHandler.actions.undo.enabled = false;
    editHandler.actions.redo.enabled = false;
    editHandler.actions.copy.enabled = false;
    editHandler.actions.cut.enabled = false;
    editHandler.actions.paste.enabled = false;
    return editHandler;
}