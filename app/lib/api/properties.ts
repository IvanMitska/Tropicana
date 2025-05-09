import { Property, Review } from '@/app/models/Property';

// Временные данные для примера
const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Современная квартира в центре',
    category: 'apartment',
    address: 'ул. Центральная, 15, Москва',
    price: 5000,
    priceUnit: 'night',
    description: 'Просторная современная квартира с двумя спальнями в центре города. Идеально подходит для семей или небольших групп. Полностью оборудованная кухня, высокоскоростной интернет, и прекрасный вид на город.',
    area: 85,
    rooms: 3,
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    features: [
      { id: '1', name: 'Wi-Fi', category: 'connectivity', icon: 'wifi' },
      { id: '2', name: 'Кондиционер', category: 'climate', icon: 'ac' },
      { id: '3', name: 'Стиральная машина', category: 'appliances', icon: 'washing-machine' },
      { id: '4', name: 'Посудомоечная машина', category: 'appliances', icon: 'dishwasher' },
      { id: '5', name: 'Телевизор', category: 'entertainment', icon: 'tv' },
      { id: '6', name: 'Балкон', category: 'outdoor', icon: 'balcony' },
      { id: '7', name: 'Лифт', category: 'building', icon: 'elevator' },
      { id: '8', name: 'Охрана', category: 'security', icon: 'security' },
    ],
    rules: [
      'Заезд с 14:00, выезд до 12:00',
      'Не курить в помещении',
      'Без вечеринок и мероприятий',
      'Можно с домашними животными',
      'Самостоятельное заселение с помощью смарт-замка'
    ],
    cancellationPolicy: 'Бесплатная отмена в течение 48 часов. При отмене позже, удерживается полная стоимость первой ночи.',
    availability: [
      { date: '2023-12-01', available: true },
      { date: '2023-12-02', available: true },
      { date: '2023-12-03', available: true },
      { date: '2023-12-04', available: false },
      { date: '2023-12-05', available: false },
    ],
    location: {
      lat: 55.7558,
      lng: 37.6173,
      nearby: [
        { type: 'restaurant', name: 'Итальянский ресторан', distance: 0.3 },
        { type: 'shop', name: 'Продуктовый магазин', distance: 0.2 },
        { type: 'attraction', name: 'Городской музей', distance: 0.5 },
      ]
    },
    images: [
      { id: '1', url: '/images/property-1-1.jpg', alt: 'Гостиная' },
      { id: '2', url: '/images/property-1-2.jpg', alt: 'Спальня' },
      { id: '3', url: '/images/property-1-3.jpg', alt: 'Кухня' },
      { id: '4', url: '/images/property-1-4.jpg', alt: 'Ванная' },
      { id: '5', url: '/images/property-1-5.jpg', alt: 'Балкон' },
    ],
    rating: 4.8,
    reviews: [
      {
        id: '1',
        userId: '101',
        userName: 'Алексей К.',
        userAvatar: '/images/user-1.jpg',
        rating: 5,
        date: '2023-11-15',
        comment: 'Прекрасная квартира со всем необходимым. Чисто, уютно, отличное расположение. Рекомендую!',
        categories: { cleanliness: 5, communication: 5, location: 5, value: 4 }
      },
      {
        id: '2',
        userId: '102',
        userName: 'Мария С.',
        userAvatar: '/images/user-2.jpg',
        rating: 4,
        date: '2023-10-20',
        comment: 'Очень хорошая квартира, но немного шумно от улицы. В целом все понравилось, хозяин очень отзывчивый.',
        categories: { cleanliness: 5, communication: 5, location: 4, value: 4 }
      }
    ],
    host: {
      id: '201',
      name: 'Дмитрий',
      avatar: '/images/host-1.jpg',
      responseRate: 98,
      responseTime: 'в течение часа',
      isSuperhost: true,
      description: 'Рад приветствовать гостей в моей квартире! Я всегда на связи и готов помочь с любыми вопросами.',
    },
    similar: ['2', '3', '4']
  },
  // Добавьте больше объектов недвижимости по аналогии
];

/**
 * Получить объект недвижимости по ID
 */
export async function getPropertyById(id: string): Promise<Property> {
  // В реальном приложении здесь был бы API запрос
  const property = MOCK_PROPERTIES.find(p => p.id === id);
  
  if (!property) {
    throw new Error(`Недвижимость с ID ${id} не найдена`);
  }
  
  return new Promise((resolve) => {
    setTimeout(() => resolve(property), 500); // Имитация задержки сети
  });
}

/**
 * Получить список отзывов для объекта недвижимости
 */
export async function getPropertyReviews(
  propertyId: string, 
  page: number = 1, 
  limit: number = 5,
  filter?: string
): Promise<{ reviews: Review[], total: number }> {
  const property = await getPropertyById(propertyId);
  let reviews = [...property.reviews];
  
  // Применить фильтрацию, если указана
  if (filter) {
    reviews = reviews.filter(review => 
      review.comment.toLowerCase().includes(filter.toLowerCase()) || 
      review.rating >= parseInt(filter, 10)
    );
  }
  
  const total = reviews.length;
  const startIndex = (page - 1) * limit;
  const paginatedReviews = reviews.slice(startIndex, startIndex + limit);
  
  return new Promise((resolve) => {
    setTimeout(() => resolve({ reviews: paginatedReviews, total }), 300);
  });
}

/**
 * Получить похожие объекты недвижимости
 */
export async function getSimilarProperties(propertyId: string): Promise<Property[]> {
  const property = await getPropertyById(propertyId);
  
  const similarIds = property.similar || [];
  const similarProperties = await Promise.all(
    similarIds.map(id => getPropertyById(id).catch(() => null))
  );
  
  return similarProperties.filter(Boolean) as Property[];
}

/**
 * Проверить доступность объекта недвижимости на выбранные даты
 */
export async function checkAvailability(
  propertyId: string,
  checkIn: string,
  checkOut: string
): Promise<{ available: boolean; blockedDates?: string[] }> {
  const property = await getPropertyById(propertyId);
  
  // Преобразовать строковые даты в объекты Date
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  
  // Получить все даты между выбранными
  const dateRange: Date[] = [];
  let currentDate = new Date(checkInDate);
  
  while (currentDate <= checkOutDate) {
    dateRange.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  // Проверить доступность для каждой даты
  const blockedDates: string[] = [];
  
  for (const date of dateRange) {
    const dateString = date.toISOString().split('T')[0];
    const availabilityEntry = property.availability.find(
      a => a.date === dateString
    );
    
    if (availabilityEntry && !availabilityEntry.available) {
      blockedDates.push(dateString);
    }
  }
  
  return {
    available: blockedDates.length === 0,
    blockedDates: blockedDates.length > 0 ? blockedDates : undefined
  };
} 