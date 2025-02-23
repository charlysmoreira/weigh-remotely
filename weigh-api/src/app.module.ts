import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { WeighModule } from './weigh/weigh.module';
import { MqttModule } from './mqtt/mqtt.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron/cron.service';

@Module({
  imports: [ScheduleModule.forRoot(), UserModule, WeighModule, MqttModule],
  controllers: [],
  providers: [PrismaService, CronService],
})
export class AppModule {}
