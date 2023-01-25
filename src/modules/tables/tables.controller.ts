import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  TABLE_ALREADY_EXISTS,
  TABLE_NOT_FOUND,
} from 'src/errors/errors.constants';
import { CreateTableDto } from './dtos/createTable.dto';
import { UpdateTableDto } from './dtos/updateTable.dto';
import { Table } from './models/table.model';
import { TablesService } from './tables.service';

@ApiTags('Tables')
@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}
  @Get()
  @ApiOkResponse({
    description: 'Returns all the tables',
    isArray: true,
    type: Table,
  })
  getTables() {
    return this.tablesService.getTables();
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Created a table successfully',
    type: Table,
  })
  @ApiBadRequestResponse({
    description: TABLE_ALREADY_EXISTS,
  })
  createTable(@Body() table: CreateTableDto): Promise<Table> {
    return this.tablesService.createTable(table);
  }

  @Put()
  @ApiNotFoundResponse({
    description: TABLE_NOT_FOUND,
  })
  @ApiOkResponse({ description: 'Table updated successfully', type: Table })
  updateTable(@Body() table: UpdateTableDto): Promise<Table> {
    return this.tablesService.updateTable(table);
  }

  @Delete(':tableId')
  @ApiOkResponse({
    description: 'Deletes a table',
    type: Boolean,
  })
  @ApiParam({
    name: 'tableId',
    allowEmptyValue: false,
    description: 'Table id',
    example: '123456789',
    required: true,
    type: String,
  })
  deleteTable(@Param() params) {
    return this.tablesService.deleteTable(params.tableId);
  }
}
