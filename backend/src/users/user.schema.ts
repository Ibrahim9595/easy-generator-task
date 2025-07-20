import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { HydratedDocument } from 'mongoose';

@Schema()
export class User {
  @Prop({ length: 500, required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Exclude()
  @Prop()
  password: string;

  @Prop({ default: null })
  refreshToken: string;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
