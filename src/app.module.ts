import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketTierService } from './ticket-tier/ticket-tier.service';
import { ConstantsService } from './constants/constants.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, TicketTierService, ConstantsService],
})
export class AppModule {}
