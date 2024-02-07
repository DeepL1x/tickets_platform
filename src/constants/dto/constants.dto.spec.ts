import { validate } from 'class-validator';
import { CreateConstantsDto } from './create-constants.dto';

describe('Constant validation test', () => {
  const dtoObject: CreateConstantsDto = {
    minimumFee: 100,
    serviceFeeRate: 0.1,
  };

  it('should fail on invalid data type', async () => {
    const invalidDtoObject = new CreateConstantsDto();
    //@ts-ignore
    invalidDtoObject.minimumFee = 'asd';
    //@ts-ignore
    invalidDtoObject.serviceFeeRate = `fsd`;

    const errors = await validate(invalidDtoObject);

    expect(errors.length).toBe(2);
  });

  it('should fail on invalid data', async () => {
    const invalidDtoObject = new CreateConstantsDto();
    invalidDtoObject.minimumFee = 0.1;
    invalidDtoObject.serviceFeeRate = -1;

    const errors = await validate(invalidDtoObject);

    expect(errors.length).toBe(2);
  });
});
