import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import RealEstate from '@/app/models/RealEstate';
import Transport from '@/app/models/Transport';
import Tour from '@/app/models/Tour';

export async function POST(req: NextRequest) {
  try {
    const { itemType, itemId, startDate, endDate, options, guestCount } = await req.json();

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

    // Загрузка модели в зависимости от типа бронируемого объекта
    let Model;
    let item;
    
    switch (itemType) {
      case 'real-estate':
        Model = RealEstate;
        break;
      case 'transport':
        Model = Transport;
        break;
      case 'tour':
        Model = Tour;
        break;
      default:
        return NextResponse.json(
          { 
            success: false, 
            message: 'Неверный тип объекта' 
          },
          { status: 400 }
        );
    }

    // Получение объекта из БД
    item = await Model.findById(itemId);
    
    if (!item) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Объект не найден' 
        },
        { status: 404 }
      );
    }

    // Расчет базовой стоимости
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));

    let basePrice = item.price;
    if (itemType === 'real-estate' || itemType === 'transport') {
      basePrice *= days;
    }

    // Учет количества гостей (для туров или аренды недвижимости)
    if ((itemType === 'tour' || itemType === 'real-estate') && guestCount > 1) {
      const extraGuestPrice = item.extraGuestPrice || 0;
      basePrice += (guestCount - 1) * extraGuestPrice;
    }

    // Расчет стоимости дополнительных опций
    let optionsPrice = 0;
    const calculatedOptions = [];

    if (options && options.length > 0 && item.options) {
      options.forEach((optionId: string) => {
        const selectedOption = item.options.find((opt: any) => 
          opt._id.toString() === optionId || opt.id === optionId
        );
        
        if (selectedOption) {
          // Для опций с ценой за день
          let optionPrice = selectedOption.price;
          if (selectedOption.priceType === 'per_day') {
            optionPrice *= days;
          }
          
          optionsPrice += optionPrice;
          calculatedOptions.push({
            name: selectedOption.name,
            price: optionPrice
          });
        }
      });
    }

    // Расчет налогов и итоговой стоимости
    const taxRate = 0.2; // 20% налог (можно настроить в зависимости от типа)
    const taxAmount = (basePrice + optionsPrice) * taxRate;
    
    const totalPrice = basePrice + optionsPrice + taxAmount;

    return NextResponse.json({
      success: true,
      price: {
        basePrice,
        optionsPrice,
        taxAmount,
        totalPrice,
        currency: 'RUB',
        daysCount: days
      },
      calculatedOptions
    });
  } catch (error) {
    console.error('[PRICE_CALCULATION_ERROR]', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Ошибка сервера при расчете стоимости' 
      },
      { status: 500 }
    );
  }
} 