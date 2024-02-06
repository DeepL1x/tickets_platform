import { Module } from '@nestjs/common';
import { TicketTierService } from './ticket-tier.service';
import { TicketTierController } from './ticket-tier.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [PrismaService, TicketTierService],
  controllers: [TicketTierController],
  exports: [TicketTierService, PrismaService],
})
export class TicketTierModule {}
