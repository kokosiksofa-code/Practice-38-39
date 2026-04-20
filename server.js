// Загружаем переменные окружения из файла .env
import 'dotenv/config'
// Импортируем настроенное приложение Express
import app from './src/app.js'
// Импортируем конфигурацию приложения
import config from './src/config.js'

// Асинхронная функция запуска сервера
const startServer = async () => {
  try {
    // Запускаем сервер на указанном порту
    app.listen(config.port, () => {
      // Выводим сообщение об успешном запуске
      console.log(`Сервер запущен на порту http://localhost:${config.port}`);
      console.log(`Документация доступна на http://localhost:${config.port}/api/docs`,   
      );
    });
  } catch (err) {
    // Если произошла ошибка при запуске - выводим её в консоль
    console.error('Не удалось запустить сервер:', err);
  }
};
// Вызываем функцию запуска сервера
startServer()