import { NextRequest, NextResponse } from 'next/server';
import { Vehicle, VehicleAvailability } from '@/app/models/Vehicle';
import { eachDayOfInterval, parseISO } from 'date-fns';

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
    const searchParams = request.nextUrl.searchParams;
    
    // Получаем параметры запроса
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    
    // Проверяем наличие обязательных параметров
    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: 'Требуются параметры startDate и endDate' },
        { status: 400 }
      );
    }
    
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
    
    // Преобразуем строки дат в объекты Date
    const startDateObj = parseISO(startDate);
    const endDateObj = parseISO(endDate);
    
    // Получаем все дни в выбранном диапазоне
    const daysInRange = eachDayOfInterval({
      start: startDateObj,
      end: endDateObj,
    });
    
    // Преобразуем даты в строки формата ISO (только дата)
    const datesInRange = daysInRange.map(day => day.toISOString().split('T')[0]);
    
    // Получаем данные о доступности для выбранных дат
    const availabilityMap = new Map<string, boolean>();
    
    // Заполняем карту доступности
    vehicle.availability.forEach(item => {
      availabilityMap.set(item.date, item.available);
    });
    
    // Проверяем доступность для каждой даты в диапазоне
    const availability: VehicleAvailability[] = datesInRange.map(date => ({
      date,
      available: availabilityMap.get(date) !== false, // Если нет данных, считаем доступным
    }));
    
    // Проверяем, доступны ли все даты в выбранном диапазоне
    const isAvailable = availability.every(item => item.available);
    
    // Получаем забронированные временные слоты
    const bookedTimeSlots = vehicle.availability
      .filter(item => datesInRange.includes(item.date) && !item.available && item.bookedTimeSlots)
      .flatMap(item => item.bookedTimeSlots || []);
    
    // Формируем ответ
    const response = {
      available: isAvailable,
      bookedTimeSlots: bookedTimeSlots.length > 0 ? bookedTimeSlots : undefined,
      availability,
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in vehicle availability API:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
} 