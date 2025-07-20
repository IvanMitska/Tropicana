import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { RealEstate } from '@/app/models/RealEstate';
import { requireAdmin } from '@/app/lib/admin-auth';

async function handleGET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    
    const property = await RealEstate.findById(params.id)
      .populate('host.userId', 'name email phone');
    
    if (!property) {
      return NextResponse.json(
        { error: 'Недвижимость не найдена' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(property);
    
  } catch (error) {
    console.error('Get property error:', error);
    return NextResponse.json(
      { error: 'Ошибка при получении недвижимости' },
      { status: 500 }
    );
  }
}

async function handlePUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    
    const data = await request.json();
    
    const property = await RealEstate.findByIdAndUpdate(
      params.id,
      { ...data, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    
    if (!property) {
      return NextResponse.json(
        { error: 'Недвижимость не найдена' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(property);
    
  } catch (error: any) {
    console.error('Update property error:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Некорректные данные', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Ошибка при обновлении недвижимости' },
      { status: 500 }
    );
  }
}

async function handleDELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    
    const property = await RealEstate.findByIdAndDelete(params.id);
    
    if (!property) {
      return NextResponse.json(
        { error: 'Недвижимость не найдена' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Недвижимость успешно удалена' });
    
  } catch (error) {
    console.error('Delete property error:', error);
    return NextResponse.json(
      { error: 'Ошибка при удалении недвижимости' },
      { status: 500 }
    );
  }
}

export const GET = requireAdmin(handleGET);
export const PUT = requireAdmin(handlePUT);
export const DELETE = requireAdmin(handleDELETE);