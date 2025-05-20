import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as mysql2 from 'mysql2';
import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const commonConfig = {
  type: 'mysql' as const,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  driver: mysql2,
  namingStrategy: new SnakeNamingStrategy(),
};

export const OrmConfig: TypeOrmModuleOptions = {
  ...commonConfig,
  autoLoadEntities: true,
};

export const AppDataSourceOptions: DataSourceOptions = {
  ...commonConfig,
};
