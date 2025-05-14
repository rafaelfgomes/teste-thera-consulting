import { DataSource } from 'typeorm';
import { seedCategories } from './seeds/category.seed';
import { AppDataSourceOptions } from '../ormconfig';

const AppDataSource = new DataSource(AppDataSourceOptions);

AppDataSource.initialize()
  .then(async (dataSource) => {
    await seedCategories(dataSource);

    await dataSource.destroy();

    console.log('Seeder finalizado.');
  })
  .catch((err) => {
    console.error('Erro ao rodar seeders:', err);
  });
