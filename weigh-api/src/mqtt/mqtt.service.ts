import { Injectable, OnModuleInit } from '@nestjs/common';
import * as mqtt from 'mqtt';

type InfoESP = {
    rssi: string;
    mac: string;
    ip: string;
    heap: string;
    voltagem: string;
    uptime: string;
};

@Injectable()
export class MqttService implements OnModuleInit {
    private value = '8.21';
    private infoESP: InfoESP = {
        mac: '',
        rssi: '',
        ip: '',
        heap: '',
        voltagem: '',
        uptime: '',
    };

    private readonly MQTT_BROKER = 'mqtt://test.mosquitto.org';
    private readonly MQTT_SUBSCRIBE_SENSOR = 'sensor/value';
    private readonly MQTT_REQUEST_SENSOR = 'sensor/request';
    private readonly MQTT_SUBSCRIBE_INFO = 'esp3266/info';
    private readonly MQTT_REQUEST_INFO = 'esp3266/request';

    private client!: mqtt.MqttClient;

    onModuleInit() {
        this.client = mqtt.connect(this.MQTT_BROKER);
        this.client.on('connect', () => {
            console.log('Conectado ao Broker MQTT');
            this.client.subscribe([
                this.MQTT_SUBSCRIBE_SENSOR,
                this.MQTT_SUBSCRIBE_INFO,
            ]);
        });

        this.client.on('message', (topic, message) => {
            if (topic === this.MQTT_SUBSCRIBE_SENSOR) {
                this.value = message.toString();
                console.log(`Sensor recebido: ${this.value}`);
            } else if (topic === this.MQTT_SUBSCRIBE_INFO) {
                const data = JSON.parse(message.toString()) as { mac: string };
                if (data.mac) {
                    this.infoESP[data.mac] = data;
                }
                console.log('Informações recebidas:', this.infoESP);
            }
        });
    }

    requestSensor(mac: string) {
        this.client.publish(this.MQTT_REQUEST_SENSOR, mac || '');
        return new Promise<string>((resolve) =>
            setTimeout(() => resolve(this.value), 2000),
        );
    }

    requestESPInfo() {
        this.client.publish(this.MQTT_REQUEST_INFO, '');
        return new Promise<InfoESP>((resolve) =>
            setTimeout(() => resolve(this.infoESP), 2000),
        );
    }
}
