import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import Booking from '@/app/models/Booking';
import { getAuthTokenFromRequest, verifyJwtToken } from '@/app/lib/jwt';
import { getUserById } from '@/app/models/User';
import { generateBookingNumber } from '@/app/lib/utils';
import { sendEmail, getBookingEmailTemplate } from '@/app/lib/email';

export async function POST(req: NextRequest) {
  try {
    const {
      itemType,
      itemId,
      startDate,
      endDate,
      guestCount,
      selectedOptions,
      contactInfo,
      notes
    } = await req.json();

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

    // Сначала проверяем доступность
    const overlappingBookings = await Booking.find({
      itemType,
      itemId,
      status: { $in: ['pending', 'confirmed'] },
      $or: [
        { startDate: { $lte: new Date(startDate) }, endDate: { $gte: new Date(startDate) } },
        { startDate: { $lte: new Date(endDate) }, endDate: { $gte: new Date(endDate) } },
        { startDate: { $gte: new Date(startDate) }, endDate: { $lte: new Date(endDate) } }
      ]
    });

    if (overlappingBookings.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Объект недоступен на выбранные даты' 
        },
        { status: 400 }
      );
    }

    // Получение и проверка токена для авторизованных пользователей
    const token = getAuthTokenFromRequest(req);
    let userId = null;
    
    if (token) {
      const payload = verifyJwtToken(token);
      if (payload?.userId) {
        userId = payload.userId;
      }
    }

    // Расчет цены
    // Делаем запрос к API для расчета цены
    const priceResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/calculate-price`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        itemType,
        itemId,
        startDate,
        endDate,
        options: selectedOptions,
        guestCount
      }),
    });

    const priceData = await priceResponse.json();
    
    if (!priceData.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Ошибка при расчете стоимости' 
        },
        { status: 400 }
      );
    }

    // Создаем новое бронирование
    const bookingNumber = generateBookingNumber();
    
    const newBooking = new Booking({
      itemType,
      itemId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      guestCount: guestCount || 1,
      options: priceData.calculatedOptions.map((opt: any) => ({
        name: opt.name,
        price: opt.price
      })),
      notes,
      bookingNumber,
      price: {
        basePrice: priceData.price.basePrice,
        optionsPrice: priceData.price.optionsPrice,
        taxAmount: priceData.price.taxAmount,
        totalPrice: priceData.price.totalPrice,
        currency: priceData.price.currency || 'THB'
      },
      status: 'draft',
      paymentStatus: 'pending'
    });

    // Если пользователь авторизован, связываем бронирование с аккаунтом
    if (userId) {
      const user = await getUserById(userId);
      if (user) {
        newBooking.user = userId;
      }
    } else {
      // Для неавторизованных пользователей сохраняем контактную информацию
      if (!contactInfo || !contactInfo.email || !contactInfo.name) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'Необходимо указать контактные данные для неавторизованных пользователей' 
          },
          { status: 400 }
        );
      }
      newBooking.contactInfo = contactInfo;
    }

    // Сохраняем бронирование
    await newBooking.save();

    // Отправляем email-уведомление о создании бронирования
    try {
      const emailTo = userId 
        ? (await getUserById(userId))?.email 
        : contactInfo.email;
        
      if (emailTo) {
        await sendEmail({
          to: emailTo,
          subject: `Бронирование #${bookingNumber} создано`,
          html: getBookingEmailTemplate(newBooking, 'created'),
        });
      }
    } catch (emailError) {
      console.error('Ошибка отправки email:', emailError);
      // Не прерываем создание бронирования, если email не отправлен
    }

    return NextResponse.json({
      success: true,
      booking: newBooking
    }, { status: 201 });
  } catch (error) {
    console.error('[CREATE_BOOKING_ERROR]', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Ошибка сервера при создании бронирования' 
      },
      { status: 500 }
    );
  }
} 