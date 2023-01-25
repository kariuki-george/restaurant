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
import { WaiterEntity } from './entities/waiter.entity';
import { User } from './models/users.model';
import { UsersService } from './users.service';

@Controller('Waiters')
@ApiTags('Users')
export class WaitersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getWaiters(): Promise<User[]> {
    return this.usersService.getUsers({ isWaiter: true });
  }

  @Get(':waiterId')
  @ApiNotFoundResponse({
    description: 'Waiter not found',
  })
  @ApiOkResponse({
    description: 'Return Waiter with the provided id',
    type: WaiterEntity,
  })
  @ApiOperation({
    description:
      'Return a Waiter. The arguments are email or WaiterId api queries should not be empty',
  })
  @ApiParam({
    name: 'waiterId',
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
  getWaiter(
    @Param() param: { email?: string; waiterId?: string },
  ): Promise<User> {
    if (param.waiterId) {
      return this.usersService.getUserById(param.waiterId);
    }
    if (param.email) {
      return this.usersService.getUserByEmail(param.email);
    }
    throw new BadRequestException('Url Params not passed');
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Waiter created successfully',
    type: User,
  })
  @ApiBadRequestResponse({
    description: EMAIL_ALREADY_EXISTS,
  })
  createWaiter(@Body() body: CreateUserDto) {
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

  @Delete(':waiterId')
  @ApiParam({
    name: 'waiterId',
    required: true,
    allowEmptyValue: false,
    example: '63ca9f9b63d553fe4c7ce544',
  })
  @ApiOkResponse({
    description: 'Waiter deleted successfully',
  })
  @ApiOperation({
    description: 'This endpoint deletes Waiters and associated data',
  })
  deleteUser(@Param() param) {
    return this.usersService.deleteUser(param.WaiterId);
  }
}
