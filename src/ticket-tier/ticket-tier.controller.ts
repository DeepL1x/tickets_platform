import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TicketTierService } from './ticket-tier.service';
import { TicketTier } from '@prisma/client';

@Controller('ticket-tier')
export class TicketTierController {
  constructor(private ticketTierService: TicketTierService) {}

  @Get('all')
  async getTicketTiers() {
    return this.ticketTierService.getTicketTiers();
  }

  @Get('event/:eventId')
  async getTicketTiersByEventId(@Param('eventId') eventId: number) {
    return this.ticketTierService.getTicketTiers({ eventId: eventId });
  }

  @Get('/:id')
  async getTicketTierById(@Param('id') id: number) {
    return this.ticketTierService.getTicketTierById({ id: id });
  }

  @Post()
  async createTicketTier(@Body() data: TicketTier) {
    return this.ticketTierService.createTicketTier(data);
  }

  @Put('/:id')
  async updateTicketTier(@Param('id') id: number, @Body() data: TicketTier) {
    return this.ticketTierService.updateTicketTier({ id: id }, data);
  }

  @Delete('/:id')
  async deleteTicketTier(@Param('id') id: number) {
    return this.ticketTierService.deleteTicketTier({ id: id });
  }
}
