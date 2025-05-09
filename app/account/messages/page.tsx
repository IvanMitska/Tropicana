'use client';

import React, { useState, useEffect } from 'react';
import AccountLayout from '@/app/components/layout/AccountLayout';
import { 
  ChatBubbleLeftRightIcon, 
  ArrowPathIcon, 
  PaperAirplaneIcon, 
  CheckCircleIcon,
  XCircleIcon,
  UserCircleIcon,
  ArrowDownTrayIcon,
  PhotoIcon,
  DocumentTextIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { toast } from 'sonner';
import Link from 'next/link';
import { format, formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

// Типы данных для сообщений
interface User {
  _id: string;
  name: string;
  avatar?: string;
  role: 'user' | 'host' | 'admin';
  online?: boolean;
  lastActive?: Date;
}

interface Attachment {
  _id: string;
  type: 'image' | 'document';
  filename: string;
  url: string;
  size?: number;
}

interface Message {
  _id: string;
  chatId: string;
  text: string;
  sender: User;
  recipient: User;
  createdAt: Date;
  readAt?: Date;
  attachments?: Attachment[];
}

interface Chat {
  _id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: Date;
}

// Демо-данные
const currentUser: User = {
  _id: 'user1',
  name: 'Александр Иванов',
  avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
  role: 'user',
};

const demoUsers: User[] = [
  {
    _id: 'user2',
    name: 'Мария Петрова',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop',
    role: 'host',
    online: true,
  },
  {
    _id: 'user3',
    name: 'Сергей Смирнов',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
    role: 'host',
    online: false,
    lastActive: new Date(Date.now() - 45 * 60 * 1000), // 45 минут назад
  },
  {
    _id: 'admin1',
    name: 'Служба поддержки',
    avatar: undefined,
    role: 'admin',
    online: true,
  },
];

const demoChats: Chat[] = [
  {
    _id: 'chat1',
    participants: [currentUser, demoUsers[0]],
    unreadCount: 2,
    updatedAt: new Date(Date.now() - 15 * 60 * 1000), // 15 минут назад
  },
  {
    _id: 'chat2',
    participants: [currentUser, demoUsers[1]],
    unreadCount: 0,
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 день назад
  },
  {
    _id: 'chat3',
    participants: [currentUser, demoUsers[2]],
    unreadCount: 0,
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 дней назад
  },
];

const demoMessages: Record<string, Message[]> = {
  'chat1': [
    {
      _id: 'msg1',
      chatId: 'chat1',
      text: 'Добрый день! Интересует ваша квартира на Невском проспекте. Свободна ли она на следующие выходные?',
      sender: currentUser,
      recipient: demoUsers[0],
      createdAt: new Date(Date.now() - 60 * 60 * 1000), // 1 час назад
      readAt: new Date(Date.now() - 55 * 60 * 1000), // 55 минут назад
    },
    {
      _id: 'msg2',
      chatId: 'chat1',
      text: 'Здравствуйте! Да, квартира свободна на эти даты. Когда планируете заезд и выезд?',
      sender: demoUsers[0],
      recipient: currentUser,
      createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 минут назад
    },
    {
      _id: 'msg3',
      chatId: 'chat1',
      text: 'Есть ли возможность раннего заезда в пятницу, примерно в 10 утра?',
      sender: currentUser,
      recipient: demoUsers[0],
      createdAt: new Date(Date.now() - 20 * 60 * 1000), // 20 минут назад
      readAt: new Date(Date.now() - 15 * 60 * 1000), // 15 минут назад
    },
    {
      _id: 'msg4',
      chatId: 'chat1',
      text: 'К сожалению, ранний заезд в этот день невозможен из-за уборки. Самое раннее - 14:00. Но мы можем организовать хранение багажа, если вам удобно.',
      sender: demoUsers[0],
      recipient: currentUser,
      createdAt: new Date(Date.now() - 15 * 60 * 1000), // 15 минут назад
    },
  ],
  'chat2': [
    {
      _id: 'msg5',
      chatId: 'chat2',
      text: 'Здравствуйте! Можно ли арендовать ваш автомобиль на неделю?',
      sender: currentUser,
      recipient: demoUsers[1],
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 дня назад
      readAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 5 * 60 * 1000), // 2 дня назад + 5 минут
    },
    {
      _id: 'msg6',
      chatId: 'chat2',
      text: 'Добрый день! Да, автомобиль доступен. Какие даты вас интересуют?',
      sender: demoUsers[1],
      recipient: currentUser,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 10 * 60 * 1000), // 2 дня назад + 10 минут
      readAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000), // 2 дня назад + 30 минут
    },
    {
      _id: 'msg7',
      chatId: 'chat2',
      text: 'С 15 по 22 июля. Также хотел уточнить по страховке и ограничениям пробега.',
      sender: currentUser,
      recipient: demoUsers[1],
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 день назад
      readAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 15 * 60 * 1000), // 1 день назад + 15 минут
    },
    {
      _id: 'msg8',
      chatId: 'chat2',
      text: 'Вот информация о страховке и условиях аренды:',
      sender: demoUsers[1],
      recipient: currentUser,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 20 * 60 * 1000), // 1 день назад + 20 минут
      readAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000), // 1 день назад + 2 часа
      attachments: [
        {
          _id: 'att1',
          type: 'document',
          filename: 'условия_аренды.pdf',
          url: '#',
          size: 1240000,
        }
      ],
    },
  ],
  'chat3': [
    {
      _id: 'msg9',
      chatId: 'chat3',
      text: 'Здравствуйте! Есть вопрос по поводу бронирования тура. Где можно получить подробную программу?',
      sender: currentUser,
      recipient: demoUsers[2],
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 дней назад
      readAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000), // 7 дней назад + 30 минут
    },
    {
      _id: 'msg10',
      chatId: 'chat3',
      text: 'Добрый день! Подробная программа тура во вложении. Если у вас появятся вопросы - обращайтесь!',
      sender: demoUsers[2],
      recipient: currentUser,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 дней назад
      readAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000), // 5 дней назад + 2 часа
      attachments: [
        {
          _id: 'att2',
          type: 'document',
          filename: 'программа_тура.pdf',
          url: '#',
          size: 3500000,
        },
        {
          _id: 'att3',
          type: 'image',
          filename: 'карта_маршрута.jpg',
          url: 'https://images.unsplash.com/photo-1675713898805-9422455969e1?q=80&w=2787&auto=format&fit=crop',
          size: 1800000,
        }
      ],
    },
  ],
};

