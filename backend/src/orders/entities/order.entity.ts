import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderItem } from 'src/order-items/entities/order-item.entity';

export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'datetime' })
  created_at: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];
}
