// Определение структуры данных транспортного средства
export interface Vehicle {
  id: string;
  name: string;
  type: string;
  price: number | string;
  image: string;
  images?: string[];
  description?: string;
  rating: number;
  reviewCount: number;
  location?: string;
  seats: number;
  automatic: boolean;
  power: number | string;
  availability?: string;
  features?: string[];
} 