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