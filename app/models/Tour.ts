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