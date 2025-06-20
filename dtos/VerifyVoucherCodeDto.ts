import {
  IsNumber,
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyVoucherCodeDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  @MinLength(8)
  @ApiProperty({
    example: 'HJ82JhaA',
    maxLength: 15,
    minLength: 8,
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
}
