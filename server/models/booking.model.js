const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  // Связь с объектом бронирования (недвижимость, транспорт, экскурсия)
  itemType: {
    type: String,
    required: true,
    enum: ['real-estate', 'transport', 'tour']
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'itemType'
  },
  // Связь с пользователем
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Даты бронирования
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  // Дополнительная информация
  guestCount: {
    type: Number,
    default: 1
  },
  // Дополнительные опции бронирования (хранятся как массив)
  options: [{
    name: String,
    price: Number
  }],
  // Контактная информация (для неавторизованных пользователей)
  contactInfo: {
    name: String,
    email: String,
    phone: String
  },
  // Информация о цене
  price: {
    basePrice: {
      type: Number,
      required: true
    },
    optionsPrice: {
      type: Number,
      default: 0
    },
    taxAmount: {
      type: Number,
      default: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    totalPrice: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'THB'
    }
  },
  // Статус бронирования
  status: {
    type: String,
    required: true,
    enum: ['draft', 'pending', 'confirmed', 'canceled', 'completed'],
    default: 'draft'
  },
  // Статус оплаты
  paymentStatus: {
    type: String,
    enum: ['pending', 'partial', 'completed', 'refunded', 'failed'],
    default: 'pending'
  },
  // Связь с платежами
  payments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  }],
  // Комментарии или особые пожелания
  notes: {
    type: String
  },
  // Уникальный номер бронирования для пользователя
  bookingNumber: {
    type: String,
    unique: true
  },
  // Временные метки
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Метод для расчета общей стоимости бронирования
bookingSchema.methods.calculateTotalPrice = function() {
  const optionsTotal = this.options.reduce((sum, option) => sum + option.price, 0);
  this.price.optionsPrice = optionsTotal;
  this.price.totalPrice = this.price.basePrice + optionsTotal - this.price.discount + this.price.taxAmount;
  return this.price.totalPrice;
};

// Генерация уникального номера бронирования перед сохранением
bookingSchema.pre('save', async function(next) {
  if (!this.bookingNumber) {
    // Формат: BK-YYYYMMDD-XXXX (где XXXX - случайное 4-значное число)
    const date = new Date();
    const dateStr = date.getFullYear().toString() +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      date.getDate().toString().padStart(2, '0');
    const randomPart = Math.floor(1000 + Math.random() * 9000); // 4-значное число
    this.bookingNumber = `BK-${dateStr}-${randomPart}`;
  }
  // Обновляем дату изменения
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Booking', bookingSchema); 