import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { SchemaTypes, Types } from 'mongoose';
import { AbstractDocument } from 'src/providers/database/abstract.schema';

@Schema()
class QueueOrder {
  @ApiProperty({ type: String })
  @Prop({ type: SchemaTypes.ObjectId })
  orderId: Types.ObjectId;
  @ApiProperty({ type: Date })
  @Prop({ type: Date })
  admittedAt: Date;
}

const QueueOrderSchema = SchemaFactory.createForClass(QueueOrder);

@Schema()
export class Queue extends AbstractDocument {
  @ApiProperty({ type: String })
  @Prop({ type: SchemaTypes.ObjectId })
  cookId: Types.ObjectId;
  @ApiProperty()
  @Prop({ unique: true })
  name: string;
  @ApiProperty({ type: QueueOrder, isArray: true })
  @Prop({ type: [QueueOrderSchema], default: [] })
  queueOrders: QueueOrder[];
}

export const QueueSchema = SchemaFactory.createForClass(Queue);
