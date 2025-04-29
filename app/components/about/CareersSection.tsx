'use client';

import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'remote';
  description: string;
  requirements: string[];
  responsibilities: string[];
}

const CareersSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeJob, setActiveJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    resume: null as File | null,
  });

  const jobs: Job[] = [
    {
      id: 1,
      title: 'Frontend-разработчик',
      department: 'Разработка',
      location: 'Москва',
      type: 'full-time',
      description: 'Разработка пользовательских интерфейсов для нашей платформы аренды с использованием современных технологий.',
      requirements: [
        'Опыт коммерческой разработки от 3 лет',
        'Уверенное владение React и TypeScript',
        'Опыт работы с Next.js',
        'Знание CSS-фреймворков (Tailwind, Styled Components)',
        'Понимание принципов адаптивной верстки',
        'Опыт работы с REST API',
      ],
      responsibilities: [
        'Разработка и поддержка пользовательского интерфейса',
        'Оптимизация производительности фронтенда',
        'Разработка новых компонентов и функциональности',
        'Участие в проектировании архитектуры',
        'Код-ревью и наставничество',
      ]
    },
    {
      id: 2,
      title: 'Backend-разработчик',
      department: 'Разработка',
      location: 'Москва',
      type: 'full-time',
      description: 'Разработка серверной части приложений для платформы аренды с фокусом на производительность и масштабируемость.',
      requirements: [
        'Опыт коммерческой разработки от 3 лет',
        'Уверенное владение Node.js и Express',
        'Опыт работы с MongoDB или другими NoSQL БД',
        'Знание принципов RESTful API',
        'Опыт работы с системами аутентификации и авторизации',
        'Понимание принципов CI/CD',
      ],
      responsibilities: [
        'Разработка и поддержка API',
        'Оптимизация работы с базами данных',
        'Интеграция с внешними сервисами',
        'Разработка новой функциональности',
        'Автоматизация процессов развертывания',
      ]
    },
    {
      id: 3,
      title: 'UI/UX дизайнер',
      department: 'Дизайн',
      location: 'Удаленно',
      type: 'remote',
      description: 'Создание красивых, интуитивно понятных интерфейсов и улучшение пользовательского опыта для наших сервисов аренды.',
      requirements: [
        'Опыт работы в UI/UX дизайне от 2 лет',
        'Владение Figma, Adobe XD или Sketch',
        'Портфолио с примерами проектов',
        'Понимание принципов юзабилити и доступности',
        'Умение создавать адаптивные дизайны',
        'Базовое понимание HTML/CSS',
      ],
      responsibilities: [
        'Создание прототипов и дизайн-макетов',
        'Разработка дизайн-системы',
        'Проведение юзабилити-тестирования',
        'Улучшение пользовательского опыта',
        'Тесное взаимодействие с командой разработки',
      ]
    },
    {
      id: 4,
      title: 'Менеджер по работе с клиентами',
      department: 'Клиентский сервис',
      location: 'Санкт-Петербург',
      type: 'full-time',
      description: 'Обеспечение высокого уровня обслуживания клиентов и решение проблем, связанных с арендой объектов.',
      requirements: [
        'Опыт работы с клиентами от 1 года',
        'Отличные коммуникативные навыки',
        'Стрессоустойчивость и эмпатия',
        'Умение решать конфликтные ситуации',
        'Знание английского языка на уровне не ниже B2',
        'Опыт работы в CRM-системах',
      ],
      responsibilities: [
        'Сопровождение клиентов на всех этапах аренды',
        'Обработка запросов и решение проблем',
        'Подготовка отчетности по взаимодействию с клиентами',
        'Сбор обратной связи и улучшение процессов',
        'Участие в разработке стандартов обслуживания',
      ]
    },
    {
      id: 5,
      title: 'Маркетолог',
      department: 'Маркетинг',
      location: 'Москва',
      type: 'part-time',
      description: 'Разработка и реализация маркетинговых стратегий для продвижения услуг аренды на целевые рынки.',
      requirements: [
        'Опыт работы в маркетинге от 2 лет',
        'Знание digital-инструментов продвижения',
        'Опыт проведения рекламных кампаний',
        'Аналитические способности',
        'Умение работать с маркетинговыми метриками',
        'Знание основ SEO и SMM',
      ],
      responsibilities: [
        'Разработка маркетинговых кампаний',
        'Анализ эффективности рекламных активностей',
        'Управление контент-маркетингом',
        'Работа с аналитикой и отчетностью',
        'Взаимодействие с партнерами и подрядчиками',
      ]
    }
  ];

  const handleJobClick = (job: Job) => {
    setActiveJob(job);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, resume: e.target.files?.[0] || null }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки формы
    alert('Ваше резюме успешно отправлено!');
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      resume: null,
    });
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Карьера в нашей компании</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Присоединяйтесь к команде профессионалов и развивайтесь вместе с нами в быстрорастущей сфере аренды и туризма.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 mb-16">
          <div className={`w-full lg:w-1/2 transition-all duration-1000 delay-200 ${
            inView ? 'opacity-100 lg:translate-x-0' : 'opacity-0 lg:-translate-x-10'
          }`}>
            <h3 className="text-2xl font-bold mb-6">Наша корпоративная культура</h3>
            
            <div className="prose max-w-none">
              <p>
                Мы создаем открытую и дружественную атмосферу, где каждый сотрудник может 
                реализовать свой потенциал и внести вклад в развитие компании. Наши ценности:
              </p>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="bg-blue-100 text-blue-600 p-1 rounded-full mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>Инновации и постоянное развитие</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-blue-100 text-blue-600 p-1 rounded-full mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>Командная работа и взаимоуважение</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-blue-100 text-blue-600 p-1 rounded-full mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>Ответственность и качество работы</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-blue-100 text-blue-600 p-1 rounded-full mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>Ориентация на результат</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-blue-100 text-blue-600 p-1 rounded-full mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>Баланс работы и личной жизни</span>
                </li>
              </ul>
              
              <p>
                Мы предлагаем нашим сотрудникам:
              </p>
              
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="bg-green-100 text-green-600 p-1 rounded-full mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </span>
                  <span>Конкурентная заработная плата и бонусы</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-green-100 text-green-600 p-1 rounded-full mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </span>
                  <span>Гибкий график и возможность удаленной работы</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-green-100 text-green-600 p-1 rounded-full mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </span>
                  <span>Медицинскую страховку и социальный пакет</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-green-100 text-green-600 p-1 rounded-full mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </span>
                  <span>Возможности для обучения и профессионального роста</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-green-100 text-green-600 p-1 rounded-full mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </span>
                  <span>Современный офис и комфортное рабочее место</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className={`w-full lg:w-1/2 transition-all duration-1000 delay-400 ${
            inView ? 'opacity-100 lg:translate-x-0' : 'opacity-0 lg:translate-x-10'
          }`}>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-60 rounded-lg overflow-hidden">
                <Image
                  src="/images/about/office-1.jpg"
                  alt="Наш офис"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-60 rounded-lg overflow-hidden">
                <Image
                  src="/images/about/office-2.jpg"
                  alt="Наш офис"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-60 rounded-lg overflow-hidden">
                <Image
                  src="/images/about/team-event-1.jpg"
                  alt="Командные мероприятия"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-60 rounded-lg overflow-hidden">
                <Image
                  src="/images/about/team-event-2.jpg"
                  alt="Командные мероприятия"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">Открытые вакансии</h3>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {jobs.map((job, index) => (
                    <button
                      key={job.id}
                      onClick={() => handleJobClick(job)}
                      className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                        activeJob?.id === job.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{job.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          job.type === 'full-time' ? 'bg-green-100 text-green-800' :
                          job.type === 'part-time' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {job.type === 'full-time' ? 'Полный день' :
                          job.type === 'part-time' ? 'Частичная занятость' :
                          'Удаленно'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {job.department} • {job.location}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-2/3">
              {activeJob ? (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">{activeJob.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                        {activeJob.department}
                      </span>
                      <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                        {activeJob.location}
                      </span>
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        activeJob.type === 'full-time' ? 'bg-green-100 text-green-800' :
                        activeJob.type === 'part-time' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {activeJob.type === 'full-time' ? 'Полный день' :
                        activeJob.type === 'part-time' ? 'Частичная занятость' :
                        'Удаленно'}
                      </span>
                    </div>
                    <p className="text-gray-600">{activeJob.description}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3">Требования</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {activeJob.requirements.map((req, index) => (
                        <li key={index} className="text-gray-600">{req}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3">Обязанности</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {activeJob.responsibilities.map((resp, index) => (
                        <li key={index} className="text-gray-600">{resp}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Откликнуться на вакансию</h4>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Имя*
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email*
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Телефон
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Сопроводительное письмо
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
                          Резюме (PDF, DOC, DOCX)*
                        </label>
                        <input
                          type="file"
                          id="resume"
                          name="resume"
                          required
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Максимальный размер файла: 5MB
                        </p>
                      </div>
                      
                      <div>
                        <button
                          type="submit"
                          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                        >
                          Отправить заявку
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center h-full">
                  <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p className="text-gray-500 text-lg text-center">
                    Выберите вакансию из списка, чтобы увидеть подробную информацию
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersSection; 