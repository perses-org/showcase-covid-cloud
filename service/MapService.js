'use strict';

var vars = require('../index');
var sender = require('../managers/communication');
var dataManager = require('../managers/data')
var app = vars.app;
var body;

/**
 * Get the locations frequency processed in the different connected devices.
 *
 * beginDate Date init date
 * endDate Date end date
 * xmin Double xmin
 * xmax Double xmax
 * ymin Double ymin
 * ymax Double ymax
 * technology String Choose firebase or mqtt
 * returns Double
 **/
// var paramsgetHeatmaps=["beginDate","endDate","xmin","xmax","ymin","ymax"];
// module.exports.getHeatmaps = function(req, res, next) {

//     body={}

//     var keys = Object.keys(req);
//     for (var i = 0; i < keys.length; i++) {
//         body[paramsgetHeatmaps[i]]=req[keys[i]].value
//     }
//     sender.sendRequest(body,'Map','getHeatmaps',"",res);

// };

var paramsgetHeatmaps=["device"];
module.exports.getRiskPercentage = function(req, res, next) {

    body={}

    var keys = Object.keys(req);
    for (var i = 0; i < keys.length; i++) {
        body[paramsgetHeatmaps[i]]=req[keys[i]].value
    }
    sender.sendRequest(body,'Map','getRiskDevice',"",res);

};