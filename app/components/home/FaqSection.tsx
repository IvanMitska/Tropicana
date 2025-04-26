'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItemProps {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const FaqItem = ({ question, answer, isOpen, onClick }: FaqItemProps) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left font-medium text-lg focus:outline-none"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>
      <div
        className={`mt-2 text-gray-600 overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        {isOpen && <div className="pb-2">{answer}</div>}
      </div>
    </div>
  );
};

export default function FaqSection() {
  // Состояние для отслеживания открытых вопросов
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Список вопросов и ответов
  const faqs = [
    {
      question: 'Как забронировать жилье или транспорт?',
      answer: (
        <>
          <p>
            Для бронирования следуйте простым шагам:
          </p>
          <ol className="list-decimal ml-5 mt-2 space-y-1">
            <li>Выберите нужную категорию (недвижимость, транспорт или экскурсии)</li>
            <li>Используйте фильтры для поиска подходящего варианта</li>
            <li>Выберите даты аренды</li>
            <li>Заполните необходимые данные и выберите способ оплаты</li>
            <li>Подтвердите бронирование</li>
          </ol>
          <p className="mt-2">
            После бронирования вы получите подтверждение на электронную почту с деталями вашего заказа.
          </p>
        </>
      ),
    },
    {
      question: 'Какие способы оплаты доступны?',
      answer: (
        <p>
          Мы предлагаем различные способы оплаты для вашего удобства:
          <ul className="list-disc ml-5 mt-2">
            <li>Банковские карты (Visa, MasterCard, МИР)</li>
            <li>Электронные кошельки (ЮMoney, WebMoney, QIWI)</li>
            <li>Банковский перевод</li>
            <li>Оплата в рассрочку (для определенных предложений)</li>
          </ul>
        </p>
      ),
    },
    {
      question: 'Можно ли отменить бронирование?',
      answer: (
        <p>
          Да, вы можете отменить бронирование. Условия отмены зависят от конкретного предложения:
          <ul className="list-disc ml-5 mt-2">
            <li>Бесплатная отмена: обычно доступна за 24-48 часов до начала аренды</li>
            <li>Частичный возврат: возможен при отмене за 1-3 дня до начала аренды</li>
            <li>Без возврата: при отмене менее чем за 24 часа до начала аренды</li>
          </ul>
          Подробные условия отмены указаны на странице каждого предложения.
        </p>
      ),
    },
    {
      question: 'Что делать, если возникли проблемы с арендой?',
      answer: (
        <p>
          В случае возникновения проблем вы можете:
          <ul className="list-disc ml-5 mt-2">
            <li>Связаться с владельцем/арендодателем напрямую через чат на платформе</li>
            <li>Обратиться в нашу службу поддержки по телефону +7 (495) 123-45-67</li>
            <li>Отправить сообщение на email: support@rentweb.ru</li>
          </ul>
          Наша служба поддержки работает 24/7 и готова помочь вам с любыми вопросами.
        </p>
      ),
    },
    {
      question: 'Безопасно ли оплачивать через ваш сервис?',
      answer: (
        <p>
          Да, мы используем современные технологии шифрования и безопасности для защиты ваших данных и платежей:
          <ul className="list-disc ml-5 mt-2">
            <li>SSL-шифрование для защиты передачи данных</li>
            <li>Соответствие стандартам PCI DSS для обработки платежей</li>
            <li>Двухфакторная аутентификация для защиты аккаунта</li>
            <li>Мониторинг подозрительной активности</li>
          </ul>
          Кроме того, мы проверяем всех арендодателей и поставщиков услуг перед размещением их предложений на платформе.
        </p>
      ),
    },
    {
      question: 'Как стать арендодателем на вашей платформе?',
      answer: (
        <p>
          Чтобы стать арендодателем и размещать свои объекты на нашей платформе:
          <ol className="list-decimal ml-5 mt-2">
            <li>Зарегистрируйтесь и создайте аккаунт арендодателя</li>
            <li>Заполните необходимые документы и данные для верификации</li>
            <li>Добавьте информацию о вашем объекте, загрузите фотографии</li>
            <li>Установите цены и условия аренды</li>
            <li>Дождитесь проверки и подтверждения от нашей команды</li>
          </ol>
          После прохождения проверки ваш объект появится в каталоге, и вы сможете получать бронирования.
        </p>
      ),
    },
  ];

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Часто задаваемые вопросы</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Здесь вы найдете ответы на самые распространенные вопросы о нашем сервисе
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => toggleQuestion(index)}
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-700">
            Не нашли ответ на свой вопрос?{' '}
            <a href="/contacts" className="text-primary hover:underline">
              Свяжитесь с нами
            </a>
          </p>
        </div>
      </div>
    </section>
  );
} 