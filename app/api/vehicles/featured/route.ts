import { NextResponse } from 'next/server';
import { Vehicle } from '@/app/models/Vehicle';

// Используем функцию генерации тестовых данных из основного эндпоинта
let MOCK_VEHICLES: Vehicle[] = [];

// Заглушка для имитации получения данных из БД
async function getMockVehicles(): Promise<Vehicle[]> {
  if (MOCK_VEHICLES.length === 0) {
    // Если данных нет, запрашиваем их из основного API
    try {
      const response = await fetch('http://localhost:3000/api/vehicles?limit=50');
      const data = await response.json();
      MOCK_VEHICLES = data.vehicles || [];
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      // В случае ошибки возвращаем пустой массив
      return [];
    }
  }
  
  return MOCK_VEHICLES;
}

export async function GET() {
  try {
    const allVehicles = await getMockVehicles();
    
    // Фильтрация только популярных/рекомендуемых транспортных средств
    const featuredVehicles = allVehicles
      .filter(vehicle => vehicle.featured)
      // Ограничиваем количество результатов до 6
      .slice(0, 6);
    
    // Если популярных транспортных средств не нашлось, берем транспортные средства с наивысшим рейтингом
    if (featuredVehicles.length === 0) {
      // Сортировка по рейтингу (по убыванию)
      const highestRated = [...allVehicles]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 6);
      
      return NextResponse.json(highestRated);
    }
    
    return NextResponse.json(featuredVehicles);
  } catch (error) {
    console.error('Error in featured vehicles API:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
} 