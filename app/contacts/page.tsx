'use client';

import { useState } from 'react';
import ContactMap from './components/ContactMap';
import ContactForm from './components/ContactForm';
import UniversalFaqSection from '../components/ui/UniversalFaqSection';
import PartnershipForm from './components/PartnershipForm';
import PressInfo from './components/PressInfo';
import EmergencyContacts from './components/EmergencyContacts';
import OfficeInfo from './components/OfficeInfo';

export default function ContactsPage() {
  const [selectedOffice, setSelectedOffice] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Контакты</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <OfficeInfo onSelectOffice={setSelectedOffice} />
        <ContactMap selectedOffice={selectedOffice} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <ContactForm />
        <EmergencyContacts />
      </div>

      <UniversalFaqSection 
        title="Часто задаваемые вопросы"
        subtitle="ПОДДЕРЖКА КЛИЕНТОВ"
        description="Ответы на популярные вопросы о наших услугах и способах связи"
        faqItems={[
          {
            id: 1,
            question: 'Как с вами связаться в экстренной ситуации?',
            answer: 'У нас есть круглосуточная линия поддержки для экстренных случаев. Номер указан в разделе "Экстренные контакты". Также вы можете обратиться в туристическую полицию.',
            isPopular: true,
            color: 'primary'
          },
          {
            id: 2,
            question: 'Какие способы оплаты вы принимаете?',
            answer: 'Мы принимаем наличные (THB, USD, EUR), банковские карты (Visa, MasterCard), банковские переводы, и электронные платежи через защищенные системы.',
            color: 'primary'
          },
          {
            id: 3,
            question: 'Предоставляете ли вы услуги трансфера?',
            answer: 'Да, мы организуем трансфер из аэропорта, между отелями, на экскурсии и другие поездки. Заказать можно заранее или на месте.',
            color: 'primary'
          },
          {
            id: 4,
            question: 'Работаете ли вы с корпоративными клиентами?',
            answer: 'Да, мы предлагаем специальные условия для корпоративных клиентов, групповые туры, деловые поездки и мероприятия. Свяжитесь с нашим отделом корпоративных продаж.',
            color: 'primary'
          },
          {
            id: 5,
            question: 'Можно ли получить помощь на русском языке?',
            answer: 'Да, наша команда говорит на русском языке. Вы можете обращаться к нам на русском в любое время через телефон, чат или email.',
            isNew: true,
            color: 'primary'
          },
          {
            id: 6,
            question: 'Есть ли программа лояльности?',
            answer: 'Да, у нас есть программа лояльности для постоянных клиентов с накопительными скидками и специальными предложениями. Подробности узнавайте у менеджеров.',
            color: 'primary'
          }
        ]}
        ctaText="Написать нам"
        ctaLink="/contacts"
        backgroundClass="bg-gray-50"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <PartnershipForm />
        <PressInfo />
      </div>
    </div>
  );
} 