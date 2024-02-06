import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketTierService } from './ticket-tier/ticket-tier.service';
import { ConstantsService } from './constants/constants.service';
import { ConstantsController } from './constants/constants.controller';
import { TicketTierController } from './ticket-tier/ticket-tier.controller';
import { TicketTierModule } from './ticket-tier/ticket-tier.module';
import { ConstantsModule } from './constants/constants.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [TicketTierModule, ConstantsModule],
  controllers: [AppController, ConstantsController, TicketTierController],
  providers: [AppService, TicketTierService, ConstantsService],
})
export class AppModule {}
