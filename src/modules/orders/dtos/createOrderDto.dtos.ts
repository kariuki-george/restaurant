import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { OrderStatusEnum } from '../enums';
import { CreateOrderItemDto } from './createOrderItem.dto';

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  customerId: string;

  @ApiProperty()
  @IsString()
  tableId: string;

  status: OrderStatusEnum.NEW;

  @ApiProperty({ type: CreateOrderItemDto, isArray: true, description: '' })
  @IsArray()
  orderItems: CreateOrderItemDto[];
}
