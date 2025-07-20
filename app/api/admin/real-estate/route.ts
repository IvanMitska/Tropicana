import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { RealEstate } from '@/app/models/RealEstate';
import { requireAdmin } from '@/app/lib/admin-auth';

export const dynamic = 'force-dynamic';

async function handleGET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const type = searchParams.get('type') || '';
    const status = searchParams.get('status') || '';
    
    const skip = (page - 1) * limit;
    
    // Построение запроса
    const query: any = {};
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { 'location.city': { $regex: search, $options: 'i' } },
        { 'location.address': { $regex: search, $options: 'i' } }
      ];
    }
    
    if (type) {
      query.type = type;
    }
    
    if (status) {
      query.status = status;
    }
    
    // Получение данных
    const [properties, total] = await Promise.all([
      RealEstate.find(query)
        .populate('host.userId', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      RealEstate.countDocuments(query)
    ]);
    
    return NextResponse.json({
      properties,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Get real estate error:', error);
    return NextResponse.json(
      { error: 'Ошибка при получении недвижимости' },
      { status: 500 }
    );
  }
}

async function handlePOST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const data = await request.json();
    
    // Валидация обязательных полей
    const requiredFields = ['title', 'description', 'type', 'location', 'price', 'maxGuests', 'bedroomCount', 'bedCount', 'bathroomCount'];
    for (const field of requiredFields) {
      if (data[field] === undefined || data[field] === null) {
        return NextResponse.json(
          { error: `Поле ${field} обязательно` },
          { status: 400 }
        );
      }
    }
    
    // Создание новой недвижимости
    const property = new RealEstate(data);
    await property.save();
    
    return NextResponse.json(property, { status: 201 });
    
  } catch (error: any) {
    console.error('Create real estate error:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Недвижимость с такими данными уже существует' },
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
      { error: 'Ошибка при создании недвижимости' },
      { status: 500 }
    );
  }
}

export const GET = handleGET;
export const POST = handlePOST;