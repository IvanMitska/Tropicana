import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Tour } from '@/app/models/Tour';
import { requireAdmin } from '@/app/lib/admin-auth';

export const dynamic = 'force-dynamic';

async function handleGET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const published = searchParams.get('published');
    
    const skip = (page - 1) * limit;
    
    // Построение запроса
    const query: any = {};
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'location.city': { $regex: search, $options: 'i' } }
      ];
    }
    
    if (category) {
      query.category = category;
    }
    
    if (published !== null && published !== undefined) {
      query.published = published === 'true';
    }
    
    // Получение данных
    const [tours, total] = await Promise.all([
      Tour.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Tour.countDocuments(query)
    ]);
    
    return NextResponse.json({
      tours,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Get tours error:', error);
    return NextResponse.json(
      { error: 'Ошибка при получении экскурсий' },
      { status: 500 }
    );
  }
}

async function handlePOST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const data = await request.json();
    
    // Валидация обязательных полей
    const requiredFields = ['title', 'description', 'category', 'duration', 'location', 'pricing', 'guide'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Поле ${field} обязательно` },
          { status: 400 }
        );
      }
    }
    
    // Установка значений по умолчанию
    data.rating = data.rating || 0;
    data.reviewsCount = data.reviewsCount || 0;
    data.popularity = data.popularity || 0;
    data.isAvailable = data.isAvailable !== undefined ? data.isAvailable : true;
    data.published = data.published !== undefined ? data.published : true;
    
    // Создание новой экскурсии
    const tour = new Tour(data);
    await tour.save();
    
    return NextResponse.json(tour, { status: 201 });
    
  } catch (error: any) {
    console.error('Create tour error:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Экскурсия с такими данными уже существует' },
        { status: 409 }
      );
    }
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Некорректные данные', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Ошибка при создании экскурсии' },
      { status: 500 }
    );
  }
}

export const GET = handleGET;
export const POST = handlePOST;