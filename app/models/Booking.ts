import mongoose, { Schema, Document, Model } from 'mongoose';
import { generateBookingNumber } from '@/app/lib/utils';

// Подключение к БД
import connectDB from '@/app/lib/mongodb';

// Интерфейс для типизации модели бронирования
export interface IBooking extends Document {
  itemType: 'real-estate' | 'transport' | 'tour';
  itemId: mongoose.Schema.Types.ObjectId;
  user?: mongoose.Schema.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  guestCount: number;
  options: Array<{
    name: string;
    price: number;
  }>;
  contactInfo?: {
    name: string;
    email: string;
    phone: string;
  };
  price: {
    amount: number;
    currency: string;
    breakdown?: {
      base: number;
      fees: number;
      taxes: number;
      discounts: number;
    };
  };
  status: 'draft' | 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'partial' | 'completed' | 'refunded' | 'failed';
  payments: mongoose.Schema.Types.ObjectId[];
  notes?: string;
  bookingNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

// Схема бронирования
const bookingSchema = new Schema<IBooking>(
  {
    // Связь с объектом бронирования (недвижимость, транспорт, экскурсия)
    itemType: {
      type: String,
      required: true,
      enum: ['real-estate', 'transport', 'tour']
    },
    itemId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'itemType'
    },
    // Связь с пользователем
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
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
      amount: {
        type: Number,
        required: true
      },
      currency: {
        type: String,
        default: 'THB'
      },
      breakdown: {
        base: {
          type: Number,
          default: 0
        },
        fees: {
          type: Number,
          default: 0
        },
        taxes: {
          type: Number,
          default: 0
        },
        discounts: {
          type: Number,
          default: 0
        }
      }
    },
    // Статус бронирования
    status: {
      type: String,
      required: true,
      enum: ['draft', 'pending', 'confirmed', 'cancelled', 'completed'],
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
      type: Schema.Types.ObjectId,
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
    }
  },
  { timestamps: true }
);

// Хук перед сохранением для генерации номера бронирования
bookingSchema.pre<IBooking>('save', function(next) {
  // Если нет номера бронирования, генерируем его
  if (!this.bookingNumber) {
    this.bookingNumber = generateBookingNumber();
  }
  next();
});

// Создание или получение модели
const Booking: Model<IBooking> = 
  mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema);

// Экспорт модели
export default Booking; 