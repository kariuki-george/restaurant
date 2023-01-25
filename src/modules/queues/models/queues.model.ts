import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { SchemaTypes, Types } from 'mongoose';
import { AbstractDocument } from 'src/providers/database/abstract.schema';

@Schema()
export class Queue extends AbstractDocument {
  @ApiProperty({ type: String })
  @Prop({ type: SchemaTypes.ObjectId })
  cookId: Types.ObjectId;
  @ApiProperty()
  @Prop({ unique: true })
  name: string;
}

export const QueueSchema = SchemaFactory.createForClass(Queue);
