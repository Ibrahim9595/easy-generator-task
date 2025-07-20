import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserTokenPayload } from './auth.model';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request & { refreshToken: string; user: UserTokenPayload } =
      context.switchToHttp().getRequest();
    const token = request?.headers.authorization?.split(' ')?.[1];

    if (token) {
      request.refreshToken = token;
      request.user = await this.jwtService.verifyAsync(token);
      return true;
    }

    return false;
  }
}
