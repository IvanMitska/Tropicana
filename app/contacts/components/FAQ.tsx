'use client';

import { useState } from 'react';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: '1',
    category: 'Общие вопросы',
    question: 'Как я могу связаться с поддержкой?',
    answer: 'Вы можете связаться с нашей поддержкой через форму обратной связи на этой странице, по телефону горячей линии или через онлайн-чат. Мы работаем ежедневно с 9:00 до 21:00.'
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
    answer: 'Минимальная длительность аренды составляет 1 сутки. Для некоторых категорий объектов возможна почасовая аренда.'
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
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Часто задаваемые вопросы</h2>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Поиск по вопросам..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            selectedCategory === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Все категории
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none"
            >
              <span className="font-medium">{item.question}</span>
              <ChevronDownIcon
                className={`h-5 w-5 text-gray-500 transition-transform ${
                  openItems.has(item.id) ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            {openItems.has(item.id) && (
              <div className="px-4 py-3 bg-gray-50">
                <p className="text-gray-600">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">По вашему запросу ничего не найдено</p>
        </div>
      )}
    </div>
  );
} 