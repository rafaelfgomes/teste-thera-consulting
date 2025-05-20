import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemsRepository: Repository<OrderItem>,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto) {
    const orderItem = {
      quantity: createOrderItemDto.quantity,
      price: createOrderItemDto.price,
      order: { id: createOrderItemDto.order_id },
      product: { id: createOrderItemDto.product_id },
      created_at: new Date(),
      updated_at: new Date(),
    };

    return this.orderItemsRepository.save(orderItem);
  }

  getAllOrderItems() {
    return this.orderItemsRepository.find();
  }

  async getOrderItemById(id: number) {
    const orderItem = await this.orderItemsRepository.findOne({
      where: { id },
    });

    if (!orderItem) {
      throw new NotFoundException('Item de pedido não encontrado');
    }

    return orderItem;
  }
}
