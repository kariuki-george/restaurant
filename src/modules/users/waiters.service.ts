import { Injectable } from '@nestjs/common';
import { TablesService } from '../tables/tables.service';
import { WaiterEntity } from './entities/waiter.entity';
import { UsersService } from './users.service';

@Injectable()
export class WaitersService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tableService: TablesService,
  ) {}
  async getWaiterById(waiterId: string): Promise<WaiterEntity> {
    const tables = await this.tableService.getTables({ waiterId });
    const waiter = await this.usersService.getUserById(waiterId);
    return { ...waiter, tables };
  }
}
