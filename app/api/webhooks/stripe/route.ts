import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import connectDB from '@/app/lib/mongodb';
import Booking from '@/app/models/Booking';
import Payment from '@/app/models/Payment';
import { sendEmail, getBookingEmailTemplate } from '@/app/lib/email';
import { getUserById } from '@/app/models/User';

// Инициализация Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

// Обработчик webhook-запросов от Stripe
export async function POST(req: NextRequest) {
  // Получаем тело запроса
  const body = await req.text();
  
  // Получаем сигнатуру Stripe
  const headersList = headers();
  const signature = headersList.get('stripe-signature');
  
  if (!signature) {
    return NextResponse.json(
      { 
        success: false, 
        message: 'Отсутствует подпись Stripe' 
      }, 
      { status: 400 }
    );
  }
  
  try {
    // Верифицируем webhook-событие
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event: Stripe.Event;
    
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret as string
      );
    } catch (err: any) {
      console.error(`Ошибка верификации webhook: ${err.message}`);
      return NextResponse.json(
        { 
          success: false, 
          message: `Ошибка верификации webhook: ${err.message}` 
        }, 
        { status: 400 }
      );
    }
    
    // Подключение к БД
    await connectDB();
    
    // Обработка событий Stripe
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;
        
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;
        
      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent);
        break;
        
      case 'charge.refunded':
        await handleChargeRefunded(event.data.object as Stripe.Charge);
        break;
        
      default:
        console.log(`Неизвестный тип события: ${event.type}`);
    }
    
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Ошибка обработки webhook:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Ошибка обработки webhook' 
      }, 
      { status: 500 }
    );
  }
}

// Обработка успешного завершения чекаута
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  if (!session.metadata?.booking_id || !session.metadata?.payment_id) {
    console.log('Отсутствуют необходимые метаданные в сессии');
    return;
  }
  
  // Находим платеж по ID сессии
  const payment = await Payment.findOne({
    'paymentProviderData.sessionId': session.id
  });
  
  if (!payment) {
    console.log('Платеж не найден');
    return;
  }
  
  // Если платеж уже обработан, пропускаем
  if (payment.status === 'completed') {
    return;
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
}

// Обработка успешного платежа
async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  // Найти платеж по ID платежного намерения
  const payment = await Payment.findOne({
    'paymentProviderData.intentId': paymentIntent.id
  });
  
  if (!payment) {
    return;
  }
  
  // Если платеж уже обработан, пропускаем
  if (payment.status === 'completed') {
    return;
  }
  
  // Обновляем статус платежа
  payment.status = 'completed';
  
  // Если есть информация о карте, сохраняем её
  if (paymentIntent.payment_method && typeof paymentIntent.payment_method !== 'string') {
    const paymentMethod = await stripe.paymentMethods.retrieve(
      paymentIntent.payment_method as string
    );
    
    if (paymentMethod.type === 'card' && paymentMethod.card) {
      payment.cardInfo = {
        lastFour: paymentMethod.card.last4,
        brand: paymentMethod.card.brand,
        expiryMonth: paymentMethod.card.exp_month,
        expiryYear: paymentMethod.card.exp_year
      };
    }
  }
  
  // Сохраняем платеж
  await payment.save();
  
  // Обновляем статус бронирования
  const booking = await Booking.findById(payment.booking);
  if (booking) {
    booking.paymentStatus = 'completed';
    booking.status = 'confirmed';
    await booking.save();
  }
}

// Обработка неудачного платежа
async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  // Найти платеж по ID платежного намерения
  const payment = await Payment.findOne({
    'paymentProviderData.intentId': paymentIntent.id
  });
  
  if (!payment) {
    return;
  }
  
  // Обновляем статус платежа
  payment.status = 'failed';
  payment.errorMessage = paymentIntent.last_payment_error?.message || 'Ошибка обработки платежа';
  
  // Сохраняем платеж
  await payment.save();
  
  // Обновляем статус бронирования
  const booking = await Booking.findById(payment.booking);
  if (booking) {
    booking.paymentStatus = 'failed';
    await booking.save();
    
    // Уведомление о неудачном платеже
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
          subject: `Проблема с оплатой бронирования #${booking.bookingNumber}`,
          html: `
            <h2>Проблема с оплатой бронирования #${booking.bookingNumber}</h2>
            <p>Произошла ошибка при обработке вашего платежа. Пожалуйста, попробуйте другой способ оплаты.</p>
            <p>Ошибка: ${payment.errorMessage}</p>
            <p>Вы можете повторить попытку оплаты, перейдя по ссылке:</p>
            <a href="${process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'}/bookings/${booking._id}/payment">Повторить оплату</a>
          `,
        });
      }
    } catch (emailError) {
      console.error('Ошибка отправки email:', emailError);
    }
  }
}

// Обработка возврата средств
async function handleChargeRefunded(charge: Stripe.Charge) {
  // Находим платеж по ID транзакции
  const payment = await Payment.findOne({
    transactionId: charge.payment_intent
  });
  
  if (!payment) {
    return;
  }
  
  // Обновляем статус платежа
  payment.status = 'refunded';
  payment.refundedAt = new Date();
  
  // Сохраняем платеж
  await payment.save();
  
  // Обновляем статус бронирования
  const booking = await Booking.findById(payment.booking);
  if (booking) {
    booking.paymentStatus = 'refunded';
    booking.status = 'cancelled';
    await booking.save();
    
    // Уведомление о возврате средств
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
          subject: `Возврат средств по бронированию #${booking.bookingNumber}`,
          html: `
            <h2>Возврат средств по бронированию #${booking.bookingNumber}</h2>
            <p>Средства за ваше бронирование были успешно возвращены.</p>
            <p>Сумма возврата: ${payment.amount} ${payment.currency}</p>
            <p>Бронирование отменено.</p>
          `,
        });
      }
    } catch (emailError) {
      console.error('Ошибка отправки email:', emailError);
    }
  }
} 