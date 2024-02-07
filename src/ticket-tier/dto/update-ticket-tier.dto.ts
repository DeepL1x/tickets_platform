import { IsInt, IsString, IsOptional } from 'class-validator';

export class updateTicketTierDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  eventId: number;

  @IsInt()
  @IsOptional()
  buyerPrice: number;

  @IsInt()
  @IsOptional()
  promoterPrice: number;

  @IsString()
  @IsOptional()
  description: string;
}
