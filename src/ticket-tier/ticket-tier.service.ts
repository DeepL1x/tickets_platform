import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TicketTierService {
  constructor(private prisma: PrismaService) {}

  async createTicketTier(data: {
    name: string;
    eventId: number;
    buyerPrice?: number;
    promoterPrice?: number;
    serviceFee?: number;
    description?: string;
  }) {
    return this.prisma.$transaction(async (tx) => {
      if (data.buyerPrice && typeof data.buyerPrice === 'number') {
        const constants = await tx.constants.findUnique({ where: { id: 1 } });

        if (data.buyerPrice < constants.minimumFee) {
          throw new BadRequestException(
            `Buyer price must be greater than or equal to ${constants.minimumFee}`,
          );
        }

        const serviceFee = Math.ceil(
          data.buyerPrice * constants.serviceFeeRate,
        );

        data.serviceFee =
          serviceFee > constants.minimumFee ? serviceFee : constants.minimumFee;

        data.promoterPrice = data.buyerPrice - serviceFee;
      } else if (data.promoterPrice && typeof data.promoterPrice === 'number') {
        const constants = await tx.constants.findUnique({ where: { id: 1 } });

        const buyerPrice = Math.ceil(
          data.promoterPrice / (1 - constants.serviceFeeRate),
        );

        if (buyerPrice < constants.minimumFee) {
          data.buyerPrice = data.promoterPrice + constants.minimumFee;
          data.serviceFee = constants.minimumFee;
        } else {
          data.serviceFee = buyerPrice - data.promoterPrice;
          data.buyerPrice = buyerPrice;
        }
      }

      const newTicketTier = tx.ticketTier.create({
        data: {
          ...data,
          buyerPrice: data.buyerPrice,
          promoterPrice: data.promoterPrice,
          serviceFee: data.serviceFee,
        },
      });
      return newTicketTier;
    });
  }

  async getTicketTiers(where?: Prisma.TicketTierWhereInput) {
    return this.prisma.ticketTier.findMany({ where: where });
  }

  async getTicketTierById(where: Prisma.TicketTierWhereUniqueInput) {
    return this.prisma.ticketTier.findUnique({ where: where });
  }

  async updateTicketTier(
    where: Prisma.TicketTierWhereUniqueInput,
    data: Prisma.TicketTierUpdateInput,
  ) {
    return this.prisma.$transaction(async (tx) => {
      if (data.buyerPrice && typeof data.buyerPrice === 'number') {
        const constants = await tx.constants.findUnique({ where: { id: 1 } });
        
        if (data.buyerPrice < constants.minimumFee) {
          throw new BadRequestException(
            `Buyer price must be greater than or equal to ${constants.minimumFee}`,
          );
        }

        const serviceFee = Math.ceil(
          data.buyerPrice * constants.serviceFeeRate,
        );

        data.serviceFee =
          serviceFee > constants.minimumFee ? serviceFee : constants.minimumFee;
        data.promoterPrice = data.buyerPrice - serviceFee;
      } else if (data.promoterPrice && typeof data.promoterPrice === 'number') {
        const constants = await tx.constants.findUnique({ where: { id: 1 } });

        const buyerPrice = Math.ceil(
          data.promoterPrice / (1 - constants.serviceFeeRate),
        );

        if (buyerPrice < constants.minimumFee) {
          data.buyerPrice = data.promoterPrice + constants.minimumFee;
          data.serviceFee = constants.minimumFee;
        } else {
          data.serviceFee = buyerPrice - data.promoterPrice;
          data.buyerPrice = buyerPrice;
        }
      }
      const newTicketTier = tx.ticketTier.update({
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
