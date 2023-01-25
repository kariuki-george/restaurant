// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Post,
//   Put,
// } from '@nestjs/common';
// import {
//   ApiNotFoundResponse,
//   ApiOkResponse,
//   ApiParam,
//   ApiTags,
// } from '@nestjs/swagger';
// import { ORDERITEM_NOT_FOUND } from 'src/errors/errors.constants';
// import { CreateOrderItemDto } from './dtos/createOrderItem.dto';
// import { UpdateOrderItemDto } from './dtos/updateOrderItem.dto';

// import { OrderItem } from './models/orderItems.model';
// import { OrdersItemsService } from './orderItems.service';

// @ApiTags('orders')
// @Controller('orders/orderItems')
// export class OrderItemsController {
//   constructor(private readonly ordersItemsService: OrdersItemsService) {}

//   @Get(':orderId')
//   @ApiOkResponse({
//     description: 'Returns all ordersItems for a user',
//     isArray: true,
//     type: OrderItem,
//   })
//   @ApiParam({
//     name: 'orderId',
//     allowEmptyValue: false,
//     description: 'Returns all orderItems with the provided orderId',
//     example: '123456789',
//     required: true,
//     type: String,
//   })
//   getOrderItems(@Param() params): Promise<OrderItem[]> {
//     return this.ordersItemsService.getOrderItems(params.orderId);
//   }

//   @Get(':orderItemId')
//   @ApiOkResponse({
//     description: 'Returns orderItem.',
//     type: OrderItem,
//   })
//   @ApiParam({
//     name: 'orderItemId',
//     allowEmptyValue: false,
//     description: 'OrderItem id',
//     example: '123456789',
//     required: true,
//     type: String,
//   })
//   @ApiNotFoundResponse({
//     description: ORDERITEM_NOT_FOUND,
//   })
//   getOrderItem(@Param() params): Promise<OrderItem> {
//     return this.ordersItemsService.getOrderItem(params.orderId);
//   }

//   @Post()
//   @ApiOkResponse({
//     description: 'OrderItem created successfully',
//     type: OrderItem,
//   })
//   createOrderItem(@Body() orderItem: CreateOrderItemDto): Promise<OrderItem> {
//     return this.ordersItemsService.createOrderItem(orderItem);
//   }

//   @Put()
//   @ApiNotFoundResponse({
//     description: ORDERITEM_NOT_FOUND,
//   })
//   @ApiOkResponse({
//     description: 'OrderItem updated successfully',
//     type: OrderItem,
//   })
//   updateOrderItem(@Body() orderItem: UpdateOrderItemDto): Promise<OrderItem> {
//     return this.ordersItemsService.updateOrderItem(orderItem);
//   }

//   @Delete(':orderItemId')
//   @ApiOkResponse({
//     description: 'Deletes an orderItem',
//     type: Boolean,
//   })
//   @ApiParam({
//     name: 'orderItemId',
//     allowEmptyValue: false,
//     description: 'OrderItem id',
//     example: '123456789',
//     required: true,
//     type: String,
//   })
//   deleteOrderItem(@Param() params) {
//     return this.ordersItemsService.deleteOrderItem(params.orderItemId);
//   }
// }
