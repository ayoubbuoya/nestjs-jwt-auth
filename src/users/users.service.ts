import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'schemas/user.schema';
import { CreateUserDto } from './dto/user.dto';

export type user = any;

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModal: Model<User>) {}

  async findOne(username: string): Promise<user | undefined> {
    return this.userModal.findOne({ username }).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModal.find().exec();
  }

  async create(user: CreateUserDto): Promise<User> {
    const createdUser = new this.userModal(user);
    return createdUser.save();
  }
}
