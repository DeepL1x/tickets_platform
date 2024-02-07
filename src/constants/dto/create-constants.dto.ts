import { IsInt, IsNumber, Min } from 'class-validator';

export class CreateConstantsDto {
  @IsNumber()
  @Min(0, { message: 'Service fee rate must be greater than or equal to 0' })
  serviceFeeRate: number;

  @IsInt({
    message: 'Minimum fee must be an integer describing price in cents',
  })
  @Min(0, { message: 'Minimum fee must be greater than or equal to 0' })
  minimumFee: number;
}
