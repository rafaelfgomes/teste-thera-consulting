import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from '@/products/products.service';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemsRepository: Repository<OrderItem>,
    private readonly productsService: ProductsService,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto) {
    const product = await this.productsService.getProductById(
      createOrderItemDto.product_id,
    );

    if (!product) {
      throw new NotFoundException(
        `Produto com id ${createOrderItemDto.product_id} não cadastrado ou inativo`,
      );
    }

    const orderItem = {
      quantity: createOrderItemDto.quantity,
      price: createOrderItemDto.price,
      order: { id: createOrderItemDto.order_id },
      product: { id: createOrderItemDto.product_id },
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
