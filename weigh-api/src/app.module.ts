import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { WeighModule } from './weigh/weigh.module';
import { MqttModule } from './mqtt/mqtt.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron/cron.service';
import { PlateService } from './plate/plate.service';
import { PlateModule } from './plate/plate.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    UserModule,
    WeighModule,
    MqttModule,
    PlateModule,
  ],
  controllers: [],
  providers: [PrismaService, CronService, PlateService],
})
export class AppModule {}
