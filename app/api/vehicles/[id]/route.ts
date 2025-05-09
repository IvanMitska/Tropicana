import { NextRequest, NextResponse } from 'next/server';
import { Vehicle } from '@/app/models/Vehicle';


// Используем тот же механизм получения транспортных средств из предыдущих файлов
let MOCK_VEHICLES: Vehicle[] = [];

async function getMockVehicles(): Promise<Vehicle[]> {
  if (MOCK_VEHICLES.length === 0) {
    try {
      const response = await fetch('http://localhost:3000/api/vehicles?limit=50');
      const data = await response.json();
      MOCK_VEHICLES = data.vehicles || [];
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      return [];
    }
  }
  
  
  return MOCK_VEHICLES;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Получаем все транспортные средства
    const allVehicles = await getMockVehicles();
    
    // Находим транспортное средство по ID
    const vehicle = allVehicles.find(v => v.id === id);
    
    // Если транспорт не найден, возвращаем ошибку 404
    if (!vehicle) {
      return NextResponse.json(
        { error: 'Транспортное средство не найдено' },
        { status: 404 }
      );
    }
    
    // Увеличиваем счетчик просмотров
    vehicle.viewCount += 1;
    
    // Находим похожие транспортные средства
    const similarVehicles = allVehicles
      .filter(v => 
        v.id !== id && 
        (v.type === vehicle.type || v.make === vehicle.make) &&
        Math.abs(v.pricing.daily - vehicle.pricing.daily) < 3000
      )
      .slice(0, 4);
    
    // Добавляем идентификаторы похожих транспортных средств
    vehicle.similar = similarVehicles.map(v => v.id);
    
    return NextResponse.json(vehicle);
  } catch (error) {
    console.error('Error in vehicle detail API:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
} 