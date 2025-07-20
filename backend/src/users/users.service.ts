import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model, Types } from 'mongoose';
import { LoggingService } from 'src/services/logging.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userRepo: Model<User>,
    private readonly logger: LoggingService,
  ) {}

  async findByEmailAndPassword(email: string, password: string) {
    const user = await this.userRepo.findOne({
      email,
    });

    const isValidPassword = user
      ? await bcrypt.compare(password, user.password)
      : false;

    return isValidPassword ? user : null;
  }

  async findByEmail(email: string) {
    return this.userRepo.findOne({
      email,
    });
  }

  async getUserProfile(userId: Types.ObjectId) {
    const user = await this.userRepo.findById(userId);
    if (!user) {
      this.logger.error(`User with ID ${userId.toString()} not found`);
      throw new NotFoundException();
    }
    return user;
  }

  async create(user: CreateUserDto) {
    const password = await this.hashPassword(user.password);
    return this.userRepo.create({
      ...user,
      password,
    });
  }

  async setRefreshToken(userId: Types.ObjectId, refreshToken: string) {
    return this.userRepo.findByIdAndUpdate(
      userId,
      { refreshToken },
      { new: true },
    );
  }

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
