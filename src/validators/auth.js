// Импортируем библиотеку Zod для валидации данных
import { z } from "zod";
// Импортируем класс для создания ошибок
import AppError from "../utils/appError.js";

// Универсальная функция-обёртка для валидации
// Принимает схему Zod и возвращает middleware для Express
export function validate(schema) {
  return (req, res, next) => {
    // Безопасно проверяем тело запроса
    const result = schema.safeParse(req.body);
    
    // Если данные не прошли валидацию
    if (!result.success) {
      // Возвращаем первое сообщение об ошибке
      return next(new AppError(result.error.errors[0].message, 400));
    }
    
    // Заменяем req.body на очищенные и проверенные данные
    req.body = result.data;
    next();
  };
}

// Схема валидации для регистрации
export const registerSchema = z.object({
  email: z.email(),           // Проверка email
  password: z.string().min(8), // Мин. 8 символов
  name: z.string().min(1).optional(), // Имя опционально
});

// Схема валидации для входа
export const loginSchema = z.object({
  email: z.email(),           // Проверка email
  password: z.string().min(8), // Мин. 8 символов
});