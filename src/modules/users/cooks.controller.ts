import {
  BadRequestException,
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
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  EMAIL_ALREADY_EXISTS,
  USER_NOT_FOUND,
} from 'src/errors/errors.constants';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { CookEntity } from './entities/cook.entity';
import { User } from './models/users.model';
import { UsersService } from './users.service';

@Controller('cooks')
@ApiTags('Users')
export class CooksController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getCooks(): Promise<User[]> {
    return this.usersService.getUsers({ isCook: true });
  }

  @Get(':cookId')
  @ApiNotFoundResponse({
    description: 'Cook not found',
  })
  @ApiOkResponse({
    description: 'Return Cook with the provided id',
    type: CookEntity,
  })
  @ApiOperation({
    description:
      'Return a Cook. The arguments are email or cookId api queries should not be empty',
  })
  @ApiParam({
    name: 'cookId',
    required: false,
    allowEmptyValue: false,
    example: '63ca9f9b63d553fe4c7ce544',
  })
  @ApiParam({
    name: 'email',
    required: false,
    allowEmptyValue: false,
    example: '63ca9f9b63d553fe4c7ce544',
  })
  @ApiBadRequestResponse({ description: 'Url Params not passed' })
  getCook(@Param() param: { email?: string; cookId?: string }): Promise<User> {
    if (param.cookId) {
      return this.usersService.getUserById(param.cookId);
    }
    if (param.email) {
      return this.usersService.getUserByEmail(param.email);
    }
    throw new BadRequestException('Url Params not passed');
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Cook created successfully',
    type: User,
  })
  @ApiBadRequestResponse({
    description: EMAIL_ALREADY_EXISTS,
  })
  createCook(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @Put()
  @ApiNotFoundResponse({
    description: USER_NOT_FOUND,
  })
  @ApiOkResponse({
    description: 'User updated successfully',
  })
  updateUser(@Body() body: UpdateUserDto) {
    return this.usersService.updateUser(body);
  }

  @Delete(':cookId')
  @ApiParam({
    name: 'cookId',
    required: true,
    allowEmptyValue: false,
    example: '63ca9f9b63d553fe4c7ce544',
  })
  @ApiOkResponse({
    description: 'Cook deleted successfully',
  })
  @ApiOperation({
    description: 'This endpoint deletes cooks and associated data',
  })
  deleteUser(@Param() param) {
    return this.usersService.deleteUser(param.cookId);
  }
}
