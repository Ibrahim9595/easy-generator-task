import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  UserSignUpInputDto,
  UserLoginDto,
  MeResponseDto,
} from './dto/user.dto';
import { UserDocument } from 'src/users/user.schema';
import { UserTokenPayload } from './auth.model';
import { LoggingService } from 'src/services/logging.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly logger: LoggingService,
  ) {}

  async login(email: string, password: string): Promise<UserLoginDto> {
    const dbUser = await this.usersService.findByEmailAndPassword(
      email,
      password,
    );

    if (!dbUser) {
      this.logger.error(
        `Login failed for email: ${email} - User not found or password incorrect`,
      );
      throw new UnauthorizedException('INCORRECT_CREDENTIALS');
    }

    return this.enhanceWithTokens(dbUser);
  }

  async signUp({
    email,
    password,
    name,
  }: UserSignUpInputDto): Promise<UserLoginDto> {
    const dbUser = await this.usersService.findByEmail(email);
    if (dbUser) {
      throw new BadRequestException('EMAIL_ALREADY_REGISTERED');
    }

    await this.usersService.create({
      name,
      email,
      password,
    });

    const userFullData = await this.usersService.findByEmail(email);

    if (!userFullData) {
      this.logger.error(`User with email ${email} not found after sign up`);
      throw new BadRequestException('USER_NOT_FOUND');
    }

    return this.enhanceWithTokens(userFullData);
  }

  async refreshToken(userTokenPayload: UserTokenPayload, refreshToken: string) {
    const user = await this.usersService.getUserProfile(userTokenPayload.id);

    if (user.refreshToken !== refreshToken) {
      this.logger.error(
        `User with ID ${userTokenPayload.id.toString()} attempted to refresh token with an invalid refresh token.`,
      );
      throw new UnauthorizedException('Incorrect refresh token');
    }
    if (!user) {
      this.logger.error(
        `User with ID ${userTokenPayload.id.toString()} not found`,
      );
      throw new NotFoundException('User not found');
    }

    return this.enhanceWithTokens(user);
  }

  async enhanceWithTokens(dbUser: UserDocument): Promise<UserLoginDto> {
    const { _id, name, email } = dbUser;

    const payload: UserTokenPayload = {
      id: _id,
      email,
      name,
    };
    const accessToken = this.signToken(payload);
    const refreshToken = this.signToken(
      payload,
      this.configService.get<string>('AUTH_REFRESH_TOKEN_DURATION'),
    );

    await this.usersService.setRefreshToken(_id, refreshToken);

    return {
      accessToken,
      refreshToken,
      user: {
        id: _id,
        name: dbUser.name,
        email,
      },
    };
  }

  async me(userTokenPayload: UserTokenPayload) {
    const userProfile = await this.usersService.getUserProfile(
      userTokenPayload.id,
    );

    return new MeResponseDto(userProfile);
  }

  private signToken(payload: UserTokenPayload, expiresIn?: string) {
    return this.jwtService.sign(payload, expiresIn ? { expiresIn } : {});
  }
}
