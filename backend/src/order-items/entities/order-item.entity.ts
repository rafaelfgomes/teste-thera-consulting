import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class OrderItem {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @OneToMany(() => Order, (order) => order.orderItems)
  order: Order;

  @Column({ type: 'int' })
  orderId: number;

  @OneToMany(() => Product, (product) => product.orderItems)
  product: Product;

  @Column({ type: 'int' })
  productId: number;
}
