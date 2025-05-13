import 'reflect-metadata';
import { DataSource } from 'typeorm';

import dotenv from 'dotenv';
import { User } from '../modules/user/entities/User';
import { Post } from '../modules/post/entities/Post';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,       // em dev: cria tabelas automaticamente
  logging: false,
  entities: [User, Post],
});
