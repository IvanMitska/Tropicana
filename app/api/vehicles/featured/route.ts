import { NextResponse } from 'next/server';
import { Vehicle } from '@/app/models/Vehicle';
import { generateMockVehicles } from '../mock-data';

// Указываем, что этот маршрут должен рендериться динамически
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const allVehicles = generateMockVehicles();
    
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