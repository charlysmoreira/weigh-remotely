import { Injectable } from '@nestjs/common';
import { WeighDto } from '../dtos/weighDto';
import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class WeighService {
  constructor(private prismaService: PrismaService) {}

  async create(weigh: WeighDto) {
    return await this.prismaService.weigh.create({ data: weigh });
  }

  async findAll() {
    return await this.prismaService.weigh.findMany();
  }
}
