import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { AbstractRepository } from 'src/providers/database/database.repository';
import { User } from './models/users.model';

@Injectable()
export class UsersRepo extends AbstractRepository<User> {
  protected readonly logger = new Logger(UsersRepo.name);

  constructor(
    @InjectModel(User.name) userModel: Model<User>,
    @InjectConnection() connection: Connection,
  ) {
    super(userModel, connection);
  }
}
