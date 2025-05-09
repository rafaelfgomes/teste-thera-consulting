import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItemDto } from 'src/orders/dto/create-order.dto';
import { plainToClass } from 'class-transformer';

@Controller('order-items')
@UseInterceptors(ClassSerializerInterceptor)
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Post()
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemsService.create(createOrderItemDto);
  }

  @Get()
  findAll() {
    return this.orderItemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<OrderItemDto> {
    const orderItem = await this.orderItemsService.findOne(+id);
    return plainToClass(OrderItemDto, orderItem, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return this.orderItemsService.update(+id, updateOrderItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderItemsService.remove(+id);
  }
}
