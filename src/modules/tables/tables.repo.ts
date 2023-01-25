import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { AbstractRepository } from 'src/providers/database/database.repository';
import { Table } from './models/table.model';

@Injectable()
export class TablesRepo extends AbstractRepository<Table> {
  protected readonly logger = new Logger(TablesRepo.name);

  constructor(
    @InjectModel(Table.name) tablesModel: Model<Table>,
    @InjectConnection() connection: Connection,
  ) {
    super(tablesModel, connection);
  }
}
