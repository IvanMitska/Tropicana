const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  // Связь с бронированием
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  // Связь с пользователем
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Тип платежа
  method: {
    type: String,
    enum: ['card', 'bank_transfer', 'cash', 'electronic_wallet'],
    required: true
  },
  // Информация о цене
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'RUB'
  },
  // Статус платежа
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  // Идентификатор транзакции в платежной системе
  transactionId: {
    type: String
  },
  // Данные от платежной системы
  paymentProviderData: {
    provider: {
      type: String,
      enum: ['stripe', 'paypal', 'yookassa', 'other'],
      required: true
    },
    sessionId: String,
    intentId: String,
    paymentMethodId: String,
    customerId: String,
    receiptId: String,
    raw: mongoose.Schema.Types.Mixed
  },
  // Информация о карте (сохраняется в замаскированном виде)
  cardInfo: {
    lastFour: String,
    brand: String,
    expiryMonth: Number,
    expiryYear: Number
  },
  // Описание платежа
  description: {
    type: String
  },
  // Причина отказа/ошибки
  errorMessage: {
    type: String
  },
  // Дата возврата средств (если был возврат)
  refundedAt: {
    type: Date
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

// Обновляем дату изменения перед сохранением
paymentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Метод для обработки успешного платежа
paymentSchema.methods.completePayment = async function(transactionData) {
  this.status = 'completed';
  this.transactionId = transactionData.id;
  
  if (transactionData.card) {
    this.cardInfo = {
      lastFour: transactionData.card.last4,
      brand: transactionData.card.brand,
      expiryMonth: transactionData.card.exp_month,
      expiryYear: transactionData.card.exp_year
    };
  }
  
  if (transactionData.paymentIntent) {
    this.paymentProviderData.intentId = transactionData.paymentIntent;
  }
  
  // Обновление связанного бронирования
  const booking = await mongoose.model('Booking').findById(this.booking);
  if (booking) {
    booking.paymentStatus = 'completed';
    booking.status = 'confirmed';
    await booking.save();
  }
  
  return await this.save();
};

// Метод для обработки неудачного платежа
paymentSchema.methods.failPayment = async function(errorData) {
  this.status = 'failed';
  this.errorMessage = errorData.message || 'Ошибка обработки платежа';
  
  // Обновление связанного бронирования
  const booking = await mongoose.model('Booking').findById(this.booking);
  if (booking) {
    booking.paymentStatus = 'failed';
    await booking.save();
  }
  
  return await this.save();
};

module.exports = mongoose.model('Payment', paymentSchema); 