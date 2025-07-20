import { type Types } from 'mongoose';

export interface UserTokenPayload {
  name: string;
  email: string;
  id: Types.ObjectId;
}
