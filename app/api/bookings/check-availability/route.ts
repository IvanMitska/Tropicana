import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import Booking from '@/app/models/Booking';

export async function POST(req: NextRequest) {
  try {
    const { itemType, itemId, startDate, endDate } = await req.json();

    if (!itemType || !itemId || !startDate || !endDate) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Не указаны все необходимые параметры' 
        },
        { status: 400 }
      );
    }

    // Подключение к БД
    await connectDB();

    // Проверка существующих бронирований на эти даты
    const overlappingBookings = await Booking.find({
      itemType,
      itemId,
      status: { $in: ['pending', 'confirmed'] },
      $or: [
        // Начало нового бронирования попадает в существующее
        { startDate: { $lte: new Date(startDate) }, endDate: { $gte: new Date(startDate) } },
        // Конец нового бронирования попадает в существующее
        { startDate: { $lte: new Date(endDate) }, endDate: { $gte: new Date(endDate) } },
        // Новое бронирование полностью покрывает существующее
        { startDate: { $gte: new Date(startDate) }, endDate: { $lte: new Date(endDate) } }
      ]
    });

    const isAvailable = overlappingBookings.length === 0;

    return NextResponse.json({
      success: true,
      isAvailable,
      overlappingDates: isAvailable ? [] : overlappingBookings.map(booking => ({
        startDate: booking.startDate,
        endDate: booking.endDate
      }))
    });
  } catch (error) {
    console.error('[AVAILABILITY_CHECK_ERROR]', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Ошибка сервера при проверке доступности' 
      },
      { status: 500 }
    );
  }
} 