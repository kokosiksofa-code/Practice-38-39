// Импорт сгенерированного Prisma Client для работы с базой данных
import { PrismaClient } from './generated/prisma/index.js';
// Импорт адаптера для PostgreSQL из пакета @prisma/adapter-pg
import { PrismaPg } from '@prisma/adapter-pg';
// Импорт библиотеки pg для работы с PostgreSQL
import pg from 'pg';

// Деструктуризация класса Pool из импортированного модуля pg
const { Pool } = pg

// Создание адаптера PrismaPg с пулом соединений PostgreSQL
const adapter = new PrismaPg(
  new Pool({
    connectionString: process.env.DATABASE_URL,  // Строка подключения к БД из переменных окружения
  }),
);

// Инициализация Prisma Client с подключенным адаптером PostgreSQL
const prisma = new PrismaClient({adapter});
// Экспорт экземпляра Prisma Client для использования в других модулях
export default prisma;