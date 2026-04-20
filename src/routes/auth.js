// Импортируем Router из Express для создания маршрутов
import { Router } from 'express'
// Импортируем все функции контроллера аутентификации
import * as authController from '../controllers/authController.js'
// Импортируем middleware для проверки аутентификации
import authenticate from '../middleware/authenticate.js'
// Импортируем функцию валидации и схемы
import { validate, registerSchema, loginSchema } from '../validators/auth.js'

// Создаём экземпляр роутера
const router = Router()

// Маршрут для регистрации
router.post('/register', validate(registerSchema), authController.register)

// Маршрут для входа
router.post('/login', validate(loginSchema), authController.login)

// Маршрут для выхода
router.post('/logout', authenticate, authController.logout)

// Экспортируем роутер для подключения в app.js
export default router