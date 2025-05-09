'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FaqSection = () => {
  const [openItem, setOpenItem] = useState<number | null>(0);
  
  const faqItems = [
    {
      id: 1,
      question: 'Как забронировать жилье на Пхукете?',
      answer: 'Бронирование жилья на нашей платформе очень простое. Найдите подходящий вариант в каталоге, выберите даты заезда и выезда, укажите количество гостей и нажмите кнопку "Забронировать". После этого вы сможете оплатить бронирование онлайн и получить подтверждение на указанный вами email.',
    },
    {
      id: 2,
      question: 'Как арендовать транспорт на Пхукете?',
      answer: 'Мы предлагаем различные виды транспорта: автомобили, скутеры, мотоциклы. Выберите нужный вариант в соответствующем разделе, укажите даты аренды и забронируйте онлайн. Транспорт будет доставлен в указанное вами место в оговоренное время.',
    },
    {
      id: 3,
      question: 'Можно ли отменить бронирование?',
      answer: 'Да, вы можете отменить бронирование. Условия отмены и возврата средств различаются в зависимости от выбранного варианта. Подробные условия отмены указаны на странице бронирования конкретного объекта или услуги.',
    },
    {
      id: 4,
      question: 'Нужен ли залог при аренде жилья или транспорта?',
      answer: 'В большинстве случаев при аренде требуется залог. Размер залога указан на странице конкретного объекта. При бронировании через нашу платформу вы можете внести залог онлайн, что упрощает процесс заселения или получения транспорта.',
    },
    {
      id: 5,
      question: 'На каких языках доступны экскурсии?',
      answer: 'На нашей платформе представлены экскурсии с русскоговорящими гидами. При бронировании вы можете указать предпочитаемый язык. В случае отсутствия гида на русском языке, мы предоставим услуги переводчика.',
    },
    {
      id: 6,
      question: 'Как связаться с поддержкой?',
      answer: 'Наша служба поддержки доступна 24/7. Вы можете связаться с нами по телефону, через чат на сайте или по электронной почте. Мы всегда готовы помочь вам с любыми вопросами, связанными с бронированием или пребыванием на Пхукете.',
    },
  ];

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Часто задаваемые вопросы</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Нашли ответы на популярные вопросы о бронировании и услугах на Пхукете
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqItems.map((item) => (
            <div key={item.id} className="mb-5">
              <div 
                className={`flex justify-between items-center p-5 rounded-t-xl cursor-pointer transition-colors ${
                  openItem === item.id ? 'bg-primary text-white' : 'bg-light hover:bg-light-dark'
                }`}
                onClick={() => toggleItem(item.id)}
              >
                <h3 className={`font-medium text-lg ${openItem === item.id ? 'text-white' : 'text-dark'}`}>
                  {item.question}
                </h3>
                <ChevronDown 
                  className={`transition-transform duration-300 ${
                    openItem === item.id ? 'transform rotate-180 text-white' : 'text-primary'
                  }`} 
                  size={20} 
                />
              </div>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out border-l border-r border-b border-gray-200 rounded-b-xl ${
                  openItem === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 bg-white text-gray-700">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="mb-4 text-gray-600">Не нашли ответ на свой вопрос?</p>
          <a 
            href="/contact" 
            className="inline-flex items-center justify-center bg-primary text-white py-3 px-8 rounded-full font-medium text-lg shadow-md hover:bg-primary-dark transition-colors duration-300"
          >
            Связаться с нами
          </a>
        </div>
      </div>
    </section>
  );
};

export default FaqSection; 