import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsDecimal,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';

export class CreateOrderItemDto {
  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsNumber()
  @IsDecimal({ decimal_digits: '2' })
  @Transform(({ value }) => Number(value).toFixed(2))
  @Min(0)
  price: number;

  @IsNumber()
  @IsPositive()
  product_id: number;

  @IsNumber()
  @IsPositive()
  order_id: number;

  @IsDateString()
  created_at: Date = new Date();

  @IsOptional()
  @IsDateString()
  updated_at?: Date;

  @Transform(
    ({ obj }: { obj: CreateOrderItemDto }) =>
      Number(obj.quantity) * Number(obj.price),
  )
  get total(): number {
    return this.quantity * Number(this.price);
  }
}
