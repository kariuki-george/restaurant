import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiHideProperty()
  isWaiter: boolean;

  @ApiHideProperty()
  isCook: boolean;
}
