import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Vehicle } from '@/app/models/Vehicle';
import { requireAdmin } from '@/app/lib/admin-auth';

async function handleGET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    
    const skip = (page - 1) * limit;
    
    // Построение запроса
    const query: any = {};
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { 'specs.make': { $regex: search, $options: 'i' } },
        { 'specs.model': { $regex: search, $options: 'i' } }
      ];
    }
    
    if (status) {
      query.status = status;
    }
    
    // Получение данных
    const [vehicles, total] = await Promise.all([
      Vehicle.find(query)
        .populate('owner.userId', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Vehicle.countDocuments(query)
    ]);
    
    return NextResponse.json({
      vehicles,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Get vehicles error:', error);
    return NextResponse.json(
      { error: 'Ошибка при получении транспорта' },
      { status: 500 }
    );
  }
}

async function handlePOST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const data = await request.json();
    console.log('Received data:', data);
    
    // Валидация обязательных полей
    if (!data.title || !data.make || !data.model) {
      return NextResponse.json(
        { error: 'Обязательные поля: название, марка, модель' },
        { status: 400 }
      );
    }
    
    // Создание объекта транспорта в формате схемы Vehicle
    const vehicleData = {
      title: data.title,
      description: data.description || '',
      
      specs: {
        year: data.year || new Date().getFullYear(),
        make: data.make,
        model: data.model,
        type: data.type || 'car',
        transmission: data.specifications?.transmission || 'automatic',
        fuel: data.specifications?.fuelType || 'gasoline',
        seats: data.specifications?.capacity || 4,
        doors: data.specifications?.doors || 4,
        power: data.specifications?.power?.toString() || '150',
        consumption: data.specifications?.fuelConsumption?.toString() || '8.0'
      },
      
      status: data.status === 'available' ? 'active' : 
              data.status === 'rented' ? 'maintenance' : 
              data.status || 'active',
      
      featured: false,
      
      location: {
        address: data.location?.address || 'Phuket, Thailand',
        city: data.location?.city || 'Phuket',
        country: 'Thailand',
        coordinates: {
          lat: 7.8804,
          lng: 98.3923
        }
      },
      
      price: {
        base: data.pricing?.daily || 0,
        currency: 'THB',
        depositAmount: data.pricing?.deposit || 0
      },
      
      owner: {
        userId: '66e123456789abcdef012345', // Temporary ObjectId for admin
        name: 'Admin User'
      },
      
      features: data.features?.map((feature: string) => ({
        name: feature,
        category: 'comfort'
      })) || [],
      
      rules: {
        minDriverAge: 21,
        requiredLicense: 'international',
        securityDeposit: data.pricing?.deposit || 0,
        fuelPolicy: 'full-to-full'
      },
      
      photos: data.images || [],
      
      availability: [],
      reviews: [],
      rating: 0,
      reviewCount: 0
    };
    
    console.log('Formatted vehicle data:', vehicleData);
    
    // Создание нового транспорта
    const vehicle = new Vehicle(vehicleData);
    await vehicle.save();
    
    return NextResponse.json({
      success: true,
      message: 'Транспорт успешно создан',
      vehicle
    }, { status: 201 });
    
  } catch (error: any) {
    console.error('Create vehicle error:', error);
    console.error('Error details:', error.errors);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Транспорт с такими данными уже существует' },
        { status: 409 }
      );
    }
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.keys(error.errors).map(key => ({
        field: key,
        message: error.errors[key].message
      }));
      
      return NextResponse.json(
        { 
          error: 'Некорректные данные', 
          details: error.message,
          validationErrors 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Ошибка при создании транспорта', details: error.message },
      { status: 500 }
    );
  }
}

export const GET = handleGET;
export const POST = handlePOST;