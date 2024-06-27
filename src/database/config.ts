import { Shortner } from '../shortner/models/shortner.entity';
import { User } from '../user/models/user.entity';
import { DataSourceOptions } from 'typeorm';

export const datasource: DataSourceOptions = {
  type: 'mysql',
  host: 'mysql',
  database: 'url-shortner',
  port: 3306,
  username: 'root',
  password: 'password',
  entities: [User, Shortner],
  migrations: [],
  synchronize: true,
  logging: false,
};
