const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

/**
 * Middleware для проверки JWT токена
 */
exports.authMiddleware = async (req, res, next) => {
  try {
    // Проверяем наличие токена в cookies или в заголовке Authorization
    let token = req.cookies.token;
    
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Для доступа необходима авторизация'
      });
    }
    
    // Верификация токена
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Получение данных пользователя из БД
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Пользователь не найден'
      });
    }
    
    // Добавление данных пользователя в запрос
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Срок действия токена истек, войдите снова'
      });
    }
    
    res.status(401).json({
      success: false,
      message: 'Неверный токен, войдите снова'
    });
  }
};

/**
 * Middleware для опциональной проверки JWT токена
 * Если токен есть и валиден, добавляет информацию о пользователе в запрос
 * Если токена нет или он невалиден, продолжает обработку запроса без авторизации
 */
exports.optionalAuthMiddleware = async (req, res, next) => {
  try {
    // Проверяем наличие токена в cookies или в заголовке Authorization
    let token = req.cookies.token;
    
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    // Если токена нет, просто продолжаем обработку запроса
    if (!token) {
      return next();
    }
    
    try {
      // Верификация токена
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Получение данных пользователя из БД
      const user = await User.findById(decoded.id).select('-password');
      
      if (user) {
        // Добавление данных пользователя в запрос
        req.user = user;
      }
    } catch (tokenError) {
      // Если с токеном проблема, игнорируем ошибку и продолжаем без авторизации
      console.log('Ошибка проверки токена в optional middleware:', tokenError.message);
    }
    
    next();
  } catch (error) {
    // В случае других ошибок продолжаем без авторизации
    console.error('Ошибка в optionalAuthMiddleware:', error);
    next();
  }
}; 