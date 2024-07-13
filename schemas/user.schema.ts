import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

enum userRoles {
  User = 'user',
  Admin = 'admin',
}

enum userStatus {
  Active = 'active',
  Inactive = 'inactive',
  Blocked = 'blocked',
  Deleted = 'deleted',
  Pending = 'pending',
  Banned = 'banned',
  Suspended = 'suspended',
}

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: 'user' })
  role: userRoles;

  @Prop({ required: true, default: false })
  isVerified: boolean;

  @Prop({ required: true, default: 'active' })
  status: userStatus;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
