import { Controller, Get, Post, Put, Delete, Body } from '@nestjs/common';
import { ConstantsService } from './constants.service';
import { CreateConstantsDto } from './dto/create-constants.dto';
import { UpdateConstantsDto } from './dto/update-constants.dto';

@Controller('constants')
export class ConstantsController {
  constructor(private constantsService: ConstantsService) {}

  @Get()
  async getConstants() {
    return this.constantsService.getConstants();
  }

  @Post()
  async createConstants(@Body() data: CreateConstantsDto) {
    return this.constantsService.createConstants(data);
  }

  @Put()
  async updateConstants(@Body() data: UpdateConstantsDto) {
    return this.constantsService.updateConstants(data);
  }

  @Delete()
  async deleteConstants() {
    return this.constantsService.deleteConstants();
  }
}
