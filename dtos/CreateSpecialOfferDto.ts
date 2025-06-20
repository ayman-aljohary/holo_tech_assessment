import {
  IsNumber,
  IsString,
  IsNotEmpty,
  MaxLength,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSpecialOfferDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    example: 'New Year Offer',
    maxLength: 255,
    required: true,
  })
  name: string;

  @IsNumber()
  @Max(99)
  @Min(1)
  @IsNotEmpty()
  @ApiProperty({
    example: '20',
    maximum: 99,
    minimum: 1,
    required: true,
  })
  discount: number;
}
