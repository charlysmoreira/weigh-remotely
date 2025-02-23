import { Injectable, OnModuleInit } from '@nestjs/common';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService implements OnModuleInit {
  private client: mqtt.MqttClient;
  private value = '0.1';
  private infoESP = {};

  private readonly MQTT_BROKER = 'mqtt://test.mosquitto.org';
  private readonly MQTT_SUBSCRIBE_SENSOR = 'sensor/value';
  private readonly MQTT_REQUEST_SENSOR = 'sensor/request';
  private readonly MQTT_SUBSCRIBE_INFO = 'esp3266/info';
  private readonly MQTT_REQUEST_INFO = 'esp3266/request';

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
        const data = JSON.parse(message.toString());
        if (data.mac) {
          this.infoESP[data.mac] = data;
        }
        console.log('Informações recebidas:', this.infoESP);
      }
    });
  }

  requestSensor(mac: string): Promise<string> {
    this.client.publish(this.MQTT_REQUEST_SENSOR, mac || '');
    return new Promise((resolve) =>
      setTimeout(() => resolve(this.value), 2000),
    );
  }

  requestESPInfo(): Promise<any> {
    this.infoESP = {};
    this.client.publish(this.MQTT_REQUEST_INFO, '');
    return new Promise((resolve) =>
      setTimeout(() => resolve(this.infoESP), 2000),
    );
  }
}
