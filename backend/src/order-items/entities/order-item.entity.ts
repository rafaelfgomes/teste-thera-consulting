import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'datetime' })
  created_at: Date;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  @Column({ type: 'int' })
  orderId: number;

  @ManyToOne(() => Product, (product) => product.orderItems)
  product: Product;

  @Column({ type: 'int' })
  productId: number;
}
