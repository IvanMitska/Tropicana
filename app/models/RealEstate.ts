// Интерфейс для объекта недвижимости
export interface RealEstate {
  id: string;
  title: string;
  description: string;
  type: RealEstateType;
  price: number;
  priceUnit: PriceUnit;
  location: Location;
  features: RealEstateFeatures;
  images: string[];
  owner: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  isAvailable: boolean;
  published: boolean;
  createdAt: string;
}

// Типы недвижимости
export type RealEstateType = 'apartment' | 'house' | 'room' | 'office' | 'commercial' | 'other';

// Единицы измерения цены
export type PriceUnit = 'день' | 'сутки' | 'месяц' | 'год';

// Интерфейс для местоположения
export interface Location {
  city: string;
  address: string;
  coordinates?: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
}

// Интерфейс для характеристик недвижимости
export interface RealEstateFeatures {
  bedrooms: number;
  bathrooms: number;
  area: number;
  amenities: string[];
}

// Интерфейс для фильтров поиска недвижимости
export interface RealEstateFilters {
  type?: RealEstateType;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  minArea?: number;
  q?: string;
  sort?: 'price' | 'price-desc' | 'newest' | 'oldest' | 'rating';
  limit?: number;
  page?: number;
}

// Интерфейс для ответа API с недвижимостью
export interface RealEstateResponse {
  success: boolean;
  count: number;
  pagination: {
    next?: {
      page: number;
      limit: number;
    };
    prev?: {
      page: number;
      limit: number;
    };
  };
  data: RealEstate[];
}

// Экспорт модели для использования в проекте
export default RealEstate; 