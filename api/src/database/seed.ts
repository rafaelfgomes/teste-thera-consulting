import { DataSource } from 'typeorm';
import { seedCategories } from './seeds/category.seed';
import { AppDataSourceOptions } from './ormconfig';
import { seedUsers } from './seeds/user.seed';

const AppDataSource = new DataSource(AppDataSourceOptions);

AppDataSource.initialize()
  .then(async (dataSource) => {
    await seedCategories(dataSource);

    await seedUsers(dataSource);

    await dataSource.destroy();

    console.log('Seeders finalizados.');
  })
  .catch((err) => {
    console.error('Erro ao rodar seeders: ', err);
  });
