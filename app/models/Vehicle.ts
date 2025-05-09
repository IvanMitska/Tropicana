import { Document } from 'mongoose';

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
  address: string; // адрес
  city: string; // город
  lat: number; // широта
  lng: number; // долгота
  serviceRadius?: number; // радиус обслуживания (км)
  deliveryAvailable: boolean; // доступна ли доставка
  deliveryFee?: number; // стоимость доставки
  pickupLocations?: { // дополнительные места получения
    address: string;
    lat: number;
    lng: number;
    [key: string]: any;
  }[];
}

// Доступность транспортного средства
export interface VehicleAvailability {
  date: string; // дата в формате ISO
  available: boolean; // доступность
  bookedTimeSlots?: { // забронированные временные слоты
    start: string; // время начала
    end: string; // время окончания
  }[];
}

// Владелец транспортного средства
export interface VehicleOwner {
  id: string;
  name: string;
  avatar?: string;
  responseRate: number;
  responseTime: string;
  isVerified: boolean;
  since: string; // дата регистрации
  totalRentals: number; // общее количество аренд
}

// Отзыв о транспортном средстве
export interface VehicleReview {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  categories: {
    condition: number;
    comfort: number;
    performance: number;
    value: number;
    [key: string]: number;
  };
}

// Основной интерфейс транспортного средства
export interface Vehicle {
  id: string;
  type: VehicleType;
  make: string; // марка
  model: string; // модель
  year: number; // год выпуска
  color: string; // цвет
  title: string; // заголовок объявления
  description: string; // описание
  specifications: VehicleSpecifications; // характеристики
  pricing: VehiclePricing; // цены
  rentalTerms: RentalTerms; // условия аренды
  location: VehicleLocation; // местоположение
  images: VehicleImage[]; // изображения
  availability: VehicleAvailability[]; // доступность
  features: string[]; // дополнительные функции и особенности
  owner: VehicleOwner; // владелец
  rating: number; // рейтинг
  reviews: VehicleReview[]; // отзывы
  featured: boolean; // популярное предложение
  createdAt: string; // дата создания
  updatedAt: string; // дата обновления
  status: 'active' | 'maintenance' | 'booked' | 'inactive'; // статус
  viewCount: number; // количество просмотров
  bookingCount: number; // количество бронирований
}

// Интерфейс для модели Mongoose (если используете MongoDB)
export interface VehicleDocument extends Vehicle, Document {} 