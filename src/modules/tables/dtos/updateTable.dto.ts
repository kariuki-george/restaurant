import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateTableDto } from './createTable.dto';

export class UpdateTableDto extends PartialType(CreateTableDto) {
  @IsString()
  @ApiProperty()
  tableId: string;
}
