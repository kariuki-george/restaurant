import { BadRequestException, Injectable } from '@nestjs/common';
import { EMAIL_ALREADY_EXISTS } from 'src/errors/errors.constants';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { User } from './models/users.model';
import { UsersRepo } from './users.repo';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepo) {}

  getUserById(userId: string): Promise<User> {
    return this.usersRepo.findOne({ _id: userId });
  }

  getUsers(): Promise<User[]> {
    return this.usersRepo.find({});
  }

  getUserByEmail(email: string): Promise<User> {
    return this.usersRepo.findOne({ email });
  }
  async createUser(user: CreateUserDto): Promise<User> {
    try {
      return await this.usersRepo.create(user);
    } catch (error) {
      if (error.message.startsWith('E11000 duplicate key error collection')) {
        throw new BadRequestException(EMAIL_ALREADY_EXISTS);
      }
    }
  }

  updateUser(user: UpdateUserDto): Promise<User> {
    return this.usersRepo.findOneAndUpdate({ _id: user.userId }, user);
  }

  deleteUser(userId: string): Promise<Boolean> {
    // Cleanup ip for cooks and waiters

    return this.usersRepo.deleteOne({ _id: userId });
  }
}
