import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { CreateTicketTierDto } from '../dto/create-ticket-tier.dto';

@Injectable()
export class PriceValidationPipe implements PipeTransform<CreateTicketTierDto, CreateTicketTierDto> {
  transform(value: CreateTicketTierDto, metadata: ArgumentMetadata) {
    if (!value.buyerPrice && !value.promoterPrice) {
      throw new BadRequestException(
        'Buyer price or promoter price is required',
      );
    }
    return value;
  }
}
