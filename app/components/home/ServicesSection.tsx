import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      id: 'real-estate',
      title: 'Аренда недвижимости',
      description: 'Широкий выбор апартаментов, вилл и домов для краткосрочной и долгосрочной аренды на Пхукете',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
          <path d="M19.006 3.705a.75.75 0 00-.512-1.41L6 6.838V3a.75.75 0 00-.75-.75h-1.5A.75.75 0 003 3v4.93l-1.006.365a.75.75 0 00.512 1.41l16.5-6z" />
          <path fillRule="evenodd" d="M3.019 11.115L18 5.667V9.09l4.006 1.456a.75.75 0 11-.512 1.41l-.494-.18v8.475h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3v-9.129l.019-.006zM18 20.25v-9.565l1.5.545v9.02H18zm-9-6a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75H9z" clipRule="evenodd" />
        </svg>
      ),
      link: '/real-estate',
      bgClass: 'bg-gradient-to-br from-dark to-dark-light',
    },
    {
      id: 'transport',
      title: 'Аренда транспорта',
      description: 'Автомобили, мотоциклы, скутеры и водный транспорт для комфортного передвижения по острову',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
          <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" />
          <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725H15.75z" />
          <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
        </svg>
      ),
      link: '/transport',
      bgClass: 'bg-gradient-to-br from-dark to-dark-light',
    },
    {
      id: 'tours',
      title: 'Экскурсии',
      description: 'Увлекательные экскурсии по Пхукету и соседним островам с опытными русскоговорящими гидами',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
          <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
      ),
      link: '/tours',
      bgClass: 'bg-gradient-to-br from-dark to-dark-light',
    },
    {
      id: 'transfer',
      title: 'Трансферы',
      description: 'Комфортные трансферы из аэропорта в отель и обратно, а также между различными точками острова',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
          <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
        </svg>
      ),
      link: '/transfer',
      bgClass: 'bg-gradient-to-br from-dark to-dark-light',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Наши услуги</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Все, что нужно для идеального отдыха на Пхукете в одном месте
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="relative overflow-hidden rounded-xl shadow-lg group"
            >
              <div className={`${service.bgClass} p-6 h-full`}>
                <div className="mb-6 text-primary">{service.icon}</div>
                <h3 className="text-xl font-semibold text-secondary mb-3">{service.title}</h3>
                <p className="text-secondary-light mb-8">{service.description}</p>
                
                <Link 
                  href={service.link} 
                  className="inline-flex items-center text-primary hover:text-primary-light"
                >
                  <span className="mr-2">Подробнее</span>
                  <ArrowRight size={16} />
                </Link>
                
                {/* Декоративные элементы в стиле логотипа */}
                <div className="absolute top-4 right-4 opacity-10">
                  <svg className="w-24 h-24" viewBox="0 0 100 100" fill="currentColor">
                    {service.id === 'real-estate' && (
                      <path d="M50,10 L90,40 L90,90 L10,90 L10,40 Z M30,60 L30,80 L45,80 L45,60 Z M55,60 L55,80 L70,80 L70,60 Z" className="text-primary" />
                    )}
                    {service.id === 'transport' && (
                      <path d="M20,50 Q50,20 80,50 Q50,80 20,50 Z M40,40 L60,40 L70,60 L30,60 Z M35,70 A5,5 0 1,0 25,70 A5,5 0 1,0 35,70 Z M75,70 A5,5 0 1,0 65,70 A5,5 0 1,0 75,70 Z" className="text-primary" />
                    )}
                    {service.id === 'tours' && (
                      <path d="M50,10 A40,40 0 1,0 50,90 A40,40 0 1,0 50,10 Z M50,30 A20,20 0 1,0 50,70 A20,20 0 1,0 50,30 Z M30,20 L20,10 Z M70,20 L80,10 Z M20,70 L10,80 Z M80,80 L70,70 Z" className="text-primary" />
                    )}
                    {service.id === 'transfer' && (
                      <path d="M50,10 C25,10 10,30 10,50 C10,75 30,90 50,90 C70,90 90,75 90,50 C90,30 75,10 50,10 Z M50,30 A20,20 0 1,0 50,70 A20,20 0 1,0 50,30 Z" className="text-primary" />
                    )}
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 