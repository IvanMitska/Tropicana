'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  isNew?: boolean;
  isPopular?: boolean;
}

const faqItems: FAQItem[] = [
  {
    id: '1',
    category: 'Общие вопросы',
    question: 'Как я могу связаться с поддержкой?',
    answer: 'Вы можете связаться с нашей поддержкой через форму обратной связи на этой странице, по телефону горячей линии или через онлайн-чат. Мы работаем ежедневно с 9:00 до 21:00.',
    isPopular: true
  },
  {
    id: '2',
    category: 'Общие вопросы',
    question: 'Какие способы оплаты вы принимаете?',
    answer: 'Мы принимаем оплату банковскими картами Visa, MasterCard, МИР, а также через электронные кошельки и банковские переводы.'
  },
  {
    id: '3',
    category: 'Аренда',
    question: 'Какова минимальная длительность аренды?',
    answer: 'Минимальная длительность аренды составляет 1 сутки. Для некоторых категорий объектов возможна почасовая аренда.',
    isNew: true
  },
  {
    id: '4',
    category: 'Аренда',
    question: 'Нужен ли залог при аренде?',
    answer: 'Да, при аренде требуется залог, размер которого зависит от типа арендуемого объекта. Залог возвращается в полном объеме при отсутствии повреждений.'
  },
  {
    id: '5',
    category: 'Безопасность',
    question: 'Как обеспечивается безопасность сделки?',
    answer: 'Все сделки оформляются официальным договором, который защищает права обеих сторон. Мы также предоставляем страховку и проверяем все объекты перед сдачей.'
  }
];

const categories = Array.from(new Set(faqItems.map(item => item.category)));

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const filteredItems = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white rounded-2xl p-8 md:p-10">
      <h2 className="text-2xl md:text-[28px] font-semibold mb-8 text-[#333333]">Часто задаваемые вопросы</h2>

      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Поиск по вопросам..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-10 border border-[#E0E0E0] rounded-xl bg-[#FAFAFA] focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-3.5 h-5 w-5 text-[#707070]" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#F5F5F7] text-[#333333]'
                : 'bg-white text-[#707070] border border-[#E0E0E0] hover:bg-[#F5F5F7]'
            }`}
          >
            Все категории
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-[#F5F5F7] text-[#333333]'
                  : 'bg-white text-[#707070] border border-[#E0E0E0] hover:bg-[#F5F5F7]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="border border-[#E0E0E0] rounded-xl overflow-hidden transition-all hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:translate-y-[-2px] focus-within:ring-1 focus-within:ring-primary"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between transition-all"
              aria-expanded={openItems.has(item.id)}
              aria-controls={`faq-answer-${item.id}`}
            >
              <div className="flex items-center">
                <span className={`text-base ${openItems.has(item.id) ? 'font-semibold' : 'font-medium'} text-[#333333]`}>
                  {item.question}
                </span>
                {item.isNew && (
                  <span className="ml-2 text-xs px-2 py-0.5 bg-[#FFF2E8] text-primary rounded-full font-medium">
                    Новый
                  </span>
                )}
                {item.isPopular && (
                  <span className="ml-2 flex space-x-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  </span>
                )}
              </div>
              <div className="h-6 w-6 flex items-center justify-center rounded-full border border-[#E0E0E0] transition-transform">
                {openItems.has(item.id) ? (
                  <MinusIcon className="h-3 w-3 text-[#333333]" />
                ) : (
                  <PlusIcon className="h-3 w-3 text-[#333333]" />
                )}
              </div>
            </button>
            <div 
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                openItems.has(item.id) 
                  ? 'max-h-[500px] opacity-100' 
                  : 'max-h-0 opacity-0'
              }`}
              id={`faq-answer-${item.id}`}
              aria-hidden={!openItems.has(item.id)}
            >
              <div className="px-6 pb-6 pt-0">
                <div className="w-full h-px bg-[#E0E0E0] mb-4"></div>
                <p className="text-[15px] leading-relaxed text-[#707070]">{item.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-10 bg-[#FAFAFA] rounded-xl border border-[#E0E0E0] mt-4">
          <p className="text-[#707070]">По вашему запросу ничего не найдено</p>
        </div>
      )}
    </div>
  );
} 