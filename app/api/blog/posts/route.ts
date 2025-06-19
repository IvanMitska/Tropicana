import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import mongoose from 'mongoose';

// Указываем, что этот маршрут должен рендериться динамически
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'newest';
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 9;

    const query: any = { status: 'published' };
    
    if (category) {
      query.categories = category;
    }
    
    if (search) {
      query.$text = { $search: search };
    }

    const sortOptions: { [key: string]: any } = {
      newest: { publishDate: -1 },
      popular: { viewCount: -1 },
      comments: { commentCount: -1 }
    };

    const [posts, total] = await Promise.all([
      mongoose.models.BlogPost
        .find(query)
        .sort(sortOptions[sort])
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      mongoose.models.BlogPost.countDocuments(query)
    ]);

    return NextResponse.json({
      posts,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 