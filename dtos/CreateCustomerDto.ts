import { IsEmail, IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    example: 'Ayman Aljohary',
    maxLength: 255,
    required: true,
  })
  name: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'example@xyz.abc',
    maxLength: 255,
    uniqueItems: true,
    required: true,
  })
  email: string;
}
