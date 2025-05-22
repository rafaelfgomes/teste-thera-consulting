import { OrderStatus } from '../../enums/order-status';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsDecimal,
  IsEnum,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class OrderItemDto {
  @IsNumber()
  product_id: number;

  @IsNumber()
  quantity: number;

  @IsDecimal({ decimal_digits: '2' })
  price: number;
}

export class CreateOrderDto {
  @IsDecimal({ decimal_digits: '2' })
  price: number;

  @IsEnum(['pending', 'completed', 'canceled'])
  status: OrderStatus = OrderStatus.PENDING;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  order_items: OrderItemDto[];

  @IsDateString()
  created_at: Date = new Date();

  @IsOptional()
  @IsDateString()
  updated_at?: Date;
}
