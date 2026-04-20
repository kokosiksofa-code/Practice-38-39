// Импортируем клиент Supabase для аутентификации
import supabase from '../utils/supabase.js'
// Импортируем клиент Prisma для работы с базой данных
import prisma from '../prisma/prismaClient.js'
// Импортируем класс для создания ошибок
import AppError from '../utils/appError.js'

// Регистрация нового пользователя
export async function register(email, password, name) {
  // Создаём пользователя в Supabase Auth
  const { data, error } = await supabase.auth.signUp({ email, password })
  
  // Если произошла ошибка - выбрасываем её
  if (error) throw new AppError(error.message, 400)

  // Создаём запись пользователя в нашей базе данных
  const user = await prisma.user.create({
    data: {
      supabaseId: data.user.id,  // ID из Supabase
      email,                      // Email пользователя
      name,                       // Имя пользователя
    },
  })

  // Возвращаем созданного пользователя и сессию
  return { user, session: data.session }
}

// Вход пользователя
export async function login(email, password) {
  // Аутентифицируем пользователя через Supabase
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  
  // Если ошибка - выбрасываем понятное сообщение
  if (error) throw new AppError('Неверный электронный адрес или пароль', 401)

  // Возвращаем сессию с токенами
  return { session: data.session }
}

// Выход пользователя
export async function logout(accessToken) {
  // Вызываем метод выхода из Supabase
  const { error } = await supabase.auth.signOut(accessToken)
  
  // Если ошибка - выбрасываем её
  if (error) throw new AppError(error.message, 400)
}