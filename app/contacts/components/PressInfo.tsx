'use client';

import { useState } from 'react';
import { DocumentIcon, PhotoIcon, VideoCameraIcon } from '@heroicons/react/24/outline';

interface PressRelease {
  id: string;
  title: string;
  date: string;
  description: string;
  link: string;
}

interface MediaFile {
  id: string;
  title: string;
  type: 'document' | 'photo' | 'video';
  size: string;
  link: string;
}

const pressReleases: PressRelease[] = [
  {
    id: '1',
    title: 'Открытие нового офиса в Москве',
    date: '2024-03-15',
    description: 'Компания RentWeb объявляет об открытии нового офиса в центре Москвы',
    link: '/press/releases/1'
  },
  {
    id: '2',
    title: 'Запуск нового сервиса аренды',
    date: '2024-03-01',
    description: 'Представляем новый сервис для быстрой аренды недвижимости',
    link: '/press/releases/2'
  }
];

const mediaFiles: MediaFile[] = [
  {
    id: '1',
    title: 'Логотип компании',
    type: 'photo',
    size: '2.5 MB',
    link: '/media/logo.zip'
  },
  {
    id: '2',
    title: 'Брендбук 2024',
    type: 'document',
    size: '15 MB',
    link: '/media/brandbook.pdf'
  },
  {
    id: '3',
    title: 'Презентация компании',
    type: 'document',
    size: '8 MB',
    link: '/media/presentation.pdf'
  }
];

export default function PressInfo() {
  const [selectedTab, setSelectedTab] = useState<'releases' | 'media'>('releases');

  const getFileIcon = (type: MediaFile['type']) => {
    switch (type) {
      case 'document':
        return <DocumentIcon className="h-6 w-6 text-blue-500" />;
      case 'photo':
        return <PhotoIcon className="h-6 w-6 text-green-500" />;
      case 'video':
        return <VideoCameraIcon className="h-6 w-6 text-red-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Для прессы</h2>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setSelectedTab('releases')}
              className={`${
                selectedTab === 'releases'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Пресс-релизы
            </button>
            <button
              onClick={() => setSelectedTab('media')}
              className={`${
                selectedTab === 'media'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Медиафайлы
            </button>
          </nav>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Контакты пресс-службы</h3>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Телефон:</span> +7 (495) 123-45-67
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> press@rentweb.ru
            </p>
          </div>
        </div>

        {selectedTab === 'releases' ? (
          <div>
            <h3 className="text-lg font-medium mb-4">Последние пресс-релизы</h3>
            <div className="space-y-4">
              {pressReleases.map(release => (
                <div
                  key={release.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{release.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{release.date}</p>
                      <p className="text-gray-600 mt-2">{release.description}</p>
                    </div>
                    <a
                      href={release.link}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Читать
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-medium mb-4">Медиафайлы для скачивания</h3>
            <div className="space-y-4">
              {mediaFiles.map(file => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-4">
                    {getFileIcon(file.type)}
                    <div>
                      <h4 className="font-medium">{file.title}</h4>
                      <p className="text-sm text-gray-500">{file.size}</p>
                    </div>
                  </div>
                  <a
                    href={file.link}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    download
                  >
                    Скачать
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 