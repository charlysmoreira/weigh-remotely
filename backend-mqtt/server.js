require('dotenv').config();
const mqtt = require('mqtt');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configurações do broker MQTT
const MQTT_BROKER = "mqtt://test.mosquitto.org"; // Use um broker público ou local
const MQTT_SUBSCRIBE_SENSOR = "sensor/value";
const MQTT_REQUEST_SENSOR = "sensor/request";
const MQTT_SUBSCRIBE_INFO = "esp3266/info";
const MQTT_REQUEST_INFO = "esp3266/request";

const client = mqtt.connect(MQTT_BROKER);

let value = "Sem dados";
let infoESP = {};

// Conectar ao MQTT e assinar os tópicos de resposta
client.on('connect', () => {
    console.log('Conectado ao Broker MQTT');
    client.subscribe(MQTT_SUBSCRIBE_SENSOR);
    client.subscribe(MQTT_SUBSCRIBE_INFO);
});

// Captura mensagens do ESP8266
client.on('message', (topic, message) => {
    if (topic === MQTT_SUBSCRIBE_SENSOR) {
        value = message.toString();
        console.log(`Sensor recebida: ${value}`);
    }
    if (topic === MQTT_SUBSCRIBE_INFO) {
        const data = JSON.parse(message.toString());
        if (data.mac) {
            infoESP[data.mac] = data;
        }
        console.log("Informações recebidas:", infoESP);
    }
});

// Rota para solicitar o valor do sensor
app.get('/sensor', (req, res) => {
    const mac = req.query.mac;
    console.log('Solicitando valor do sensor...');
    client.publish(MQTT_REQUEST_SENSOR, mac);

    setTimeout(() => {
        res.json({ value: value });
    }, 2000);
});

// Rota para solicitar informações do ESP8266
app.get('/esp-info', (req, res) => {
    console.log('Solicitando informações do ESP8266...');
    infoESP = {};
    client.publish(MQTT_REQUEST_INFO);

    setTimeout(() => {
        res.json(infoESP);
    }, 2000);
});

// Inicia o servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
