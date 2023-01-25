import { Injectable } from '@nestjs/common';
import { CookEntity } from './entities/cook.entity';
import { UsersRepo } from './users.repo';

@Injectable()
export class CooksService {
  constructor(private readonly usersRepo: UsersRepo) {}

  getCookByUserId(cookId: string): Promise<CookEntity> {
    return this.usersRepo.findOne({ _id: cookId });
  }
}
