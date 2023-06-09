/* eslint-disable no-console */
import { createConnection, DataSourceOptions } from 'typeorm';
import { Token } from '../entities/token.entity';
import { Todo } from '../entities/Todo.entity';
import { User } from '../entities/User.entity';

const connectDB = async () => {
  try {
    const options: DataSourceOptions = {
      host: process.env.POSTGRES_HOST || 'localhost',
      port: Number(process.env.POSTGRES_PORT),
      logging: ['query', 'error'],
      type: 'postgres',
      entities: [Todo, User, Token],
      // migrations: ['dist/migrations/**/*.{ts,js}'],
      // subscribers: ['src/subscriber/**/*.ts'],
      database: process.env.POSTGRES_DB,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      synchronize: false
    };
    await createConnection(options);
    console.log('Postgres Connected...');
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
