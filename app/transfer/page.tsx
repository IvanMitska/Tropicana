'use client';

import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';

export default function TransferPage() {
  const [isDemoMode] = useState(true);
  const [transferType, setTransferType] = useState('airport');
  const [direction, setDirection] = useState('arrival');

  return (
    <MainLayout>
      {isDemoMode ? (
        // Режим разработки - показываем заглушку
        <main className="min-h-screen bg-light py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4">Трансферы на Пхукете</h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Комфортные трансферы из аэропорта и между популярными местами Пхукета
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-8 mb-16">
              <div className="text-center p-12">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24 mx-auto text-primary mb-6 opacity-50">
                  <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" />
                  <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725H15.75z" />
                  <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                </svg>
                <h2 className="text-2xl font-medium text-dark mb-4">Раздел в разработке</h2>
                <p className="text-gray-600 mb-8">
                  Мы сейчас активно работаем над наполнением этого раздела. Скоро здесь появятся все варианты трансферов с бронированием онлайн.
                </p>
                <a href="/" className="inline-block bg-primary text-white py-3 px-8 rounded-full font-medium text-lg shadow-md hover:bg-primary-dark transition-colors duration-300">
                  Вернуться на главную
                </a>
              </div>
            </div>
          </div>
        </main>
      ) : (
        // Основной контент с новыми стилями
        <div className="bg-light py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-dark text-center mb-8">Трансферы на Пхукете</h1>
            
            {/* Форма бронирования трансфера */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-dark mb-6">Забронировать трансфер</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Тип трансфера</h3>
                  <div className="flex gap-4">
                    <button 
                      className={`flex-1 py-3 px-4 rounded-lg ${transferType === 'airport' ? 'bg-primary text-white' : 'bg-light text-dark'}`}
                      onClick={() => setTransferType('airport')}
                    >
                      Аэропорт Пхукета
                    </button>
                    <button 
                      className={`flex-1 py-3 px-4 rounded-lg ${transferType === 'hotel' ? 'bg-primary text-white' : 'bg-light text-dark'}`}
                      onClick={() => setTransferType('hotel')}
                    >
                      Между отелями
                    </button>
                  </div>
                </div>
                
                {transferType === 'airport' && (
                  <div>
                    <h3 className="text-lg font-medium mb-4">Направление</h3>
                    <div className="flex gap-4">
                      <button 
                        className={`flex-1 py-3 px-4 rounded-lg ${direction === 'arrival' ? 'bg-primary text-white' : 'bg-light text-dark'}`}
                        onClick={() => setDirection('arrival')}
                      >
                        Из аэропорта
                      </button>
                      <button 
                        className={`flex-1 py-3 px-4 rounded-lg ${direction === 'departure' ? 'bg-primary text-white' : 'bg-light text-dark'}`}
                        onClick={() => setDirection('departure')}
                      >
                        В аэропорт
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {transferType === 'airport' ? (
                  <>
                    {direction === 'arrival' ? (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Дата и время прилёта</label>
                          <input type="datetime-local" className="w-full p-2 border rounded-md" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Номер рейса</label>
                          <input type="text" placeholder="Например, SU0274" className="w-full p-2 border rounded-md" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Место назначения</label>
                          <select className="w-full p-2 border rounded-md">
                            <option>Выберите район</option>
                            <option>Патонг</option>
                            <option>Карон</option>
                            <option>Ката</option>
                            <option>Камала</option>
                            <option>Банг Тао</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Адрес или название отеля</label>
                          <input type="text" placeholder="Введите адрес или название отеля" className="w-full p-2 border rounded-md" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Дата и время вылета</label>
                          <input type="datetime-local" className="w-full p-2 border rounded-md" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Номер рейса</label>
                          <input type="text" placeholder="Например, SU0275" className="w-full p-2 border rounded-md" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Место отправления</label>
                          <select className="w-full p-2 border rounded-md">
                            <option>Выберите район</option>
                            <option>Патонг</option>
                            <option>Карон</option>
                            <option>Ката</option>
                            <option>Камала</option>
                            <option>Банг Тао</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Адрес или название отеля</label>
                          <input type="text" placeholder="Введите адрес или название отеля" className="w-full p-2 border rounded-md" />
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Откуда</label>
                      <div className="grid grid-cols-2 gap-2">
                        <select className="w-full p-2 border rounded-md">
                          <option>Выберите район</option>
                          <option>Патонг</option>
                          <option>Карон</option>
                          <option>Ката</option>
                          <option>Камала</option>
                          <option>Банг Тао</option>
                        </select>
                        <input type="text" placeholder="Название отеля" className="w-full p-2 border rounded-md" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Куда</label>
                      <div className="grid grid-cols-2 gap-2">
                        <select className="w-full p-2 border rounded-md">
                          <option>Выберите район</option>
                          <option>Патонг</option>
                          <option>Карон</option>
                          <option>Ката</option>
                          <option>Камала</option>
                          <option>Банг Тао</option>
                        </select>
                        <input type="text" placeholder="Название отеля" className="w-full p-2 border rounded-md" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Дата и время</label>
                      <input type="datetime-local" className="w-full p-2 border rounded-md" />
                    </div>
                  </>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Количество пассажиров</label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="block text-xs text-gray-600 mb-1">Взрослые</label>
                      <select className="w-full p-2 border rounded-md">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs text-gray-600 mb-1">Дети (до 12 лет)</label>
                      <select className="w-full p-2 border rounded-md">
                        {[0, 1, 2, 3, 4].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Имя и фамилия</label>
                  <input type="text" placeholder="Ваше имя и фамилия" className="w-full p-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                  <input type="tel" placeholder="+7" className="w-full p-2 border rounded-md" />
                </div>
              </div>
              
              <div className="text-center">
                <button className="bg-primary hover:bg-primary-dark text-white py-3 px-8 rounded-lg font-medium text-lg transition-colors">
                  Рассчитать стоимость
                </button>
              </div>
            </div>
            
            {/* Типы трансферов */}
            <h2 className="text-2xl font-bold text-dark mb-6">Выберите тип трансфера</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  title: 'Эконом',
                  description: 'Комфортабельный седан для 1-3 пассажиров',
                  price: '700',
                  features: ['Седан', 'До 3 пассажиров', 'Кондиционер', 'Бесплатная вода']
                },
                {
                  title: 'Комфорт',
                  description: 'Просторный минивэн для небольшой компании',
                  price: '1200',
                  features: ['Минивэн', 'До 6 пассажиров', 'Кондиционер', 'Бесплатная вода', 'Wi-Fi']
                },
                {
                  title: 'VIP',
                  description: 'Премиальный транспорт для требовательных клиентов',
                  price: '2500',
                  features: ['Бизнес-класс', 'До 4 пассажиров', 'Премиум сервис', 'Русскоговорящий водитель', 'Прохладительные напитки']
                }
              ].map((option, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-dark mb-2">{option.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{option.description}</p>
                  <div className="mb-4">
                    <span className="text-primary font-bold text-2xl">{option.price} ฿</span>
                    <span className="text-gray-500 text-sm"> / в одну сторону</span>
                  </div>
                  <ul className="text-sm text-gray-600 mb-6">
                    {option.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center mb-2">
                        <svg className="w-4 h-4 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg transition-colors">
                    Выбрать
                  </button>
                </div>
              ))}
            </div>
            
            {/* Информация о трансферах */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-12">
              <h2 className="text-2xl font-bold text-dark mb-6">Информация о трансферах</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-medium text-dark mb-4">Что включено</h3>
                  <ul className="space-y-2">
                    {[
                      'Встреча в аэропорту с табличкой',
                      'Помощь с багажом',
                      'Комфортабельный транспорт',
                      'Кондиционер',
                      'Бесплатная питьевая вода',
                      'Страховка пассажиров',
                      'Профессиональный водитель'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-dark mb-4">Почему стоит выбрать наш трансфер</h3>
                  <p className="text-gray-600 mb-4">
                    Прилетая в новую страну, важно начать отдых без стресса. Наш сервис трансферов обеспечивает:
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    {[
                      'Фиксированная цена без скрытых платежей',
                      'Отслеживание рейса и ожидание при задержке',
                      'Гарантированная подача машины',
                      'Надёжный транспорт и проверенные водители',
                      '24/7 поддержка на русском языке'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
} 