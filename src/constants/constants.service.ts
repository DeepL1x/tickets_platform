import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ConstantsService {
  constructor(private prisma: PrismaService) {}

  async getConstants() {
    return this.prisma.constants.findUnique({
      where: {
        id: 1,
      },
    });
  }

  async updateConstants(data: Prisma.ConstantsUpdateInput) {
    return this.prisma.constants.update({
      where: {
        id: 1,
      },
      data,
    });
  }

  async createConstants(data: Prisma.ConstantsCreateInput) {
    return this.prisma.$transaction(async (tx) => {
      const amount = await tx.constants.count();
      if (amount === 0) {
        return tx.constants.create({ data: { ...data, id: 1 } });
      }
      return null;
    });
  }

  async deleteConstants() {
    return this.prisma.constants.delete({
      where: {
        id: 1,
      },
    });
  }
}
