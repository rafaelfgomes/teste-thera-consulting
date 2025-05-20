import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  createNewUser(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const userUpdateData = {
      name: updateUserDto?.name,
      email: updateUserDto?.email,
      password: updateUserDto?.password,
    };

    const user = await this.userRepository.preload({ id, ...userUpdateData });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return this.userRepository.save(user);
  }

  async disableUser(id: number) {
    const userDisableData = {
      active: false,
    };

    const user = await this.userRepository.preload({ id, ...userDisableData });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return this.userRepository.save(user);
  }
}
