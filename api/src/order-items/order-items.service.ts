import { Injectable } from '@nestjs/common';
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

  create(createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemsRepository.save(createOrderItemDto);
  }

  getAllOrderItems() {
    return this.orderItemsRepository.find();
  }

  async getOrderItemById(id: number) {
    return await this.orderItemsRepository.findOne({ where: { id } });
  }
}
