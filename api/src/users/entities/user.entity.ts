import { IsEmail } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 80 })
  name: string;

  @Column({ length: 40, unique: true })
  @IsEmail()
  email: string;

  @Column({ type: 'varchar', length: 130 })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'boolean', default: true })
  active: boolean;
}
