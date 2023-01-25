import { BadRequestException, Injectable } from '@nestjs/common';
import { TABLE_ALREADY_EXISTS } from 'src/errors/errors.constants';
import { CreateTableDto } from './dtos/createTable.dto';
import { GetTableDto } from './dtos/getTable.dto';
import { UpdateTableDto } from './dtos/updateTable.dto';
import { Table } from './models/table.model';
import { TablesRepo } from './tables.repo';

@Injectable()
export class TablesService {
  constructor(private readonly tablesRepo: TablesRepo) {}

  getTables(filter?: Partial<Table>) {
    return this.tablesRepo.find({ filter });
  }

  getTableById(table: GetTableDto): Promise<Table> {
    return this.tablesRepo.findOne({ _id: table.tableId });
  }

  async createTable(table: CreateTableDto): Promise<Table> {
    try {
      return await this.tablesRepo.create({
        ...table,
      });
    } catch (error) {
      if (error.message.startsWith('E11000 duplicate key error collection')) {
        throw new BadRequestException(TABLE_ALREADY_EXISTS);
      }
    }
  }

  async updateTable(table: UpdateTableDto): Promise<Table> {
    return this.tablesRepo.findOneAndUpdate({ _id: table.tableId }, table);
  }

  deleteTable(tableId: string) {
    return this.tablesRepo.deleteOne({ _id: tableId });
  }
}
