// Импортируем Router из Express для создания маршрутов
import { Router } from 'express'
// Импортируем все функции контроллера сообщений
import * as messageController from '../controllers/messageController.js'
// Импортируем middleware для проверки аутентификации
import authenticate from '../middleware/authenticate.js'
// Импортируем функцию валидации
import { validate } from '../validators/auth.js'
// Импортируем схему валидации для создания сообщения
import { createMessageSchema } from '../validators/message.js'

// Создаём экземпляр роутера
const router = Router()

// GET /rooms/:id/messages - получение всех сообщений комнаты
// Требуется аутентификация
router.get('/:id/messages', authenticate, messageController.getMessages)

// POST /rooms/:id/messages - отправка нового сообщения в комнату
// Требуется аутентификация и валидация текста сообщения
router.post('/:id/messages', authenticate, validate(createMessageSchema), messageController.createMessage)

// Экспортируем роутер для подключения в app.js
export default router