import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class OrderItem {
  @ApiProperty({ description: 'MenuItem Id' })
  @Prop()
  menuItemId: string;
  @ApiProperty({ description: 'Quantity of the the menuItems.' })
  @Prop()
  quantity: number;
  @ApiProperty({ description: 'The subtotal for the menuItems' })
  @Prop()
  subTotal: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
