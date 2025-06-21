import {
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsEmail,
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

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'example@xyz.abc',
    maxLength: 255,
    required: true,
  })
  email: string;
}
