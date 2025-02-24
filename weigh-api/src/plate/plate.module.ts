import { Module } from '@nestjs/common';
import { PlateController } from './plate.controller';
import { PlateService } from './plate.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    controllers: [PlateController],
    providers: [PlateService, PrismaService],
})
export class PlateModule {}
