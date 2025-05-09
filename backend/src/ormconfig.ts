import { DataSourceOptions } from 'typeorm';

export const OrmConfig: DataSourceOptions = {
  type: 'mysql',
  host: 'thera-app-db',
  port: 3306,
  username: 'root',
  password: 'passwd',
  database: 'thera-app',
  synchronize: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
};
