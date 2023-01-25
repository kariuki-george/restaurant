import { PartialType } from '@nestjs/swagger';
import { CreateOrderItemDto } from './createOrderItem.dto';

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {
  OrderItemId: string;
}
