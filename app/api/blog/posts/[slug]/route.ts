import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import mongoose from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectToDatabase();

    const post = await mongoose.models.BlogPost.findOne({
      slug: params.slug,
      status: 'published'
    }).lean();

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Увеличиваем счетчик просмотров
    await mongoose.models.BlogPost.updateOne(
      { _id: post._id },
      { $inc: { viewCount: 1 } }
    );

    // Получаем похожие статьи
    const relatedPosts = await mongoose.models.BlogPost
      .find({
        _id: { $ne: post._id },
        status: 'published',
        $or: [
          { categories: { $in: post.categories } },
          { tags: { $in: post.tags } }
        ]
      })
      .sort({ publishDate: -1 })
      .limit(3)
      .lean();

    return NextResponse.json({
      post,
      relatedPosts
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 