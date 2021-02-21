import {User} from "./src/users/entities/user.entity";
import {Cat, FemaleCat, MaleCat} from "./src/cats/entities/cat.entity";
import {Breed} from "./src/cats/entities/breed.entity";
import {Advertisement} from "./src/advertisements/entities/advertisement.entity";

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
  entities: [ User, Cat, FemaleCat, MaleCat, Breed, Advertisement ],
  migrations: ['migrations/**/*.ts'],
  subscribers: ['subscriber/**/*.ts', 'dist/subscriber/**/.js'],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'migrations',
    subscribersDir: 'subscriber',
  },
};
