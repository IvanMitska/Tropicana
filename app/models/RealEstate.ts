import mongoose, { Schema, model, models } from 'mongoose';

// Интерфейсы для типов недвижимости
export interface RealEstateAmenity {
  name: string;
  icon?: string;
  category?: string;
}

export interface RealEstateLocation {
  address: string;
  city: string;
  state?: string;
  country: string;
  postalCode?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  neighborhood?: string;
}

export interface RealEstateReview {
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: Date;
  categories?: {
    cleanliness: number;
    location: number;
    value: number;
    accuracy: number;
    communication: number;
    [key: string]: number;
  };
}

export interface RealEstateAvailability {
  startDate: Date;
  endDate: Date;
  isBooked: boolean;
  price?: number; // Специальная цена на период
  minimumStay?: number; // Минимальное количество дней
}

export interface RealEstatePrice {
  base: number; // Базовая цена за ночь
  currency: string;
  cleaningFee?: number;
  serviceFee?: number;
  deposit?: number;
  discounts?: {
    weekly?: number; // Процент скидки
    monthly?: number;
    earlyBird?: number;
    lastMinute?: number;
  };
}

export interface RealEstateHost {
  userId: string;
  name: string;
  photo?: string;
  contactPhone?: string;
  contactEmail?: string;
  languages?: string[];
  responseRate?: number;
  verifiedIdentity?: boolean;
}

export interface RealEstateRules {
  checkInTime: string; // Формат HH:MM
  checkOutTime: string;
  cancellationPolicy: 'flexible' | 'moderate' | 'strict';
  instantBooking: boolean;
  allowPets?: boolean;
  allowSmoking?: boolean;
  allowParties?: boolean;
  additionalRules?: string[];
}

export interface RealEstateRoom {
  name: string;
  type: 'bedroom' | 'bathroom' | 'kitchen' | 'living' | 'other';
  beds?: {
    type: 'single' | 'double' | 'queen' | 'king' | 'sofa';
    count: number;
  }[];
  amenities?: string[];
  photos?: string[];
}

export interface RealEstate {
  id?: string;
  title: string;
  description: string;
  type: 'apartment' | 'house' | 'villa' | 'condo' | 'room';
  status: 'active' | 'pending' | 'inactive';
  featured: boolean;
  location: RealEstateLocation;
  price: RealEstatePrice;
  host: RealEstateHost;
  rooms: RealEstateRoom[];
  amenities: RealEstateAmenity[];
  rules: RealEstateRules;
  photos: string[];
  floorPlan?: string;
  video?: string;
  virtualTour?: string;
  maxGuests: number;
  bedroomCount: number;
  bedCount: number;
  bathroomCount: number;
  squareMeters?: number;
  availability: RealEstateAvailability[];
  reviews?: RealEstateReview[];
  rating?: number;
  reviewCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Схема для MongoDB
const RealEstateSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['apartment', 'house', 'villa', 'condo', 'room'],
    required: true 
  },
  status: { 
    type: String, 
    enum: ['active', 'pending', 'inactive'],
    default: 'active'
  },
  featured: { type: Boolean, default: false },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    country: { type: String, required: true },
    postalCode: { type: String },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    },
    neighborhood: { type: String }
  },
  price: {
    base: { type: Number, required: true },
    currency: { type: String, required: true, default: 'THB' },
    cleaningFee: { type: Number },
    serviceFee: { type: Number },
    deposit: { type: Number },
    discounts: {
      weekly: { type: Number },
      monthly: { type: Number },
      earlyBird: { type: Number },
      lastMinute: { type: Number }
    }
  },
  host: {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    photo: { type: String },
    contactPhone: { type: String },
    contactEmail: { type: String },
    languages: [{ type: String }],
    responseRate: { type: Number },
    verifiedIdentity: { type: Boolean, default: false }
  },
  rooms: [{
    name: { type: String, required: true },
    type: { 
      type: String, 
      enum: ['bedroom', 'bathroom', 'kitchen', 'living', 'other'],
      required: true 
    },
    beds: [{
      type: { 
        type: String, 
        enum: ['single', 'double', 'queen', 'king', 'sofa'] 
      },
      count: { type: Number }
    }],
    amenities: [{ type: String }],
    photos: [{ type: String }]
  }],
  amenities: [{
    name: { type: String, required: true },
    icon: { type: String },
    category: { type: String }
  }],
  rules: {
    checkInTime: { type: String, required: true },
    checkOutTime: { type: String, required: true },
    cancellationPolicy: { 
      type: String, 
      enum: ['flexible', 'moderate', 'strict'],
      required: true 
    },
    instantBooking: { type: Boolean, default: false },
    allowPets: { type: Boolean },
    allowSmoking: { type: Boolean },
    allowParties: { type: Boolean },
    additionalRules: [{ type: String }]
  },
  photos: [{ type: String, required: true }],
  floorPlan: { type: String },
  video: { type: String },
  virtualTour: { type: String },
  maxGuests: { type: Number, required: true },
  bedroomCount: { type: Number, required: true },
  bedCount: { type: Number, required: true },
  bathroomCount: { type: Number, required: true },
  squareMeters: { type: Number },
  availability: [{
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isBooked: { type: Boolean, default: false },
    price: { type: Number },
    minimumStay: { type: Number }
  }],
  reviews: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    userName: { type: String },
    userAvatar: { type: String },
    rating: { type: Number, required: true },
    comment: { type: String },
    date: { type: Date, default: Date.now },
    categories: {
      cleanliness: { type: Number },
      location: { type: Number },
      value: { type: Number },
      accuracy: { type: Number },
      communication: { type: Number }
    }
  }],
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 }
}, { timestamps: true });

// Экспортируем модель
export const RealEstate = models.RealEstate || model('RealEstate', RealEstateSchema); 