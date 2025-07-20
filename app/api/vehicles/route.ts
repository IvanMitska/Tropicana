import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Vehicle } from '@/app/models/Vehicle';

// Указываем, что этот маршрут должен рендериться динамически
export const dynamic = 'force-dynamic';

// Функция применения фильтров
function applyFilters(
  vehicles: Vehicle[],
  {
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
  }: {
    type?: string;
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
): Vehicle[] {
  return vehicles.filter(vehicle => {
    // Фильтр по типу
    if (type && vehicle.type !== type) {
      return false;
    }
    
    // Фильтр по марке
    if (make && vehicle.make !== make) {
      return false;
    }
    
    // Фильтр по модели
    if (model && !vehicle.model.toLowerCase().includes(model.toLowerCase())) {
      return false;
    }
    
    // Фильтр по году выпуска
    if (minYear && vehicle.year < minYear) {
      return false;
    }
    if (maxYear && vehicle.year > maxYear) {
      return false;
    }
    
    // Фильтр по цене
    if (minPrice && vehicle.pricing.daily < minPrice) {
      return false;
    }
    if (maxPrice && vehicle.pricing.daily > maxPrice) {
      return false;
    }
    
    // Фильтр по вместимости
    if (minCapacity && vehicle.specifications.capacity < minCapacity) {
      return false;
    }
    if (maxCapacity && vehicle.specifications.capacity > maxCapacity) {
      return false;
    }
    
    // Фильтр по трансмиссии
    if (transmission && vehicle.specifications.transmission !== transmission) {
      return false;
    }
    
    // Фильтр по типу топлива
    if (fuelType && vehicle.specifications.fuelType !== fuelType) {
      return false;
    }
    
    // Фильтр по функциям
    if (features && features.length > 0) {
      const hasAllFeatures = features.every(feature =>
        vehicle.features.includes(feature)
      );
      if (!hasAllFeatures) {
        return false;
      }
    }
    
    // Фильтр по местоположению
    if (location && !vehicle.location.city.toLowerCase().includes(location.toLowerCase()) &&
        !vehicle.location.address.toLowerCase().includes(location.toLowerCase())) {
      return false;
    }
    
    // Фильтр по доступности
    if (availableFrom && availableTo) {
      const isAvailable = vehicle.availability.some(
        item => 
          item.date >= availableFrom && 
          item.date <= availableTo && 
          item.available
      );
      if (!isAvailable) {
        return false;
      }
    }
    
    return true;
  });
}

// Функция сортировки
function applySortOption(vehicles: Vehicle[], sortOption: string): Vehicle[] {
  const sortedVehicles = [...vehicles];
  
  switch (sortOption) {
    case 'price_asc':
      return sortedVehicles.sort((a, b) => a.pricing.daily - b.pricing.daily);
    case 'price_desc':
      return sortedVehicles.sort((a, b) => b.pricing.daily - a.pricing.daily);
    case 'rating_desc':
      return sortedVehicles.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return sortedVehicles.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case 'popularity':
      return sortedVehicles.sort((a, b) => b.bookingCount - a.bookingCount);
    default:
      return sortedVehicles;
  }
}

// Функция для пагинации
function paginateResults(vehicles: Vehicle[], page: number, limit: number) {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  return vehicles.slice(startIndex, endIndex);
}

export async function GET(request: NextRequest) {
  try {
    // Подключение к базе данных
    await connectToDatabase();
    
    // Получение параметров запроса
    const searchParams = request.nextUrl.searchParams;
    
    // Параметры фильтрации
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
    
    // Параметры сортировки и пагинации
    const sortOption = searchParams.get('sort') || 'newest';
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 12;
    
    const skip = (page - 1) * limit;

    // Построение MongoDB фильтра
    const filter: any = { status: 'available' };
    
    if (type) filter.type = type;
    if (make) filter.make = make;
    if (model) filter.model = { $regex: model, $options: 'i' };
    if (minYear) filter.year = { ...filter.year, $gte: minYear };
    if (maxYear) filter.year = { ...filter.year, $lte: maxYear };
    if (minPrice) filter['pricing.daily'] = { ...filter['pricing.daily'], $gte: minPrice };
    if (maxPrice) filter['pricing.daily'] = { ...filter['pricing.daily'], $lte: maxPrice };
    if (minCapacity) filter['specifications.capacity'] = { ...filter['specifications.capacity'], $gte: minCapacity };
    if (maxCapacity) filter['specifications.capacity'] = { ...filter['specifications.capacity'], $lte: maxCapacity };
    if (transmission) filter['specifications.transmission'] = transmission;
    if (fuelType) filter['specifications.fuelType'] = fuelType;
    if (features) filter.features = { $all: features };
    if (location) filter['location.city'] = { $regex: location, $options: 'i' };

    // Построение сортировки
    let sort: any = { createdAt: -1 }; // по умолчанию
    switch (sortOption) {
      case 'price_asc':
        sort = { 'pricing.daily': 1 };
        break;
      case 'price_desc':
        sort = { 'pricing.daily': -1 };
        break;
      case 'newest':
        sort = { createdAt: -1 };
        break;
    }

    // Получение данных из базы
    const [vehicles, total] = await Promise.all([
      Vehicle.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Vehicle.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(total / limit);
    
    // Формирование ответа
    const response = {
      vehicles,
      total,
      page,
      limit,
      totalPages,
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in vehicles API:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
} 