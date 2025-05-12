import { Expose, Transform } from 'class-transformer';
import { IsDateString, IsDecimal, IsInt, IsNotEmpty } from 'class-validator';

export class CreateOrderItemDto {
  @Expose()
  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @Expose()
  @IsDecimal({ decimal_digits: '2' })
  @Transform(({ value }) => Number(value).toFixed(2))
  price: number;

  @Expose()
  @IsNotEmpty()
  @IsDateString()
  created_at: Date;

  @Expose()
  @IsInt()
  @IsNotEmpty()
  productId: number;

  @Expose()
  @IsInt()
  @IsNotEmpty()
  orderId: number;

  @Expose()
  @Transform(
    ({ obj }: { obj: CreateOrderItemDto }) =>
      Number(obj.quantity) * Number(obj.price),
  )
  get total(): number {
    return this.quantity * Number(this.price);
  }
}
