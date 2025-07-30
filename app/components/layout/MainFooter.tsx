'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Instagram,
  MessageCircle,
  ArrowUp,
  Building,
  Car,
  Compass,
  Heart,
  ChevronUp,
  Youtube
} from 'lucide-react';

const MainFooter = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Градиентный фон в фирменных цветах */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-light to-dark"></div>
      
      {/* Декоративные элементы в фирменных цветах */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#22A699]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#F2BE22]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#22A699]/5 rounded-full blur-2xl"></div>
      </div>
        
      {/* Анимированные частицы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, idx) => (
          <div
            key={`particle-${idx}`}
            className="absolute bg-[#22A699]/20 rounded-full animate-float"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 20}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 text-white pt-8 md:pt-16 pb-6 md:pb-8">
        <div className="container mx-auto px-4">
          {/* Мобильная версия футера */}
          <div className="block md:hidden px-6">
            <div className="max-w-sm mx-auto space-y-8">
              {/* Описание компании */}
              <div className="text-center space-y-6">
                <p className="text-gray-300 text-sm leading-relaxed">
                  Мы создаем незабываемые впечатления на Пхукете, предлагая лучшую недвижимость, 
                  надежный транспорт и захватывающие экскурсии для вашего идеального отдыха.
                </p>
                
                {/* Социальные сети */}
                              <div className="flex justify-center space-x-4">
                {[
                  { icon: Facebook, href: "https://facebook.com", color: "hover:bg-[#1877F2]" },
                  { icon: Instagram, href: "https://www.instagram.com/phuket.dream.online/", color: "hover:bg-[#E4405F]" },
                  { icon: MessageCircle, href: "https://t.me/phuket_dream", color: "hover:bg-[#229ED9]" },
                  { icon: Youtube, href: "https://www.youtube.com/@Phuket_dream.online/shorts", color: "hover:bg-[#FF0000]" }
                ].map(({ icon: Icon, href, color }, index) => (
                    <a 
                      key={index}
                      href={href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg ${color} group`}
                    >
                      <Icon size={20} className="text-white group-hover:scale-110 transition-transform duration-300" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Услуги - простой центрированный список */}
              <div className="text-center">
                <h3 className="text-lg font-bold text-white mb-6">
                  Наши услуги
                </h3>
                <div className="space-y-3">
                  {[
                    { href: "/real-estate", text: "Недвижимость" },
                    { href: "/transport", text: "Транспорт" },
                    { href: "/tours", text: "Экскурсии" },
                    { href: "/transfer", text: "Трансферы" }
                  ].map((item, index) => (
                    <Link 
                      key={index}
                      href={item.href} 
                      className="block bg-white/5 hover:bg-white/10 text-white hover:text-[#22A699] py-3 px-4 rounded-lg transition-all duration-300 font-medium text-sm"
                    >
                      {item.text}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Контактная информация - центрированная */}
              <div className="text-center">
                <h3 className="text-lg font-bold text-white mb-6">
                  Свяжитесь с нами
                </h3>
                <div className="space-y-4 text-left">
                  {[
                    { 
                      icon: MapPin, 
                      text: "Таиланд, Пхукет, Патонг Бич", 
                      color: "text-[#22A699]",
                      bgColor: "bg-[#22A699]/20"
                    },
                    { 
                      icon: Phone, 
                      text: "+66 99 489 29 17", 
                      href: "tel:+66994892917",
                      color: "text-[#F2BE22]",
                      bgColor: "bg-[#F2BE22]/20"
                    },
                    { 
                      icon: Mail, 
                      text: "info@tropicana.com", 
                      href: "mailto:info@tropicana.com",
                      color: "text-[#22A699]",
                      bgColor: "bg-[#22A699]/20"
                    },
                    { 
                      icon: Clock, 
                      text: "Ежедневно: 09:00 - 21:00", 
                      color: "text-[#F2BE22]",
                      bgColor: "bg-[#F2BE22]/20"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 group">
                      <div className={`w-10 h-10 ${item.bgColor} rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 flex-shrink-0`}>
                        <item.icon size={18} className={`${item.color} transition-colors duration-300`} />
                      </div>
                      <div className="flex-1 text-left">
                        {item.href ? (
                          <a 
                            href={item.href} 
                            className="text-gray-300 hover:text-white transition-colors duration-300 text-sm block"
                          >
                            {item.text}
                          </a>
                        ) : (
                          <span className="text-gray-300 text-sm block">{item.text}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Десктопная версия футера (без изменений) */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
            {/* Информация о компании */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6 text-center md:text-left">
              
              <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-md mx-auto md:mx-0">
                Мы создаем незабываемые впечатления на Пхукете, предлагая лучшую недвижимость, 
                надежный транспорт и захватывающие экскурсии для вашего идеального отдыха.
              </p>
              
              {/* Социальные сети с современным дизайном */}
              <div className="flex space-x-3 md:space-x-4 justify-center md:justify-start">
                {[
                  { icon: Facebook, href: "https://facebook.com", color: "hover:bg-[#1877F2]" },
                  { icon: Instagram, href: "https://www.instagram.com/phuket.dream.online/", color: "hover:bg-[#E4405F]" },
                  { icon: MessageCircle, href: "https://t.me/phuket_dream", color: "hover:bg-[#229ED9]" },
                  { icon: Youtube, href: "https://www.youtube.com/@Phuket_dream.online/shorts", color: "hover:bg-[#FF0000]" }
                ].map(({ icon: Icon, href, color }, index) => (
                  <a 
                    key={index}
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`w-11 h-11 md:w-12 md:h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg ${color} group`}
                  >
                    <Icon size={18} className="md:w-5 md:h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* Быстрые ссылки */}
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent text-center md:text-left">
                Наши услуги
              </h3>
              <ul className="space-y-2 md:space-y-3">
                {[
                  { href: "/real-estate", text: "Недвижимость", desc: "Аренда и продажа", icon: Building },
                  { href: "/transport", text: "Транспорт", desc: "Авто и мотобайки", icon: Car },
                  { href: "/tours", text: "Экскурсии", desc: "Туры по острову", icon: Compass },
                  { href: "/transfer", text: "Трансферы", desc: "Из аэропорта", icon: Car }
                ].map((item, index) => (
                  <li key={index}>
                    <Link 
                      href={item.href} 
                      className="group flex items-center space-x-3 p-2 md:p-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:transform hover:translate-x-2"
                    >
                      <div className="w-9 h-9 md:w-10 md:h-10 bg-[#22A699]/20 rounded-lg flex items-center justify-center group-hover:bg-[#22A699]/30 transition-all flex-shrink-0">
                        <item.icon size={16} className="md:w-[18px] md:h-[18px] text-[#22A699]" />
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-white font-medium text-sm md:text-base group-hover:text-[#22A699] transition-colors duration-300">
                          {item.text}
                        </span>
                        <span className="text-gray-400 text-xs md:text-sm group-hover:text-gray-300 transition-colors duration-300">
                          {item.desc}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Контактная информация */}
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent text-center md:text-left">
                Свяжитесь с нами
              </h3>
              <div className="space-y-3 md:space-y-4">
                {[
                  { 
                    icon: MapPin, 
                    text: "Таиланд, Пхукет\nПатонг Бич", 
                    color: "text-[#22A699]",
                    bgColor: "bg-[#22A699]/20"
                  },
                  { 
                    icon: Phone, 
                    text: "+66 99 489 29 17", 
                    href: "tel:+66994892917",
                    color: "text-[#F2BE22]",
                    bgColor: "bg-[#F2BE22]/20"
                  },
                  { 
                    icon: Mail, 
                                      text: "info@tropicana.com",
                  href: "mailto:info@phuketdream.com",
                    color: "text-[#22A699]",
                    bgColor: "bg-[#22A699]/20"
                  },
                  { 
                    icon: Clock, 
                    text: "Ежедневно\n09:00 - 21:00", 
                    color: "text-[#F2BE22]",
                    bgColor: "bg-[#F2BE22]/20"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 md:space-x-4 group">
                    <div className={`w-10 h-10 md:w-12 md:h-12 ${item.bgColor} rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 flex-shrink-0`}>
                      <item.icon size={18} className={`md:w-5 md:h-5 ${item.color} transition-colors duration-300`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      {item.href ? (
                        <a 
                          href={item.href} 
                          className="text-gray-300 hover:text-white transition-colors duration-300 whitespace-pre-line text-sm md:text-base block"
                        >
                          {item.text}
                        </a>
                      ) : (
                        <span className="text-gray-300 whitespace-pre-line text-sm md:text-base block">{item.text}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Разделительная линия с градиентом */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6 md:mb-8"></div>
          
          {/* Нижняя секция футера */}
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex items-center justify-center space-x-2 text-gray-400 text-xs md:text-sm text-center">
                              <span>© {new Date().getFullYear()} Tropicana. Создано с</span>
              <Heart size={14} className="md:w-4 md:h-4 text-red-500 animate-pulse" />
              <span>для вашего комфорта</span>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-end items-center space-x-4 md:space-x-6 text-xs md:text-sm">
              <Link 
                href="/privacy" 
                className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline"
              >
                Конфиденциальность
              </Link>
              <Link 
                href="/terms" 
                className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline"
              >
                Условия использования
              </Link>
              <Link 
                href="/sitemap" 
                className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline"
              >
                Карта сайта
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Кнопка "Наверх" - современный дизайн */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 md:bottom-8 right-4 md:right-8 z-50 group"
          aria-label="Наверх"
        >
          {/* Основная кнопка */}
          <div className="relative w-12 h-12 md:w-14 md:h-14 bg-white shadow-lg border border-gray-200 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-[#22A699]/30 hover:border-[#22A699]/30">
            {/* Градиентная иконка */}
            <div className="w-5 h-5 md:w-6 md:h-6 bg-gradient-to-r from-[#22A699] to-[#F2BE22] rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
              <ChevronUp size={14} className="md:w-4 md:h-4 text-white group-hover:-translate-y-0.5 transition-transform duration-300" />
            </div>
            
            {/* Эффект свечения при hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#22A699]/20 to-[#F2BE22]/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
          </div>
          
          {/* Подсказка - скрыта на мобильных */}
          <div className="hidden md:block absolute bottom-full right-0 mb-3 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 whitespace-nowrap shadow-lg">
            Наверх
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
          </div>
        </button>
      )}
      

    </footer>
  );
};

export default MainFooter;