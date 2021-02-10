[![10.5281/zenodo.4476371](https://img.shields.io/badge/DOI-10.5281%2Fzenodo.4476371-blue.svg)](https://zenodo.org/record/4476371)

# Cloud server companion for COVID showcase
## Deployment Instructions


**Create MQTT server:** It is necessary to create an MQTT server for the connection between the server-side and the mobile-side, [tutorial](https://www.vultr.com/docs/how-to-install-mosquitto-mqtt-broker-server-on-ubuntu-16-04). **You can also connect to an active MQTT server,** [Active MQTT server](https://www.hivemq.com/public-mqtt-broker/).

**Connect the cloud application to the MQTT server:** (Now it is configured to an active MQTT server [HiveMQ](https://www.hivemq.com/public-mqtt-broker/).)
1. Access to:
`./index.js`
2. Introduce the **IP/host** and **port** of the MQTT server in the variable *mqttApp*.
    ```sh
    const mqttApp = mqtt.connect("mqtt://<ip/host>:<port>");
    ```
  
**Change server port (currently set to 80) if necessary:**
```sh
var serverPort = process.env.PORT || <port>;
```


## Running the server
**[NodeJS](https://nodejs.org/) must be installed**. 
To run the server, run:
```
npm install
```
```
sudo node index.js
```
