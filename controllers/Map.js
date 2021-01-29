'use strict';

var Map = require('../service/MapService');

module.exports.getRiskPercentage = function getRiskPercentage (req, res, next) {

    Map.getRiskPercentage(req.swagger.params, res, next);

};
