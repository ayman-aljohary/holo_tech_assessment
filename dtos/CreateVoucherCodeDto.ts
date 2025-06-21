import {
  IsNumber,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsBoolean,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVoucherCodeDto {
  @IsNotEmpty()
  @MaxLength(15)
  @MinLength(8)
  @ApiProperty({
    example: 'HJ82JhaAA',
    maxLength: 15,
    minLength: 8,
    uniqueItems: true,
    required: true,
  })
  code: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 10,
    required: true,
  })
  customerId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 12,
    required: true,
  })
  specialOfferId: number;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    example: '2025-07-11',
    required: true,
  })
  expirationDate: Date;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example: true,
  })
  oneTimeUsage: boolean;

  usageDate: Date;
}
