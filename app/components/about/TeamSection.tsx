'use client';

import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

type Department = 'all' | 'management' | 'development' | 'marketing' | 'support';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  departments: Department[];
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
      name: 'Ivan Mitska',
      position: 'Технический директор / Руководитель разработки и поддержки',
      departments: ['management', 'development', 'support'],
      photo: '/images/about/ivanmitska.jpg',
      bio: 'Отвечает за все технические аспекты, руководит разработкой и обеспечивает поддержку клиентов.',
      social: {
        linkedin: '#',
        email: 'ivan.mitska@phuketnaladoni.com'
      }
    },
    {
      id: 2,
      name: 'Евгений Гертье',
      position: 'Директор по маркетингу и SEO',
      departments: ['management', 'marketing'],
      photo: '/images/about/team-gertie.jpg',
      bio: 'Разрабатывает и реализует маркетинговые стратегии, отвечает за поисковую оптимизацию и продвижение компании на рынке.',
      social: {
        linkedin: '#',
        email: 'evgeny.gertie@phuketnaladoni.com'
      }
    },
    {
      id: 3,
      name: 'Алексей',
      position: 'Операционный руководитель / Ведущий специалист поддержки',
      departments: ['management', 'support'],
      photo: '/images/about/team-alex.jpg',
      bio: 'Обеспечивает бесперебойную работу операционных процессов и является ключевым специалистом в команде поддержки, решая запросы клиентов.',
      social: {
        linkedin: '#',
        email: 'alex@phuketnaladoni.com'
      }
    }
  ];

  const departments = [
    { value: 'all', label: 'Все отделы' },
    { value: 'management', label: 'Руководство' },
    { value: 'development', label: 'Разработка и Дизайн' },
    { value: 'marketing', label: 'Маркетинг и Контент' },
    { value: 'support', label: 'Поддержка Клиентов' }
  ];

  const filteredMembers = teamMembers.filter(
    member => selectedDepartment === 'all' || member.departments.includes(selectedDepartment)
  );

  return (
    <section className="py-16 md:py-24 bg-[#f5f5f5]">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className={`text-center mb-12 md:mb-20 transition-all duration-700 ease-out ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3c3c] mb-4">Наша Команда</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Познакомьтесь с профессионалами, которые каждый день работают над тем, чтобы ваш отдых на Пхукете был идеальным.
          </p>
        </div>

        <div className="flex flex-wrap justify-center mb-10 md:mb-12 gap-3 md:gap-4">
          {departments.map(department => (
            <button
              key={department.value}
              onClick={() => setSelectedDepartment(department.value as Department)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out shadow-sm hover:shadow-md transform hover:-translate-y-0.5 ${
                selectedDepartment === department.value 
                  ? 'bg-[#1e3c3c] text-white' 
                  : 'bg-white text-[#1e3c3c] hover:bg-gray-100'
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
              className={`bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-500 ease-out hover:shadow-2xl transform hover:scale-105 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              <div className="relative h-80 w-full">
                <Image
                  src={member.photo}
                  alt={`Фото ${member.name}`}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <h3 className="text-xl font-bold text-white mb-0.5 leading-tight text-shadow-sm">{member.name}</h3>
                  <p className="text-sm text-[#e5916e] font-semibold text-shadow-xs">{member.position}</p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-600 text-xs leading-relaxed mb-4 h-20 overflow-hidden">
                  {member.bio}
                </p>
                <div className="flex space-x-3 items-center border-t border-gray-100 pt-4">
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="text-gray-400 hover:text-[#0077B5] transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  )}
                  {member.social.twitter && (
                    <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" title="Twitter" className="text-gray-400 hover:text-[#1DA1F2] transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-.422.724-.665 1.56-.665 2.456 0 1.484.756 2.793 1.903 3.562-.703-.022-1.365-.216-1.942-.534v.064c0 2.072 1.474 3.808 3.428 4.196-.358.096-.736.148-1.13.148-.274 0-.54-.026-.796-.076.546 1.694 2.132 2.932 4.012 2.966-1.463 1.146-3.303 1.826-5.302 1.826-.345 0-.685-.02-1.02-.06C3.442 21.009 5.607 22 7.952 22c9.539 0 14.763-7.906 14.763-14.763 0-.225-.005-.448-.015-.67A10.517 10.517 0 0024 4.557z" />
                      </svg>
                    </a>
                  )}
                  {member.social.email && (
                    <a href={`mailto:${member.social.email}`} title="Email" className="text-gray-400 hover:text-[#e5916e] transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
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