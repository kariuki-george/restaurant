import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SchemaTypes, Types } from 'mongoose';
import { AbstractDocument } from 'src/providers/database/abstract.schema';
import { OrderStatusEnum } from '../enums';
import { OrderItem, OrderItemSchema } from './orderItems.model';

@Schema()
export class Order extends AbstractDocument {
  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  @Prop({ type: SchemaTypes.ObjectId })
  tableId: Types.ObjectId;
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  @Prop({ type: SchemaTypes.ObjectId })
  waiterId: Types.ObjectId;
  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  @Prop({ type: SchemaTypes.ObjectId })
  customerId: Types.ObjectId;
  @ApiProperty({ type: String })
  @Prop({ type: SchemaTypes.ObjectId })
  @IsString()
  @IsOptional()
  queueId?: Types.ObjectId;
  @IsEnum(OrderStatusEnum)
  @ApiProperty({ name: 'status', enum: OrderStatusEnum })
  @Prop({ type: String, default: OrderStatusEnum.CART })
  status: OrderStatusEnum;

  @ApiProperty({ type: OrderItem, isArray: true })
  @Prop({ type: [OrderItemSchema] })
  orderItems: OrderItem[];

  @ApiProperty()
  @Prop()
  total: number;
}

export const OrdersSchema = SchemaFactory.createForClass(Order);
