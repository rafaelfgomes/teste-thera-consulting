import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
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

  findAll() {
    return `This action returns all orderItems`;
  }

  async findOne(id: number) {
    return await this.orderItemsRepository.findOne({ where: { id } });
  }

  update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    return this.orderItemsRepository.update(id, updateOrderItemDto);
  }

  remove(id: number) {
    return `This action removes a #${id} orderItem`;
  }
}
