'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('description');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(2);
  
  // Заглушка для данных о недвижимости (в реальном приложении будет API запрос)
  const property = {
    id: params.id,
    title: 'Современная вилла с видом на море в Камале',
    type: 'Вилла',
    rating: 4.9,
    reviewCount: 48,
    price: 15000,
    priceUnit: 'сутки',
    currency: '฿',
    location: 'Камала, Пхукет',
    bedrooms: 3,
    bathrooms: 2,
    capacity: 6,
    area: 180,
    features: [
      'Бассейн',
      'Кондиционер',
      'Кухня',
      'Wi-Fi',
      'Стиральная машина',
      'Парковка',
      'Терраса',
      'Барбекю',
      'Вид на море',
      'Охрана',
      'Система умный дом'
    ],
    description: `Роскошная современная вилла с потрясающим видом на Андаманское море, расположенная в тихом районе Камалы в западной части Пхукета.

Вилла представляет собой двухэтажное здание общей площадью 180 кв.м, окруженное тропическим садом. Здесь вы найдете:

- 3 просторные спальни с кондиционерами и встроенными шкафами
- 2 современные ванные комнаты с тропическим душем
- Полностью оборудованную кухню с современной техникой
- Светлую гостиную с панорамными окнами
- Обеденную зону как внутри дома, так и на террасе
- Частный бассейн с лежаками
- Зону барбекю
- Бесплатную парковку
- Высокоскоростной Wi-Fi по всему дому
- Умную систему освещения и климат-контроля

Вилла идеально подходит для семейного отдыха или компании друзей. До пляжа Камала всего 5 минут ходьбы, а поблизости находятся рестораны, магазины и другие удобства. 

Вы можете заказать дополнительные услуги: уборку, приготовление еды, массаж прямо на вилле, услуги няни, аренду автомобиля или скутера.`,
    rules: [
      'Заезд после 14:00, выезд до 12:00',
      'Запрещено курение в помещении',
      'Разрешено проведение небольших мероприятий',
      'Нельзя с домашними животными',
      'Тихое время с 22:00 до 8:00'
    ],
    cancelPolicy: 'Бесплатная отмена за 7 дней до заезда. При отмене позже возврат 50% стоимости бронирования.',
    nearbyAttractions: [
      'Пляж Камала - 5 минут ходьбы',
      'Ресторанная улица - 7 минут ходьбы',
      'Супермаркет Lotus - 3 минуты на автомобиле',
      'Пхукет Фантаси - 10 минут на автомобиле',
      'Патонг Бич - 15 минут на автомобиле'
    ],
    coordinates: {
      lat: 7.9571,
      lng: 98.2825
    },
    hostInfo: {
      name: 'Александр',
      responseRate: 98,
      responseTime: 'в течение часа',
      isSuperHost: true,
      joinedDate: 'Июнь 2021',
      languages: ['Русский', 'Английский', 'Тайский']
    },
    images: [
      '/images/villa-1.jpg',
      '/images/villa-2.jpg',
      '/images/villa-3.jpg',
      '/images/villa-4.jpg',
      '/images/villa-5.jpg'
    ]
  };
  
  const calculateTotalPrice = () => {
    if (!checkInDate || !checkOutDate) return property.price;
    
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return property.price * diffDays;
  };
  
  const handleBooking = () => {
    if (!checkInDate || !checkOutDate) {
      alert('Пожалуйста, выберите даты заезда и выезда');
      return;
    }
    
    // Здесь будет логика бронирования
    alert(`Бронирование ${property.title} с ${checkInDate} по ${checkOutDate} для ${guests} гостей`);
  };
  
  // Заглушка для изображений недвижимости
  const PlaceholderImage = ({ text }: { text: string }) => (
    <div className="bg-gradient-to-br from-dark-light to-dark flex items-center justify-center text-white text-opacity-70 rounded-lg w-full h-full">
      {text}
    </div>
  );

  return (
    <MainLayout>
      <div className="bg-light py-8">
        <div className="container mx-auto px-4">
          {/* Хлебные крошки */}
          <div className="flex items-center text-sm mb-6">
            <Link href="/" className="text-gray-500 hover:text-primary">
              Главная
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/real-estate" className="text-gray-500 hover:text-primary">
              Аренда недвижимости
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-dark font-medium">{property.title}</span>
          </div>

          {/* Основная информация о недвижимости */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex items-center mb-2">
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full mr-2">{property.type}</span>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-400">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium ml-1">{property.rating}</span>
                  <span className="text-xs text-gray-500 ml-1">({property.reviewCount} отзывов)</span>
                </div>
                <div className="ml-auto text-sm text-gray-600">
                  <span className="inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1 text-primary">
                      <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                    {property.location}
                  </span>
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-dark mb-6">{property.title}</h1>

              {/* Галерея изображений (заглушка) */}
              <div className="grid grid-cols-4 grid-rows-2 gap-2 h-96 mb-6">
                <div className="col-span-2 row-span-2 relative">
                  <PlaceholderImage text="Главное изображение" />
                </div>
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="relative">
                    <PlaceholderImage text={`Фото ${num}`} />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  {/* Основные характеристики */}
                  <div className="grid grid-cols-3 gap-4 p-4 border border-gray-200 rounded-lg mb-6">
                    <div className="text-center">
                      <div className="text-gray-500 text-sm">Спальни</div>
                      <div className="font-bold text-lg">{property.bedrooms}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-500 text-sm">Ванные</div>
                      <div className="font-bold text-lg">{property.bathrooms}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-500 text-sm">Площадь</div>
                      <div className="font-bold text-lg">{property.area} м²</div>
                    </div>
                  </div>

                  {/* Табы с информацией */}
                  <div className="border-b border-gray-200 mb-6">
                    <div className="flex overflow-x-auto">
                      {[
                        { id: 'description', label: 'Описание' },
                        { id: 'features', label: 'Удобства' },
                        { id: 'location', label: 'Расположение' },
                        { id: 'rules', label: 'Правила' },
                        { id: 'host', label: 'О хозяине' }
                      ].map(tab => (
                        <button
                          key={tab.id}
                          className={`px-6 py-3 font-medium text-sm ${activeTab === tab.id ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-gray-900'}`}
                          onClick={() => setActiveTab(tab.id)}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Содержимое активного таба */}
                  <div className="mb-8">
                    {activeTab === 'description' && (
                      <div>
                        <h2 className="text-xl font-bold text-dark mb-4">Об этом жилье</h2>
                        <div className="text-gray-600 whitespace-pre-line">
                          {property.description}
                        </div>
                      </div>
                    )}

                    {activeTab === 'features' && (
                      <div>
                        <h2 className="text-xl font-bold text-dark mb-4">Удобства и оснащение</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4">
                          {property.features.map((feature, index) => (
                            <div key={index} className="flex items-center">
                              <svg className="w-5 h-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                              </svg>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'location' && (
                      <div>
                        <h2 className="text-xl font-bold text-dark mb-4">Расположение</h2>
                        
                        {/* Заглушка для карты */}
                        <div className="bg-gray-200 rounded-lg w-full h-80 mb-6 flex items-center justify-center text-gray-500">
                          Здесь будет карта расположения объекта
                        </div>
                        
                        <h3 className="font-bold text-dark mb-2">Что находится поблизости</h3>
                        <ul className="space-y-2">
                          {property.nearbyAttractions.map((attraction, index) => (
                            <li key={index} className="flex items-start">
                              <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                              </svg>
                              <span>{attraction}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {activeTab === 'rules' && (
                      <div>
                        <h2 className="text-xl font-bold text-dark mb-4">Правила дома</h2>
                        <ul className="space-y-2 mb-6">
                          {property.rules.map((rule, index) => (
                            <li key={index} className="flex items-start">
                              <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                              </svg>
                              <span>{rule}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <h2 className="text-xl font-bold text-dark mb-4">Политика отмены</h2>
                        <p className="text-gray-600">
                          {property.cancelPolicy}
                        </p>
                      </div>
                    )}

                    {activeTab === 'host' && (
                      <div>
                        <h2 className="text-xl font-bold text-dark mb-4">О хозяине</h2>
                        <div className="flex items-start mb-6">
                          <div className="mr-4">
                            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
                              Фото
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{property.hostInfo.name}</h3>
                            <p className="text-gray-600">На сайте с {property.hostInfo.joinedDate}</p>
                            
                            {property.hostInfo.isSuperHost && (
                              <div className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full mt-2">
                                Суперхозяин
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <div className="mb-2">
                              <span className="font-medium">Языки: </span>
                              <span>{property.hostInfo.languages.join(', ')}</span>
                            </div>
                            <div className="mb-2">
                              <span className="font-medium">Частота ответов: </span>
                              <span>{property.hostInfo.responseRate}%</span>
                            </div>
                            <div className="mb-2">
                              <span className="font-medium">Время ответа: </span>
                              <span>{property.hostInfo.responseTime}</span>
                            </div>
                          </div>
                          <div className="bg-light p-4 rounded-lg">
                            <p className="text-gray-600">
                              Я помогу вам сделать ваш отдых на Пхукете незабываемым! Всегда готов ответить на ваши вопросы и дать рекомендации о местных достопримечательностях, ресторанах и пляжах.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Форма бронирования */}
                <div>
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 sticky top-4">
                    <div className="mb-4">
                      <div className="flex items-baseline mb-2">
                        <span className="text-primary font-bold text-2xl">{property.price} {property.currency}</span>
                        <span className="text-gray-500 text-sm ml-1">/ {property.priceUnit}</span>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4 mb-4">
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Заезд</label>
                          <input 
                            type="date" 
                            className="w-full p-2 border rounded-md" 
                            value={checkInDate}
                            onChange={(e) => setCheckInDate(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Выезд</label>
                          <input 
                            type="date" 
                            className="w-full p-2 border rounded-md" 
                            value={checkOutDate}
                            onChange={(e) => setCheckOutDate(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Гости</label>
                        <div className="flex items-center">
                          <button 
                            className="w-10 h-10 rounded-l-md border border-gray-300 flex items-center justify-center"
                            onClick={() => setGuests(prev => Math.max(1, prev - 1))}
                          >
                            -
                          </button>
                          <input 
                            type="number" 
                            className="w-16 h-10 border-t border-b border-gray-300 text-center" 
                            value={guests} 
                            onChange={(e) => setGuests(Math.max(1, Math.min(property.capacity, parseInt(e.target.value) || 1)))}
                            max={property.capacity}
                          />
                          <button 
                            className="w-10 h-10 rounded-r-md border border-gray-300 flex items-center justify-center"
                            onClick={() => setGuests(prev => Math.min(property.capacity, prev + 1))}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <span>{property.price} {property.currency} × {checkInDate && checkOutDate ? calculateDays() : '0'} ночей</span>
                        <span>{calculateTotalPrice()} {property.currency}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Сбор за услуги</span>
                        <span>1500 {property.currency}</span>
                      </div>
                      <div className="border-t border-gray-200 my-3"></div>
                      <div className="flex justify-between font-bold">
                        <span>Итого</span>
                        <span>{calculateTotalPrice() + 1500} {property.currency}</span>
                      </div>
                    </div>

                    <button 
                      className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-medium transition-colors"
                      onClick={handleBooking}
                    >
                      Забронировать
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
  
  function calculateDays() {
    if (!checkInDate || !checkOutDate) return 0;
    
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  }
} 