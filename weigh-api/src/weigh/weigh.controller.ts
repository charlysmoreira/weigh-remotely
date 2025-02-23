import { Controller, Get } from '@nestjs/common';
import { WeighService } from './weigh.service';

@Controller('weigh')
export class WeighController {
  constructor(private readonly weighService: WeighService) {}

  @Get()
  async findAll() {
    return this.weighService.findAll();
  }
}
