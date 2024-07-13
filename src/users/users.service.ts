import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'schemas/user.schema';
import { RegisterUserDto } from './dto/user.dto';

export type user = any;

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModal: Model<User>) {}

  async findOne(email: string): Promise<user | undefined> {
    return this.userModal.findOne({ email }).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModal.find().exec();
  }

  async create(user: RegisterUserDto): Promise<User> {
    if (!user.username) {
      user.username = user.email.split('@')[0];
    }
    console.log("User To Save In DB: ", user);
    const createdUser = new this.userModal(user);
    return createdUser.save();
  }
}
