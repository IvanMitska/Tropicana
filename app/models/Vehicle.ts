import mongoose, { Schema, model, models } from 'mongoose';

// Типы транспортных средств
export type VehicleType = 'car' | 'motorcycle' | 'boat' | 'yacht' | 'bicycle' | 'scooter' | 'rv' | 'other';

// Интерфейс изображений транспортного средства
export interface VehicleImage {
  id: string;
  url: string;
  alt: string;
  isFeatured: boolean;
}

// Характеристики транспортного средства
export interface VehicleSpecifications {
  power: number; // мощность в л.с.
  fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid' | 'other';
  fuelConsumption: number; // расход топлива (л/100км или кВт·ч/100км)
  transmission: 'automatic' | 'manual' | 'semiautomatic';
  driveType?: 'fwd' | 'rwd' | 'awd' | '4wd'; // тип привода (только для автомобилей)
  acceleration?: number; // разгон до 100 км/ч (в секундах)
  maxSpeed?: number; // максимальная скорость (км/ч)
  capacity: number; // вместимость (количество пассажиров)
  doors?: number; // количество дверей (для автомобилей)
  weight?: number; // вес (кг)
  length?: number; // длина (м)
  width?: number; // ширина (м)
  height?: number; // высота (м)
  luggage?: number; // объем багажника (л) или грузоподъемность
  [key: string]: any; // дополнительные характеристики
}

// Цены аренды
export interface VehiclePricing {
  hourly?: number; // цена за час
  daily: number; // цена за день
  weekly?: number; // цена за неделю
  monthly?: number; // цена за месяц
  deposit: number; // залог
  minimumRental: number; // минимальный срок аренды (в часах)
  discounts?: { // скидки
    weekly?: number; // скидка при аренде на неделю (%)
    monthly?: number; // скидка при аренде на месяц (%)
    longTerm?: number; // скидка при долгосрочной аренде (%)
  };
  additionalFees?: { // дополнительные сборы
    delivery?: number; // доставка
    insurance?: number; // страховка
    cleaning?: number; // уборка
    [key: string]: number | undefined;
  };
}

// Условия аренды
export interface RentalTerms {
  minimumAge: number; // минимальный возраст
  licenseRequired: boolean; // требуется ли водительское удостоверение
  licenseType?: string; // тип водительского удостоверения
  drivingExperience?: number; // опыт вождения (в годах)
  securityDeposit: number; // страховой депозит
  allowedAreas?: string[]; // разрешенные зоны для поездок
  prohibitedUsage: string[]; // запрещенное использование
  includesInsurance: boolean; // включена ли страховка
  fuelPolicy: 'full-to-full' | 'full-to-empty' | 'as-received' | 'pre-purchase'; // политика топлива
  mileageLimit?: number; // ограничение пробега (км)
  overtimeFee?: number; // плата за опоздание (в час)
}

// Местоположение и зона обслуживания
export interface VehicleLocation {
  address: string;
  city: string;
  state?: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

// Доступность транспортного средства
export interface VehicleAvailability {
  startDate: Date;
  endDate: Date;
  isBooked: boolean;
  price?: number; // Специальная цена на период
}

// Владелец транспортного средства
export interface VehicleOwner {
  userId: string;
  name: string;
  photo?: string;
  contactPhone?: string;
  contactEmail?: string;
  responseRate?: number;
  verifiedIdentity?: boolean;
}

// Отзыв о транспортном средстве
export interface VehicleReview {
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: Date;
  categories?: {
    condition: number;
    comfort: number;
    value: number;
    reliability: number;
    [key: string]: number;
  };
}

// Основной интерфейс транспортного средства
export interface Vehicle {
  id?: string;
  title: string;
  description: string;
  specs: VehicleSpecifications;
  status: 'active' | 'maintenance' | 'inactive';
  featured: boolean;
  location: VehicleLocation;
  price: VehiclePricing;
  owner: VehicleOwner;
  features: VehicleImage[];
  rules: RentalTerms;
  photos: string[];
  availability: VehicleAvailability[];
  reviews?: VehicleReview[];
  rating?: number;
  reviewCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Интерфейс для модели Mongoose (если используете MongoDB)
export interface VehicleDocument extends Vehicle, Document {}

// Схема для MongoDB
const VehicleSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  specs: {
    year: { type: Number, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    type: { 
      type: String, 
      enum: ['car', 'motorcycle', 'scooter', 'bicycle', 'boat', 'jet-ski', 'other'],
      required: true 
    },
    transmission: { 
      type: String, 
      enum: ['automatic', 'manual', 'semi-automatic', 'none'] 
    },
    fuel: { 
      type: String, 
      enum: ['gasoline', 'diesel', 'electric', 'hybrid', 'none'] 
    },
    seats: { type: Number },
    doors: { type: Number },
    engineSize: { type: String },
    power: { type: String },
    consumption: { type: String },
    range: { type: Number },
    color: { type: String },
    licensePlate: { type: String }
  },
  status: { 
    type: String, 
    enum: ['active', 'maintenance', 'inactive'],
    default: 'active'
  },
  featured: { type: Boolean, default: false },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    country: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    }
  },
  price: {
    base: { type: Number, required: true },
    currency: { type: String, required: true, default: 'THB' },
    depositAmount: { type: Number },
    insuranceFee: { type: Number },
    discounts: {
      weekly: { type: Number },
      monthly: { type: Number },
      earlyBird: { type: Number },
      lastMinute: { type: Number }
    }
  },
  owner: {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    photo: { type: String },
    contactPhone: { type: String },
    contactEmail: { type: String },
    responseRate: { type: Number },
    verifiedIdentity: { type: Boolean, default: false }
  },
  features: [{
    name: { type: String, required: true },
    icon: { type: String },
    category: { type: String }
  }],
  rules: {
    minDriverAge: { type: Number },
    requiredLicense: { type: String },
    securityDeposit: { type: Number },
    fuelPolicy: { 
      type: String, 
      enum: ['full-to-full', 'full-to-empty', 'same-to-same']
    },
    mileageLimit: {
      limit: { type: Number },
      unit: { type: String, enum: ['km', 'mi'] },
      extraCost: { type: Number }
    },
    allowPets: { type: Boolean },
    allowSmoking: { type: Boolean },
    additionalRules: [{ type: String }]
  },
  photos: [{ type: String, required: true }],
  availability: [{
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isBooked: { type: Boolean, default: false },
    price: { type: Number }
  }],
  reviews: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    userName: { type: String },
    userAvatar: { type: String },
    rating: { type: Number, required: true },
    comment: { type: String },
    date: { type: Date, default: Date.now },
    categories: {
      condition: { type: Number },
      comfort: { type: Number },
      value: { type: Number },
      reliability: { type: Number }
    }
  }],
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 }
}, { timestamps: true });

// Экспортируем модель
export const Vehicle = models.Vehicle || model('Vehicle', VehicleSchema); 