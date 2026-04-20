// Импортируем Router из Express для создания маршрутов
import { Router } from 'express'
// Импортируем все функции контроллера комнат
import * as roomController from '../controllers/roomController.js'
// Импортируем middleware для проверки аутентификации
import authenticate from '../middleware/authenticate.js'
// Импортируем функцию валидации
import { validate } from '../validators/auth.js'
// Импортируем схему валидации для создания комнаты
import { createRoomSchema } from '../validators/room.js'

// Создаём экземпляр роутера
const router = Router()

// GET /rooms - получение списка всех комнат (публичный)
router.get('/', roomController.getRooms)

// GET /rooms/:id - получение комнаты по ID (публичный)
router.get('/:id', roomController.getRoomById)

// POST /rooms - создание новой комнаты
// Требуется аутентификация и валидация названия
router.post('/', authenticate, validate(createRoomSchema), roomController.createRoom)

// DELETE /rooms/:id - удаление комнаты (только для авторизованных)
router.delete('/:id', authenticate, roomController.deleteRoom)

// POST /rooms/:id/join - вступление в комнату (требуется аутентификация)
router.post('/:id/join', authenticate, roomController.joinRoom)

// DELETE /rooms/:id/leave - выход из комнаты (требуется аутентификация)
router.delete('/:id/leave', authenticate, roomController.leaveRoom)

// Экспортируем роутер для подключения в app.js
export default router