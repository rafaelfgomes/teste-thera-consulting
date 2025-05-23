import { Injectable, NotFoundException } from '@nestjs/common';
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

  async createNewOrder(createOrderDto: CreateOrderDto) {
    const orderCreateData = {
      ...createOrderDto,
      price: createOrderDto.price,
      status: createOrderDto.status,
    };

    return this.orderRepository.save(orderCreateData);
  }

  getAllOrders() {
    return this.orderRepository.find();
  }

  async getOrderById(id: number) {
    const order = await this.orderRepository.findOne({ where: { id } });

    if (!order) {
      throw new NotFoundException('Pedido não encontrado');
    }

    return order;
  }
}
