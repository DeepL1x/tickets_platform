import { Controller, Get, Post, Put, Delete, Body } from '@nestjs/common';
import { ConstantsService } from './constants.service';
import { Prisma } from '@prisma/client';

@Controller('constants')
export class ConstantsController {
  constructor(private constantsService: ConstantsService) {}

  @Get()
  async getConstants() {
    return this.constantsService.getConstants();
  }

  @Post()
  async createConstants(@Body() data: Prisma.ConstantsCreateInput) {
    return this.constantsService.createConstants(data);
  }

  @Put()
  async updateConstants(@Body() data: Prisma.ConstantsUpdateInput) {
    return this.constantsService.updateConstants(data);
  }

  @Delete()
  async deleteConstants() {
    return this.constantsService.deleteConstants();
  }
}
