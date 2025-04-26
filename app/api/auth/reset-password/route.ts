import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail, updateUser } from '@/app/models/User';
import { ZodError, z } from 'zod';
import crypto from 'crypto';
import { sendEmail } from '@/app/lib/email'; // это нужно будет реализовать

// Схема валидации для запроса сброса пароля
const requestResetSchema = z.object({
  email: z.string().email('Введите корректный email'),
});

// Схема валидации для установки нового пароля
const resetPasswordSchema = z.object({
  token: z.string(),
  password: z
    .string()
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Пароль должен содержать как минимум одну заглавную букву, одну строчную букву и одну цифру'),
});

// Запрос на сброс пароля (отправка email с токеном)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Валидация входных данных
    const { email } = requestResetSchema.parse(body);
    
    // Ищем пользователя по email
    const user = await getUserByEmail(email);
    
    // Для безопасности не сообщаем, существует ли пользователь
    if (!user) {
      return NextResponse.json({ 
        success: true, 
        message: 'Если указанный email зарегистрирован, на него отправлена инструкция по восстановлению пароля' 
      });
    }
    
    // Создаем токен для сброса пароля
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    
    // Устанавливаем срок действия токена (1 час)
    const resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000);
    
    // Обновляем пользователя с токеном для сброса пароля
    await updateUser(user._id!.toString(), {
      resetPasswordToken,
      resetPasswordExpires,
    });
    
    // Формируем URL для сброса пароля
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;
    
    // Отправляем email с инструкцией по сбросу пароля
    // Это демо-версия, в реальном проекте нужно настроить отправку email
    /*
    await sendEmail({
      to: user.email,
      subject: 'Восстановление пароля',
      text: `Для сброса пароля перейдите по ссылке: ${resetUrl}. Ссылка действительна в течение 1 часа.`,
    });
    */
    
    console.log('Reset URL:', resetUrl); // Для тестирования
    
    return NextResponse.json({ 
      success: true, 
      message: 'Если указанный email зарегистрирован, на него отправлена инструкция по восстановлению пароля',
      resetUrl, // Для тестирования в разработке, убрать в продакшене
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ 
        success: false, 
        message: 'Ошибка валидации', 
        errors: error.errors 
      }, { status: 400 });
    }
    
    console.error('[REQUEST_RESET_PASSWORD_ERROR]', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Ошибка при запросе сброса пароля' 
    }, { status: 500 });
  }
}

// Установка нового пароля
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Валидация входных данных
    const { token, password } = resetPasswordSchema.parse(body);
    
    // Хешируем токен для сравнения с сохраненным
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');
    
    // Ищем пользователя по токену сброса пароля и проверяем срок действия
    const users = await (await getUserCollection()).find({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() }
    }).toArray();
    
    if (users.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'Недействительный или просроченный токен для сброса пароля' 
      }, { status: 400 });
    }
    
    const user = users[0];
    
    // Обновляем пароль и удаляем токен сброса
    await updateUser(user._id!.toString(), {
      password,
      resetPasswordToken: undefined,
      resetPasswordExpires: undefined,
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Пароль успешно изменен' 
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ 
        success: false, 
        message: 'Ошибка валидации', 
        errors: error.errors 
      }, { status: 400 });
    }
    
    console.error('[RESET_PASSWORD_ERROR]', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Ошибка при сбросе пароля' 
    }, { status: 500 });
  }
}

// Импортируем недостающую функцию
import { getUserCollection } from '@/app/models/User'; 