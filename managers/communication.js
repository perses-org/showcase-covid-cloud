'use strict';

var vars = require('../index');
var request = require('request');
var dataManager=require('./data')

var mqttApp = vars.mqttApp;
var mqttRequest = vars.mqttRequest;
var port= vars.port;
var topic = vars.topic;

//TODO: Change timeOutValue if necessary
var timeOutValue = 1100;
var timeOutValue2 = 700;
var result;

var idRequest=0;
var reqMap = new Map();




var optionsMqtt={
    "resource": "",
    "method": "",
    "sender":"",
    "idRequest": 0,
    "params": {

        }
  };

exports.sendRequest = function (body, resource, method, sender, res){
    var id=idRequest
    idRequest++

    optionsMqtt.resource=resource;
    optionsMqtt.method=method;
    optionsMqtt.idRequest=id;
    optionsMqtt.device=sender
    optionsMqtt.sender='Covid19PERCOM'
    optionsMqtt.params=body;
     

    dataManager.createRequest(id);
    reqMap.set(id, { res: res, method: method, sender: sender, body: body});

    if(method=="getRiskDevice"){
        mqttApp.publish(body.device+"/request", JSON.stringify(optionsMqtt));
        console.log(id)
        sendResultHTTP(id)
    }
    else{
    
        mqttApp.publish('Covid19PERCOMDevices', JSON.stringify(optionsMqtt));
        sendResultMQTT(id)

    }
        
                
}


function sendResultMQTT(id){
    var obj;
    var res;
    var method;
    var params

    setTimeout(function(){
        obj = reqMap.get(id);
        res=obj.res;
        method=obj.method;
        params= obj.body;
        
        result=dataManager.getResult(id, method, params);
        reqMap.delete(id);

        if (result.length > 0) {
                mqttApp.publish(obj.sender,JSON.stringify(result))
                console.log("SENT RESULT to device")
         } else{
           
                mqttApp.publish(obj.sender,"[]")
        }

    }, timeOutValue2);
}


function sendResultHTTP(id){
    var obj;
    var res;
    var method;
    var params

    setTimeout(function(){
        obj = reqMap.get(id);
        res=obj.res;
        method=obj.method;
        params= obj.body;
        
        result=dataManager.getResult(id, method, params);
        reqMap.delete(id);

        console.log(result)
        
        if (result.length > 0) {
            res.contentType('application/json');
            res.status(200).send(result);
            
         } else{
            res.contentType('text/plain');
            res.status(204).end();
         }
    }, timeOutValue);
}