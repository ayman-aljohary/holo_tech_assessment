import {
  IsNumber,
  IsString,
  IsNotEmpty,
  MaxLength,
  IsBoolean,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVoucherCodeDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    example: 'xAbzruty78',
    maxLength: 10,
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
    required: true,
  })
  oneTimeUsage: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example: true,
    required: true,
  })
  trackUsage: boolean;
}
