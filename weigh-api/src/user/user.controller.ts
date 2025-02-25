import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from '../dtos/userDto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() user: UserDto) {
        return this.userService.create(user);
    }

    @Get()
    async findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.userService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() user: UserDto) {
        return this.userService.update(id, user);
    }

    @Delete('id')
    async delete(@Param('id') id: number) {
        return this.userService.delete(id);
    }
}
