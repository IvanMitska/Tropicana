/**
 * Централизованный обработчик ошибок
 */
exports.errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  
  // Проверка ошибок mongoose validation
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({
      success: false,
      errors: messages
    });
  }
  
  // Проверка ошибок дубликатов (уникальные поля)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `${field} уже занят, выберите другой`
    });
  }
  
  // Проверка ошибок ID (Cast Error)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: `Неверный формат ID: ${err.value}`
    });
  }
  
  // Проверка ошибок JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Неверный токен авторизации'
    });
  }
  
  // Стандартная ошибка сервера
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Ошибка сервера'
  });
}; 