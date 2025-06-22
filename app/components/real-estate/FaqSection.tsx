'use client';

import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, ChevronUp, MessagesSquare } from 'lucide-react';

const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'Как забронировать недвижимость на Пхукете?',
      answer: 'Для бронирования выберите подходящий вариант в каталоге, проверьте доступность на нужные даты и оформите заявку через форму бронирования. После этого с вами свяжется наш менеджер для подтверждения деталей. Оплата производится через безопасную систему платежей, после чего вы получите подтверждение бронирования.'
    },
    {
      question: 'Какие документы нужны для аренды жилья?',
      answer: 'Для аренды недвижимости потребуется паспорт и его копия. При долгосрочной аренде может понадобиться виза или разрешение на проживание. Все необходимые документы указываются на странице объекта и в договоре аренды. Наш менеджер также проинформирует вас о всех требованиях.'
    },
    {
      question: 'Можно ли арендовать жилье на длительный срок?',
      answer: 'Да, мы предлагаем как краткосрочную, так и долгосрочную аренду недвижимости. Для долгосрочной аренды (от 3 месяцев) часто предоставляются специальные условия и скидки. Отфильтруйте объекты по типу "Долгосрочная аренда" в нашем каталоге.'
    },
    {
      question: 'Включены ли коммунальные услуги в стоимость аренды?',
      answer: 'При краткосрочной аренде коммунальные услуги обычно включены в стоимость. При долгосрочной аренде электричество и вода часто оплачиваются отдельно по счетчикам. Точные условия указаны в описании каждого объекта и в договоре аренды.'
    },
    {
      question: 'Какой размер депозита требуется при аренде?',
      answer: 'Размер депозита зависит от типа недвижимости и срока аренды. Обычно это сумма, равная стоимости аренды за 1-2 месяца. Депозит возвращается при выезде, если нет повреждений имущества. Точный размер указан в описании каждого объекта.'
    },
    {
      question: 'Возможен ли досрочный выезд из арендованной недвижимости?',
      answer: 'Да, досрочный выезд возможен, но условия зависят от типа договора и срока аренды. При краткосрочной аренде обычно действует политика невозврата предоплаты. При долгосрочной аренде необходимо уведомить владельца заранее (обычно за 1-2 месяца). Подробные условия прописаны в договоре.'
    },
  ];

  return (
    <section
      ref={ref}
      className="py-20 bg-white relative overflow-hidden"
    >
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-light to-transparent"></div>
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Часто задаваемые <span className="text-primary">вопросы</span>
          </h2>
          <p className="text-gray-600">
            Ответы на популярные вопросы об аренде недвижимости на Пхукете
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Список вопросов */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className={`bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden transition-all duration-500 delay-${index * 100} ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-dark">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-primary" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                  }`}
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Блок для дополнительных вопросов */}
          <div className={`mt-12 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-700 delay-500 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="flex items-center">
              <div className="bg-primary/20 w-14 h-14 rounded-full flex items-center justify-center mr-5">
                <MessagesSquare className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-dark mb-1">Остались вопросы?</h3>
                <p className="text-gray-600">Мы всегда готовы помочь и проконсультировать вас</p>
              </div>
            </div>
            
            <a
              href="tel:+66994892917"
              className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-lg transition-all flex-shrink-0 shadow-sm hover:shadow-md"
            >
              Позвонить нам
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection; 