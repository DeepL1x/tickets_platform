import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { TicketTierService } from './ticket-tier.service';
import { CreateTicketTierDto } from './dto/create-ticket-tier.dto';
import { updateTicketTierDto } from './dto/update-ticket-tier.dto';
import { PriceValidationPipe } from './validators/price-validation.pipe';

@Controller('ticket-tier')
export class TicketTierController {
  constructor(private ticketTierService: TicketTierService) {}

  @Get('all')
  async getTicketTiers() {
    return this.ticketTierService.getTicketTiers();
  }

  @Get('event/:eventId')
  async getTicketTiersByEventId(
    @Param('eventId', ParseIntPipe) eventId: number,
  ) {
    return this.ticketTierService.getTicketTiers({ eventId: eventId });
  }

  @Get('/:id')
  async getTicketTierById(@Param('id', ParseIntPipe) id: number) {
    return this.ticketTierService.getTicketTierById({ id: id });
  }

  @Post()
  async createTicketTier(@Body(PriceValidationPipe) data: CreateTicketTierDto) {
    return this.ticketTierService.createTicketTier(data);
  }

  @Put('/:id')
  async updateTicketTier(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: updateTicketTierDto,
  ) {
    return this.ticketTierService.updateTicketTier({ id: id }, data);
  }

  @Delete('/:id')
  async deleteTicketTier(@Param('id', ParseIntPipe) id: number) {
    return this.ticketTierService.deleteTicketTier({ id: id });
  }
}
