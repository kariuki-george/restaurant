import { Injectable } from '@nestjs/common';
import { CreateMenuItemDto } from './dtos/createMenuItem.dto';
import { UpdateMenuItemDto } from './dtos/updateMenuItem.dto';
import { MenuItemsRepo } from './menuItems.repo';
import { MenuItem } from './models/menuItem.model';

@Injectable()
export class MenuService {
  constructor(private readonly menuItemsRepo: MenuItemsRepo) {}

  getallMenuItems(): Promise<MenuItem[]> {
    return this.menuItemsRepo.find({});
  }

  createMenuItem(item: CreateMenuItemDto): Promise<MenuItem> {
    return this.menuItemsRepo.create({ ...item });
  }

  updateMenuItem(item: UpdateMenuItemDto): Promise<MenuItem> {
    return this.menuItemsRepo.findOneAndUpdate({ _id: item.menuItemId }, item);
  }

  deleteMenuItem(itemId: string): Promise<Boolean> {
    return this.menuItemsRepo.deleteOne({ _id: itemId });
  }
}
