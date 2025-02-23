import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PlateService } from './plate.service';
import { PlateDto } from 'src/dtos/plateDto';

@Controller('plate')
export class PlateController {
  constructor(private readonly plateService: PlateService) {}

  @Post()
  async create(@Body() plate: PlateDto) {
    return this.plateService.create(plate);
  }

  @Get()
  async findAll() {
    return this.plateService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.plateService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() user: PlateDto) {
    return this.plateService.update(id, user);
  }

  @Delete('id')
  async delete(@Param('id') id: number) {
    return this.plateService.delete(id);
  }
}
