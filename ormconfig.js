const process = require('process');

const username = process.env.POSTGRES_USER || 'postgres';
const password = process.env.POSTGRES_PASSWORD || 'example';

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5411,
  username,
  password,
  database: 'postgres',
  synchronize: true,
  dropSchema: false,
  logging: true,
  entities: ['src/**/entities/*.entity.{ts,js}'],
  migrations: ['migrations/**/*.ts'],
  subscribers: ['subscriber/**/*.ts', 'dist/subscriber/**/.js'],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'migrations',
    subscribersDir: 'subscriber',
  },
};
