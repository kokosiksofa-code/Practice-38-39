// Импортируем клиент Prisma для работы с базой данных
import prisma from '../prisma/prismaClient.js'
// Импортируем класс для создания ошибок
import AppError from '../utils/appError.js'

// Вспомогательная функция для поиска пользователя по supabaseId
async function getUserBySupabaseId(supabaseId) {
  // Ищем пользователя в базе данных по supabaseId
  const user = await prisma.user.findUnique({ where: { supabaseId } })
  // Если пользователь не найден - выбрасываем ошибку 404
  if (!user) throw new AppError('Пользователь не найден', 404)
  return user
}

// Получение списка всех комнат
export async function getRooms() {
  // Возвращаем все комнаты, отсортированные по дате создания (новые сначала)
  return prisma.room.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

// Получение комнаты по ID
export async function getRoomById(id) {
  // Ищем комнату по ID
  const room = await prisma.room.findUnique({ where: { id } })
  // Если комната не найдена - выбрасываем ошибку 404
  if (!room) throw new AppError('Комната не найдена', 404)
  return room
}

// Создание новой комнаты
export async function createRoom(name, supabaseId) {
  // Находим пользователя, создающего комнату
  const user = await getUserBySupabaseId(supabaseId)
  
  // Проверяем, не существует ли уже комната с таким названием
  const existing = await prisma.room.findUnique({ where: { name } })
  if (existing) throw new AppError('Комната с таким названием уже существует', 400)
  
  // Создаём новую комнату
  const room = await prisma.room.create({ data: { name } })
  
  // Добавляем создателя как участника комнаты
  await prisma.roomMember.create({ data: { roomId: room.id, userId: user.id } })
  
  return room
}

// Удаление комнаты
export async function deleteRoom(id) {
  // Проверяем, существует ли комната
  const room = await prisma.room.findUnique({ where: { id } })
  if (!room) throw new AppError('Комната не найдена', 404)
  
  // Удаляем комнату (связанные записи удалятся каскадно)
  await prisma.room.delete({ where: { id } })
}

// Вступление в комнату
export async function joinRoom(roomId, supabaseId) {
  // Находим пользователя
  const user = await getUserBySupabaseId(supabaseId)
  
  // Проверяем, существует ли комната
  const room = await prisma.room.findUnique({ where: { id: roomId } })
  if (!room) throw new AppError('Комната не найдена', 404)

  // Проверяем, не состоит ли пользователь уже в комнате
  const existing = await prisma.roomMember.findUnique({
    where: { userId_roomId: { userId: user.id, roomId } },
  })
  if (existing) throw new AppError('Вы уже в этой комнате', 400)

  // Добавляем пользователя в комнату
  return prisma.roomMember.create({ data: { roomId, userId: user.id } })
}

// Выход из комнаты
export async function leaveRoom(roomId, supabaseId) {
  // Находим пользователя
  const user = await getUserBySupabaseId(supabaseId)
  
  // Проверяем, состоит ли пользователь в комнате
  const member = await prisma.roomMember.findUnique({
    where: { userId_roomId: { userId: user.id, roomId } },
  })
  if (!member) throw new AppError('Вы не в этой комнате', 400)
  
  // Удаляем пользователя из комнаты
  await prisma.roomMember.delete({
    where: { userId_roomId: { userId: user.id, roomId } }
  })
}