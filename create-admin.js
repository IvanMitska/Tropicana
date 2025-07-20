const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');

// Подключаем переменные окружения
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Схема пользователя
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function createAdmin() {
  try {
    // Подключение к MongoDB
    const mongoUri = process.env.MONGODB_URI || process.env.MONGODB_URL;
    if (!mongoUri) {
      console.error('❌ MONGODB_URI не найден в переменных окружения');
      process.exit(1);
    }

    console.log('🔗 Подключение к MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Подключено к MongoDB');

    // Проверяем, существует ли уже админ
    const existingAdmin = await User.findOne({ email: 'admin@admin.com' });
    if (existingAdmin) {
      console.log('⚠️  Админ уже существует. Обновляем пароль...');
      
      // Хешируем новый пароль
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash('rXguQLQz12345', saltRounds);
      
      // Обновляем пароль
      await User.findByIdAndUpdate(existingAdmin._id, {
        password: hashedPassword,
        role: 'admin'
      });
      
      console.log('✅ Пароль админа обновлен');
    } else {
      // Создаем нового админа
      console.log('👤 Создание админа...');
      
      // Хешируем пароль
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash('rXguQLQz12345', saltRounds);

      // Создаем админа
      const admin = new User({
        name: 'Администратор',
        email: 'admin@admin.com',
        password: hashedPassword,
        role: 'admin'
      });

      await admin.save();
      console.log('✅ Админ успешно создан');
    }

    console.log('\n📝 Данные для входа:');
    console.log('Email: admin@admin.com');
    console.log('Пароль: rXguQLQz12345');
    console.log('\n🔗 Ссылка для входа: http://localhost:3000/admin/login');

  } catch (error) {
    console.error('❌ Ошибка при создании админа:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔚 Отключено от MongoDB');
    process.exit(0);
  }
}

createAdmin();