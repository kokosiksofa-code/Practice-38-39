// Импортируем все функции из сервиса аутентификации
import * as authService from '../services/authService.js'

// Контроллер для регистрации
export async function register(req, res, next) {
  try {
    // Получаем данные из тела запроса
    const { email, password, name } = req.body
    
    // Вызываем сервис регистрации
    const { user, session } = await authService.register(email, password, name)
    
    // Возвращаем созданного пользователя и сессию с кодом 201 (Created)
    res.status(201).json({ user, session })
  } catch (error) {
    // Передаём ошибку в глобальный обработчик
    next(error)
  }
}

// Контроллер для входа
export async function login(req, res, next) {
  try {
    // Получаем данные из тела запроса
    const { email, password } = req.body
    
    // Вызываем сервис входа
    const { session } = await authService.login(email, password)
    
    // Возвращаем сессию с кодом 200 (OK)
    res.status(200).json({ session })
  } catch (error) {
    // Передаём ошибку в глобальный обработчик
    next(error)
  }
}

// Контроллер для выхода
export async function logout(req, res, next) {
  try {
    // Извлекаем токен из заголовка Authorization (формат: "Bearer <токен>")
    await authService.logout(req.headers.authorization.split(' ')[1])
 
    // Возвращаем сообщение об успешном выходе
    res.status(200).json({ message: 'Выход выполнен' })
  } catch (error) {
    // Передаём ошибку в глобальный обработчик
    next(error)
  }
}