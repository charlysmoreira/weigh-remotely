import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserDto } from '../dtos/userDto';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {}

    async create(user: UserDto) {
        return await this.prismaService.user.create({ data: user });
    }

    async findAll() {
        return await this.prismaService.user.findMany();
    }

    async findOne(id: number) {
        return await this.prismaService.user.findUnique({
            where: { id: Number(id) },
        });
    }

    async update(id: number, user: UserDto) {
        return await this.prismaService.user.update({
            where: { id: Number(id) },
            data: {
                name: user.name,
                phoneNumber: user.phoneNumber,
            },
        });
    }

    async delete(id: number) {
        return await this.prismaService.user.delete({
            where: { id: Number(id) },
        });
    }
}
