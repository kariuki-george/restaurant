import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { AbstractRepository } from 'src/providers/database/database.repository';
import { MenuItem } from './models/menuItem.model';

@Injectable()
export class MenuItemsRepo extends AbstractRepository<MenuItem> {
  readonly logger: Logger = new Logger(MenuItemsRepo.name);

  constructor(
    @InjectModel(MenuItem.name) MenuItemModel: Model<MenuItem>,
    @InjectConnection() connection: Connection,
  ) {
    super(MenuItemModel, connection);
  }
}
