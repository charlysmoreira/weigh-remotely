import { Controller, Get, Query } from '@nestjs/common';
import { MqttService } from './mqtt.service';

@Controller('mqtt')
export class MqttController {
    constructor(private readonly mqttService: MqttService) {}

    @Get('sensor')
    async getSensorValue(@Query('mac') mac: string) {
        const value = await this.mqttService.requestSensor(mac);
        return { value };
    }

    @Get('info')
    getESPInfo() {
        return this.mqttService.requestESPInfo();
    }
}
