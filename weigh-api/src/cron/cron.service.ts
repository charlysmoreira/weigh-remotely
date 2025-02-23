import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MqttService } from '../mqtt/mqtt.service';
import { WeighService } from 'src/weigh/weigh.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(
    private readonly mqttService: MqttService,
    private readonly weighService: WeighService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleSensorData() {
    try {
      const macAddress = '00:11:22:33:44:55';
      this.logger.log('Solicitando dados do sensor...');

      const sensorData = await this.mqttService.requestSensor(macAddress);
      this.logger.log(`Valor do sensor: ${sensorData}`);

      const weigh = {
        mac: macAddress.toString(),
        value: parseFloat(sensorData),
        createAt: new Date(),
      };

      await this.weighService.create(weigh);
    } catch (error) {
      this.logger.error('Erro ao processar dados do sensor', error);
    }
  }
}
