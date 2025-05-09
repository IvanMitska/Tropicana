import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import Booking from '@/app/models/Booking';
import Payment from '@/app/models/Payment';
import RealEstate from '@/app/models/RealEstate';
import Transport from '@/app/models/Transport';
import Tour from '@/app/models/Tour';
import { getAuthTokenFromRequest, verifyJwtToken } from '@/app/lib/jwt';
import Stripe from 'stripe';

// Инициализация Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { paymentMethod } = await req.json();

    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'ID бронирования не указан' 
        },
        { status: 400 }
      );
    }

    // Подключение к БД
    await connectDB();

    // Получаем бронирование
    const booking = await Booking.findById(id);
    if (!booking) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Бронирование не найдено' 
        },
        { status: 404 }
      );
    }

    // Проверяем, что бронирование принадлежит текущему пользователю
    const token = getAuthTokenFromRequest(req);
    let userId = null;
    
    if (token) {
      const payload = verifyJwtToken(token);
      if (payload?.userId) {
        userId = payload.userId;
      }
    }

    // Проверяем доступ
    if (
      userId && booking.user && booking.user.toString() !== userId ||
      (!userId && !booking.contactInfo)
    ) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Доступ запрещен' 
        },
        { status: 403 }
      );
    }

    // Проверяем, что бронирование не оплачено
    if (booking.paymentStatus === 'completed') {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Бронирование уже оплачено' 
        },
        { status: 400 }
      );
    }

    // Получаем информацию о забронированном объекте
    let itemModel;
    let item;
    let itemTitle;
    
    switch (booking.itemType) {
      case 'real-estate':
        itemModel = RealEstate;
        break;
      case 'transport':
        itemModel = Transport;
        break;
      case 'tour':
        itemModel = Tour;
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

    item = await itemModel.findById(booking.itemId);
    if (!item) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Объект бронирования не найден' 
        },
        { status: 404 }
      );
    }

    itemTitle = item.title || item.name || 'Бронирование';

    // Создание платежа в БД
    const payment = new Payment({
      booking: booking._id,
      user: booking.user || null,
      method: paymentMethod,
      amount: booking.price.totalPrice,
      currency: booking.price.currency,
      status: 'pending',
      description: `Оплата бронирования #${booking.bookingNumber} (${itemTitle})`,
      paymentProviderData: {
        provider: 'stripe'
      }
    });

    await payment.save();

    // Добавляем платеж в список платежей бронирования
    booking.payments.push(payment._id);
    await booking.save();

    // Создаем сессию Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: booking.price.currency.toLowerCase(),
            product_data: {
              name: `Бронирование ${itemTitle}`,
              description: `#${booking.bookingNumber} (${new Date(booking.startDate).toLocaleDateString()} - ${new Date(booking.endDate).toLocaleDateString()})`,
            },
            unit_amount: Math.round(booking.price.totalPrice * 100), // Stripe использует центы/копейки
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'}/bookings/${booking._id}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'}/bookings/${booking._id}/payment`,
      client_reference_id: booking._id.toString(),
      metadata: {
        booking_id: booking._id.toString(),
        payment_id: payment._id.toString()
      }
    });

    // Обновляем платеж данными сессии Stripe
    payment.paymentProviderData.sessionId = session.id;
    await payment.save();

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      paymentId: payment._id,
      url: session.url
    });
  } catch (error) {
    console.error('[PAYMENT_SESSION_ERROR]', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Ошибка сервера при создании платежной сессии' 
      },
      { status: 500 }
    );
  }
} 