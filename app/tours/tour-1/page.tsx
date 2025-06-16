'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';

export default function TourDetailPage() {
  const [activeTab, setActiveTab] = useState('description');
  
  // Табы для навигации по странице
  const tabs = [
    { id: 'description', label: 'Описание' },
    { id: 'route', label: 'Маршрут' },
    { id: 'included', label: 'Включено в стоимость' },
    { id: 'reviews', label: 'Отзывы' }
  ];

  return (
    <MainLayout>
      <div className="bg-light pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Хлебные крошки */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <Link href="/" className="text-gray-500 hover:text-primary">
                Главная
              </Link>
              <span>→</span>
              <Link href="/tours" className="text-gray-500 hover:text-primary">
                Экскурсии
              </Link>
              <span>→</span>
              <span className="text-dark font-medium">Экскурсия на острова Пхи-Пхи</span>
            </div>
            <h1 className="text-3xl font-bold text-dark">Экскурсия на острова Пхи-Пхи</h1>
          </div>
          
          {/* Галерея изображений */}
          <div className="mb-8">
            <div className="h-96 bg-gradient-to-br from-dark-light to-dark flex items-center justify-center text-white text-opacity-70 rounded-lg">
              [Галерея изображений экскурсии]
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Основная информация (левая колонка) */}
            <div className="md:col-span-2">
              {/* Рейтинг и характеристики */}
              <div className="bg-white p-6 rounded-xl shadow-md mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="flex text-yellow-400 mr-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <svg 
                          key={star}
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-yellow-500 font-bold text-lg">4.8</span>
                    <span className="text-gray-500 ml-2">(24 отзыва)</span>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div>
                      <span className="block text-sm text-gray-500">Длительность</span>
                      <span className="font-semibold">8 ч.</span>
                    </div>
                    <div>
                      <span className="block text-sm text-gray-500">Языки</span>
                      <span className="font-semibold">Русский, Английский</span>
                    </div>
                    <div>
                      <span className="block text-sm text-gray-500">Группа до</span>
                      <span className="font-semibold">15 чел.</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">Морская</span>
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">Пляжный отдых</span>
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">Острова</span>
                </div>
              </div>
              
              {/* Вкладки с информацией */}
              <div className="bg-white rounded-xl shadow-md mb-6 overflow-hidden">
                {/* Навигация по вкладкам */}
                <div className="flex overflow-x-auto border-b">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'text-primary border-b-2 border-primary'
                          : 'text-gray-600 hover:text-primary'
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                
                {/* Содержимое вкладок */}
                <div className="p-6">
                  {/* Описание */}
                  {activeTab === 'description' && (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Описание</h2>
                      <p className="text-gray-700 whitespace-pre-line">
                        Увлекательное путешествие на знаменитые острова Пхи-Пхи, которые прославились благодаря фильму "Пляж" с Леонардо Ди Каприо. 
                        
                        Вы посетите живописную бухту Майя Бэй, где снимался фильм, насладитесь кристально чистой водой и белоснежными пляжами. 
                        
                        В программу входит:
                        - Посещение островов Пхи-Пхи Дон и Пхи-Пхи Лей
                        - Купание в живописных бухтах
                        - Обед в местном ресторане
                        - Возможность заняться снорклингом и увидеть красочный подводный мир
                        
                        Экскурсия проводится на комфортабельном катере со всем необходимым оборудованием. Наши русскоговорящие гиды расскажут вам об истории и особенностях этих удивительных островов.
                      </p>
                    </div>
                  )}
                  
                  {/* Маршрут */}
                  {activeTab === 'route' && (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Маршрут</h2>
                      <div className="mb-4 h-[400px] bg-gradient-to-br from-dark-light to-dark flex items-center justify-center text-white text-opacity-70 rounded-lg">
                        [Карта маршрута]
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex">
                          <div className="flex-shrink-0 w-10 flex flex-col items-center">
                            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-sm">
                              1
                            </div>
                            <div className="w-0.5 h-full bg-primary/20 ml-3"></div>
                          </div>
                          <div className="ml-4 pb-6">
                            <h3 className="text-lg font-medium">Пирс Чалонг</h3>
                            <p className="text-gray-600">Отправление на катере от пирса Чалонг на Пхукете</p>
                            <p className="text-sm text-gray-500 mt-1">Время: ~8:00</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 w-10 flex flex-col items-center">
                            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-sm">
                              2
                            </div>
                            <div className="w-0.5 h-full bg-primary/20 ml-3"></div>
                          </div>
                          <div className="ml-4 pb-6">
                            <h3 className="text-lg font-medium">Остров Пхи-Пхи Лей</h3>
                            <p className="text-gray-600">Посещение живописной бухты Майя Бэй и других красивых мест острова</p>
                            <p className="text-sm text-gray-500 mt-1">Время: ~10:00</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 w-10 flex flex-col items-center">
                            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-sm">
                              3
                            </div>
                            <div className="w-0.5 h-full bg-primary/20 ml-3"></div>
                          </div>
                          <div className="ml-4 pb-6">
                            <h3 className="text-lg font-medium">Остров Пхи-Пхи Дон</h3>
                            <p className="text-gray-600">Обед в местном ресторане, свободное время для пляжного отдыха</p>
                            <p className="text-sm text-gray-500 mt-1">Время: ~13:00</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 w-10 flex flex-col items-center">
                            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-sm">
                              4
                            </div>
                          </div>
                          <div className="ml-4 pb-6">
                            <h3 className="text-lg font-medium">Возвращение на Пхукет</h3>
                            <p className="text-gray-600">Отправление обратно на Пхукет</p>
                            <p className="text-sm text-gray-500 mt-1">Время: ~16:00</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Включено в стоимость */}
                  {activeTab === 'included' && (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Что входит в стоимость</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-green-600 font-semibold mb-2">Включено</h3>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>Трансфер из отеля и обратно</span>
                            </li>
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>Комфортабельный катер</span>
                            </li>
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>Русскоговорящий гид</span>
                            </li>
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>Обед в местном ресторане</span>
                            </li>
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>Прохладительные напитки на борту</span>
                            </li>
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>Страховка</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="text-red-600 font-semibold mb-2">Не включено</h3>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                              <span>Алкогольные напитки</span>
                            </li>
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                              <span>Личные расходы</span>
                            </li>
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                              <span>Аренда снаряжения для снорклинга (можно взять на месте)</span>
                            </li>
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                              <span>Чаевые гиду (по желанию)</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Отзывы */}
                  {activeTab === 'reviews' && (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Отзывы</h2>
                      
                      <div className="mb-6">
                        <div className="flex items-center mb-4">
                          <div className="text-4xl font-bold text-dark mr-4">4.8</div>
                          <div>
                            <div className="flex text-yellow-400 mb-1">
                              {[1, 2, 3, 4, 5].map(star => (
                                <svg 
                                  key={star}
                                  xmlns="http://www.w3.org/2000/svg" 
                                  viewBox="0 0 24 24" 
                                  fill="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                </svg>
                              ))}
                            </div>
                            <div className="text-sm text-gray-500">На основе 24 отзывов</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Примеры отзывов */}
                      <div className="space-y-6">
                        {[1, 2, 3].map(index => (
                          <div key={index} className="border-b pb-6 mb-6 last:border-b-0">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-dark-light to-dark flex items-center justify-center text-white mr-3">
                                  {index === 1 ? 'АК' : index === 2 ? 'ОЛ' : 'ИП'}
                                </div>
                                <div>
                                  <div className="font-medium">{index === 1 ? 'Анна К.' : index === 2 ? 'Олег Л.' : 'Ирина П.'}</div>
                                  <div className="text-sm text-gray-500">{index === 1 ? '12 мая 2023' : index === 2 ? '3 июня 2023' : '15 апреля 2023'}</div>
                                </div>
                              </div>
                              <div className="flex text-yellow-400">
                                {[1, 2, 3, 4, 5].map(star => (
                                  <svg 
                                    key={star}
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 24 24" 
                                    fill={star <= (index === 2 ? 4 : 5) ? 'currentColor' : 'none'}
                                    stroke={star > (index === 2 ? 4 : 5) ? 'currentColor' : 'none'}
                                    className="w-4 h-4"
                                  >
                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-700">
                              {index === 1 
                                ? 'Потрясающая экскурсия! Острова Пхи-Пхи действительно райское место. Очень красивые виды, кристально чистая вода. Гид Андрей был внимателен и интересно рассказывал. Рекомендую всем!'
                                : index === 2 
                                  ? 'Хорошая экскурсия, но было слишком много людей на пляже Майя Бэй. Обед был вкусный, катер комфортный. Снимаю одну звезду за то, что было мало времени на пляже.'
                                  : 'Великолепно! Лучшая экскурсия за всю поездку. Красивые места, профессиональная организация, вкусный обед. Обязательно посетите, если вы на Пхукете!'
                              }
                            </p>
                          </div>
                        ))}
                      </div>
                      
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg w-full mt-4">
                        Показать больше отзывов
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Боковая панель бронирования (правая колонка) */}
            <div>
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <div className="text-2xl font-bold text-primary mb-2">3 500 ฿</div>
                <div className="text-gray-500 text-sm mb-4">Цена за 1 человека</div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Дата</label>
                  <input type="date" className="w-full p-2 border rounded-md" />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Количество человек</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>1 человек</option>
                    <option selected>2 человека</option>
                    <option>3 человека</option>
                    <option>4 человека</option>
                    <option>5+ человек</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Точка отправления</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Пирс Чалонг</option>
                    <option>Пирс Раваи</option>
                    <option>Пирс Бангронг</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Дополнительные услуги</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="transfer" className="mr-2" />
                      <label htmlFor="transfer" className="text-sm">Трансфер из отеля (+500 ฿)</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="snorkel" className="mr-2" />
                      <label htmlFor="snorkel" className="text-sm">Аренда снаряжения для снорклинга (+300 ฿)</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="photo" className="mr-2" />
                      <label htmlFor="photo" className="text-sm">Фотосъемка (+1000 ฿)</label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center font-bold text-lg mb-4">
                  <div>Итого:</div>
                  <div className="text-primary">7 000 ฿</div>
                </div>
                
                <button className="w-full bg-primary hover:bg-primary-light text-white py-3 px-4 rounded-lg transition-colors font-medium">
                  Забронировать
                </button>
                
                <div className="mt-4">
                  <div className="flex items-center text-green-600 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Бесплатная отмена за 24 часа</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Моментальное подтверждение</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 