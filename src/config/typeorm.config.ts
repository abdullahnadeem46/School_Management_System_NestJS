import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres', // CHANGE THIS!
  database: 'sms_db',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true, // Auto-create database tables (development only!)
  logging: true,
};
