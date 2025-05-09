import mongoose, { Schema, Document, Model } from 'mongoose';

// Подключение к БД
import connectDB from '@/app/lib/mongodb';

// Интерфейс для типизации модели платежа
export interface IPayment extends Document {
  booking: mongoose.Schema.Types.ObjectId;
  user?: mongoose.Schema.Types.ObjectId;
  method: 'card' | 'bank_transfer' | 'cash' | 'electronic_wallet';
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  paymentProviderData: {
    provider: 'stripe' | 'paypal' | 'yookassa' | 'other';
    sessionId?: string;
    intentId?: string;
    paymentMethodId?: string;
    customerId?: string;
    receiptId?: string;
    raw?: any;
  };
  cardInfo?: {
    lastFour?: string;
    brand?: string;
    expiryMonth?: number;
    expiryYear?: number;
  };
  description?: string;
  errorMessage?: string;
  refundedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Схема платежа
const paymentSchema = new Schema<IPayment>(
  {
    // Связь с бронированием
    booking: {
      type: Schema.Types.ObjectId,
      ref: 'Booking',
      required: true
    },
    // Связь с пользователем
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
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
      raw: Schema.Types.Mixed
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
    }
  },
  { timestamps: true }
);

// Создание или получение модели
const Payment: Model<IPayment> = 
  mongoose.models.Payment || mongoose.model<IPayment>('Payment', paymentSchema);

// Экспорт модели
export default Payment; 