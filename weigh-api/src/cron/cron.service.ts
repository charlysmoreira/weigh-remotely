import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MqttService } from '../mqtt/mqtt.service';
import { WeighService } from 'src/weigh/weigh.service';
import { PlateService } from 'src/plate/plate.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(
    private readonly mqttService: MqttService,
    private readonly weighService: WeighService,
    private readonly plateService: PlateService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleSensorData() {
    try {
      const plates = await this.plateService.findAll();
      const macAddresses = plates.map((plate) => plate.mac);

      this.logger.log(`Solicitando dados de: ${macAddresses.length} placas`);

      for (const macAddress of macAddresses) {
        this.logger.log(`Solicitando dados do sensor ${macAddress}...`);

        const sensorData = await this.mqttService.requestSensor(macAddress);
        this.logger.log(`Valor do sensor ${macAddress}: ${sensorData}`);

        const weigh = {
          mac: macAddress,
          value: parseFloat(sensorData),
          createAt: new Date(),
        };

        await this.weighService.create(weigh);
      }
    } catch (error) {
      this.logger.error('Erro ao processar dados do sensor', error);
    }
  }
}
