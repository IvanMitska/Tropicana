import { useEffect, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Vehicle, VehicleType } from '@/app/models/Vehicle';

// Интерфейс для фильтров
export interface VehicleFilters {
  type?: VehicleType | string;
  make?: string;
  model?: string;
  minYear?: number;
  maxYear?: number;
  minPrice?: number;
  maxPrice?: number;
  minCapacity?: number;
  maxCapacity?: number;
  transmission?: string;
  fuelType?: string;
  features?: string[];
  location?: string;
  availableFrom?: string;
  availableTo?: string;
}

// Интерфейс для опций сортировки
export type SortOption = 'price_asc' | 'price_desc' | 'rating_desc' | 'newest' | 'popularity';

// Интерфейс для параметров пагинации
export interface PaginationParams {
  page: number;
  limit: number;
}

// Опции отображения
export type ViewMode = 'grid' | 'list';

// Интерфейс для результатов запроса
interface VehiclesResponse {
  vehicles: Vehicle[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Основной хук
export function useVehicles() {
  // Router для управления URL
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Получаем параметры из URL при загрузке страницы
  const [filters, setFilters] = useState<VehicleFilters>(() => {
    const type = searchParams.get('type') || undefined;
    const make = searchParams.get('make') || undefined;
    const model = searchParams.get('model') || undefined;
    const minYear = searchParams.get('minYear') ? Number(searchParams.get('minYear')) : undefined;
    const maxYear = searchParams.get('maxYear') ? Number(searchParams.get('maxYear')) : undefined;
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
    const minCapacity = searchParams.get('minCapacity') ? Number(searchParams.get('minCapacity')) : undefined;
    const maxCapacity = searchParams.get('maxCapacity') ? Number(searchParams.get('maxCapacity')) : undefined;
    const transmission = searchParams.get('transmission') || undefined;
    const fuelType = searchParams.get('fuelType') || undefined;
    const features = searchParams.get('features') ? searchParams.get('features')?.split(',') : undefined;
    const location = searchParams.get('location') || undefined;
    const availableFrom = searchParams.get('availableFrom') || undefined;
    const availableTo = searchParams.get('availableTo') || undefined;

    return {
      type,
      make,
      model,
      minYear,
      maxYear,
      minPrice,
      maxPrice,
      minCapacity,
      maxCapacity,
      transmission,
      fuelType,
      features,
      location,
      availableFrom,
      availableTo,
    };
  });

  const [sortOption, setSortOption] = useState<SortOption>(() => 
    (searchParams.get('sort') as SortOption) || 'popularity'
  );
  
  const [pagination, setPagination] = useState<PaginationParams>(() => ({
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 12,
  }));

  const [viewMode, setViewMode] = useState<ViewMode>(() => 
    (searchParams.get('view') as ViewMode) || 'grid'
  );

  // Обновляем URL при изменении фильтров, сортировки или пагинации
  useEffect(() => {
    const params = new URLSearchParams();

    // Добавляем фильтры в URL
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          params.set(key, value.join(','));
        } else {
          params.set(key, String(value));
        }
      }
    });

    // Добавляем сортировку и пагинацию в URL
    params.set('sort', sortOption);
    params.set('page', String(pagination.page));
    params.set('limit', String(pagination.limit));
    params.set('view', viewMode);

    // Обновляем URL
    router.push(`${pathname}?${params.toString()}`);
  }, [filters, sortOption, pagination, viewMode, router, pathname]);

  // Функция для получения списка транспортных средств
  const fetchVehicles = async (): Promise<VehiclesResponse> => {
    const params = new URLSearchParams();

    // Добавляем фильтры в запрос
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          params.set(key, value.join(','));
        } else {
          params.set(key, String(value));
        }
      }
    });

    // Добавляем сортировку и пагинацию в запрос
    params.set('sort', sortOption);
    params.set('page', String(pagination.page));
    params.set('limit', String(pagination.limit));

    // Отправляем запрос на сервер
    const response = await fetch(`/api/vehicles?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error('Не удалось получить список транспортных средств');
    }

    return await response.json();
  };

  // Запрос данных с помощью React Query
  const { data, isLoading, isError, error, refetch } = useQuery<VehiclesResponse, Error>({
    queryKey: ['vehicles', filters, sortOption, pagination],
    queryFn: fetchVehicles,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // 5 минут
  });

  // Получение популярных транспортных средств
  const fetchFeaturedVehicles = async (): Promise<Vehicle[]> => {
    const response = await fetch('/api/vehicles/featured');
    
    if (!response.ok) {
      throw new Error('Не удалось получить популярные транспортные средства');
    }

    return await response.json();
  };

  const { 
    data: featuredVehicles,
    isLoading: isFeaturedLoading,
    isError: isFeaturedError 
  } = useQuery<Vehicle[], Error>({
    queryKey: ['featuredVehicles'],
    queryFn: fetchFeaturedVehicles,
    staleTime: 1000 * 60 * 10, // 10 минут
  });

  // Получение деталей транспортного средства
  const fetchVehicleDetails = async (id: string): Promise<Vehicle> => {
    const response = await fetch(`/api/vehicles/${id}`);
    
    if (!response.ok) {
      throw new Error('Не удалось получить информацию о транспортном средстве');
    }

    return await response.json();
  };

  // Проверка доступности транспортного средства
  const checkVehicleAvailability = async (
    id: string,
    startDate: string,
    endDate: string
  ): Promise<{ available: boolean; bookedTimeSlots?: { start: string; end: string }[] }> => {
    const params = new URLSearchParams({
      startDate,
      endDate,
    });

    const response = await fetch(`/api/vehicles/availability/${id}?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error('Не удалось проверить доступность транспортного средства');
    }

    return await response.json();
  };

  // Функции для обновления состояния
  const updateFilters = (newFilters: Partial<VehicleFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    // Сбрасываем пагинацию при изменении фильтров
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({});
    // Сбрасываем пагинацию при очистке фильтров
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const updateSortOption = (option: SortOption) => {
    setSortOption(option);
  };

  const updatePagination = (newPagination: Partial<PaginationParams>) => {
    setPagination(prev => ({ ...prev, ...newPagination }));
  };

  const updateViewMode = (mode: ViewMode) => {
    setViewMode(mode);
  };

  return {
    // Состояние
    filters,
    sortOption,
    pagination,
    viewMode,
    
    // Данные
    vehicles: data?.vehicles || [],
    totalVehicles: data?.total || 0,
    totalPages: data?.totalPages || 0,
    featuredVehicles: featuredVehicles || [],
    
    // Состояние загрузки
    isLoading,
    isError,
    error,
    isFeaturedLoading,
    isFeaturedError,
    
    // Методы обновления состояния
    updateFilters,
    clearFilters,
    updateSortOption,
    updatePagination,
    updateViewMode,
    
    // Методы получения данных
    refetchVehicles: refetch,
    fetchVehicleDetails,
    checkVehicleAvailability,
  };
} 