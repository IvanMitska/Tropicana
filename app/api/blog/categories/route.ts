import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import mongoose from 'mongoose';

// Указываем, что этот маршрут должен рендериться динамически
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const categories = await mongoose.models.BlogPost.aggregate([
      { $match: { status: 'published' } },
      { $unwind: '$categories' },
      {
        $group: {
          _id: '$categories',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          name: '$_id',
          slug: '$_id',
          count: 1,
          _id: 0
        }
      },
      { $sort: { count: -1 } }
    ]);

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 