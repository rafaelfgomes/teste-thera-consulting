import { Transform } from 'class-transformer';
import { IsBoolean, IsDecimal, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDecimal({ decimal_digits: '2' })
  @Transform(({ value }) => Number(value))
  @Min(0)
  price: number;

  @IsInt()
  @Min(0)
  quantity: number;

  @IsInt()
  @IsNotEmpty()
  categoryId: number;

  @IsBoolean()
  @Transform(({ value }) => Boolean(value))
  active: boolean;
}
