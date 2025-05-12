import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  createNewOrder(createOrderDto: CreateOrderDto) {
    return this.orderRepository.save(createOrderDto);
  }

  getAllOrders() {
    return `This action returns all orders`;
  }

  getOrderById(id: number) {
    return `This action returns a #${id} order`;
  }
}
