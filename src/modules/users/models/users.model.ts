import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { AbstractDocument } from 'src/providers/database/abstract.schema';

@Schema()
export class User extends AbstractDocument {
  @ApiProperty()
  @Prop({ unique: true })
  email: string;
  @ApiProperty()
  @Prop({ default: false })
  isCook?: boolean;
  @ApiProperty()
  @Prop({ default: false })
  isWaiter?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
