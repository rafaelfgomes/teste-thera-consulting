import { Transform } from 'class-transformer';
import { IsBoolean, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsDateString()
  createdAt: Date;

  @IsBoolean()
  @Transform(({ value }) => Boolean(value))
  active: boolean;
}
