import {
  IsDecimal,
  IsInt,
  IsString,
} from 'class-validator/types/decorator/decorators';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDecimal({ decimal_digits: '2' })
  price: number;

  @IsString()
  imageUrl: string;

  @IsInt()
  category_id: number;
}
