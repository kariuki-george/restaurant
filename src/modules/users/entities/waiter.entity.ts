import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Table } from 'src/modules/tables/models/table.model';
import { User } from '../models/users.model';

export class WaiterEntity extends OmitType(User, [] as const) {
  @ApiProperty({ type: Table, isArray: true })
  tables: Table[];
}
