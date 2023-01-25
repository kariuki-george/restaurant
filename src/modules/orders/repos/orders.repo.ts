import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { AbstractRepository } from 'src/providers/database/database.repository';
import { Order } from '../models/orders.model';

@Injectable()
export class OrdersRepo extends AbstractRepository<Order> {
  readonly logger: Logger = new Logger(OrdersRepo.name);

  constructor(
    @InjectModel(Order.name) ordersModel: Model<Order>,
    @InjectConnection() connection: Connection,
  ) {
    super(ordersModel, connection);
  }
}
