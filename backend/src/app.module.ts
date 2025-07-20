import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    AuthModule,
    UsersModule,
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const username = configService.get<string>('MONGO_ROOT_USERNAME');
        const password = configService.get<string>('MONGO_ROOT_PASSWORD');
        const database = configService.get<string>('MONGO_DATABASE');
        const host = configService.get<string>('MONGO_HOST', 'localhost');
        const port = configService.get<number>('MONGO_PORT', 27017);

        return {
          uri: `mongodb://${username}:${password}@${host}:${port}`,
          dbName: database,
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
