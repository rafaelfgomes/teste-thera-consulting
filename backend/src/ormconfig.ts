import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as mysql2 from 'mysql2';

export const OrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'thera-app-db',
  port: 3306,
  username: 'root',
  password: 'passwd',
  database: 'thera-app',
  synchronize: true,
  logging: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  driver: mysql2,
};
