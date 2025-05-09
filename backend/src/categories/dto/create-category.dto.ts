import { IsString } from 'class-validator/types/decorator/decorators';

export class CreateCategoryDto {
  @IsString()
  name: string;
}
