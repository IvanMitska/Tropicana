'use client';

import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ChevronUp, ChevronDown, MessageSquare, Plus, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  inView: boolean;
}

const FaqItem: React.FC<FaqItemProps> = ({ 
  question, 
  answer, 
  isOpen, 
  onToggle, 
  index,
  inView
}) => {
  return (
    <motion.div 
      className={`border-b border-white/10 overflow-hidden transition-all duration-300 ${
        isOpen ? 'bg-white/5 rounded-lg' : ''
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: inView ? 1 : 0, 
        y: inView ? 0 : 20,
        transition: { delay: index * 0.1, duration: 0.5 }
      }}
    >
      <button
        className="flex justify-between items-center w-full py-5 px-4 text-left focus:outline-none"
        onClick={onToggle}
      >
        <span className="text-lg font-medium text-white group-hover:text-primary transition-colors">
          {question}
        </span>
        <span className="text-primary">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 transform transition-transform duration-300" />
          ) : (
            <ChevronDown className="w-5 h-5 transform transition-transform duration-300" />
          )}
        </span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 text-white/80 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

interface FaqSectionProps {
  hasAnimated: boolean;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ hasAnimated }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: 'Какие документы нужны для аренды транспорта?',
      answer: 'Для аренды транспорта на Пхукете вам понадобится паспорт и водительское удостоверение. Для аренды скутера достаточно международного или национального водительского удостоверения. Для аренды автомобиля необходимо международное водительское удостоверение. Также потребуется депозит, который можно внести наличными или с помощью блокировки суммы на кредитной карте.'
    },
    {
      question: 'Включена ли страховка в стоимость аренды?',
      answer: 'Да, базовая страховка включена в стоимость аренды. Она покрывает ответственность перед третьими лицами. Также вы можете приобрести расширенную страховку, которая покрывает повреждения транспортного средства и угон. Рекомендуем выбирать расширенную страховку для полного спокойствия во время отдыха.'
    },
    {
      question: 'Можно ли арендовать транспорт без депозита?',
      answer: 'Нет, депозит является обязательным условием при аренде любого транспортного средства. Он служит гарантией возврата транспорта в исходном состоянии. Размер депозита зависит от типа и стоимости транспортного средства. Депозит возвращается в полном объеме при возврате транспорта без повреждений.'
    },
    {
      question: 'Что делать в случае ДТП или поломки?',
      answer: 'В случае ДТП необходимо немедленно связаться с нами по экстренному номеру, указанному в договоре аренды, и с полицией по номеру 191. Не перемещайте транспортное средство до прибытия полиции и нашего представителя. В случае поломки также свяжитесь с нами, и мы организуем эвакуацию транспорта и его замену в кратчайшие сроки.'
    },
    {
      question: 'Можно ли выезжать на арендованном транспорте за пределы Пхукета?',
      answer: 'Да, вы можете выезжать на арендованном транспорте за пределы Пхукета, но необходимо предупредить нас об этом заранее. Для поездок на материк на автомобиле ограничений нет. Для скутеров рекомендуем ограничиться островом Пхукет из-за особенностей дорожного покрытия и интенсивности движения на материке.'
    },
    {
      question: 'Есть ли ограничения по пробегу?',
      answer: 'Нет, в наших условиях аренды нет ограничений по пробегу. Вы можете использовать арендованный транспорт без ограничений по расстоянию в пределах Таиланда. Однако помните, что транспортное средство должно быть возвращено в исходном состоянии, с учетом нормального износа.'
    }
  ];

  // Анимация для плавающих элементов
  const floatingElement = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
      opacity: 0.7,
      y: 0,
      transition: {
        delay: delay,
        duration: 0.8,
      }
    })
  };

  return (
    <section 
      ref={ref} 
      id="faq" 
      className="py-20 relative overflow-hidden bg-dark"
    >
      <div className="absolute inset-0 bg-[url('/images/transport/faq-bg.jpg')] bg-cover bg-center opacity-20"></div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/80 to-dark/40"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-dark/90"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-dark to-transparent"></div>
      
      {/* 3D Декоративные элементы */}
      {inView && hasAnimated && (
        <>
          <motion.div 
            className="absolute top-40 -right-20 w-96 h-96 rounded-full"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: 0.1, 
              scale: 1,
              x: [-20, 0, -20],
              y: [0, -20, 0]
            }}
            transition={{ 
              duration: 0.5, 
              delay: 0.2,
              x: { duration: 15, repeat: Infinity, repeatType: "mirror" },
              y: { duration: 18, repeat: Infinity, repeatType: "mirror" }
            }}
            style={{
              background: 'radial-gradient(circle, rgba(var(--color-primary), 0.3) 0%, rgba(var(--color-primary), 0) 70%)',
              filter: 'blur(40px)'
            }}
          />
          
          <motion.div 
            className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: 0.1, 
              scale: 1,
              x: [0, 20, 0],
              y: [0, 30, 0]
            }}
            transition={{ 
              duration: 0.5, 
              delay: 0.3,
              x: { duration: 18, repeat: Infinity, repeatType: "mirror" },
              y: { duration: 15, repeat: Infinity, repeatType: "mirror" }
            }}
            style={{
              background: 'radial-gradient(circle, rgba(var(--color-primary), 0.3) 0%, rgba(var(--color-primary), 0) 70%)',
              filter: 'blur(50px)'
            }}
          />
          
          {/* Сетка точек */}
          <div className="absolute inset-0 opacity-5" style={{ 
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px)', 
            backgroundSize: '30px 30px',
            transform: 'perspective(1000px) rotateX(70deg)',
            transformOrigin: 'center top',
            overflow: 'hidden'
          }} />
          
          {/* Анимированные частицы */}
          {[...Array(20)].map((_, i) => (
            <motion.div 
              key={`particle-${i}`}
              className="absolute rounded-full bg-white"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: Math.random() * 0.4 + 0.1, 
                scale: Math.random() * 0.7 + 0.3,
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0]
              }}
              transition={{ 
                duration: Math.random() * 5 + 10,
                delay: Math.random() * 2,
                repeat: Infinity,
                repeatType: "mirror"
              }}
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                filter: 'blur(1px)'
              }}
            />
          ))}
        </>
      )}

      <div 
        className="container mx-auto px-4 relative z-10"
        style={{ perspective: '1500px' }} // Для 3D эффектов
      >
        <motion.div 
          ref={headerRef}
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ 
            duration: 0.8,
            ease: [0.2, 0.65, 0.3, 0.9]
          }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-4 relative inline-block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Часто задаваемые <span className="text-primary">вопросы</span>
            <motion.span 
              className="absolute -top-1 -right-6 text-primary"
              animate={{ 
                scale: [1, 1.4, 1],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              <motion.span className="absolute w-3 h-3 bg-primary/30 rounded-full animate-ping" />
              <motion.span className="absolute w-3 h-3 bg-primary rounded-full" />
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-light/70 text-lg"
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Ответы на самые популярные вопросы об аренде транспорта на Пхукете
          </motion.p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto space-y-6">
          {faqItems.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ 
                opacity: 0, 
                y: 30,
                rotateX: 10 
              }}
              animate={{ 
                opacity: 1, 
                y: 0,
                rotateX: 0,
                transition: { 
                  delay: 0.2 + index * 0.1,
                  duration: 0.7,
                  ease: [0.2, 0.65, 0.3, 0.9]
                }
              }}
              className="relative"
              style={{ 
                transformStyle: "preserve-3d",
                transformOrigin: "center top"
              }}
            >
              <motion.div 
                className={`border border-white/10 rounded-xl shadow-lg overflow-hidden ${
                  openIndex === index ? 'bg-white/10 backdrop-blur-md' : 'bg-white/5 backdrop-blur-sm'
                }`}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                  borderColor: "rgba(var(--color-primary), 0.3)"
                }}
                transition={{ duration: 0.3 }}
                style={{ 
                  transformStyle: "preserve-3d"
                }}
              >
                <div
                  className="flex items-center justify-between p-6 cursor-pointer"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-content-${index}`}
                >
                  <motion.h3 
                    className="text-xl font-semibold text-white flex-1"
                    initial={{ x: -5 }}
                    animate={openIndex === index ? { x: 0, color: "rgb(var(--color-primary))" } : { x: 0, color: "#fff" }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.question}
                  </motion.h3>
                  
                  <motion.div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      openIndex === index ? 'bg-primary text-white' : 'bg-white/10 text-white'
                    }`}
                    animate={{ 
                      rotate: openIndex === index ? 45 : 0,
                      scale: openIndex === index ? 1.1 : 1,
                      backgroundColor: openIndex === index ? 'rgb(var(--color-primary))' : 'rgba(255,255,255,0.1)'
                    }}
                    transition={{ 
                      duration: 0.4, 
                      type: "spring",
                      stiffness: 300
                    }}
                  >
                    <Plus className="w-5 h-5" />
                  </motion.div>
                </div>
                
                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      id={`faq-content-${index}`}
                      initial={{ 
                        height: 0, 
                        opacity: 0,
                      }}
                      animate={{ 
                        height: "auto", 
                        opacity: 1,
                      }}
                      exit={{ 
                        height: 0, 
                        opacity: 0,
                      }}
                      transition={{ 
                        duration: 0.4, 
                        ease: [0.2, 0.65, 0.3, 0.9]
                      }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-white/80 leading-relaxed border-t border-white/10">
                        {/* Добавляем анимации для абзацев ответа */}
                        {faq.answer.split('\n\n').map((paragraph, i) => (
                          <motion.p 
                            key={i} 
                            className={i > 0 ? 'mt-4' : ''}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 + i * 0.1 }}
                          >
                            {paragraph}
                          </motion.p>
                        ))}
                        
                        {/* Добавляем подчеркивание для ключевых фраз */}
                        {/* Добавляем подсветку для активного элемента */}
                        {openIndex === index && (
                          <motion.div 
                            className="absolute inset-0 rounded-xl pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ 
                              boxShadow: "0 0 30px rgba(var(--color-primary), 0.2)",
                              zIndex: -1 
                            }}
                          />
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Добавляем 3D тень для эффекта глубины */}
                <motion.div 
                  className="absolute inset-0 rounded-xl bg-dark/40 -z-10"
                  style={{ 
                    transform: 'translateZ(-10px) translateY(10px)',
                    filter: 'blur(16px)'
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: openIndex === index ? 0.4 : 0.1 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.7, delay: 0.8 }
          }}
        >
          <p className="text-white/70 mb-6">Не нашли ответ на свой вопрос?</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white/10 hover:bg-primary text-white px-8 py-3 rounded-lg transition-all duration-300 backdrop-blur-sm group">
            <span>Связаться с нами</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "loop", repeatDelay: 1 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
      
      <style jsx>{`
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