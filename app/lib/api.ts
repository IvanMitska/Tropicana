import axios from 'axios';

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

export const excursionAPI = {
  getAll: async (params: any = {}) => {
    const response = await api.get<PaginatedResponse<any>>('/excursions', { params });
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get<ApiResponse<any>>(`/excursions/${id}`);
    return response.data;
  },
  
  create: async (excursionData: any) => {
    const response = await api.post<ApiResponse<any>>('/excursions', excursionData);
    return response.data;
  },
  
  update: async (id: string, excursionData: any) => {
    const response = await api.put<ApiResponse<any>>(`/excursions/${id}`, excursionData);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete<ApiResponse<{}>>(`/excursions/${id}`);
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