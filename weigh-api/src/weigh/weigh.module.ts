import { Module } from '@nestjs/common';
import { WeighController } from './weigh.controller';
import { WeighService } from './weigh.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [WeighController],
  exports: [WeighService],
  providers: [WeighService, PrismaService],
})
export class WeighModule {}
