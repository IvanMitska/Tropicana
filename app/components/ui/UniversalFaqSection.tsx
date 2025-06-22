'use client';

import React, { useState, useEffect } from 'react';
import { PlusIcon, MinusIcon, Sparkles, HelpCircle } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  isPopular?: boolean;
  isNew?: boolean;
  color?: string;
}

interface UniversalFaqSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  faqItems: FaqItem[];
  backgroundClass?: string;
  showCta?: boolean;
  ctaText?: string;
  ctaLink?: string;
}

const UniversalFaqSection: React.FC<UniversalFaqSectionProps> = ({
  title = "Часто задаваемые вопросы",
  subtitle = "ВОПРОСЫ И ОТВЕТЫ",
  description = "Ответы на популярные вопросы о наших услугах",
  faqItems,
  backgroundClass = "bg-white",
  showCta = true,
  ctaText = "Связаться с нами",
  ctaLink = "/contacts"
}) => {
  const [openItem, setOpenItem] = useState<number | null>(0);
  const [animateBackground, setAnimateBackground] = useState(false);
  
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1
  });
  
  useEffect(() => {
    if (inView) {
      setAnimateBackground(true);
    }
  }, [inView]);

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };
  
  const getColorClass = (colorName: string = 'primary', opacity = 100) => {
    const baseColors: { [key: string]: string } = {
      primary: `rgb(var(--color-primary) / ${opacity}%)`,
      secondary: `rgb(var(--color-primary) / ${opacity}%)`,
      accent: `rgb(var(--color-primary) / ${opacity}%)`
    };
    
    return baseColors[colorName] || baseColors.primary;
  };

  return (
    <section className={`py-24 relative overflow-hidden ${backgroundClass}`}>
      {/* Анимированные декоративные элементы фона */}
      <div 
        className={`absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl transition-all duration-[2000ms] ease-in-out ${
          animateBackground ? '-translate-y-1/2 translate-x-1/2 opacity-100' : 'translate-y-0 translate-x-0 opacity-0'
        }`}
        style={{
          animationName: 'floatingBubble',
          animationDuration: '15s',
          animationIterationCount: 'infinite',
          animationTimingFunction: 'ease-in-out',
          animationDelay: '0.5s',
        }}
      ></div>
      <div 
        className={`absolute bottom-0 left-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl transition-all duration-[2000ms] ease-in-out ${
          animateBackground ? 'translate-y-1/2 -translate-x-1/2 opacity-100' : 'translate-y-0 translate-x-0 opacity-0'
        }`}
        style={{
          animationName: 'floatingBubble',
          animationDuration: '12s',
          animationIterationCount: 'infinite',
          animationTimingFunction: 'ease-in-out',
        }}
      ></div>
      
      {/* Анимированные плавающие элементы */}
      <div 
        className={`absolute top-40 left-1/4 w-10 h-10 border border-primary/10 rounded-full transition-all duration-[1500ms] ${
          animateBackground ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        style={{
          animationName: 'floating',
          animationDuration: '10s',
          animationIterationCount: 'infinite',
          animationTimingFunction: 'ease-in-out',
        }}
      ></div>
      <div 
        className={`absolute bottom-60 right-1/4 w-20 h-20 border border-primary/10 rounded-full transition-all duration-[1500ms] ${
          animateBackground ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        style={{
          animationName: 'floating',
          animationDuration: '8s',
          animationIterationCount: 'infinite',
          animationTimingFunction: 'ease-in-out',
          animationDelay: '0.5s',
        }}
      ></div>
      
      {/* Плавающие частицы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, idx) => (
          <div 
            key={`particle-${idx}`}
            className="absolute bg-primary rounded-full opacity-20"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationName: 'floatParticle',
              animationDuration: `${Math.random() * 15 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear',
              animationDirection: idx % 2 === 0 ? 'alternate' : 'alternate-reverse',
            }}
          ></div>
        ))}
      </div>
    
      <div ref={ref} className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block text-primary font-semibold mb-2 animate-pulse">{subtitle}</span>
          <h2 className="text-3xl md:text-5xl font-bold text-dark mb-6 relative overflow-hidden">
            <span className={`inline-block transition-all duration-700 delay-150 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {title}
            </span>
            <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary rounded-full transition-all duration-700 delay-500 ${inView ? 'w-32 opacity-100' : 'w-0 opacity-0'}`}></span>
          </h2>
          <p className={`text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-400 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            {description}
          </p>
          <div className={`flex items-center justify-center gap-2 mt-4 transition-all duration-700 delay-500 ${inView ? 'opacity-100' : 'opacity-0'}`}>
            <HelpCircle className="text-primary w-5 h-5" style={{
              animation: 'pulse 6s linear infinite'
            }} />
            <span className="text-gray-500 text-sm">Ответим на любые вопросы</span>
          </div>
        </div>

        <div className="space-y-6">
          {faqItems.map((item, index) => {
            return (
            <div 
              key={item.id} 
              className="transition-all duration-700 ease-out"
              style={{
                transitionDelay: `${index * 150}ms`,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(50px)'
              }}
            >
              <div 
                className={`border border-gray-100 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl bg-white group ${
                  openItem === item.id ? 'shadow-lg' : 'shadow-sm'
                }`}
                style={{ 
                  boxShadow: openItem === item.id 
                    ? `0 10px 30px ${getColorClass(item.color, 15)}` 
                    : '0 4px 6px rgba(0, 0, 0, 0.05)',
                  transform: openItem === item.id ? 'translateY(-5px)' : 'translateY(0)'
                }}
              >
                <button 
                  className="w-full text-left p-6 flex justify-between items-center transition-all"
                  onClick={() => toggleItem(item.id)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={openItem === item.id}
                  aria-controls={`faq-answer-${item.id}`}
                  style={{ 
                    borderBottom: openItem === item.id 
                      ? `1px solid ${getColorClass(item.color, 30)}` 
                      : 'none'
                  }}
                >
                  <div className="flex items-center gap-4 relative overflow-hidden">
                    <div 
                      className="min-w-8 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 relative overflow-hidden"
                      style={{ 
                        background: openItem === item.id 
                          ? getColorClass(item.color, 100) 
                          : getColorClass(item.color, 10),
                        color: openItem === item.id ? 'white' : getColorClass(item.color, 100),
                        transform: openItem === item.id ? 'rotate(360deg) scale(1.1)' : 'rotate(0) scale(1)'
                      }}
                    >
                      {openItem === item.id && (
                        <div 
                          className="absolute inset-0 transition-all duration-500"
                          style={{
                            background: `radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 70%)`,
                            animation: 'pulse 2s infinite ease-in-out'
                          }}
                        ></div>
                      )}
                      <span className="text-sm font-semibold relative z-10">{item.id}</span>
                    </div>
                    <span 
                      className={`text-lg transition-all duration-500 ${openItem === item.id ? 'font-bold' : 'font-medium'} text-dark`}
                      style={{
                        transform: openItem === item.id ? 'translateX(4px)' : 'translateX(0)'
                      }}
                    >
                      {item.question}
                    </span>
                    
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                        left: '-100%',
                        top: '0',
                        animation: 'shine 2s infinite linear',
                      }}
                    ></div>
                    
                    {item.isNew && (
                      <span 
                        className="ml-2 text-xs px-2 py-0.5 rounded-full font-medium transition-all duration-300 flex items-center gap-1"
                        style={{ 
                          background: getColorClass(item.color, 15),
                          color: getColorClass(item.color, 100),
                          boxShadow: openItem === item.id ? `0 0 8px ${getColorClass(item.color, 30)}` : 'none'
                        }}
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Новый</span>
                      </span>
                    )}
                    {item.isPopular && (
                      <span className="ml-2 flex space-x-1 items-center">
                        <span 
                          className="h-1.5 w-1.5 rounded-full transition-all duration-300"
                          style={{ 
                            background: getColorClass(item.color, 100),
                            animation: 'pulse 1.5s infinite ease-in-out'
                          }}
                        ></span>
                        <span 
                          className="h-1.5 w-1.5 rounded-full transition-all duration-300"
                          style={{ 
                            background: getColorClass(item.color, 100),
                            animation: 'pulse 1.5s infinite ease-in-out 0.5s'
                          }}
                        ></span>
                        <span 
                          className="h-1.5 w-1.5 rounded-full transition-all duration-300"
                          style={{ 
                            background: getColorClass(item.color, 100),
                            animation: 'pulse 1.5s infinite ease-in-out 1s'
                          }}
                        ></span>
                      </span>
                    )}
                  </div>
                  <div 
                    className="min-w-8 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-500"
                    style={{
                      background: openItem === item.id 
                        ? getColorClass(item.color, 15)
                        : 'rgba(243, 244, 246, 0.8)',
                      transform: openItem === item.id ? 'rotate(-180deg)' : 'rotate(0)',
                      boxShadow: openItem === item.id ? `0 0 10px ${getColorClass(item.color, 20)}` : 'none'
                    }}
                  >
                    {openItem === item.id ? (
                      <MinusIcon className="h-4 w-4" style={{ color: getColorClass(item.color, 100) }} />
                    ) : (
                      <PlusIcon className="h-4 w-4 text-gray-500" />
                    )}
                  </div>
                </button>
                
                <div 
                  className={`transition-all duration-700 overflow-hidden`}
                  style={{
                    maxHeight: openItem === item.id ? '500px' : '0',
                    opacity: openItem === item.id ? 1 : 0,
                    transform: openItem === item.id ? 'translateY(0)' : 'translateY(-20px)'
                  }}
                  id={`faq-answer-${item.id}`}
                  role="region"
                >
                  <div className="p-6 pt-4">
                    <p 
                      className="text-gray-600 leading-relaxed transition-all duration-500"
                      style={{ 
                        borderLeft: `2px solid ${getColorClass(item.color, 70)}`,
                        paddingLeft: '16px',
                        position: 'relative'
                      }}
                    >
                      <span 
                        className="absolute top-0 left-0 w-2 h-8 transition-all duration-700"
                        style={{
                          background: getColorClass(item.color, 100),
                          animation: 'slideDown 2s ease-out forwards',
                          transformOrigin: 'top'
                        }}
                      ></span>
                      {item.answer}
                    </p>
                  </div>
                </div>
                
                <div
                  className={`absolute top-3 right-3 w-16 h-16 pointer-events-none transition-all duration-700 opacity-0 ${
                    openItem === item.id ? 'opacity-10' : 'group-hover:opacity-5'
                  }`}
                  style={{
                    clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
                    background: getColorClass(item.color, 100),
                    transform: openItem === item.id ? 'scale(1.2)' : 'scale(1)'
                  }}
                ></div>
              </div>
            </div>
          )})}
        </div>
        
        {showCta && (
          <div className={`mt-16 text-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0 delay-[800ms]' : 'opacity-0 translate-y-10'}`}>
            <p className="text-gray-600 mb-6 transition-all duration-500 animate-fadeIn">Не нашли ответ на свой вопрос?</p>
            <div className="inline-flex flex-wrap justify-center items-center gap-4">
              <a 
                href="/faq" 
                className="inline-flex items-center px-6 py-3 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all duration-500 hover:shadow-md relative overflow-hidden group"
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.05), transparent)',
                    left: '-100%',
                    top: '0',
                    animation: 'shine 2s infinite linear',
                  }}
                ></div>
                <span className="relative z-10 transition-all duration-300 group-hover:translate-x-1">Все вопросы и ответы</span>
              </a>
              <a 
                href={ctaLink} 
                className="inline-flex items-center bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-md shadow-lg transition-all hover:shadow-primary/20 hover:shadow-xl relative overflow-hidden group"
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    left: '-100%',
                    top: '0',
                    animation: 'shine 2s infinite linear',
                  }}
                ></div>
                <span className="relative z-10 transition-all duration-300 group-hover:translate-x-1">{ctaText}</span>
              </a>
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes floating {
          0% { transform: translate(0, 0); }
          50% { transform: translate(0, 15px); }
          100% { transform: translate(0, 0); }
        }
        
        @keyframes floatingBubble {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(10px, 10px) scale(1.05); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0.8; }
          100% { transform: scale(1); opacity: 0.5; }
        }
        
        @keyframes floatParticle {
          0% { transform: translate(0, 0); }
          50% { transform: translate(100px, 50px); }
          100% { transform: translate(0, 0); }
        }
        
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        @keyframes fadeIn {
          0% { opacity: 0.7; }
          100% { opacity: 1; }
        }
        
        @keyframes slideDown {
          0% { transform: scaleY(0); }
          100% { transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
};

export default UniversalFaqSection;