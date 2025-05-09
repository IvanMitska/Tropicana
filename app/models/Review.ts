import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReview extends Document {
  user: mongoose.Types.ObjectId;
  itemType: 'property' | 'vehicle' | 'tour' | 'excursion';
  itemId: mongoose.Types.ObjectId;
  booking: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  photos?: string[];
  status: 'pending' | 'published' | 'rejected';
  adminComment?: string;
  isEdited: boolean;
  editHistory?: {
    rating: number;
    comment: string;
    editedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    itemType: {
      type: String,
      enum: ['property', 'vehicle', 'tour', 'excursion'],
      required: true,
    },
    itemId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'itemType',
    },
    booking: {
      type: Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, 'Комментарий должен содержать минимум 3 символа'],
    },
    photos: [String],
    status: {
      type: String,
      enum: ['pending', 'published', 'rejected'],
      default: 'pending',
    },
    adminComment: String,
    isEdited: {
      type: Boolean,
      default: false,
    },
    editHistory: [
      {
        rating: Number,
        comment: String,
        editedAt: Date,
      },
    ],
  },
  { timestamps: true }
);

// Метод для добавления новой версии отзыва при редактировании
ReviewSchema.methods.addEditHistory = function(prevRating: number, prevComment: string) {
  this.editHistory.push({
    rating: prevRating,
    comment: prevComment,
    editedAt: new Date(),
  });
  this.isEdited = true;
};

// Создаем составной индекс для предотвращения дублирования отзывов
ReviewSchema.index({ user: 1, booking: 1 }, { unique: true });
ReviewSchema.index({ itemType: 1, itemId: 1, status: 1 });

// Проверка наличия модели перед созданием новой
const Review: Model<IReview> = mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);

export default Review; 