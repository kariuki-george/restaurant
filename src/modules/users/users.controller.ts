import {
  BadGatewayException,
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
import { WaiterEntity } from './entities/waiter.entity';
import { User } from './models/users.model';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
export class CustomersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get(':userId')
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @ApiOkResponse({
    description: 'Return user with the provided id',
    type: User || CookEntity || WaiterEntity,
  })
  @ApiOperation({
    description:
      'Return a user. The arguments are email or userId api queries should not be empty',
  })
  @ApiParam({
    name: 'userId',
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
  getUserById(
    @Param() param: { email?: string; userId?: string },
  ): Promise<User> {
    if (param.userId) {
      return this.usersService.getUserById(param.userId);
    }
    if (param.email) {
      return this.usersService.getUserByEmail(param.email);
    }
    throw new BadRequestException('Url Params not passed');
  }

  @Post()
  @ApiCreatedResponse({
    description: 'User created successfully',
    type: User,
  })
  @ApiBadRequestResponse({
    description: EMAIL_ALREADY_EXISTS,
  })
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }
  @Post('/waiter')
  @ApiCreatedResponse({
    description: 'Waiter created successfully',
    type: User,
  })
  @ApiBadRequestResponse({
    description: EMAIL_ALREADY_EXISTS,
  })
  createWaiter(@Body() body: CreateUserDto) {
    return this.usersService.createUser({ ...body, isWaiter: true });
  }
  @Post('/cook')
  @ApiCreatedResponse({
    description: 'Cook created successfully',
    type: User,
  })
  @ApiBadRequestResponse({
    description: EMAIL_ALREADY_EXISTS,
  })
  createCook(@Body() body: CreateUserDto) {
    return this.usersService.createUser({ ...body, isCook: true });
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

  @Delete(':userId')
  @ApiParam({
    name: 'userId',
    required: true,
    allowEmptyValue: false,
    example: '63ca9f9b63d553fe4c7ce544',
  })
  @ApiOkResponse({
    description: 'User deleted successfully',
  })
  @ApiOperation({
    description:
      'This endpoint deletes customers only. It cannot be used with waiters and cooks',
  })
  deleteUser(@Param() param) {
    return this.usersService.deleteUser(param.userId);
  }
}
