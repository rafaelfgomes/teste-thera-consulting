import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderItem } from '../../order-items/entities/order-item.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({
    type: 'varchar',
    length: 20,
  })
  status: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => null })
  updated_at: Date;

  @OneToMany(() => OrderItem, (order_item) => order_item.order)
  order_items: OrderItem[];
}
