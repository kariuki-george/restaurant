import { OrderStatusEnum } from '../enums';

export class QueryOrderDto {
  waiterId?: string;
  queueId?: string;
  /**
   * This is the customerId
   */
  userId?: string;
  status?: OrderStatusEnum;
  orderId: string;
  tableId: string;
}
