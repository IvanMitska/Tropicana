'use server';

import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  from?: string;
  attachments?: any[];
}

/**
 * Функция для отправки email
 */
export async function sendEmail(options: EmailOptions) {
  try {
    // Создаем транспорт для отправки email
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Настройки письма
    const mailOptions = {
      from: options.from || process.env.EMAIL_FROM || '"Rent Web Platform" <noreply@rentweb.com>',
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    // Добавляем вложения, если они есть
    if (options.attachments && options.attachments.length > 0) {
      mailOptions.attachments = options.attachments;
    }

    // Отправляем email
    const info = await transporter.sendMail(mailOptions);
    
    console.log(`Email отправлен: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error('Ошибка при отправке email:', error);
    throw new Error('Не удалось отправить email');
  }
}

/**
 * Шаблон для уведомления о бронировании
 */
export async function getBookingEmailTemplate(booking: any, type: 'created' | 'confirmed' | 'cancelled' | 'default') {
  let title, message, buttonText, buttonLink;

  switch (type) {
    case 'created':
      title = `Бронирование #${booking.bookingNumber} создано`;
      message = 'Ваше бронирование успешно создано и ожидает оплаты.';
      buttonText = 'Перейти к оплате';
      buttonLink = `/bookings/${booking._id}/payment`;
      break;
    case 'confirmed':
      title = `Бронирование #${booking.bookingNumber} подтверждено`;
      message = 'Ваше бронирование успешно подтверждено. Оплата получена.';
      buttonText = 'Посмотреть детали';
      buttonLink = `/bookings/${booking._id}`;
      break;
    case 'cancelled':
      title = `Бронирование #${booking.bookingNumber} отменено`;
      message = 'Ваше бронирование было отменено.';
      buttonText = 'Забронировать снова';
      buttonLink = '/';
      break;
    default:
      title = `Информация о бронировании #${booking.bookingNumber}`;
      message = 'Информация о вашем бронировании.';
      buttonText = 'Посмотреть детали';
      buttonLink = `/bookings/${booking._id}`;
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #4A6FFF;
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 5px 5px 0 0;
        }
        .content {
          padding: 20px;
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          border-top: none;
          border-radius: 0 0 5px 5px;
        }
        .booking-info {
          margin: 20px 0;
          background-color: white;
          padding: 15px;
          border-radius: 5px;
          border: 1px solid #eee;
        }
        .booking-detail {
          padding: 8px 0;
          border-bottom: 1px solid #eee;
        }
        .booking-detail:last-child {
          border-bottom: none;
        }
        .button {
          display: inline-block;
          background-color: #4A6FFF;
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          margin-top: 20px;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          color: #777;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${title}</h1>
        </div>
        <div class="content">
          <p>${message}</p>
          
          <div class="booking-info">
            <div class="booking-detail">
              <strong>Номер бронирования:</strong> ${booking.bookingNumber}
            </div>
            <div class="booking-detail">
              <strong>Даты:</strong> ${new Date(booking.startDate).toLocaleDateString()} - ${new Date(booking.endDate).toLocaleDateString()}
            </div>
            <div class="booking-detail">
              <strong>Статус:</strong> ${booking.status}
            </div>
            <div class="booking-detail">
              <strong>Статус оплаты:</strong> ${booking.paymentStatus}
            </div>
            <div class="booking-detail">
              <strong>Итоговая стоимость:</strong> ${booking.price.totalPrice} ${booking.price.currency}
            </div>
          </div>
          
          <a href="${process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'}${buttonLink}" class="button">${buttonText}</a>
        </div>
        <div class="footer">
          <p>Это автоматическое сообщение, пожалуйста, не отвечайте на него.</p>
          <p>&copy; ${new Date().getFullYear()} Rent Web Platform. Все права защищены.</p>
        </div>
      </div>
    </body>
    </html>
  `;
} 