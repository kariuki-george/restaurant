import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './createUser.dto';

// TODO: can be used to omit passwords
export class UpdateUserDto extends OmitType(CreateUserDto, [] as const) {
  userId: string;
}
