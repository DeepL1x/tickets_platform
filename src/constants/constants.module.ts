import { Module } from '@nestjs/common';
import { ConstantsService } from './constants.service';
import { ConstantsController } from './constants.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [PrismaService, ConstantsService],
  controllers: [ConstantsController],
  exports: [ConstantsService, PrismaService],
})
export class ConstantsModule {}
