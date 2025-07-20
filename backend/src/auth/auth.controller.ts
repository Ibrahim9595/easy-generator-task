import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  UserLoginInputDto,
  UserSignUpInputDto,
  UserLoginDto,
  MeResponseDto,
} from './dto/user.dto';
import { UserTokenPayload } from './auth.model';
import { AuthGuard } from './auth.guard';
import { RefreshTokenGuard } from './refresh-token.guard';

@ApiTags('Authentication')
@UsePipes(new ValidationPipe())
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiResponse({
    type: UserLoginDto,
  })
  @Post('login')
  async login(@Body() { email, password }: UserLoginInputDto) {
    return await this.authService.login(email, password);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    description: 'User successfully signed up',
    type: UserLoginDto,
  })
  async signUp(@Body() user: UserSignUpInputDto): Promise<UserLoginDto> {
    return await this.authService.signUp(user);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiResponse({
    description: 'Get current user information',
    type: MeResponseDto,
  })
  async me(@Req() request: { user: UserTokenPayload }) {
    return await this.authService.me(request.user);
  }

  @ApiUnauthorizedResponse({ description: 'Invalid refresh token' })
  @ApiResponse({ description: 'Refresh token update', type: UserLoginDto })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token for authentication containing the refresh token',
    required: true,
  })
  @UseGuards(RefreshTokenGuard)
  @Put('refresh')
  async refreshToken(
    @Req()
    request: Partial<{ user: UserTokenPayload; refreshToken: string }>,
  ) {
    if (!request.user || !request.refreshToken) {
      throw new BadRequestException('INVALID_REFRESH_TOKEN');
    }
    return await this.authService.refreshToken(
      request.user,
      request.refreshToken,
    );
  }
}
