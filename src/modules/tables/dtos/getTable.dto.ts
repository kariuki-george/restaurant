import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetTableDto {
  @ApiProperty()
  @IsNotEmpty()
  tableId: string;
}
