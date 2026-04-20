// Импортируем все функции из сервиса сообщений
import * as messageService from '../services/messageService.js'

// Получение всех сообщений комнаты
export async function getMessages(req, res, next) {
  try {
    // Получаем сообщения: ID комнаты из параметров URL
    const messages = await messageService.getMessages(req.params.id)
    // Возвращаем список сообщений с кодом 200 (OK)
    res.status(200).json({ messages })
  } catch (error) {
    // Передаём ошибку в глобальный обработчик
    next(error)
  }
}

// Создание нового сообщения
export async function createMessage(req, res, next) {
  try {
    // Создаём сообщение: ID комнаты из URL, ID пользователя из токена, текст из тела запроса
    const message = await messageService.createMessage(
      req.params.id,      // ID комнаты
      req.user.sub,       // ID пользователя из JWT токена
      req.body.content    // Текст сообщения
    )
    // Возвращаем созданное сообщение с кодом 201 (Created)
    res.status(201).json({ message })
  } catch (error) {
    // Передаём ошибку в глобальный обработчик
    next(error)
  }
}