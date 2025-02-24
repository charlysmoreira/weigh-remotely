import { Injectable } from '@nestjs/common';
import { PlateDto } from 'src/dtos/plateDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlateService {
    constructor(private prismaService: PrismaService) {}

    async create(plate: PlateDto) {
        await this.prismaService.plate.create({ data: plate });
    }

    async findAll() {
        return await this.prismaService.plate.findMany();
    }

    async findAllActive() {
        return await this.prismaService.plate.findMany({
            where: {
                active: true,
            },
        });
    }

    async findOne(id: number) {
        return await this.prismaService.plate.findUnique({
            where: { id: Number(id) },
        });
    }

    async update(id: number, plate: PlateDto) {
        return await this.prismaService.plate.update({
            where: { id: Number(id) },
            data: {
                mac: plate.mac,
                active: plate.active,
                userId: plate.userId,
            },
        });
    }

    async delete(id: number) {
        return await this.prismaService.plate.delete({
            where: { id: Number(id) },
        });
    }
}
