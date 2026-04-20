// Импорт фреймворка Express
import express from 'express'
// Helmet - middleware для защиты HTTP заголовков
import helmet from 'helmet'
// CORS - middleware для настройки Cross-Origin Resource Sharing
import cors from 'cors'
// Rate Limit - middleware для ограничения количества запросов
import rateLimit from 'express-rate-limit'
// Импорт конфигурации приложения
import config from './config.js'
// Глобальный обработчик ошибок
import errorHandler from './middleware/errorHandler.js'
// Импорт роутеров для разных частей API
import authRouter from './routes/auth.js'
import roomsRouter from './routes/rooms.js'
import messagesRouter from './routes/messages.js'
// Импорт Swagger для документации API
import { swaggerUi, spec } from '../docs/swagger.js'

// Создание экземпляра Express приложения
const app = express()

// Настройка ограничения количества запросов (rate limiting)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 минут
    max: 100,                 // максимум 100 запросов с одного IP
})

// Подключение middleware
app.use(helmet())  // Защита HTTP заголовков
app.use(cors(config.cors)) // Настройка CORS из конфига
app.use(express.json()) // Парсинг JSON тела запросов
// Регистрация маршрутов
app.use('/api/auth', limiter, authRouter) // Аутентификация
app.use('/api/rooms', roomsRouter) // Работа с комнатами
app.use('/api/rooms', messagesRouter) // Работа с сообщениями
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(spec))
// Глобальный обработчик ошибок (должен быть последним)
app.use(errorHandler)

export default app