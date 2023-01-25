import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { AbstractDocument } from 'src/providers/database/abstract.schema';

@Schema()
export class MenuItem extends AbstractDocument {
  @Prop()
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @Prop()
  @IsNumber()
  @ApiProperty()
  price: number;
}

export const MenuItemSchema = SchemaFactory.createForClass(MenuItem);
