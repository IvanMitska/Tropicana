import axios from 'axios';
import { Tour, TourFilters, TourReview } from "../models/Tour";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Создаём экземпляр axios с базовым URL
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Для работы с куками
  headers: {
    'Content-Type': 'application/json',
  },
});

// Интерфейсы для типизации ответов
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
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
}

// Методы для работы с API
export const authAPI = {
  register: async (userData: any) => {
    const response = await api.post<ApiResponse<{ token: string }>>('/auth/register', userData);
    return response.data;
  },
  
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post<ApiResponse<{ token: string }>>('/auth/login', credentials);
    return response.data;
  },
  
  logout: async () => {
    const response = await api.get<ApiResponse<{}>>('/auth/logout');
    return response.data;
  },
  
  getMe: async () => {
    const response = await api.get<ApiResponse<any>>('/auth/me');
    return response.data;
  },
};

export const realEstateAPI = {
  getAll: async (params: any = {}) => {
    const response = await api.get<PaginatedResponse<any>>('/real-estate', { params });
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get<ApiResponse<any>>(`/real-estate/${id}`);
    return response.data;
  },
  
  create: async (propertyData: any) => {
    const response = await api.post<ApiResponse<any>>('/real-estate', propertyData);
    return response.data;
  },
  
  update: async (id: string, propertyData: any) => {
    const response = await api.put<ApiResponse<any>>(`/real-estate/${id}`, propertyData);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete<ApiResponse<{}>>(`/real-estate/${id}`);
    return response.data;
  },
};

export const transportAPI = {
  getAll: async (params: any = {}) => {
    const response = await api.get<PaginatedResponse<any>>('/transport', { params });
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get<ApiResponse<any>>(`/transport/${id}`);
    return response.data;
  },
  
  create: async (transportData: any) => {
    const response = await api.post<ApiResponse<any>>('/transport', transportData);
    return response.data;
  },
  
  update: async (id: string, transportData: any) => {
    const response = await api.put<ApiResponse<any>>(`/transport/${id}`, transportData);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete<ApiResponse<{}>>(`/transport/${id}`);
    return response.data;
  },
};

export const tourAPI = {
  getAll: async (filters: Partial<TourFilters> = {}) => {
    const response = await api.get<PaginatedResponse<Tour>>('/tours', { params: filters });
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get<ApiResponse<Tour>>(`/tours/${id}`);
    return response.data;
  },
  
  getReviewsById: async (id: string) => {
    // Здесь получаем отзывы для конкретной экскурсии
    // В реальном API должен быть соответствующий эндпоинт
    // Для демонстрации возвращаем список моковых отзывов
    
    // Пример моковых данных для демонстрации
    const mockReviews: TourReview[] = [
      {
        id: '1',
        userId: 'user1',
        userName: 'Александр К.',
        userAvatar: '/images/users/alex.jpg',
        rating: 5,
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 дней назад
        comment: 'Отличная экскурсия! Гид очень интересно рассказывал об истории города и показал места, о которых я даже не знал. Рекомендую всем, кто хочет узнать больше о городе.',
        categories: {
          organization: 5,
          interestingness: 5,
          knowledge: 5,
          friendliness: 5
        }
      },
      {
        id: '2',
        userId: 'user2',
        userName: 'Елена М.',
        userAvatar: '/images/users/elena.jpg',
        rating: 4,
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 дней назад
        comment: 'Хорошая экскурсия, но немного утомительно из-за длительной ходьбы. Гид был очень знающим и отвечал на все вопросы. Хотелось бы больше времени в некоторых местах.',
        categories: {
          organization: 3,
          interestingness: 4,
          knowledge: 5,
          friendliness: 4
        }
      },
      {
        id: '3',
        userId: 'user3',
        userName: 'Иван С.',
        rating: 5,
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 дней назад
        comment: 'Превосходная экскурсия! Мы были с детьми, и гид смог заинтересовать даже их. Очень понравились истории о местных легендах и тайнах. Обязательно возьмем еще экскурсии у этого гида.',
        categories: {
          organization: 5,
          interestingness: 5,
          knowledge: 4,
          friendliness: 5
        }
      },
      {
        id: '4',
        userId: 'user4',
        userName: 'Мария Д.',
        userAvatar: '/images/users/maria.jpg',
        rating: 3,
        date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 дней назад
        comment: 'Экскурсия была средней. Гид знал материал, но подача была немного скучной. Плюс погода подвела. Но в целом, информация была интересной.',
        categories: {
          organization: 4,
          interestingness: 3,
          knowledge: 4,
          friendliness: 3
        }
      },
      {
        id: '5',
        userId: 'user5',
        userName: 'Дмитрий В.',
        rating: 5,
        date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 дней назад
        comment: 'Очень рекомендую! Экскурсия была познавательной, а гид рассказывал с таким энтузиазмом, что время пролетело незаметно. Много интересных фактов, которые не найдешь в путеводителях.',
        categories: {
          organization: 5,
          interestingness: 5,
          knowledge: 5,
          friendliness: 4
        }
      }
    ];
    
    // Имитируем API-ответ
    return { 
      success: true, 
      data: mockReviews 
    };
    
    // Реальный API вызов будет выглядеть примерно так:
    // const response = await api.get<ApiResponse<TourReview[]>>(`/tours/${id}/reviews`);
    // return response.data;
  },
  
  create: async (tourData: Partial<Tour>) => {
    const response = await api.post<ApiResponse<Tour>>('/tours', tourData);
    return response.data;
  },
  
  update: async (id: string, tourData: Partial<Tour>) => {
    const response = await api.put<ApiResponse<Tour>>(`/tours/${id}`, tourData);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete<ApiResponse<{}>>(`/tours/${id}`);
    return response.data;
  },
  
  getCategories: async () => {
    const response = await api.get<ApiResponse<{ _id: string, count: number }[]>>('/tours/categories');
    return response.data;
  },
  
  getFeatured: async (limit: number = 6) => {
    const response = await api.get<ApiResponse<Tour[]>>('/tours/featured', { params: { limit } });
    return response.data;
  },
  
  checkAvailability: async (id: string, startDate: string, endDate: string) => {
    const response = await api.get<ApiResponse<any[]>>(`/tours/availability/${id}`, {
      params: { startDate, endDate }
    });
    return response.data;
  }
};

export const excursionAPI = {
  getAll: async (params: any = {}) => {
    // Перенаправляем на tours API
    const response = await api.get<PaginatedResponse<any>>('/tours', { params });
    return response.data;
  },
  
  getById: async (id: string) => {
    // Перенаправляем на tours API
    const response = await api.get<ApiResponse<any>>(`/tours/${id}`);
    return response.data;
  },
  
  create: async (excursionData: any) => {
    const response = await api.post<ApiResponse<any>>('/tours', excursionData);
    return response.data;
  },
  
  update: async (id: string, excursionData: any) => {
    const response = await api.put<ApiResponse<any>>(`/tours/${id}`, excursionData);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete<ApiResponse<{}>>(`/tours/${id}`);
    return response.data;
  },
};

// Интерцептор для добавления токена к запросам
api.interceptors.request.use(
  (config) => {
    // Проверка наличия токена в localStorage (для клиентской стороны)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api; 