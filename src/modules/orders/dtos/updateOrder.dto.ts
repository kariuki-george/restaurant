import { OmitType, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Order } from '../models/orders.model';

export class UpdateOrderDto extends PartialType(
  OmitType(Order, ['_id', 'orderItems', 'total'] as const),
) {
  /**
   * This is the orderId
   */
  @IsString()
  @IsNotEmpty()
  orderId: string;
}
