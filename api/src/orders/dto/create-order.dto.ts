import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsDecimal,
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
