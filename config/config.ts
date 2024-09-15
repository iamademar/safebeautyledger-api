import dotenv from 'dotenv';

dotenv.config();

interface DbConfig {
  database: string;
  username?: string;
  password?: string | null;
  host: string;
  dialect: 'postgres';
}

interface Config {
  development: DbConfig;
  test: DbConfig;
  production: DbConfig;
}

const config: Config = {
  development: {
    database: process.env.DB_NAME || 'safebeautyledger',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || 'database_test',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || 'database_production',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
  },
};

export default config;