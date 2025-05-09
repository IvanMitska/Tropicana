import { Document } from 'mongoose';

// Интерфейс для модели удобств
export interface Feature {
  id: string;
  name: string;
  category: string;
  icon: string;
}

// Интерфейс для модели близлежащих мест
export interface NearbyPlace {
  type: 'restaurant' | 'shop' | 'attraction' | 'transport' | string;
  name: string;
  distance: number; // в километрах
}

// Интерфейс для модели изображений
export interface PropertyImage {
  id: string;
  url: string;
  alt: string;
}

// Интерфейс для модели отзывов
export interface ReviewCategories {
  cleanliness: number;
  communication: number;
  location: number;
  value: number;
  [key: string]: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  categories: ReviewCategories;
}

// Интерфейс для модели хоста (владельца)
export interface Host {
  id: string;
  name: string;
  avatar?: string;
  responseRate: number;
  responseTime: string;
  isSuperhost: boolean;
  description: string;
}

// Интерфейс для модели доступности
export interface Availability {
  date: string;
  available: boolean;
}

// Интерфейс для модели местоположения
export interface PropertyLocation {
  lat: number;
  lng: number;
  nearby: NearbyPlace[];
}

// Основной интерфейс для модели недвижимости
export interface Property {
  id: string;
  title: string;
  category: string;
  address: string;
  price: number;
  priceUnit: 'night' | 'month' | 'week';
  description: string;
  area: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  features: Feature[];
  rules: string[];
  cancellationPolicy: string;
  availability: Availability[];
  location: PropertyLocation;
  images: PropertyImage[];
  rating: number;
  reviews: Review[];
  host: Host;
  similar?: string[];
}

// Интерфейс для модели Mongoose (если используете MongoDB)
export interface PropertyDocument extends Property, Document {} 