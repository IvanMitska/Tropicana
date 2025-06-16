// Типы для точек маршрута
export interface RoutePoint {
  name: string;
  description?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  duration: number; // в минутах
  order: number;    // порядок посещения
}

// Тип маршрута
export interface TourRoute {
  points: RoutePoint[];
  totalDistance: number; // в километрах
  type: 'walking' | 'transport' | 'mixed';
}

// Доступные слоты для экскурсии
export interface TourScheduleSlot {
  id: string;
  date: string; // ISO формат
  startTime: string; // формат HH:MM
  endTime: string;   // формат HH:MM
  availableSpots: number;
  bookedSpots: number;
  priceModifier: number; // Модификатор цены (скидка/надбавка)
  status: 'available' | 'fullyBooked' | 'cancelled';
}

// Ценовая информация
export interface TourPricing {
  basePrice: number;
  currency: string;
  priceType: 'perPerson' | 'perGroup';
  discounts: {
    children: number; // процент скидки
    students: number;
    seniors: number;
    groups: number;
  };
  minParticipants: number;
  maxParticipants: number;
}

// Информация о гиде
export interface TourGuide {
  id?: string;
  name: string;
  photo: string;
  bio?: string;
  languages: string[];
  experience?: number; // опыт в годах
  contacts: {
    phone?: string;
    email?: string;
    social?: {
      instagram?: string;
      facebook?: string;
      telegram?: string;
      whatsapp?: string;
    };
  };
}

// Местоположение
export interface TourLocation {
  city: string;
  address: string;
  meetingPoint: {
    description: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
}

// Отзыв об экскурсии
export interface TourReview {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  categories?: {
    organization: number;
    interestingness: number;
    knowledge: number;
    friendliness: number;
    [key: string]: number;
  };
}

// Главный интерфейс модели экскурсии
export interface Tour {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: number; // в часах
  languages: string[];
  route: TourRoute;
  included: string[];
  notIncluded: string[];
  images: string[];
  video?: string;
  schedule: TourScheduleSlot[];
  pricing: TourPricing;
  guide: TourGuide;
  location: TourLocation;
  rating: number;
  reviewsCount: number;
  reviews?: TourReview[];
  tags: string[];
  isAvailable: boolean;
  published: boolean;
  popularity: number;
  createdAt: string;
  updatedAt: string;
}

// Интерфейс для запроса экскурсий с фильтрами
export interface TourFilters {
  category?: string;
  city?: string;
  language?: string;
  minDuration?: number;
  maxDuration?: number;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  date?: string;
  sort?: 'popularity' | 'price-asc' | 'price-desc' | 'rating';
  page?: number;
  limit?: number;
  q?: string;
}

// Экспортируем модель Tour для совместимости
import mongoose, { Schema, model, models } from 'mongoose';

// Создаем схему для Tour
const TourSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  duration: { type: Number, required: true },
  languages: [{ type: String }],
  route: {
    points: [{
      name: { type: String, required: true },
      description: { type: String },
      coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
      },
      duration: { type: Number, required: true },
      order: { type: Number, required: true }
    }],
    totalDistance: { type: Number, required: true },
    type: { type: String, enum: ['walking', 'transport', 'mixed'], required: true }
  },
  included: [{ type: String }],
  notIncluded: [{ type: String }],
  images: [{ type: String }],
  video: { type: String },
  schedule: [{
    id: { type: String, required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    availableSpots: { type: Number, required: true },
    bookedSpots: { type: Number, required: true },
    priceModifier: { type: Number, required: true },
    status: { type: String, enum: ['available', 'fullyBooked', 'cancelled'], required: true }
  }],
  pricing: {
    basePrice: { type: Number, required: true },
    currency: { type: String, required: true },
    priceType: { type: String, enum: ['perPerson', 'perGroup'], required: true },
    discounts: {
      children: { type: Number, required: true },
      students: { type: Number, required: true },
      seniors: { type: Number, required: true },
      groups: { type: Number, required: true }
    },
    minParticipants: { type: Number, required: true },
    maxParticipants: { type: Number, required: true }
  },
  guide: {
    id: { type: String },
    name: { type: String, required: true },
    photo: { type: String, required: true },
    bio: { type: String },
    languages: [{ type: String }],
    experience: { type: Number },
    contacts: {
      phone: { type: String },
      email: { type: String },
      social: {
        instagram: { type: String },
        facebook: { type: String },
        telegram: { type: String },
        whatsapp: { type: String }
      }
    }
  },
  location: {
    city: { type: String, required: true },
    address: { type: String, required: true },
    meetingPoint: {
      description: { type: String, required: true },
      coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
      }
    }
  },
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  reviews: [{
    id: { type: String, required: true },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userAvatar: { type: String },
    rating: { type: Number, required: true },
    date: { type: String, required: true },
    comment: { type: String, required: true },
    categories: {
      organization: { type: Number },
      interestingness: { type: Number },
      knowledge: { type: Number },
      friendliness: { type: Number }
    }
  }],
  tags: [{ type: String }],
  isAvailable: { type: Boolean, default: true },
  published: { type: Boolean, default: true },
  popularity: { type: Number, default: 0 }
}, { timestamps: true });

// Экспортируем модель
export const Tour = models.Tour || model('Tour', TourSchema); 