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
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { MENUITEM_NOT_FOUND } from 'src/errors/errors.constants';
import { CreateMenuItemDto } from './dtos/createMenuItem.dto';
import { UpdateMenuItemDto } from './dtos/updateMenuItem.dto';
import { MenuService } from './menu.service';
import { MenuItem } from './models/menuItem.model';

@Controller('menu')
@ApiTags('Menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  @ApiOkResponse({
    description: 'Returns the menu',
    isArray: true,
    type: MenuItem,
  })
  getallMenuItems(): Promise<MenuItem[]> {
    return this.menuService.getallMenuItems();
  }

  @Post()
  @ApiCreatedResponse({
    description: 'MenuItem was created successfully',
    type: MenuItem,
  })
  createMenuItem(@Body() item: CreateMenuItemDto): Promise<MenuItem> {
    return this.menuService.createMenuItem(item);
  }

  @Put()
  @ApiOkResponse({
    description: 'MenuItem was updated successfully',
    type: MenuItem,
  })
  @ApiNotFoundResponse({
    description: MENUITEM_NOT_FOUND,
  })
  updateMenuItem(@Body() item: UpdateMenuItemDto): Promise<MenuItem> {
    return this.menuService.updateMenuItem(item);
  }

  @Delete(':menuItemId')
  @ApiOkResponse({
    description: 'MenuItem was deleted successfully',
  })
  @ApiParam({
    required: true,
    allowEmptyValue: false,
    type: String,
    example: '123456789',
    name: 'menuItemId',
    description: 'MenuItem id',
  })
  deleteMenuItem(@Param() params) {
    return this.menuService.deleteMenuItem(params.menuItemId);
  }
}
