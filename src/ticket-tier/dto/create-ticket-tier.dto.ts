import {
  IsInt,
  IsString,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class CreateTicketTierDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsInt()
  eventId: number;

  @IsInt()
  @IsOptional()
  buyerPrice?: number;

  @IsInt()
  @IsOptional()
  promoterPrice?: number;

  @IsString()
  @IsOptional()
  description: string;
}
