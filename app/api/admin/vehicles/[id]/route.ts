import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Vehicle } from '@/app/models/Vehicle';
import { requireAdmin } from '@/app/lib/admin-auth';

async function handleGET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    
    const vehicle = await Vehicle.findById(params.id)
      .populate('owner.userId', 'name email phone');
    
    if (!vehicle) {
      return NextResponse.json(
        { error: 'Транспорт не найден' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(vehicle);
    
  } catch (error) {
    console.error('Get vehicle error:', error);
    return NextResponse.json(
      { error: 'Ошибка при получении транспорта' },
      { status: 500 }
    );
  }
}

async function handlePUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    
    const data = await request.json();
    
    const vehicle = await Vehicle.findByIdAndUpdate(
      params.id,
      { ...data, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    
    if (!vehicle) {
      return NextResponse.json(
        { error: 'Транспорт не найден' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(vehicle);
    
  } catch (error: any) {
    console.error('Update vehicle error:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Некорректные данные', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Ошибка при обновлении транспорта' },
      { status: 500 }
    );
  }
}

async function handleDELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    
    const vehicle = await Vehicle.findByIdAndDelete(params.id);
    
    if (!vehicle) {
      return NextResponse.json(
        { error: 'Транспорт не найден' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Транспорт успешно удален' });
    
  } catch (error) {
    console.error('Delete vehicle error:', error);
    return NextResponse.json(
      { error: 'Ошибка при удалении транспорта' },
      { status: 500 }
    );
  }
}

export const GET = handleGET;
export const PUT = handlePUT;
export const DELETE = handleDELETE;