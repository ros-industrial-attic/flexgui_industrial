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

projectConversionService.$inject = [];

function projectConversionService() {
    var serv = {};

    serv.list = [];

    //step from unVersioned - 1.0
    serv.list[0] = {
        to: "1.0",
        action: function (project) {
            console.log("converting...", this.from, this.to);
            project.appVersion = this.to;
            return project;
        }
    }

    //step from 1.0 - 1.1, in this version, the screen has to have hasScreenBelt property
    serv.list[1] = {
        from: "1.0",
        to: "1.1",
        action: function (project) {
            console.log("converting...", this.from, this.to);
            //add hasScreenBelt property for screens
            angular.forEach(project.screens, function (s) { if (Object.keys(s.properties).indexOf("hasScreenBelt") == -1) s.properties.hasScreenBelt = 'true'; });
            project.appVersion = this.to;
            return project;
        }
    }


    ////test step from 1.0 - 1.1
    //serv.list[1] = {
    //    from: "1.0",
    //    to: "1.1",
    //    action: function (project) {
    //        console.log("converting...", this.from, this.to);
    //        project.appVersion = this.to;
    //        return project;
    //    }
    //}

    ////test step from 1.1 - 1.2
    //serv.list[2] = {
    //    from: "1.1",
    //    to: "1.2",
    //    action: function (project) {
    //        console.log("converting...", this.from, this.to);
    //        project.appVersion = this.to;
    //        return project;
    //    }
    //}

    serv.convert = function (project, toVersion) {
        var current = project.appVersion;

        for (var i = 0; i < serv.list.length; i++) {
            if (serv.list[i].from == current)
            {
                project = serv.list[i].action(project)
                break;
            }
        }

        //if the to version are not equal, search for another step
        if (project.appVersion != toVersion) {
            serv.convert(project, toVersion);
        }

        //if the conversion is successfull return with the project
        if (project.appVersion == toVersion)
        {
            return project;
        }

        //if we can not convert, return null
        return null;
    }

    return serv;
}