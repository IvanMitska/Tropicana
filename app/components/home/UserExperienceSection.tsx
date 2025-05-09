import React from 'react';
import Image from 'next/image';

const UserExperienceSection = () => {
  const steps = [
    {
      id: 1,
      title: 'Выберите услугу',
      description: 'Просмотрите каталог недвижимости, транспорта или экскурсий и выберите то, что подходит именно вам',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
          <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Забронируйте',
      description: 'Выберите даты, заполните необходимую информацию и оплатите бронирование онлайн',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
          <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
          <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Получите подтверждение',
      description: 'Мы отправим вам подтверждение бронирования с деталями по электронной почте',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
          <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clipRule="evenodd" />
          <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zm9.586 4.594a.75.75 0 00-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 00-1.06 1.06l1.5 1.5a.75.75 0 001.116-.062l3-3.75z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      id: 4,
      title: 'Наслаждайтесь Пхукетом',
      description: 'Отдыхайте без забот с нашей круглосуточной поддержкой на русском языке',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
          <path d="M15.75 8.25a.75.75 0 01.75.75c0 1.12-.492 2.126-1.27 2.812a.75.75 0 11-.992-1.124A2.243 2.243 0 0015 9a.75.75 0 01.75-.75z" />
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM4.575 15.6a8.25 8.25 0 009.348 4.425 1.966 1.966 0 00-1.84-1.275.983.983 0 01-.97-.822l-.073-.437c-.094-.565.25-1.11.8-1.267l.99-.282c.427-.123.783-.418.982-.816l.036-.073a1.453 1.453 0 012.328-.377L16.5 15h.628a2.25 2.25 0 011.983 1.186 8.25 8.25 0 00-6.345-12.4c.044.262.18.503.389.658l1.553 1.162a.75.75 0 11-.9 1.2L12 6.75l-1.553.934a.75.75 0 11-.768-1.286l2.25-1.35a.75.75 0 11.85 1.174l.165.123a.75.75 0 01.037 1.042l-.456.527a.75.75 0 01-.574.256h-1.95a.75.75 0 00-.574.256l-.458.529a.75.75 0 01-1.148-.208L6.5 7.697l-.01-.015a.75.75 0 01.148-.863l.858-.857a.75.75 0 01.148-.144A8.25 8.25 0 014.575 15.6z" clipRule="evenodd" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Как это работает</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Простой процесс бронирования всего за 4 шага
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="relative">
              {/* Соединяющая линия между шагами (на десктопах) */}
              {step.id < steps.length && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-primary-light" style={{ width: 'calc(100% - 3rem)' }}></div>
              )}
              
              <div className="bg-white rounded-xl shadow-md p-8 border-t-4 border-primary relative z-10 transition-all duration-300 hover:shadow-lg">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary-light text-primary">
                    {step.icon}
                  </div>
                </div>
                
                <div className="absolute -top-4 -left-4 bg-primary text-white text-lg font-bold rounded-full w-8 h-8 flex items-center justify-center">
                  {step.id}
                </div>
                
                <h3 className="text-xl font-semibold text-center text-dark mb-4">{step.title}</h3>
                <p className="text-center text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-primary text-white py-3 px-8 rounded-full font-medium text-lg shadow-md hover:bg-primary-dark transition-colors duration-300 cursor-pointer">
            Начать бронирование
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserExperienceSection; 