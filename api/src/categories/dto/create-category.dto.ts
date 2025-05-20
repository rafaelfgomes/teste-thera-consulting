import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString({
    message: 'O nome da categoria deve ser uma string',
  })
  @IsNotEmpty({
    message: 'O nome da categoria não pode ser vazio',
  })
  @MaxLength(80)
  name: string;

  @IsBoolean()
  @Transform(({ value }) => Boolean(value))
  active: boolean;
}
