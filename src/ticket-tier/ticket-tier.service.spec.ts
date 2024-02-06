import { Test, TestingModule } from '@nestjs/testing';
import { TicketTierService } from './ticket-tier.service';
import { PrismaService } from '../prisma/prisma.service';
import { mockDeep } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';

describe('TicketTierService', () => {
  let service: TicketTierService;
  let prisma: PrismaService;

  const mockConstants = {
    id: 1,
    serviceFeeRate: 0.1,
    minimumFee: 100,
  };
  const ticketBuyerPrice = 1000;
  const ticketPromoterPrice = 900;

  const mockTicketTierCreate = {
    id: 1,
    name: 'test',
    eventId: 1,
  };

  const mockTicketTierCreateBuyer = {
    ...mockTicketTierCreate,
    buyerPrice: ticketBuyerPrice,
  };

  const mockTicketTierCreatePromoter = {
    ...mockTicketTierCreate,
    promoterPrice: ticketPromoterPrice,
  };

  const mockTicketTier = {
    id: 1,
    name: 'test',
    eventId: 1,
    buyerPrice: ticketBuyerPrice,
    serviceFee: ticketBuyerPrice - ticketPromoterPrice,
    promoterPrice: ticketPromoterPrice,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, TicketTierService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    service = module.get<TicketTierService>(TicketTierService);
    prisma = module.get(PrismaService);
    prisma.constants.findUnique = jest.fn().mockResolvedValue(mockConstants);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create TicketTier', () => {
    it('should create a ticket tier by buyer price', async () => {
      prisma.ticketTier.create = jest
        .fn()
        .mockImplementationOnce((args) => args.data);

      jest
        .spyOn(prisma, '$transaction')
        .mockImplementationOnce((callback) => callback(prisma));

      expect(
        service.createTicketTier(mockTicketTierCreateBuyer),
      ).resolves.toEqual(mockTicketTier);
    });

    it('should create a ticket tier by promoter price', async () => {
      prisma.ticketTier.create = jest
        .fn()
        .mockImplementationOnce((args) => args.data);

      jest
        .spyOn(prisma, '$transaction')
        .mockImplementationOnce((callback) => callback(prisma));

      expect(
        service.createTicketTier(mockTicketTierCreatePromoter),
      ).resolves.toEqual(mockTicketTier);
    });
  });

  describe('update TicketTier', () => {
    it('should update a ticket tier by buyer price', async () => {
      prisma.ticketTier.update = jest
        .fn()
        .mockImplementationOnce((args) => args.data);

      jest
        .spyOn(prisma, '$transaction')
        .mockImplementationOnce((callback) => callback(prisma));

      expect(
        service.updateTicketTier({ id: 1 }, { buyerPrice: 2000 }),
      ).resolves.toEqual({
        buyerPrice: 2000,
        serviceFee: 200,
        promoterPrice: 1800,
      });
    });

    it('should update a ticket tier by promoter price', async () => {
      prisma.ticketTier.update = jest
        .fn()
        .mockImplementationOnce((args) => args.data);

      jest
        .spyOn(prisma, '$transaction')
        .mockImplementationOnce((callback) => callback(prisma));

      expect(
        service.updateTicketTier({ id: 1 }, { promoterPrice: 1800 }),
      ).resolves.toEqual({
        buyerPrice: 2000,
        serviceFee: 200,
        promoterPrice: 1800,
      });
    });
  });
});
