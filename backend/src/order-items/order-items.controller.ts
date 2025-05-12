import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { OrderItemDto } from 'src/orders/dto/create-order.dto';
import { plainToClass } from 'class-transformer';

@Controller('order-items')
@UseInterceptors(ClassSerializerInterceptor)
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Post()
  createNewOrderItem(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemsService.create(createOrderItemDto);
  }

  @Get()
  getAllOrderItems() {
    return this.orderItemsService.getAllOrderItems();
  }

  @Get(':id')
  async getOrderItemById(@Param('id') id: string): Promise<OrderItemDto> {
    const orderItem = await this.orderItemsService.getOrderItemById(+id);
    return plainToClass(OrderItemDto, orderItem, {
      excludeExtraneousValues: true,
    });
  }
}
