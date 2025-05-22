import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(130)
  @MinLength(6)
  password: string;

  @IsDateString()
  created_at: Date;

  @IsBoolean()
  @Transform(({ value }) => Boolean(value))
  active: boolean;
}
