import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy';
import { LoggingService } from 'src/services/logging.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        console.log(config.get<string>('AUTH_EXPIRATION_TIME'));
        return {
          secret: config.get<string>('AUTH_SECRET_KEY'),
          signOptions: {
            expiresIn: config.get<string>('AUTH_EXPIRATION_TIME'),
          },
        };
      },
    }),
    UsersModule,
  ],
  providers: [AuthService, JwtStrategy, LoggingService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
