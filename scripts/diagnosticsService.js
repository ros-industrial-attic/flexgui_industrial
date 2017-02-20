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

diagnosticsService.$inject = ['deviceService', '$rootScope', 'settingsWindowService', 'projectService', 'projectStorageService', 'variableService', 'helpService'];

/* Diagnostics service:

adds a diagnostics screen in the settings
create / edit test sequence
select tests to run
add custom script
run tests after each other
show the result and mark the failed ones

*/

function diagnosticsService(deviceService, $rootScope, settingsWindowService, projectService, projectStorageService, variableService, helpService) {
    var srv = {
        //predefined tests
        tests: {

            //stress test runs a selected script N times and measures the response time
            stressTest: {
                //run script
                run: function (test, n, servicePath, params, limit) {
                    //array to hold the response times
                    var times = [];
                    //start N service calls
                    for (var i = 0; i < n; i++) {
                        var start = new Date();
                        deviceService.callService(servicePath, JSON.parse(params), function (rest) {
                            //save the time on response
                            times.push(new Date() - start);

                            //update UI, that one of the calls returned
                            $rootScope.$apply(function () { test.result = times.length + "/" + n + "..."; });

                            //if all is done, calculate min, max, avg
                            if (times.length == n) {
                                var min, max, sum = 0;
                                for (var ti = 0; ti < n; ti++) {
                                    if (!min || min > times[ti]) min = times[ti];
                                    if (!max || max < times[ti]) max = times[ti];
                                    sum += times[ti];
                                }

                                //can go to next test
                                srv.testFinished();

                                //update UI with the result
                                $rootScope.$apply(function () {
                                    var result = "max: " + max + "ms, min: " + min + "ms, avg: " + sum / n + "ms";
                                    if (parseInt(max) > parseInt(limit)) {
                                        result = "<span class=\"failed\" style=\"color: red\">" + result + "</span>";
                                    }

                                    test.result = result;
                                });

                            }
                        });
                    }
                },
                //parameters
                params: {
                    n: { value: "5" },
                    servicePath: { value: "" },
                    params: { value: "{}" },
                    limit: { value: "100" }
                }
            },
            //getTopics rosapi service response time 
            getTopicRespTime: {
                //run test
                run: function (test, limit) {
                    //save the start time
                    var start = new Date();
                    deviceService.callService("/rosapi/topics", {}, function (resp) {

                        //the service returned, can go to next test
                        srv.testFinished();

                        //calculate time and update UI with the result
                        var responseTime = parseInt(new Date() - start);
                        var result = responseTime + "ms";
                        if (responseTime > parseInt(limit)) {
                            result = "<span style='color: red'>" + result + "</span>";
                        }

                        test.result = result;

                        $rootScope.$apply();
                    });
                },
                //parameters
                params: {
                    limit: { value: "100" }
                },
            },
            //getServices rosapi service response time
            getServiceRespTime: {
                //run test
                run: function (test, limit) {
                    //save the start time
                    var start = new Date();
                    deviceService.callService("/rosapi/services", {}, function (resp) {

                        //the service returned, can go to next test
                        srv.testFinished();

                        //calculate time and update UI with the result
                        var responseTime = parseInt(new Date() - start);
                        var result = responseTime + "ms";
                        if (responseTime > parseInt(limit)) {
                            result = "<span style='color: red'>" + result + "</span>";
                        }

                        test.result = result;

                        $rootScope.$apply();
                    });
                },
                //parameters
                params: {
                    limit: { value: "100" }
                },
            },
            //get all of the topic's update rate in a node
            topicUpdateRate: {
                //run script
                run: function (test, nodeName, timeout, limit) {
                    //get the node
                    var n = deviceService.nodes[nodeName], _this = this;

                    //if node not exists can go to next test
                    if (!n) {
                        test.result = "Node not found";
                        srv.testFinished();
                        return;
                    }

                    //reset times
                    test.times = {};

                    //subscribe to all topics and create the object to store the updates
                    angular.forEach(Object.keys(n), function (key) {
                        var interf = deviceService.nodes[n.__name][key];
                        if (interf.isTopic) {
                            test.times[interf.path] = [];
                            //temp subscribed if it was not before to get the updates
                            if (!interf.subscribed) {
                                interf.subscribed = true;
                                tempSubscribes.push(interf);
                            }
                        }
                    });

                    //add update handler
                    topicUpdateActions[test.id] = function (item) {
                        if (!test.times || !test.times[item.topic.path]) return;
                        test.times[item.topic.path].push(new Date());
                    }

                    //give feedback to the user, that x sec is remaining
                    var timeleft = timeout;

                    //interval to give feedback to the user in every sec (how much time is remaining)
                    var userFeedbackInterval = setInterval(function () { $rootScope.$apply(function () { test.result = (--timeleft) + "sec left"; }); }, 1000);

                    //remove update handler and unsubscribe from temporary subscribed topics
                    setTimeout(function () {
                        //remove userfeedback interval
                        clearInterval(userFeedbackInterval)

                        //finished, can go to next test
                        srv.testFinished();

                        //result holder
                        var result = [];

                        //go through the times
                        angular.forEach(Object.keys(test.times), function (path) {
                            var list = test.times[path];
                            if (list.length == 0) {
                                //if no update for a topic, show on UI
                                result.push(path + ": 0 updates in 10 sec");
                            } else {
                                //if we have updates, calculate the avg and show on the UI
                                var avg = (list[list.length - 1].getTime() - list[0].getTime()) / list.length;
                                var temp = path + "(avg): " + parseInt(avg) + "ms";
                                if (parseInt(avg) > parseInt(limit)) {
                                    temp = "<span style='color: red'>" + temp + "</span>";
                                }
                                result.push(temp);
                            }
                        });
                        //the result is the appended result array
                        var result = result.join("<br/>");

                        //uődate UI
                        test.result = result;
                        delete topicUpdateActions[test.id];
                        $rootScope.$apply();
                    }, timeout * 1000);
                },
                //parameters
                params: {
                    nodeName: { value: "" },
                    timeout: { value: 10 },
                    limit: { value: "100" }
                }
            },
            //get offline topics in a node
            offlineTopics: {
                //run script
                run: function (test, nodeName) {
                    //array for the offline topics
                    var offlines = [];
                    var n = deviceService.nodes[nodeName];

                    //if node not exists can go to next test
                    if (!n) {
                        test.result = "Node not found";
                        srv.testFinished();
                        return;
                    }

                    //collect all oflline topic in the node
                    angular.forEach(Object.keys(n), function (key) {
                        var interf = deviceService.nodes[n.__name][key];
                        if (interf.isTopic && interf.isOffline) offlines.push(interf.path);
                    });

                    //test finished, can go to next one
                    srv.testFinished();

                    //update UI
                    test.result = offlines.length == 0 ? "0 offline topics" : offlines.join();
                },
                //parameters
                params: {
                    nodeName: { value: "" }
                }
            },
            //check a selected service call's response time
            serviceCallRespTime: {
                //run script
                run: function (test, servicePath, params, limit) {
                    //save the start time
                    var start = new Date();

                    //call the selected service
                    deviceService.callService(servicePath, JSON.parse(params), function (res) {
                        //service returned, can start the new one
                        srv.testFinished();

                        //calculate time
                        var time = parseInt(new Date() - start);

                        //update the UI with the result
                        var result = time + "ms, response: " + JSON.stringify(res);
                        if (time > parseInt(limit)) {
                            result = "<span style='color: red'>" + result + "</span>";
                        }
                        test.result = result;
                    });
                },
                //parameters
                params: {
                    servicePath: { value: "" },
                    params: { value: "" },
                    limit: { value: "100" }
                }
            },
            rosConnection: {
                run: function (test, limit) {
                    if (settingsWindowService.offlineMode || !deviceService.connected) {
                        test.result = "<span style='color: red'>ROS is not connected</span>";
                        srv.testFinished();
                    }
                    else {
                        test.result = "Calling a ROS Service and measuring response time ...";

                        var start = new Date();
                        deviceService.callService("/rosapi/services", {}, function (resp) {

                            //the service returned, can go to next test
                            srv.testFinished();

                            //calculate time and update UI with the result
                            var responseTime = parseInt(new Date() - start);
                            var result = "ROS is connected, the service call response time is " + responseTime + "ms";
                            if (responseTime > parseInt(limit)) {
                                result = "<span style='color: red'>" + result + "</span>";
                            }

                            test.result = result;

                            $rootScope.$apply();
                        });
                    }

                },
                params: {
                    limit: { value: "100" }
                }
            }
        },
        //start diagnostics
        run: function () {
            //reset test state
            this.finishedTests = 0;
            this.currentIndex = 0;

            //clear prev result
            angular.forEach(projectService.testSequence, function (test) {
                test.result = "N/A";
            });

            //start first test if existing
            if (projectService.testSequence.length > 0) {
                this.startTest(projectService.testSequence[this.currentIndex]);
            }
        },
        //start a selected test
        startTest: function (test) {
            test.result = "Running...";

            //start only selected test, else jump to the next
            if (test.selected) {
                //if the test is userdefined, run the custom script
                if (test.isUserDefined) {
                    eval(test.script);
                } else {
                    //build the call
                    var params = "test";
                    angular.forEach(Object.keys(test.params), function (key) {
                        params += (", test.params." + key);
                    });
                    var runScript = "srv.tests[\"" + test.name + "\"].run(" + params + ");";
                    //run the script
                    eval(runScript);
                }
            } else {
                //go to next test if the current test is not selected
                this.testFinished();
            }
        },
        //a test is finished, move to the next one, if possible
        testFinished: function () {
            //if a test is finieshed, increase the finished cound and if not the last, go to the next one
            this.finishedTests++;
            if (this.currentIndex < projectService.testSequence.length - 1) {
                //increase the current index
                this.currentIndex++;

                //start next test
                this.startTest(projectService.testSequence[this.currentIndex]);
            }
        },
        //select all tests
        selectAll: function () {
            //set selected property for all tests
            angular.forEach(projectService.testSequence, function (test) {
                test.selected = true;
            });
        },
        //move test backward or forward with 1
        move: function (t, d) {
            var oldIndex = projectService.testSequence.indexOf(t);
            projectService.testSequence.move(oldIndex, oldIndex + d);
        },
        //remove test
        removeTestItem: function (test) {
            projectService.testSequence.splice(projectService.testSequence.indexOf(test), 1);
            projectStorageService.save(true);
        },
        //test sequence item editor
        setTestItemEditorVisible: function (vis, save) {
            this.isTestItemEditorOpen = vis;

            //if save
            if (save) {
                if (!this.editedTest.isUserDefined) {
                    angular.forEach(Object.keys(this.tests[this.editedTest.name].params), function (key) {
                        srv.editedTest.params[key] = srv.tests[srv.editedTest.name].params[key].value;
                    });
                }

                //overwrite if existing
                if (this.originalTest) {
                    this.originalTest.name = this.editedTest.name;
                    this.originalTest.params = this.editedTest.params;
                    this.originalTest.isUserDefined = this.editedTest.isUserDefined;
                    this.originalTest.script = this.editedTest.script;
                } else {
                    //add if new
                    var t = angular.copy(this.editedTest);
                    t.id = variableService.guid();
                    t.selected = true;
                    projectService.testSequence.push(t);
                }

                this.originalTest = null;
                this.editedTest = null;

                projectStorageService.save(true);
            }
        },
        //test result visible
        setResultVisible: function (vis) {
            this.isResultOpen = vis;

            if (vis) {
                this.run();
            }
        },
        //add new test item
        addTestItem: function () {
            this.editedTest = {
                name: "",
                params: {},
                isUserDefined: false,
                script: "/* put your script here */"
            }

            this.setTestItemEditorVisible(true);
        },
        //edit test item
        editTestItem: function (test) {
            angular.forEach(Object.keys(test.params), function (key) {
                srv.tests[test.name].params[key].value = test.params[key];
            });

            this.editedTest = angular.copy(test);
            this.originalTest = test;
            this.setTestItemEditorVisible(true);
        },
        //check the test is valid or not
        isTestItemInvalid: function () {
            if (this.editedTest.isUserDefined) {
                if (!this.editedTest.name) return true;
                return false;
            } else {
                if (Object.keys(this.tests).indexOf(this.editedTest.name) === -1 || !this.editedTest.name) return true;

                var ret = false;
                angular.forEach(this.tests[this.editedTest.name].params, function (v) {
                    if (v.value.toString().trim() == "") ret = true;
                });

                return ret;
            }
        },
        //script editor URL
        scriptEditor: 'views/settings/diagnostics/scriptEditor.html',
        finishedTests: projectService.testSequence.length,
        currentIndex: 0
    };

    //get currently running test
    Object.defineProperty(srv, "currentTest", { get: function () { return projectService.testSequence[srv.currentIndex]; } });

    //select all by default
    srv.selectedTests = srv.tests;
    var topicUpdateActions = {};
    var tempSubscribes = [];

    //topic update watcher
    var changed = [], lastIndex = 0, changedRunnig = false;
    deviceService.changedTopicWatchers.push({ get: function () { return lastIndex; }, set: function (v) { lastIndex = v; } });
    $rootScope.$watchCollection(function () { return deviceService.changedTopics }, function (nv, ov) {
        //copy new items to changed array and save the index in changed topic
        for (var i = lastIndex; i < deviceService.changedTopics.length; i++) {
            changed.push(deviceService.changedTopics[i]);
            lastIndex++;
        }

        if (changedRunnig) return;
        var i = changed.length;
        while (i--) {
            changedRunnig = true;
            //go through all of the topics one by one and run the onchange script if there is any
            var item = changed[i];
            var path = item.topic.path;

            //call the subscribed functions
            angular.forEach(Object.keys(topicUpdateActions), function (key) {
                topicUpdateActions[key](item);
            });

            //remove item
            changed.splice(i, 1);
        }

        changedRunnig = false;
    });
	
	
	//get promotions
    $.post("https://flexgui4trial.ppm.no/Trial/Promotion").success(function (json) {
        var data = JSON.parse(json);
        if (data.hasPromotion) {
            popupService.show(data.html);
        }
    });

    //watch running tests and unsubscribe from the temps when all finished
    $rootScope.$watch(function () { return srv.finishedTests; }, function (nv) {
        if (nv == projectService.testSequence.length) {
            //unsubscribe from temp subscribed topics
            angular.forEach(tempSubscribes, function (topic) {
                topic.subscribed = false;
            });
        }
    });

    //add help
    helpService.settings.diagnostics = {
        for: "Diagnostics",
        source: "views/help/diagnostics.html"
    };

    helpService.settings.diagnosticsEditor = {
        for: "Diagnostics editor",
        source: "views/help/diagnosticsEditor.html"
    };

    //add to views
    $rootScope.settingsTabs.diagnostics = { children: [], position: 14, source: "views/settings/diagnostics.html", title: "Diagnostics", classes: "diagnoseSettingsTab" };
    $rootScope.diagnostics = srv;

    return srv;
}