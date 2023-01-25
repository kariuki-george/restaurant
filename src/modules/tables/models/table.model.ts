import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { AbstractDocument } from 'src/providers/database/abstract.schema';

@Schema()
export class Table extends AbstractDocument {
  @ApiProperty({ description: 'Name of the table.', required: true })
  @Prop({ unique: true })
  name: string;
  @Prop()
  @ApiProperty({
    description: 'How many people the table can cater for.',
    required: true,
  })
  capacity: number;

  @Prop()
  @ApiProperty({ description: 'Waiter attending the table' })
  waiterId?: string;
}

export const TablesSchema = SchemaFactory.createForClass(Table);
