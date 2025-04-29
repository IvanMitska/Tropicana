'use client';

import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

type Department = 'all' | 'management' | 'development' | 'marketing' | 'support';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  department: Department;
  photo: string;
  bio: string;
  social: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

const TeamSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedDepartment, setSelectedDepartment] = useState<Department>('all');

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Иван Петров',
      position: 'CEO и основатель',
      department: 'management',
      photo: '/images/about/team-1.jpg',
      bio: 'Более 10 лет опыта в сфере недвижимости и IT. Создал компанию с нуля и развил до международного уровня.',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        email: 'ivan@example.com'
      }
    },
    {
      id: 2,
      name: 'Елена Смирнова',
      position: 'Операционный директор',
      department: 'management',
      photo: '/images/about/team-2.jpg',
      bio: 'Руководит всеми операционными процессами компании. Ранее работала в крупных международных компаниях.',
      social: {
        linkedin: 'https://linkedin.com',
        email: 'elena@example.com'
      }
    },
    {
      id: 3,
      name: 'Сергей Иванов',
      position: 'Технический директор',
      department: 'development',
      photo: '/images/about/team-3.jpg',
      bio: 'Архитектор всех технических решений компании. Эксперт в области веб-разработки и облачных технологий.',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        email: 'sergey@example.com'
      }
    },
    {
      id: 4,
      name: 'Анна Козлова',
      position: 'Директор по маркетингу',
      department: 'marketing',
      photo: '/images/about/team-4.jpg',
      bio: 'Отвечает за все маркетинговые стратегии и бренд компании. Имеет большой опыт в digital маркетинге.',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        email: 'anna@example.com'
      }
    },
    {
      id: 5,
      name: 'Алексей Морозов',
      position: 'Ведущий разработчик',
      department: 'development',
      photo: '/images/about/team-5.jpg',
      bio: 'Руководит командой разработчиков. Специалист по React и Node.js с более чем 7-летним опытом.',
      social: {
        linkedin: 'https://linkedin.com',
        email: 'alexey@example.com'
      }
    },
    {
      id: 6,
      name: 'Мария Соколова',
      position: 'Руководитель службы поддержки',
      department: 'support',
      photo: '/images/about/team-6.jpg',
      bio: 'Обеспечивает высокое качество обслуживания клиентов. Эксперт в области клиентского сервиса.',
      social: {
        linkedin: 'https://linkedin.com',
        email: 'maria@example.com'
      }
    },
    {
      id: 7,
      name: 'Дмитрий Новиков',
      position: 'UI/UX дизайнер',
      department: 'development',
      photo: '/images/about/team-7.jpg',
      bio: 'Отвечает за дизайн и пользовательский опыт всех продуктов компании. Специалист по интерфейсам.',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        email: 'dmitry@example.com'
      }
    },
    {
      id: 8,
      name: 'Ольга Белова',
      position: 'Маркетолог-аналитик',
      department: 'marketing',
      photo: '/images/about/team-8.jpg',
      bio: 'Анализирует эффективность маркетинговых кампаний и поведение пользователей на сайте.',
      social: {
        linkedin: 'https://linkedin.com',
        email: 'olga@example.com'
      }
    }
  ];

  const departments = [
    { value: 'all', label: 'Все отделы' },
    { value: 'management', label: 'Руководство' },
    { value: 'development', label: 'Разработка' },
    { value: 'marketing', label: 'Маркетинг' },
    { value: 'support', label: 'Поддержка' }
  ];

  const filteredMembers = teamMembers.filter(
    member => selectedDepartment === 'all' || member.department === selectedDepartment
  );

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Наша команда</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Профессионалы, которые делают нашу компанию особенной и помогают клиентам находить идеальные варианты для аренды.
          </p>
        </div>

        <div className="flex flex-wrap justify-center mb-12 gap-2">
          {departments.map(department => (
            <button
              key={department.value}
              onClick={() => setSelectedDepartment(department.value as Department)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedDepartment === department.value 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {department.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredMembers.map((member, index) => (
            <div 
              key={member.id}
              className={`bg-white rounded-lg overflow-hidden shadow-md transition-all duration-500 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative h-72 w-full">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-blue-600 mb-4">{member.position}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                <div className="flex space-x-4">
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.7,3H4.3C3.6,3,3,3.6,3,4.3v15.4C3,20.4,3.6,21,4.3,21h15.4c0.7,0,1.3-0.6,1.3-1.3V4.3C21,3.6,20.4,3,19.7,3z M8.3,18.6H5.7V9.2h2.6V18.6z M7,8.1C6.1,8.1,5.4,7.4,5.4,6.5c0-0.9,0.7-1.6,1.6-1.6c0.9,0,1.6,0.7,1.6,1.6C8.6,7.4,7.9,8.1,7,8.1z M18.6,18.6H16V13.9c0-1-0.4-1.6-1.3-1.6c-0.9,0-1.3,0.6-1.3,1.6v4.7h-2.6V9.2h2.6v1c0.3-0.7,1.1-1.2,2.2-1.2c1.7,0,3,1,3,3.1V18.6z" />
                      </svg>
                    </a>
                  )}
                  {member.social.twitter && (
                    <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 22 5.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 5.477A4.072 4.072 0 0 1 2.8 9.713v.052a4.105 4.105 0 0 0 3.292 4.022 4.095 4.095 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 2 18.407a11.616 11.616 0 0 0 6.29 1.84" />
                      </svg>
                    </a>
                  )}
                  {member.social.email && (
                    <a href={`mailto:${member.social.email}`} className="text-gray-400 hover:text-red-500">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection; 