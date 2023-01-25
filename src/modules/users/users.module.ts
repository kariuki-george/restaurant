import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/users.model';
import { CustomersController } from './users.controller';
import { UsersRepo } from './users.repo';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersRepo, UsersService],
  controllers: [CustomersController],
})
export class UsersModule {}
