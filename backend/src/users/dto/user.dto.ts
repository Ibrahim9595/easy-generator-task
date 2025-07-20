import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'User name, must be at least 3 characters long.',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    type: String,
    format: 'email',
    description: 'User email address.',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    format: 'password',
    description:
      'Password must be at least 8 characters long and contain at least one letter, one number, and one special character.',
  })
  @IsString()
  @IsOptional()
  @MinLength(8, {
    message: 'Password must be at least 8 characters long.',
  })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/, {
    message:
      'Password must contain at least one letter, one number, and one special character.',
  })
  password: string;
}

export class GetUserDto {
  @ApiProperty({
    type: String,
  })
  name: string;

  @ApiProperty({
    type: String,
    format: 'email',
  })
  email: string;
}
