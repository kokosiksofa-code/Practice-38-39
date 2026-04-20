// Импортируем все функции из сервиса комнат
import * as roomService from '../services/roomService.js'

// Получение списка всех комнат
export async function getRooms(req, res, next) {
  try {
    // Вызываем сервис для получения комнат
    const rooms = await roomService.getRooms()
    // Возвращаем список комнат с кодом 200 (OK)
    res.status(200).json({ rooms })
  } catch (error) {
    // Передаём ошибку в глобальный обработчик
    next(error)
  }
}

// Получение комнаты по ID
export async function getRoomById(req, res, next) {
  try {
    // Получаем ID комнаты из параметров URL и вызываем сервис
    const room = await roomService.getRoomById(req.params.id)
    // Возвращаем комнату с кодом 200 (OK)
    res.status(200).json({ room })
  } catch (error) {
    // Передаём ошибку в глобальный обработчик
    next(error)
  }
}

// Создание новой комнаты
export async function createRoom(req, res, next) {
  try {
    // Создаём комнату: передаём название из тела запроса и ID пользователя из токена
    const room = await roomService.createRoom(req.body.name, req.user.sub)
    // Возвращаем созданную комнату с кодом 201 (Created)
    res.status(201).json({ room })
  } catch (error) {
    // Передаём ошибку в глобальный обработчик
    next(error)
  }
}

// Удаление комнаты
export async function deleteRoom(req, res, next) {
  try {
    // Удаляем комнату по ID из параметров URL
    await roomService.deleteRoom(req.params.id)
    // Возвращаем статус 204 (No Content) без тела ответа
    res.status(204).send()
  } catch (error) {
    // Передаём ошибку в глобальный обработчик
    next(error)
  }
}

// Вступление в комнату
export async function joinRoom(req, res, next) {
  try {
    // Добавляем пользователя в комнату: ID комнаты из URL, ID пользователя из токена
    await roomService.joinRoom(req.params.id, req.user.sub)
    // Возвращаем сообщение об успехе с кодом 200 (OK)
    res.status(200).json({ message: 'Вы вошли в комнату' })
  } catch (error) {
    // Передаём ошибку в глобальный обработчик
    next(error)
  }
}

// Выход из комнаты
export async function leaveRoom(req, res, next) {
  try {
    // Удаляем пользователя из комнаты: ID комнаты из URL, ID пользователя из токена
    await roomService.leaveRoom(req.params.id, req.user.sub)
    // Возвращаем сообщение об успехе с кодом 200 (OK)
    res.status(200).json({ message: 'Вы покинули комнату' })
  } catch (error) {
    // Передаём ошибку в глобальный обработчик
    next(error)
  }
}