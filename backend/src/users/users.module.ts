import { Module } from '@nestjs/common';
import { User, UserSchema } from './user.schema';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggingService } from 'src/services/logging.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [LoggingService, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
