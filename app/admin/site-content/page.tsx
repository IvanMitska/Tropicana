'use client';

import { useState, useEffect } from 'react';

// Указываем, что эта страница должна рендериться динамически
export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { useAdmin } from '@/app/hooks/useAdmin';
import ImageUpload from '@/app/components/admin/ImageUpload';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';

interface SiteContent {
  heroImages: string[];
  heroTitle: string;
  heroSubtitle: string;
  logoUrl: string;
  aboutImages: string[];
  servicesImages: string[];
  testimonialImages: string[];
}

export default function SiteContentPage() {
  const { user, logout } = useAdmin();
  const [content, setContent] = useState<SiteContent>({
    heroImages: [],
    heroTitle: 'Лучшие предложения аренды',
    heroSubtitle: 'Найдите идеальный транспорт, жилье или экскурсию',
    logoUrl: '/logo.png',
    aboutImages: [],
    servicesImages: [],
    testimonialImages: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/admin/login';
  };

  useEffect(() => {
    fetchSiteContent();
  }, []);

  const fetchSiteContent = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/site-content');
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      }
    } catch (error) {
      console.error('Error fetching site content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/admin/site-content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });

      if (response.ok) {
        alert('Контент успешно сохранен!');
      } else {
        alert('Ошибка при сохранении');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Ошибка при сохранении');
    } finally {
      setIsSaving(false);
    }
  };

  const updateContent = (key: keyof SiteContent, value: any) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-light via-white to-light/50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-light via-white to-light/50">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard" className="text-white hover:text-white/80 transition-colors">
                <span className="text-2xl">←</span>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Управление контентом сайта
                </h1>
                <p className="text-white/90 text-sm">Добро пожаловать, {user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white/20 hover:bg-red-500/20 text-white px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              Выйти
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Hero Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-primary/10">
            <h2 className="text-xl font-semibold mb-4 text-dark">Главная секция (Hero)</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Заголовок
                </label>
                <Input
                  value={content.heroTitle}
                  onChange={(e) => updateContent('heroTitle', e.target.value)}
                  placeholder="Введите заголовок"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Подзаголовок
                </label>
                <Input
                  value={content.heroSubtitle}
                  onChange={(e) => updateContent('heroSubtitle', e.target.value)}
                  placeholder="Введите подзаголовок"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Фоновые изображения героя
              </label>
              <ImageUpload
                onUpload={(urls) => updateContent('heroImages', urls)}
                multiple={true}
                existingImages={content.heroImages}
              />
              <p className="text-sm text-gray-500 mt-2">
                Рекомендуемый размер: 1920x1080px или больше
              </p>
            </div>
          </div>

          {/* Logo Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-secondary/10">
            <h2 className="text-xl font-semibold mb-4 text-dark">Логотип</h2>
            
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={content.logoUrl} 
                alt="Логотип" 
                className="h-16 w-auto"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.jpg';
                }}
              />
              <div>
                <p className="text-sm text-gray-600">Текущий логотип</p>
                <p className="text-xs text-gray-500">Рекомендуемый размер: 200x60px</p>
              </div>
            </div>
            
            <ImageUpload
              onUpload={(urls) => updateContent('logoUrl', urls[0])}
              multiple={false}
              existingImages={content.logoUrl ? [content.logoUrl] : []}
            />
          </div>

          {/* About Images */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-primary/10">
            <h2 className="text-xl font-semibold mb-4 text-dark">Изображения для секции "О нас"</h2>
            
            <ImageUpload
              onUpload={(urls) => updateContent('aboutImages', urls)}
              multiple={true}
              existingImages={content.aboutImages}
            />
            <p className="text-sm text-gray-500 mt-2">
              Изображения для использования в блоке "О нас"
            </p>
          </div>

          {/* Services Images */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-secondary/10">
            <h2 className="text-xl font-semibold mb-4 text-dark">Изображения для секции "Услуги"</h2>
            
            <ImageUpload
              onUpload={(urls) => updateContent('servicesImages', urls)}
              multiple={true}
              existingImages={content.servicesImages}
            />
            <p className="text-sm text-gray-500 mt-2">
              Изображения для карточек услуг
            </p>
          </div>

          {/* Testimonials Images */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-primary/10">
            <h2 className="text-xl font-semibold mb-4 text-dark">Изображения для отзывов</h2>
            
            <ImageUpload
              onUpload={(urls) => updateContent('testimonialImages', urls)}
              multiple={true}
              existingImages={content.testimonialImages}
            />
            <p className="text-sm text-gray-500 mt-2">
              Фотографии клиентов для отзывов
            </p>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white px-8 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
            >
              {isSaving ? 'Сохранение...' : 'Сохранить изменения'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
} 