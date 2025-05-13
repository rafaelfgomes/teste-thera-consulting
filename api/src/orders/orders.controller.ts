import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createNewOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createNewOrder(createOrderDto);
  }

  @Get()
  getAllOrders() {
    return this.ordersService.getAllOrders();
  }

  @Get(':id')
  getOrderById(@Param('id') id: string) {
    return this.ordersService.getOrderById(+id);
  }
}
