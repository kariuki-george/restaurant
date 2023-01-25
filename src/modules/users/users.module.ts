import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CooksController } from './cooks.controller';
import { User, UserSchema } from './models/users.model';
import { CustomersController } from './users.controller';
import { UsersRepo } from './users.repo';
import { UsersService } from './users.service';
import { WaitersController } from './waiters.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersRepo, UsersService],
  controllers: [CustomersController, CooksController, WaitersController],
})
export class UsersModule {}
