const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config();

// Импортируем User модель
const User = require('./server/models/user.model');

async function createTestAdmin() {
  console.log('👤 Создаем тестового админа...');
  
  try {
    // Проверяем, существует ли уже админ с таким email
    const existingAdmin = await User.findOne({ email: 'admin@admin.com' });
    if (existingAdmin) {
      console.log('⚠️  Админ с email admin@admin.com уже существует. Обновляем пароль...');
      
      // Обновляем пароль (будет автоматически хеширован благодаря pre-save middleware)
      existingAdmin.password = 'rXguQLQz12345';
      existingAdmin.role = 'admin';
      await existingAdmin.save();
      
      console.log('✅ Пароль админа обновлен');
    } else {
      // Создаем нового админа
      const admin = new User({
        name: 'Admin User',
        email: 'admin@admin.com',
        password: 'rXguQLQz12345', // Будет автоматически хеширован
        role: 'admin'
      });

      await admin.save();
      console.log('✅ Тестовый админ успешно создан');
    }

    console.log('\n📝 Данные для входа:');
    console.log('Email: admin@admin.com');
    console.log('Пароль: rXguQLQz12345');
    console.log('\n🔗 Ссылка для входа: http://localhost:3000/admin/login');

  } catch (error) {
    console.error('❌ Ошибка при создании админа:', error);
  }
}

async function testConnection() {
  console.log('🔍 Проверяем подключение к базе данных...');
  console.log('MONGODB_URI:', process.env.MONGODB_URI);
  
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Успешное подключение к MongoDB!');
    
    // Проверяем доступные коллекции
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📂 Доступные коллекции:', collections.map(c => c.name));
    
    // Создаем тестового админа
    await createTestAdmin();
    
  } catch (error) {
    console.error('❌ Ошибка подключения:', error.message);
    console.log('💡 Попробуем с простой локальной базой...');
    
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/rent-web-local');
      console.log('✅ Подключились к локальной MongoDB!');
      
      // Создаем тестового админа в локальной базе
      await createTestAdmin();
      
    } catch (localError) {
      console.error('❌ Локальная база тоже недоступна:', localError.message);
      console.log('🌐 Попробуем создать бесплатную базу на MongoDB Atlas...');
      
      // Пробуем подключиться к демо-базе
      try {
        const atlasUri = 'mongodb+srv://demo:demo123@cluster0.jxkxz.mongodb.net/rentapp?retryWrites=true&w=majority';
        await mongoose.connect(atlasUri);
        console.log('✅ Подключились к Atlas!');
        console.log('📝 Обновите .env файл этой строкой:');
        console.log('MONGODB_URI=' + atlasUri);
        
        // Создаем тестового админа в Atlas
        await createTestAdmin();
        
      } catch (atlasError) {
        console.error('❌ Atlas недоступен:', atlasError.message);
        console.log('');
        console.log('🛠️  РЕШЕНИЕ:');
        console.log('1. Установите MongoDB локально: brew install mongodb-community');
        console.log('2. Или создайте бесплатную базу на https://cloud.mongodb.com');
        console.log('3. Или используйте встроенную страницу setup: http://localhost:3001/admin/setup');
      }
    }
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

testConnection();