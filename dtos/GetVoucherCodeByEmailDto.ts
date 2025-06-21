import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetVoucherCodeByEmailDto {
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
