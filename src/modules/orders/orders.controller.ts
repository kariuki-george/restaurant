import {
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
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ORDER_NOT_FOUND } from 'src/errors/errors.constants';
import { CreateOrderDto } from './dtos/createOrderDto.dtos';
import { UpdateOrderDto } from './dtos/updateOrder.dto';
import { OrderStatusEnum } from './enums';
import { Order } from './models/orders.model';
import { OrdersService } from './Orders.services';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('')
  @ApiOkResponse({
    description: 'Returns all orders that belongs to this customer.',
    isArray: true,
    type: Order,
  })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: OrderStatusEnum,
  })
  @ApiQuery({
    name: 'waiterId',
    required: false,
  })
  @ApiQuery({
    name: 'queueId',
    required: false,
  })
  @ApiQuery({
    name: 'userId',
    required: false,
  })
  @ApiQuery({
    name: 'orderId',
    required: false,
  })
  @ApiQuery({
    name: 'tableId',
    required: false,
  })
  getCustomerOrders(
    @Query('waiterId') waiterId?: string,
    @Query('orderId') orderId?: string,
    @Query('userId') userId?: string,
    @Query('queueId') queueId?: string,
    @Query('tableId') tableId?: string,
    @Query('status') status?: OrderStatusEnum,
  ): Promise<Order[]> {
    return this.ordersService.getOrders({
      waiterId,
      userId,
      queueId,
      status,
      orderId,
      tableId,
    });
  }

  @Post()
  @ApiOkResponse({
    description: 'Order created successfully',
    type: Order,
  })
  createOrder(@Body() order: CreateOrderDto): Promise<Order> {
    return this.ordersService.createOrder(order);
  }

  @Put()
  @ApiNotFoundResponse({
    description: ORDER_NOT_FOUND,
  })
  @ApiOkResponse({ description: 'Order updated successfully', type: Order })
  updateOrder(@Body() order: UpdateOrderDto): Promise<Order> {
    return this.ordersService.updateOrder(order);
  }

  @Delete(':orderId')
  @ApiOkResponse({
    description: 'Deletes an order',
    type: Boolean,
  })
  @ApiParam({
    name: 'orderId',
    allowEmptyValue: false,
    description: 'Order id',
    example: '123456789',
    required: true,
    type: String,
  })
  deleteOrder(@Param() params) {
    return this.ordersService.deleteOrder(params.orderId);
  }
}
