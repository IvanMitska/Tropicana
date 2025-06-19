// Переменные окружения по умолчанию для Netlify
// Этот файл поможет избежать ошибок сборки при отсутствии некоторых переменных

const defaultEnvVars = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://0.0.0.0:27017/placeholder',
  JWT_SECRET: process.env.JWT_SECRET || 'placeholder-jwt-secret-for-build-only',
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder',
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder',
  EMAIL_USER: process.env.EMAIL_USER || 'placeholder@example.com',
  EMAIL_PASS: process.env.EMAIL_PASS || 'placeholder-password',
  SMTP_PASSWORD: process.env.SMTP_PASSWORD || 'placeholder-password',
};

// Устанавливаем переменные окружения если они не заданы
Object.keys(defaultEnvVars).forEach(key => {
  if (!process.env[key]) {
    process.env[key] = defaultEnvVars[key];
  }
});

module.exports = defaultEnvVars; 