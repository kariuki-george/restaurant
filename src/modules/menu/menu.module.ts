import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { MenuItemsRepo } from './menuItems.repo';
import { MenuItem, MenuItemSchema } from './models/menuItem.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MenuItem.name, schema: MenuItemSchema },
    ]),
  ],
  providers: [MenuService, MenuItemsRepo],
  controllers: [MenuController],
})
export class MenuModule {}
