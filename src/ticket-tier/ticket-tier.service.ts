import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TicketTier, Prisma } from '@prisma/client';

@Injectable()
export class TicketTierService {
  constructor(private prisma: PrismaService) {}

  async createTicketTier(data: TicketTier) {
    return this.prisma.$transaction(async (tx) => {
      const constants = await tx.constants.findUnique({ where: { id: 1 } });
      const serviceFee = (data.buyerPrice / 100) * constants.serviceFeeRate;
      const newTicketTier = await tx.ticketTier.create({
        data: {
          ...data,
          serviceFee:
            serviceFee > constants.minimumFee
              ? serviceFee
              : constants.minimumFee,
          promoterPrice: data.buyerPrice - serviceFee,
        },
      });
      return newTicketTier;
    });
  }

  async getTicketTiers() {
    return this.prisma.ticketTier.findMany();
  }

  async getTicketTierById(where: Prisma.TicketTierWhereUniqueInput) {
    return this.prisma.ticketTier.findUnique({ where: where });
  }

  async updateTicketTier(
    where: Prisma.TicketTierWhereUniqueInput,
    data: TicketTier,
  ) {
    return this.prisma.$transaction(async (tx) => {
      if (data.buyerPrice) {
        const constants = await tx.constants.findUnique({ where: { id: 1 } });
        const serviceFee = (data.buyerPrice / 100) * constants.serviceFeeRate;
        data.serviceFee =
          serviceFee > constants.minimumFee ? serviceFee : constants.minimumFee;
        data.promoterPrice = data.buyerPrice - serviceFee;
      } else if (data.promoterPrice) {
        const constants = await tx.constants.findUnique({ where: { id: 1 } });
        const buyerPrice = Math.ceil(
          data.promoterPrice / (1 - constants.serviceFeeRate),
        );
        data.serviceFee = buyerPrice - data.promoterPrice;
        data.buyerPrice = buyerPrice;
      }
      const newTicketTier = await tx.ticketTier.update({
        where: where,
        data: data,
      });
      return newTicketTier;
    });
  }

  async deleteTicketTier(where: Prisma.TicketTierWhereUniqueInput) {
    return this.prisma.ticketTier.delete({ where: where });
  }
}
