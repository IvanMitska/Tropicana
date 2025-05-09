import { NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[1-9]\d{10,14}$/),
  subject: z.string().min(1),
  message: z.string().min(10),
  captcha: z.string().min(1)
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    // Валидация данных
    const validatedData = contactSchema.parse(data);

    // Настройка транспорта для отправки email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });

    // Отправка email
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL,
      subject: `Новое сообщение: ${validatedData.subject}`,
      html: `
        <h2>Новое сообщение с сайта</h2>
        <p><strong>Имя:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Телефон:</strong> ${validatedData.phone}</p>
        <p><strong>Тема:</strong> ${validatedData.subject}</p>
        <p><strong>Сообщение:</strong></p>
        <p>${validatedData.message}</p>
      `
    });

    // Обработка прикрепленных файлов
    const files = formData.getAll('files');
    if (files.length > 0) {
      // Здесь можно добавить логику сохранения файлов
      // Например, загрузка в облачное хранилище
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Ошибка при обработке формы' },
      { status: 400 }
    );
  }
} 