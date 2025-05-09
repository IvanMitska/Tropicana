import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import Booking from '@/app/models/Booking';
import Payment from '@/app/models/Payment';
import Stripe from 'stripe';
import { sendEmail, getBookingEmailTemplate } from '@/app/lib/email';
import { getUserById } from '@/app/models/User';

// Инициализация Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

export async function GET(
  req: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const { sessionId } = params;

    if (!sessionId) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'ID сессии не указан' 
        },
        { status: 400 }
      );
    }

    // Подключение к БД
    await connectDB();

    // Получаем данные о сессии из Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session || session.payment_status !== 'paid') {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Платеж не подтвержден' 
        },
        { status: 400 }
      );
    }

    // Находим платеж по ID сессии
    const payment = await Payment.findOne({
      'paymentProviderData.sessionId': sessionId
    });

    if (!payment) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Платеж не найден' 
        },
        { status: 404 }
      );
    }

    // Если платеж уже обработан, просто возвращаем информацию
    if (payment.status === 'completed') {
      return NextResponse.json({ 
        success: true, 
        payment,
        message: 'Платеж уже подтвержден' 
      });
    }

    // Обновляем статус платежа
    payment.status = 'completed';
    payment.transactionId = session.payment_intent as string;
    
    // Обновляем данные о платежной системе
    if (session.payment_intent) {
      payment.paymentProviderData.intentId = session.payment_intent as string;
    }

    // Получаем информацию о бронировании
    const booking = await Booking.findById(payment.booking);
    
    if (booking) {
      // Обновляем статус бронирования
      booking.paymentStatus = 'completed';
      booking.status = 'confirmed';
      await booking.save();
      
      // Отправляем подтверждение о бронировании на email
      try {
        let emailTo;
        
        if (booking.user) {
          const user = await getUserById(booking.user.toString());
          emailTo = user?.email;
        } else if (booking.contactInfo?.email) {
          emailTo = booking.contactInfo.email;
        }
        
        if (emailTo) {
          await sendEmail({
            to: emailTo,
            subject: `Подтверждение бронирования #${booking.bookingNumber}`,
            html: getBookingEmailTemplate(booking, 'confirmed'),
          });
        }
      } catch (emailError) {
        console.error('Ошибка отправки email:', emailError);
      }
    }

    await payment.save();

    return NextResponse.json({
      success: true,
      payment,
      booking,
      message: 'Платеж успешно подтвержден'
    });
  } catch (error) {
    console.error('[VERIFY_PAYMENT_ERROR]', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Ошибка сервера при проверке платежа' 
      },
      { status: 500 }
    );
  }
} 