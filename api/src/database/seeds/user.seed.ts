import { User } from '../../users/entities/user.entity';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

export async function seedUsers(dataSource: DataSource) {
  console.log('Iniciando o seeder de usários...');

  const userRepository = dataSource.getRepository(User);

  const count = await userRepository.count();

  if (count > 0) {
    console.log('Usuários já existem, pulando o seeder.');

    return;
  }

  const password = '123456';

  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const users = [
    {
      name: 'Administrador',
      email: 'admin@email.com',
      password: hashedPassword,
    },
  ];

  await userRepository.insert(users);

  console.log('Usuários criados com sucesso!');
}
