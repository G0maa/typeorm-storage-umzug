/* eslint-disable @typescript-eslint/no-var-requires */
import { Umzug } from 'umzug';
import { TypeORMStorage } from 'typeorm-storage-umzug';
import { DataSource } from 'typeorm';

require('dotenv').config({
  debug: true,
});

// TODO: remove.
const options = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

console.log(options);
const orm = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: true,
});

export const migrator = new Umzug({
  migrations: {
    glob: ['migrations/*.ts', { cwd: __dirname }],
  },
  context: orm,
  storage: new TypeORMStorage({
    dataSource: orm,
    tableName: 'migrator_meta',
  }),
  logger: console,
});
export type Migration = typeof migrator._types.migration;

export const seeder = new Umzug({
  migrations: {
    glob: ['seeders/*.ts', { cwd: __dirname }],
  },
  context: orm,
  storage: new TypeORMStorage({
    dataSource: orm,
    tableName: 'seeder_meta',
  }),
  logger: console,
});
export type Seeder = typeof seeder._types.migration;
