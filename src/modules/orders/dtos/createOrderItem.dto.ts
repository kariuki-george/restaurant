import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateOrderItemDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'MenuItem Id' })
  menuItemId: string;

  @IsInt()
  @IsPositive()
  @ApiProperty({ description: 'Quantity of the the menuItems.' })
  quantity: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ description: 'The subtotal for the menuItems' })
  subTotal: number;
}
