'use strict';

var fs = require('fs'),
http = require('http'),
path = require('path');
var dataManager = require('./managers/data')




var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json({
strict: false
}));
var oasTools = require('oas-tools');
var jsyaml = require('js-yaml');
var mqtt=require('mqtt');

var topic='Covid19PERCOMDevices';


//TODO: Change for your configuration
var serverPort = process.env.PORT ||  80;

//TODO: Change for your mqtt server
//const mqttApp = mqtt.connect("mqtt://108.129.48.139:1883");
const mqttApp = mqtt.connect("mqtt://broker.hivemq.com:1883");


exports.topic=topic;
exports.port=serverPort;
exports.mqttApp=mqttApp;
exports.app=app;


var spec = fs.readFileSync(path.join(__dirname, '/api/openapi.yaml'), 'utf8');
var oasDoc = jsyaml.safeLoad(spec);

var options_object = {
    controllers: path.join(__dirname, './controllers'),
    loglevel: 'info',
    strict: false,
    router: true,
    validator: true
};

//MQTT connection App
mqttApp.on("connect",function(){
    console.log("Connected MQTT App");
})

mqttApp.on('error', function () {
    logger.error({
        method: "connect(error)",
        arguments: arguments,
        cause: "likely MQTT issue - will automatically reconnect soon",
    }, "unexpected error");
});


//Listen MQTT App for Results
mqttApp.subscribe('Covid19PERCOM')
mqttApp.subscribe('Covid19PERCOM/request')
mqttApp.subscribe('Covid19PERCOM/saveResult')


var sender = require('./managers/communication')

mqttApp.on('message', function (topic, message) {
  
    message= message.toString('utf8')

    if(topic=='Covid19PERCOM/request'){
        var body=JSON.parse(message);
               sender.sendRequest(body.params, body.resource, body.method, body.sender,"mqtt")
    }
    
    if(topic=='Covid19PERCOM'){
        dataManager.insertData(JSON.parse(message))
     }

    
});



oasTools.configure(options_object);

oasTools.initialize(oasDoc, app, function() {
    http.createServer(app).listen(serverPort, function() {
        console.log("App running at http://localhost:" + serverPort);
        console.log("________________________________________________________________");
        if (options_object.docs !== false) {
            console.log('API docs (Swagger UI) available on http://localhost:' + serverPort + '/docs');
            console.log("________________________________________________________________");
        }
    });
});