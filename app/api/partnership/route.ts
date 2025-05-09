import { NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';

const partnershipSchema = z.object({
  companyName: z.string().min(2),
  contactPerson: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[1-9]\d{10,14}$/),
  website: z.string().url().optional().or(z.literal('')),
  partnershipType: z.string().min(1),
  description: z.string().min(20)
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    // Валидация данных
    const validatedData = partnershipSchema.parse(data);

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
      to: process.env.PARTNERSHIP_EMAIL,
      subject: `Новая заявка на партнерство: ${validatedData.companyName}`,
      html: `
        <h2>Новая заявка на партнерство</h2>
        <p><strong>Компания:</strong> ${validatedData.companyName}</p>
        <p><strong>Контактное лицо:</strong> ${validatedData.contactPerson}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Телефон:</strong> ${validatedData.phone}</p>
        <p><strong>Сайт:</strong> ${validatedData.website || 'Не указан'}</p>
        <p><strong>Тип сотрудничества:</strong> ${validatedData.partnershipType}</p>
        <p><strong>Описание предложения:</strong></p>
        <p>${validatedData.description}</p>
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
    console.error('Partnership form error:', error);
    return NextResponse.json(
      { error: 'Ошибка при обработке формы' },
      { status: 400 }
    );
  }
} 