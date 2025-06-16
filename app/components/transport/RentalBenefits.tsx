'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { Shield, Clock, CreditCard, BadgeCheck, Repeat, Car, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

interface RentalBenefitsProps {
  hasAnimated: boolean;
}

export const RentalBenefits: React.FC<RentalBenefitsProps> = ({ hasAnimated }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const benefits = [
    {
      icon: <Shield className="w-10 h-10 text-primary" />,
      title: 'Страховка включена',
      description: 'Все транспортные средства застрахованы на случай повреждений и угона',
    },
    {
      icon: <Clock className="w-10 h-10 text-primary" />,
      title: 'Быстрая доставка',
      description: 'Доставим транспорт в любую точку Пхукета в течение 2 часов',
    },
    {
      icon: <CreditCard className="w-10 h-10 text-primary" />,
      title: 'Гибкая оплата',
      description: 'Принимаем различные способы оплаты, включая криптовалюту',
    },
    {
      icon: <BadgeCheck className="w-10 h-10 text-primary" />,
      title: 'Проверенный транспорт',
      description: 'Все транспортные средства проходят техническую проверку',
    },
    {
      icon: <Repeat className="w-10 h-10 text-primary" />,
      title: 'Легкая замена',
      description: 'В случае поломки предоставляем замену в течение 24 часов',
    },
    {
      icon: <Phone className="w-10 h-10 text-primary" />,
      title: '24/7 поддержка',
      description: 'Круглосуточная поддержка на русском и английском языках',
    },
  ];

  // Анимация для карточек
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
      }
    })
  };

  // Анимация для изображения
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
      }
    }
  };

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-xl"
           style={{animation: 'float 15s infinite ease-in-out'}}></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-xl"
           style={{animation: 'float 20s infinite ease-in-out reverse'}}></div>
      
      {/* Анимированные частицы */}
      {[...Array(8)].map((_, i) => (
        <div 
          key={`particle-${i}`}
          className="absolute rounded-full bg-primary opacity-10"
          style={{
            width: Math.random() * 8 + 4 + 'px',
            height: Math.random() * 8 + 4 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            animation: `floatParticle ${Math.random() * 20 + 10}s infinite ease-in-out`,
            animationDelay: `${Math.random() * 5}s`
          }}
        ></div>
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16">
          <h2 className={`text-4xl font-bold mb-6 transition-all duration-700 ${
            headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Преимущества аренды с нами
            <span className="inline-block ml-2 relative">
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-ping"></span>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
            </span>
          </h2>
          <p className={`text-xl text-gray-600 transition-all duration-700 delay-100 ${
            headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Мы делаем всё, чтобы ваша поездка по Пхукету была комфортной, безопасной и запоминающейся
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  custom={idx}
                  initial="hidden"
                  animate={inView && hasAnimated ? "visible" : "hidden"}
                  variants={cardVariants}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="bg-primary/10 p-3 rounded-lg inline-flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                  
                  {/* Линия подчеркивания, которая анимируется при наведении */}
                  <div className="w-0 h-0.5 bg-primary mt-3 group-hover:w-2/3 transition-all duration-300"></div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            className="order-1 lg:order-2 relative"
            initial="hidden"
            animate={inView && hasAnimated ? "visible" : "hidden"}
            variants={imageVariants}
          >
            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl transform transition-transform hover:scale-[1.02] duration-500">
              <Image 
                src="/images/transport/car-benefits.jpg" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                alt="Аренда транспорта на Пхукете" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-white text-2xl font-bold mb-2">Безопасность и комфорт</h3>
                <p className="text-white/90">Мы гарантируем качество и надежность всех транспортных средств</p>
                
                <div className="flex items-center mt-6 space-x-4">
                  <div className="bg-white/20 backdrop-blur-md p-3 rounded-full">
                    <Car className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold">300+</div>
                    <div className="text-white/80 text-sm">Транспортных средств</div>
                  </div>
                </div>
              </div>
              
              {/* Плавающие элементы декора */}
              <div className="absolute top-8 right-8 w-20 h-20 rounded-full border-2 border-white/30 animate-pulse"></div>
              <div className="absolute top-4 left-4 w-3 h-3 bg-primary rounded-full animate-ping"></div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, 20px); }
        }
        
        @keyframes floatParticle {
          0% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-50px) translateX(20px); }
          50% { transform: translateY(-20px) translateX(-20px); }
          75% { transform: translateY(50px) translateX(30px); }
          100% { transform: translateY(0) translateX(0); }
        }
      `}</style>
    </section>
  );
}; 