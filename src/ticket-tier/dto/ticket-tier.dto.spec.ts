import { validate } from 'class-validator';
import { CreateTicketTierDto } from './create-ticket-tier.dto';

describe('Constant validation test', () => {
  it('should fail on invalid data type', async () => {
    const invalidDtoObject = new CreateTicketTierDto();
    //@ts-ignore
    invalidDtoObject.name = 123;
    //@ts-ignore
    invalidDtoObject.eventId = 0.123;
    //@ts-ignore
    invalidDtoObject.buyerPrice = 0.123;
    //@ts-ignore
    invalidDtoObject.promoterPrice = 0.123;
    //@ts-ignore
    invalidDtoObject.description = 0.123;
    const errors = await validate(invalidDtoObject);

    expect(errors.length).toBe(5);
  });
});
