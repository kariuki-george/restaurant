import { OmitType } from '@nestjs/swagger';
import { UpdateUserDto } from './updateUser.dto';

// Omit isWaiter property if available
export class UpdateCookDto extends OmitType(UpdateUserDto, [] as const) {}