export default function MessagesPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // В реальном приложении здесь будет запрос к API
    setTimeout(() => {
      setChats(demoChats);
      setIsLoading(false);
    }, 700);
  }, []);

  useEffect(() => {
    if (activeChat) {
      // В реальном приложении здесь будет запрос к API
      setMessages(demoMessages[activeChat._id] || []);
      
      // Пометить сообщения как прочитанные
      const updatedChats = chats.map(chat => 
        chat._id === activeChat._id 
          ? { ...chat, unreadCount: 0 } 
          : chat
      );
      setChats(updatedChats);
      
      // Прокрутка к последнему сообщению
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [activeChat]);

  const getOtherParticipant = (chat: Chat): User => {
    return chat.participants.find(user => user._id !== currentUser._id) || currentUser;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!messageText.trim() || !activeChat) return;
    
    const newMessage: Message = {
      _id: `new-${Date.now()}`,
      chatId: activeChat._id,
      text: messageText,
      sender: currentUser,
      recipient: getOtherParticipant(activeChat),
      createdAt: new Date(),
    };
    
    // Добавляем сообщение локально
    setMessages(prev => [...prev, newMessage]);
    
    // Обновляем чат
    const updatedChats = chats.map(chat => 
      chat._id === activeChat._id 
        ? { 
            ...chat, 
            lastMessage: newMessage,
            updatedAt: new Date()
          } 
        : chat
    );
    
    // Сортируем чаты по дате последнего сообщения
    setChats(updatedChats.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()));
    
    // Очищаем поле ввода
    setMessageText('');
    
    // Прокручиваем к последнему сообщению
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    
    // В реальном приложении здесь будет запрос к API для отправки сообщения
    toast.success('Сообщение отправлено');
  };

  const formatDateTime = (date: Date) => {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Если сообщение было отправлено сегодня, показываем только время
    if (date.getDate() === now.getDate() && 
        date.getMonth() === now.getMonth() && 
        date.getFullYear() === now.getFullYear()) {
      return format(date, 'HH:mm');
    }
    
    // Если сообщение было отправлено вчера
    if (date.getDate() === yesterday.getDate() && 
        date.getMonth() === yesterday.getMonth() && 
        date.getFullYear() === yesterday.getFullYear()) {
      return `вчера, ${format(date, 'HH:mm')}`;
    }
    
    // Иначе показываем полную дату
    return format(date, 'd MMM, HH:mm', { locale: ru });
  };
  
  const formatMessageTime = (date: Date) => {
    return format(date, 'HH:mm');
  };
  
  const getOnlineStatus = (user: User) => {
    if (user.online) {
      return 'В сети';
    }
    
    if (user.lastActive) {
      return `Был(а) в сети ${formatDistanceToNow(user.lastActive, { locale: ru, addSuffix: true })}`;
    }
    
    return '';
  };
  
  const formatFileSize = (sizeInBytes?: number) => {
    if (!sizeInBytes) return '';
    
    if (sizeInBytes < 1024) {
      return `${sizeInBytes} Б`;
    } else if (sizeInBytes < 1024 * 1024) {
      return `${(sizeInBytes / 1024).toFixed(1)} КБ`;
    } else {
      return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} МБ`;
    }
  };

  const renderChatList = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-32">
          <ArrowPathIcon className="w-8 h-8 text-gray-400 animate-spin" />
        </div>
      );
    }
    
    if (chats.length === 0) {
      return (
        <div className="text-center py-8">
          <ChatBubbleLeftRightIcon className="w-12 h-12 mx-auto text-gray-400" />
          <p className="mt-2 text-gray-600">У вас пока нет сообщений</p>
        </div>
      );
    }
    
    return (
      <div className="divide-y divide-gray-200">
        {chats.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()).map(chat => {
          const otherUser = getOtherParticipant(chat);
          const lastMsg = demoMessages[chat._id]?.[demoMessages[chat._id].length - 1];
          
          return (
            <div 
              key={chat._id}
              className={`p-4 cursor-pointer hover:bg-gray-50 ${activeChat?._id === chat._id ? 'bg-blue-50' : ''}`}
              onClick={() => setActiveChat(chat)}
            >
              <div className="flex items-start gap-3">
                <div className="relative flex-shrink-0">
                  {otherUser.avatar ? (
                    <img 
                      src={otherUser.avatar} 
                      alt={otherUser.name}
                      className="w-12 h-12 rounded-full object-cover" 
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <UserCircleIcon className="w-8 h-8 text-gray-500" />
                    </div>
                  )}
                  
                  {otherUser.online && (
                    <span className="absolute bottom-0 right-0 bg-green-500 rounded-full w-3 h-3 border-2 border-white"></span>
                  )}
                </div>
                
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-medium truncate">{otherUser.name}</h3>
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {formatDateTime(chat.updatedAt)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-600 truncate mt-1">
                      {lastMsg ? (
                        <>
                          {lastMsg.sender._id === currentUser._id && (
                            <span className="text-gray-400 mr-1">Вы:</span>
                          )}
                          {lastMsg.attachments?.length ? (
                            <span className="flex items-center text-gray-500">
                              {lastMsg.attachments[0].type === 'image' ? (
                                <PhotoIcon className="w-4 h-4 inline mr-1" />
                              ) : (
                                <DocumentTextIcon className="w-4 h-4 inline mr-1" />
                              )}
                              Вложение 
                              {lastMsg.attachments.length > 1 ? ` (${lastMsg.attachments.length})` : ''}
                              {lastMsg.text && ' + текст'}
                            </span>
                          ) : lastMsg.text}
                        </>
                      ) : 'Нет сообщений'}
                    </p>
                    
                    {chat.unreadCount > 0 && (
                      <span className="ml-2 bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 flex-shrink-0">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderMessageAttachments = (attachments?: Attachment[]) => {
    if (!attachments || attachments.length === 0) return null;
    
    return (
      <div className="mt-2 space-y-2">
        {attachments.map(attachment => (
          <div 
            key={attachment._id}
            className="flex items-center p-2 bg-gray-50 rounded"
          >
            {attachment.type === 'image' ? (
              <div className="space-y-2">
                <img 
                  src={attachment.url} 
                  alt={attachment.filename}
                  className="max-w-sm max-h-48 rounded" 
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{attachment.filename}</span>
                  <span>{formatFileSize(attachment.size)}</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center w-full">
                <DocumentTextIcon className="w-10 h-10 text-gray-500 mr-3" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{attachment.filename}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(attachment.size)}</p>
                </div>
                <a 
                  href={attachment.url}
                  className="ml-4 p-1.5 text-gray-500 hover:text-gray-700"
                  title="Скачать файл"
                >
                  <ArrowDownTrayIcon className="w-5 h-5" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderChatMessages = () => {
    if (!activeChat) return null;
    
    const otherUser = getOtherParticipant(activeChat);
    
    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="border-b p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative">
              {otherUser.avatar ? (
                <img 
                  src={otherUser.avatar} 
                  alt={otherUser.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <UserCircleIcon className="w-7 h-7 text-gray-500" />
                </div>
              )}
              
              {otherUser.online && (
                <span className="absolute bottom-0 right-0 bg-green-500 rounded-full w-2.5 h-2.5 border-2 border-white"></span>
              )}
            </div>
            
            <div className="ml-3">
              <h3 className="font-medium">{otherUser.name}</h3>
              <p className="text-xs text-gray-500">{getOnlineStatus(otherUser)}</p>
            </div>
          </div>
          
          <div>
            <Link 
              href={otherUser.role === 'host' ? `/hosts/${otherUser._id}` : '#'}
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
            >
              Профиль <ChevronRightIcon className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(message => {
            const isCurrentUser = message.sender._id === currentUser._id;
            
            return (
              <div 
                key={message._id}
                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%]`}>
                  <div className={`rounded-lg p-3 ${
                    isCurrentUser 
                      ? 'bg-blue-100 text-gray-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p>{message.text}</p>
                    {renderMessageAttachments(message.attachments)}
                  </div>
                  
                  <div className={`flex items-center mt-1 text-xs text-gray-500 ${
                    isCurrentUser ? 'justify-end' : 'justify-start'
                  }`}>
                    <span>{formatMessageTime(message.createdAt)}</span>
                    
                    {isCurrentUser && (
                      <span className="ml-2">
                        {message.readAt ? (
                          <span className="flex items-center text-green-600">
                            <CheckCircleIcon className="w-4 h-4 mr-0.5" />
                            Прочитано
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <CheckCircleIcon className="w-4 h-4 mr-0.5" />
                            Отправлено
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Message Input */}
        <div className="border-t p-4">
          <form onSubmit={handleSendMessage} className="flex items-end gap-3">
            {/* В реальном приложении здесь будет реализована загрузка файлов */}
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
              title="Добавить вложение"
            >
              <PhotoIcon className="w-5 h-5" />
            </button>
            
            <div className="flex-1">
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Напишите сообщение..."
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={1}
                style={{ minHeight: '40px', maxHeight: '120px' }}
              />
            </div>
            
            <button
              type="submit"
              disabled={!messageText.trim()}
              className={`rounded-full p-2 ${
                messageText.trim() 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <AccountLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Сообщения</h1>
        <p className="text-gray-600">Общайтесь с хозяевами и другими пользователями</p>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="md:grid md:grid-cols-3 h-[600px]">
          {/* Chats List */}
          <div className="border-r h-full overflow-hidden flex flex-col">
            <div className="p-4 border-b">
              <input
                type="text"
                placeholder="Поиск по сообщениям..."
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="overflow-y-auto flex-1">
              {renderChatList()}
            </div>
          </div>
          
          {/* Chat Area */}
          <div className="md:col-span-2 h-full flex flex-col">
            {activeChat ? (
              renderChatMessages()
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <ChatBubbleLeftRightIcon className="w-16 h-16 text-gray-300 mb-3" />
                <h3 className="text-lg font-medium text-gray-700">Выберите чат</h3>
                <p className="text-gray-500 max-w-md mt-1">
                  Выберите разговор из списка слева или начните новый
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AccountLayout>
  );
} 