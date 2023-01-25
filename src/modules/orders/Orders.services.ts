import { Injectable } from '@nestjs/common';
import { stringToObjectId } from 'src/helpers/stringToObjectId';
import { QueuesService } from '../queues/queues.service';
import { TablesService } from '../tables/tables.service';
import { CreateOrderDto } from './dtos/createOrderDto.dtos';
import { QueryOrderDto } from './dtos/queryOrder.dto';
import { UpdateOrderDto } from './dtos/updateOrder.dto';
import { OrderStatusEnum } from './enums';
import { Order } from './models/orders.model';
import { OrdersRepo } from './repos/orders.repo';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepo: OrdersRepo,
    private readonly tablesService: TablesService,
    private readonly queuesService: QueuesService,
  ) {}

  async getOrders(filter: Partial<QueryOrderDto>): Promise<Order[]> {
    //  OR operations edge cases
    if (
      !(
        filter.orderId &&
        filter.userId &&
        filter.queueId &&
        filter.waiterId &&
        filter.tableId &&
        filter.status
      )
    ) {
      return this.ordersRepo.find({});
    }
    if (
      filter.orderId &&
      filter.userId &&
      filter.queueId &&
      filter.waiterId &&
      filter.tableId &&
      filter.status
    ) {
      return this.ordersRepo.find({
        _id: filter.orderId,
        customerId: stringToObjectId(filter.userId),
        waiterId: stringToObjectId(filter.waiterId),
        tableId: stringToObjectId(filter.tableId),
        //  queueId: stringToObjectId(filter.queueId) },
        status: filter.status,
      });
    }
    return this.ordersRepo.find({
      $or: [
        { _id: stringToObjectId(filter.orderId) },
        { customerId: stringToObjectId(filter.userId) },
        { waiterId: stringToObjectId(filter.waiterId) },
        { tableId: stringToObjectId(filter.tableId) },
        { queueId: stringToObjectId(filter.queueId) },
        { status: filter.status },
      ],
    });
  }

  getOrderById(orderId: string): Promise<Order> {
    return this.ordersRepo.findOne({ _id: orderId });
  }

  async createOrder(order: CreateOrderDto): Promise<Order> {
    // Get waiter
    const table = await this.tablesService.getTableById({
      tableId: order.tableId,
    });

    // Total calculations
    // Need validations
    const total = order.orderItems.reduce(
      (sum, value) => sum + value.subTotal * value.quantity,
      0,
    );

    return this.ordersRepo.create({
      ...order,
      waiterId: stringToObjectId(table.waiterId),
      tableId: stringToObjectId(order.tableId),
      customerId: stringToObjectId(order.customerId),
      orderItems: order.orderItems,
      total,
    });
  }

  async updateOrder(order: UpdateOrderDto): Promise<Order> {
    // Update order status

    if (order.status === OrderStatusEnum.NEW) {
      // Add to queue
      // returns the cook id
      const queueId = await this.queuesService.assignQueue(order.orderId);
      order.queueId = stringToObjectId(queueId);
    }

    if (order.status === OrderStatusEnum.READY) {
      order.queueId = null;
    }

    return this.ordersRepo.findOneAndUpdate({ _id: order.orderId }, order);
  }

  deleteOrder(orderId: string): Promise<Boolean> {
    return this.ordersRepo.deleteOne({ _id: orderId });
  }
}
