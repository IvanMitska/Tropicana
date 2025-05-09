import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INotification extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  category: 'booking' | 'payment' | 'account' | 'system' | 'document' | 'review';
  isRead: boolean;
  linkUrl?: string;
  relatedItemType?: 'property' | 'vehicle' | 'tour' | 'excursion' | 'booking' | 'payment';
  relatedItemId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['info', 'success', 'warning', 'error'],
      default: 'info',
    },
    category: {
      type: String,
      enum: ['booking', 'payment', 'account', 'system', 'document', 'review'],
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    linkUrl: String,
    relatedItemType: {
      type: String,
      enum: ['property', 'vehicle', 'tour', 'excursion', 'booking', 'payment'],
    },
    relatedItemId: {
      type: Schema.Types.ObjectId,
    },
    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Статический метод для получения непрочитанных уведомлений пользователя
NotificationSchema.statics.getUnreadNotificationsByUser = async function(userId: mongoose.Types.ObjectId) {
  const now = new Date();
  return this.find({
    user: userId,
    isRead: false,
    $or: [
      { expiresAt: { $exists: false } },
      { expiresAt: { $gt: now } }
    ]
  }).sort({ createdAt: -1 });
};

// Статический метод для отметки всех уведомлений пользователя как прочитанных
NotificationSchema.statics.markAllAsRead = async function(userId: mongoose.Types.ObjectId) {
  return this.updateMany(
    { user: userId, isRead: false },
    { $set: { isRead: true } }
  );
};

// Статический метод для создания уведомления о бронировании
NotificationSchema.statics.createBookingNotification = async function(
  userId: mongoose.Types.ObjectId,
  bookingId: mongoose.Types.ObjectId,
  status: string,
  itemType: string,
  itemName: string
) {
  let title = '';
  let message = '';
  let type: 'info' | 'success' | 'warning' | 'error' = 'info';

  switch(status) {
    case 'confirmed':
      title = 'Бронирование подтверждено';
      message = `Ваше бронирование ${itemName} успешно подтверждено.`;
      type = 'success';
      break;
    case 'cancelled':
      title = 'Бронирование отменено';
      message = `Ваше бронирование ${itemName} было отменено.`;
      type = 'warning';
      break;
    case 'completed':
      title = 'Бронирование завершено';
      message = `Ваше бронирование ${itemName} успешно завершено. Оставьте отзыв о вашем опыте.`;
      type = 'success';
      break;
    default:
      title = 'Обновление бронирования';
      message = `Статус вашего бронирования ${itemName} был обновлен на "${status}".`;
      type = 'info';
  }

  return this.create({
    user: userId,
    title,
    message,
    type,
    category: 'booking',
    linkUrl: `/bookings/${bookingId}`,
    relatedItemType: 'booking',
    relatedItemId: bookingId,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Уведомление истекает через 30 дней
  });
};

// Создаем индекс для улучшения производительности запросов
NotificationSchema.index({ user: 1, isRead: 1, createdAt: -1 });
NotificationSchema.index({ user: 1, category: 1 });
NotificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL индекс для автоматического удаления истекших уведомлений

// Проверка наличия модели перед созданием новой
const Notification: Model<INotification> = mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema);

export default Notification; 