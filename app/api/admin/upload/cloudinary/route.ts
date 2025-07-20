import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/app/lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    const uploadPromises = files.map(async (file) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'auto',
            folder: 'phuket-dream', // Папка в Cloudinary
            allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
            transformation: [
              { quality: 'auto', fetch_format: 'auto' }
            ]
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              reject(error);
            } else {
              resolve({
                url: result!.secure_url,
                publicId: result!.public_id,
                format: result!.format,
                width: result!.width,
                height: result!.height,
                size: result!.bytes,
                filename: file.name
              });
            }
          }
        );
        
        uploadStream.end(buffer);
      });
    });

    const results = await Promise.all(uploadPromises);
    
    return NextResponse.json({ 
      success: true,
      urls: results.map(r => (r as any).url),
      files: results
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload files' },
      { status: 500 }
    );
  }
}

// Получение списка изображений из Cloudinary
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder') || 'phuket-dream';
    const nextCursor = searchParams.get('cursor');
    
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folder,
      max_results: 50,
      next_cursor: nextCursor || undefined,
    });
    
    const files = result.resources.map((resource: any) => ({
      url: resource.secure_url,
      publicId: resource.public_id,
      filename: resource.public_id.split('/').pop(),
      size: resource.bytes,
      format: resource.format,
      width: resource.width,
      height: resource.height,
      uploadDate: resource.created_at,
    }));
    
    return NextResponse.json({
      files,
      nextCursor: result.next_cursor,
      totalCount: result.rate_limit_remaining
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}

// Удаление изображения из Cloudinary
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const publicId = searchParams.get('publicId');
    
    if (!publicId) {
      return NextResponse.json({ error: 'Public ID is required' }, { status: 400 });
    }
    
    const result = await cloudinary.uploader.destroy(publicId);
    
    if (result.result === 'ok') {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Failed to delete image' }, { status: 400 });
    }
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}