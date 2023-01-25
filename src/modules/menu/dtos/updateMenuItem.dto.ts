import { PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateMenuItemDto } from './createMenuItem.dto';

export class UpdateMenuItemDto extends PartialType(CreateMenuItemDto) {
  /**
   * MenuItem id
   *
   */
  @IsString()
  menuItemId: string;
}
