import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as mysql2 from 'mysql2';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const OrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  driver: mysql2,
  autoLoadEntities: true,
  namingStrategy: new SnakeNamingStrategy(),
};
