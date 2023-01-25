import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Table, TablesSchema } from './models/table.model';
import { TablesController } from './tables.controller';
import { TablesRepo } from './tables.repo';
import { TablesService } from './tables.service';

@Module({
  providers: [TablesService, TablesRepo],
  controllers: [TablesController],
  imports: [
    MongooseModule.forFeature([{ name: Table.name, schema: TablesSchema }]),
  ],
  exports: [TablesService],
})
export class TablesModule {}
