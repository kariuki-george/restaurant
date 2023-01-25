import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QueuesModule } from '../queues/queues.module';
import { TablesModule } from '../tables/tables.module';
import { OrderItem, OrderItemSchema } from './models/orderItems.model';
import { Order, OrdersSchema } from './models/orders.model';
import { OrdersController } from './orders.controller';
import { OrdersService } from './Orders.services';
import { OrdersRepo } from './repos/orders.repo';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrdersSchema },
      { name: OrderItem.name, schema: OrderItemSchema },
    ]),
    TablesModule,
    QueuesModule,
  ],
  providers: [OrdersRepo, OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
