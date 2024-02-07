import { ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { CreateTicketTierDto } from '../dto/create-ticket-tier.dto';
import { PriceValidationPipe } from './price-validation.pipe';

describe('At least one price value validation', () => {
  it('should validate object', async () => {
    const validDtoObject = new CreateTicketTierDto();
    validDtoObject.buyerPrice = 1123;
    const target: PriceValidationPipe = new PriceValidationPipe();
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: CreateTicketTierDto,
      data: '',
    };
    expect(target.transform(validDtoObject, metadata)).toEqual(validDtoObject);
  });

  it('should throw an error', async () => {
    const invalidDtoObject = new CreateTicketTierDto();
    const target: PriceValidationPipe = new PriceValidationPipe();
    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: CreateTicketTierDto,
      data: '',
    };
    try {
      target.transform(invalidDtoObject, metadata);
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
    }
  });
});
