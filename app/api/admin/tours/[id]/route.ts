import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Tour } from '@/app/models/Tour';
import { requireAdmin } from '@/app/lib/admin-auth';

async function handleGET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    
    const tour = await Tour.findById(params.id);
    
    if (!tour) {
      return NextResponse.json(
        { error: 'Экскурсия не найдена' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(tour);
    
  } catch (error) {
    console.error('Get tour error:', error);
    return NextResponse.json(
      { error: 'Ошибка при получении экскурсии' },
      { status: 500 }
    );
  }
}

async function handlePUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    
    const data = await request.json();
    
    const tour = await Tour.findByIdAndUpdate(
      params.id,
      { ...data, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    
    if (!tour) {
      return NextResponse.json(
        { error: 'Экскурсия не найдена' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(tour);
    
  } catch (error: any) {
    console.error('Update tour error:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Некорректные данные', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Ошибка при обновлении экскурсии' },
      { status: 500 }
    );
  }
}

async function handleDELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    
    const tour = await Tour.findByIdAndDelete(params.id);
    
    if (!tour) {
      return NextResponse.json(
        { error: 'Экскурсия не найдена' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Экскурсия успешно удалена' });
    
  } catch (error) {
    console.error('Delete tour error:', error);
    return NextResponse.json(
      { error: 'Ошибка при удалении экскурсии' },
      { status: 500 }
    );
  }
}

export const GET = requireAdmin(handleGET);
export const PUT = requireAdmin(handlePUT);
export const DELETE = requireAdmin(handleDELETE);