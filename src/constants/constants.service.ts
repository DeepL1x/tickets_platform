import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Constants } from '@prisma/client';

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

  async updateConstants(data: Constants) {
    return this.prisma.constants.update({
      where: {
        id: 1,
      },
      data,
    });
  }

  async createConstants(data: Constants) {
    return this.prisma.$transaction(async (tx) => {
      const amount = await tx.constants.count();
      if (amount === 0) {
        return tx.constants.create({ data: { ...data, id: 1 } });
      }
      return null;
    });
  }
}
