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

backupService.$inject = ['$rootScope', 'projectService', '$timeout', 'settingsWindowService'];

function backupService($rootScope, projectService, $timeout, settingsWindowService) {
    //reference to the backup to be able to cancel
    var backupTimeout;
    var srv = {
        enabled: ["true", true, null, undefined].indexOf(localStorage.getItem("backupEnabled")) > -1 ? true : false,
        //list to keep max 10  backups
        list: localStorage.getItem("backups") ? JSON.parse(localStorage.getItem("backups")) : [],
        //start backup
        backup: function () {
            if (!srv.enabled) return;
            //console.group("[BACKUP]", srv.list);
            var proj = projectService.toJSON();
            var success = true;
            if (proj && srv.list.length == 0 || srv.list[srv.list.length - 1].project != proj) {
                //console.log("[BACKUP] Backing up...");
                var size = proj.length;
                var date = new Date();

                srv.list.push({ project: proj, date: date, size: size });
                //keep the list on max 5 element
                if (srv.list.length > 5) {
                    srv.list.splice(0, 1);
                }
                try{
                    localStorage.setItem("backups", JSON.stringify(srv.list));
                } catch (e) {
                    success = false;
                    srv.saveFailedDialog().modal('show');
                }
            }

            if (success) {
                backupTimeout = $timeout(srv.backup, 60000, true);
            }
            //console.groupEnd();
        },
        //restore a selected backup
        restore: function (item) {
            projectService.load(projectService.parseJSON(item.project));
        },
        //convert date to timeago
        timeago: function (date) {
            var time = new Date(date);
            return $.timeago(time);
        },
        saveFailedDialog: function () {
            var buttons = {
                success: {
                    label: localization.currentLocal.settings.tabs.backup.keepLast,
                    className: "btn-success",
                    callback: function () {
                        //restart app and try to reconnect
                        srv.list = [];
                        srv.backup();
                        bootbox.hideAll();
                    }
                },
                danger: {
                    label: localization.currentLocal.settings.tabs.backup.disableBackup,
                    className: "btn-primary",
                    callback: function () {
                        srv.enabled = false;
                        bootbox.hideAll();
                    }
                }
            }

            return bootbox.dialog({
                message: localization.currentLocal.settings.tabs.backup.failed,
                backdrop: 'static',
                closeButton: false,
                show: false,
                keyboard: false,
                title: localization.currentLocal.settings.tabs.backup.title,
                buttons: buttons
            })
        }
    };

    //start the first backup when project is loaded
    var startWatch = $rootScope.$watch(function () {
        return projectService.loaded;
    }, function (nv) {
        if (nv && srv.enabled) {
            srv.backup();
            //remove the watcher, so the project load wont effect the backup any more
            startWatch();
        }
    });

    //watch the enabled and preform action if needed
    $rootScope.$watch(function () { return srv.enabled;}, function () {
        if (srv.enabled) {
            srv.backup();
        } else {
            if (backupTimeout) {
                $timeout.cancel(backupTimeout);
            }
        }

        localStorage.setItem("backupEnabled", srv.enabled);
    });

    //add settings tabs
    $rootScope.settingsTabs.backup = { children: [], position: 5, source: "views/settings/backup.html", title: localization.currentLocal.settings.tabs.backup.title };
    $rootScope.backup = srv;

    return srv;
}