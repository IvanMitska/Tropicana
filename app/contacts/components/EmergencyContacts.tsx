'use client';

import { useState } from 'react';
import { PhoneIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

interface ContactMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
}

export default function EmergencyContacts() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  const contactMethods: ContactMethod[] = [
    {
      id: 'hotline',
      name: 'Горячая линия',
      description: 'Круглосуточная поддержка по телефону',
      icon: <PhoneIcon className="h-6 w-6" />,
      action: () => window.location.href = 'tel:+78001234567'
    },
    {
      id: 'chat',
      name: 'Онлайн-чат',
      description: 'Мгновенная поддержка в чате',
      icon: <ChatBubbleLeftRightIcon className="h-6 w-6" />,
      action: () => setIsChatOpen(true)
    }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      // Здесь будет логика отправки сообщения
      console.log('Отправка сообщения:', chatMessage);
      setChatMessage('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Экстренная связь</h2>

      <div className="space-y-4">
        {contactMethods.map(method => (
          <button
            key={method.id}
            onClick={method.action}
            className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-start gap-4"
          >
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              {method.icon}
            </div>
            <div className="text-left">
              <h3 className="font-medium">{method.name}</h3>
              <p className="text-sm text-gray-600">{method.description}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Чат поддержки */}
      {isChatOpen && (
        <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-medium">Чат поддержки</h3>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="h-80 overflow-y-auto p-4">
            <div className="space-y-4">
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">Здравствуйте! Чем я могу вам помочь?</p>
                </div>
              </div>
              {/* Здесь будут сообщения чата */}
            </div>
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Введите сообщение..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Отправить
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Мессенджеры</h3>
        <div className="grid grid-cols-2 gap-4">
          <a
            href="https://t.me/rentweb_support"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.341c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.535.223l.19-2.72 5.56-5.023c.232-.21-.05-.327-.358-.118l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.535-.197 1.004.13.832.943z"/>
            </svg>
            <span>Telegram</span>
          </a>
          <a
            href="https://wa.me/78001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.13.332.202.043.072.043.419-.101.824z"/>
            </svg>
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
} 