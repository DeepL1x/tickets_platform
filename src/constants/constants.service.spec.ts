import { Test, TestingModule } from '@nestjs/testing';
import { ConstantsService } from './constants.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

describe('ConstantsService', () => {
  let service: ConstantsService;
  let prisma: PrismaService;

  const mockConstants = {
    id: 1,
    serviceFeeRate: 10,
    minimumFee: 500,
  };

  const mockConstantsUpdated = {
    id: 1,
    serviceFeeRate: 10,
    minimumFee: 100,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, ConstantsService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    service = module.get<ConstantsService>(ConstantsService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return null', async () => {
    prisma.constants.findUnique = jest.fn().mockResolvedValueOnce(null);
    expect(service.getConstants()).resolves.toBeNull();
  });

  it('should create and return new constants', async () => {
    prisma.constants.create = jest.fn().mockResolvedValueOnce(mockConstants);
    prisma.constants.count = jest.fn().mockResolvedValueOnce(0);
    jest
      .spyOn(prisma, '$transaction')
      .mockImplementationOnce((callback) => callback(prisma));
    expect(
      service.createConstants({ serviceFeeRate: 10, minimumFee: 500 }),
    ).resolves.toEqual(mockConstants);
  });

  it('should not create another constants and return null', async () => {
    prisma.constants.count = jest.fn().mockResolvedValueOnce(1);
    jest
      .spyOn(prisma, '$transaction')
      .mockImplementationOnce((callback) => callback(prisma));
    expect(
      service.createConstants({ serviceFeeRate: 10, minimumFee: 500 }),
    ).resolves.toBeNull();
  });

  it('should update and return updated constants', async () => {
    prisma.constants.update = jest
      .fn()
      .mockResolvedValueOnce(mockConstantsUpdated);

    expect(
      service.updateConstants({ serviceFeeRate: 10, minimumFee: 100 }),
    ).resolves.toEqual(mockConstantsUpdated);
  });

  it('should delete and return deleted constants', async () => {
    prisma.constants.delete = jest
      .fn()
      .mockResolvedValueOnce(mockConstantsUpdated);

    expect(service.deleteConstants()).resolves.toEqual(mockConstantsUpdated);
  });
});
