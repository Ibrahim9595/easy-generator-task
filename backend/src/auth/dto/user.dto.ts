import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsObject, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { UserDocument } from 'src/users/user.schema';

export class UserLoginInputDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class UserLoginResponse {
  @ApiProperty({
    type: String,
  })
  id: Types.ObjectId;
  @ApiProperty()
  name: string;
  @ApiProperty({
    format: 'email',
  })
  email: string;
}

export class UserSignUpInputDto extends CreateUserDto {}

export class UserSignUpDto {
  @ApiProperty()
  @IsString()
  accessToken: string;

  @ApiProperty()
  @IsString()
  refreshToken: string;

  @ApiProperty()
  @IsObject()
  user: UserLoginResponse;
}

export class UserLoginDto {
  @ApiProperty()
  @IsString()
  accessToken: string;

  @ApiProperty()
  @IsString()
  refreshToken: string;

  @ApiProperty({
    type: UserLoginResponse,
  })
  @IsObject()
  user: UserLoginResponse;
}

export class MeResponseDto extends UserLoginResponse {
  constructor(user: UserDocument) {
    super();
    this.id = user._id;
    this.email = user.email;
    this.name = user.name;
  }
}
