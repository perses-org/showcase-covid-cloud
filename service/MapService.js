'use strict';

var vars = require('../index');
var sender = require('../managers/communication');
var dataManager = require('../managers/data')
var app = vars.app;
var body;


var paramsgetHeatmaps=["device"];
module.exports.getRiskPercentage = function(req, res, next) {

    body={}

    var keys = Object.keys(req);
    for (var i = 0; i < keys.length; i++) {
        body[paramsgetHeatmaps[i]]=req[keys[i]].value
    }
    sender.sendRequest(body,'Map','getRiskDevice',"",res);

};