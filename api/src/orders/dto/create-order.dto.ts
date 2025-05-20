import { OrderStatus } from '../../enums/orderstatus';
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
  status: OrderStatus;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsDateString()
  created_at: Date;

  @IsOptional()
  @IsDateString()
  updated_at: Date;
}
