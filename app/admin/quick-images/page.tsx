'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/app/components/admin/AdminLayout';
import QuickImageReplace from '@/app/components/admin/QuickImageReplace';
import { Button } from '@/app/components/ui/Button';

interface QuickImageData {
  id: string;
  title: string;
  currentUrl: string;
  description: string;
  category: string;
}

export default function QuickImagesPage() {
  const [images, setImages] = useState<QuickImageData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadQuickImages();
  }, []);

  const loadQuickImages = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/quick-images');
      if (response.ok) {
        const data = await response.json();
        setImages(data.images);
      }
    } catch (error) {
      console.error('Error loading quick images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpdate = async (imageId: string, newUrl: string) => {
    try {
      const response = await fetch(`/api/admin/quick-images/${imageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: newUrl }),
      });

      if (response.ok) {
        // Обновляем локальное состояние
        setImages(prevImages =>
          prevImages.map(img =>
            img.id === imageId ? { ...img, currentUrl: newUrl } : img
          )
        );
        alert('Изображение успешно обновлено!');
      } else {
        throw new Error('Ошибка при обновлении');
      }
    } catch (error) {
      console.error('Error updating image:', error);
      throw error;
    }
  };

  const categories = [
    { id: 'all', name: 'Все изображения' },
    { id: 'hero', name: 'Главная секция' },
    { id: 'services', name: 'Услуги' },
    { id: 'about', name: 'О нас' },
    { id: 'gallery', name: 'Галерея' },
    { id: 'other', name: 'Другое' }
  ];

  const filteredImages = filter === 'all' 
    ? images 
    : images.filter(img => img.category === filter);

  if (isLoading) {
    return (
      <AdminLayout title="Быстрое управление изображениями">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Быстрое управление изображениями">
      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          Быстро заменяйте основные изображения на вашем сайте. Все изменения применяются сразу.
        </p>
        
        {/* Фильтры */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map(category => (
            <Button
              key={category.id}
              onClick={() => setFilter(category.id)}
              variant={filter === category.id ? 'default' : 'outline'}
              size="sm"
              className={filter === category.id ? 'bg-blue-600 text-white' : ''}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Статистика */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-blue-800">
              📊 Всего изображений: {images.length}
            </span>
            <span className="text-blue-800">
              🎯 Отображается: {filteredImages.length}
            </span>
            <span className="text-blue-800">
              📁 Категория: {categories.find(c => c.id === filter)?.name}
            </span>
          </div>
        </div>
      </div>

      {/* Сетка изображений */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredImages.map((image) => (
          <QuickImageReplace
            key={image.id}
            currentImage={image.currentUrl}
            onImageUpdate={(newUrl) => handleImageUpdate(image.id, newUrl)}
            title={image.title}
            description={image.description}
          />
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🖼️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Нет изображений в этой категории
          </h3>
          <p className="text-gray-500 mb-4">
            {filter === 'all' 
              ? 'Загрузите изображения через другие разделы админ-панели'
              : 'Попробуйте выбрать другую категорию или добавить изображения'
            }
          </p>
        </div>
      )}

      {/* Подсказки */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="font-medium text-gray-900 mb-3">💡 Полезные советы:</h3>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>• Наведите на изображение, чтобы увидеть кнопки управления</li>
          <li>• Используйте кнопку "URL" для копирования ссылки на изображение</li>
          <li>• Рекомендуемые форматы: JPG, PNG, WebP</li>
          <li>• Максимальный размер файла: 10MB</li>
          <li>• Все изменения применяются сразу после загрузки</li>
        </ul>
      </div>
    </AdminLayout>
  );
} 