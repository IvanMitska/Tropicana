import { Vehicle, VehicleType } from '@/app/models/Vehicle';

// Заглушка для имитации БД
// В реальном приложении здесь будет подключение к MongoDB или другой БД
let MOCK_VEHICLES: Vehicle[] = [];

// Генерация тестовых данных
export function generateMockVehicles(): Vehicle[] {
  if (MOCK_VEHICLES.length > 0) return MOCK_VEHICLES;
  
  const vehicleTypes: VehicleType[] = ['car', 'motorcycle', 'boat', 'yacht', 'bicycle', 'scooter', 'rv', 'other'];
  const fuelTypes = ['gasoline', 'diesel', 'electric', 'hybrid', 'other'];
  const transmissions = ['automatic', 'manual', 'semiautomatic'];
  const carMakes = ['BMW', 'Mercedes-Benz', 'Audi', 'Toyota', 'Volkswagen', 'Porsche', 'Lexus', 'Range Rover', 'Honda', 'Ford'];
  const features = [
    'Кондиционер', 'Подогрев сидений', 'Bluetooth', 'Камера заднего вида', 'Панорамная крыша',
    'Навигация', 'Круиз-контроль', 'Парктроник', 'Кожаный салон', 'Автоматический парковщик',
    'CarPlay/Android Auto', 'Система контроля слепых зон', 'Премиум аудиосистема', 'Люк', 'Электропривод багажника'
  ];
  
  const mockVehicles: Vehicle[] = [];
  
  for (let i = 1; i <= 50; i++) {
    const type = vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];
    const make = carMakes[Math.floor(Math.random() * carMakes.length)];
    const model = `Model ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 90 + 10)}`;
    const year = Math.floor(Math.random() * 15) + 2010;
    const capacity = Math.floor(Math.random() * 6) + 2;
    const fuelType = fuelTypes[Math.floor(Math.random() * fuelTypes.length)];
    const transmission = transmissions[Math.floor(Math.random() * transmissions.length)];
    const dailyPrice = Math.floor(Math.random() * 9000) + 1000;
    const reviewCount = Math.floor(Math.random() * 20);
    
    // Выбор случайных функций
    const vehicleFeatures = [...features]
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 8) + 3);
    
    const isFeatured = Math.random() > 0.8; // ~20% популярных предложений
    
    const vehicle: Vehicle = {
      id: `vehicle-${i}`,
      type,
      make,
      model,
      year,
      color: ['Белый', 'Черный', 'Серебристый', 'Синий', 'Красный'][Math.floor(Math.random() * 5)],
      title: `${make} ${model} ${year}`,
      description: `Комфортный ${make} ${model} ${year} года выпуска. Идеально подходит для поездок по городу и за город. ${Math.random() > 0.5 ? 'Экономичный расход топлива. ' : ''}${Math.random() > 0.5 ? 'Отличное техническое состояние. ' : ''}Доступен для аренды в любое время.`,
      specifications: {
        power: Math.floor(Math.random() * 250) + 100,
        fuelType: fuelType as any,
        fuelConsumption: Number((Math.random() * 10 + 5).toFixed(1)),
        transmission: transmission as any,
        driveType: ['fwd', 'rwd', 'awd', '4wd'][Math.floor(Math.random() * 4)] as any,
        acceleration: Number((Math.random() * 10 + 4).toFixed(1)),
        maxSpeed: Math.floor(Math.random() * 100) + 150,
        capacity,
        doors: Math.floor(Math.random() * 2) * 2 + 3,
        weight: Math.floor(Math.random() * 1000) + 1000,
        length: Number((Math.random() * 2 + 3).toFixed(1)),
        width: Number((Math.random() * 0.5 + 1.5).toFixed(1)),
        height: Number((Math.random() * 0.5 + 1.2).toFixed(1)),
        luggage: Math.floor(Math.random() * 300) + 200,
      },
      pricing: {
        hourly: Math.floor(dailyPrice / 10),
        daily: dailyPrice,
        weekly: Math.floor(dailyPrice * 6),
        monthly: Math.floor(dailyPrice * 25),
        deposit: Math.floor(dailyPrice * 2),
        minimumRental: Math.floor(Math.random() * 24) + 1,
        discounts: {
          weekly: Math.floor(Math.random() * 10) + 5,
          monthly: Math.floor(Math.random() * 15) + 10,
        }
      },
      rentalTerms: {
        minimumAge: 21,
        licenseRequired: true,
        drivingExperience: Math.floor(Math.random() * 2) + 1,
        securityDeposit: Math.floor(dailyPrice * 2),
        allowedAreas: ['Город', 'Межгород', 'Зарубежные поездки'],
        prohibitedUsage: ['Езда по бездорожью', 'Соревнования', 'Курение в салоне'],
        includesInsurance: Math.random() > 0.3,
        fuelPolicy: ['full-to-full', 'full-to-empty', 'as-received', 'pre-purchase'][Math.floor(Math.random() * 4)] as any,
        mileageLimit: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) + 200 : undefined,
        overtimeFee: Math.floor(dailyPrice / 10),
      },
      location: {
        address: `ул. Примерная, ${Math.floor(Math.random() * 100) + 1}`,
        city: 'Москва',
        lat: 55.75 + (Math.random() - 0.5) * 0.2,
        lng: 37.62 + (Math.random() - 0.5) * 0.2,
        serviceRadius: Math.floor(Math.random() * 50) + 10,
        deliveryAvailable: Math.random() > 0.3,
        deliveryFee: Math.floor(Math.random() * 1000) + 500,
      },
      images: [
        {
          id: `image-${i}-1`,
          url: `/images/car1.jpg`,
          alt: `${make} ${model}`,
          isFeatured: true
        },
        {
          id: `image-${i}-2`,
          url: `/images/property-1-2.jpg`,
          alt: `${make} ${model} вид сбоку`,
          isFeatured: false
        },
        {
          id: `image-${i}-3`,
          url: `/images/property-1-3.jpg`,
          alt: `${make} ${model} салон`,
          isFeatured: false
        }
      ],
      availability: Array.from({ length: 30 }, (_, index) => ({
        date: new Date(Date.now() + index * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        available: Math.random() > 0.2,
      })),
      features: vehicleFeatures,
      owner: {
        id: `owner-${Math.floor(Math.random() * 5) + 1}`,
        name: ['Александр', 'Елена', 'Дмитрий', 'Анна', 'Сергей'][Math.floor(Math.random() * 5)],
        avatar: '/images/host-1.jpg',
        responseRate: Math.floor(Math.random() * 20) + 80,
        responseTime: ['в течение часа', 'в течение дня', 'в течение нескольких часов'][Math.floor(Math.random() * 3)],
        isVerified: Math.random() > 0.2,
        since: `${2015 + Math.floor(Math.random() * 8)}-01-01`,
        totalRentals: Math.floor(Math.random() * 100) + 10,
      },
      rating: Number((Math.random() * 2 + 3).toFixed(1)),
      reviews: Array.from({ length: reviewCount }, (_, index) => ({
        id: `review-${i}-${index}`,
        userId: `user-${Math.floor(Math.random() * 100)}`,
        userName: ['Александр', 'Елена', 'Дмитрий', 'Анна', 'Сергей', 'Ольга', 'Иван', 'Мария'][Math.floor(Math.random() * 8)],
        userAvatar: '/images/user-1.jpg',
        rating: Math.floor(Math.random() * 3) + 3,
        date: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        comment: [
          'Отличный автомобиль, все понравилось!',
          'Хорошее состояние, рекомендую.',
          'Владелец очень отзывчивый, аренда прошла без проблем.',
          'Автомобиль в хорошем состоянии, но есть некоторые мелкие недочеты.',
          'Все было замечательно, обязательно арендую еще раз.'
        ][Math.floor(Math.random() * 5)],
        categories: {
          condition: Math.floor(Math.random() * 2) + 4,
          comfort: Math.floor(Math.random() * 2) + 4,
          performance: Math.floor(Math.random() * 2) + 4,
          value: Math.floor(Math.random() * 2) + 4,
        }
      })),
      featured: isFeatured,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
      status: ['active', 'maintenance', 'booked', 'inactive'][Math.floor(Math.random() * 4)] as any,
      viewCount: Math.floor(Math.random() * 1000) + 100,
      bookingCount: Math.floor(Math.random() * 50) + 1,
    };
    
    mockVehicles.push(vehicle);
  }
  
  MOCK_VEHICLES.push(...mockVehicles);
  return mockVehicles;
} 