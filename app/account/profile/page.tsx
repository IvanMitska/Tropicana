'use client';

import React, { useState, useRef, ChangeEvent } from 'react';
import { useAuth } from '@/app/hooks/useAuth';
import AccountLayout from '@/app/components/layout/AccountLayout';
import { PencilIcon, ArrowPathIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: {
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      country: user?.address?.country || '',
      postalCode: user?.address?.postalCode || '',
    },
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatar || null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof typeof formData],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Проверка размера и типа файла
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Размер файла не должен превышать 5MB');
      return;
    }

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast.error('Поддерживаются только JPG, PNG и WebP форматы');
      return;
    }

    setAvatarFile(file);
    
    // Создаем превью
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Здесь будет отправка данных на сервер
      // В реальном приложении код будет включать загрузку аватара и обновление профиля
      
      // Имитация задержки API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Обновление профиля через контекст аутентификации
      await updateProfile(formData);
      
      setIsEditing(false);
      toast.success('Профиль успешно обновлен');
    } catch (error) {
      toast.error('Ошибка при обновлении профиля');
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelEdit = () => {
    // Возвращаем исходные данные
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: {
        street: user?.address?.street || '',
        city: user?.address?.city || '',
        state: user?.address?.state || '',
        country: user?.address?.country || '',
        postalCode: user?.address?.postalCode || '',
      },
    });
    setAvatarPreview(user?.avatar || null);
    setAvatarFile(null);
    setIsEditing(false);
  };

  const ProfileDetails = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt={user?.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 text-2xl font-semibold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex-1">
          <h2 className="text-xl font-semibold">{user?.name}</h2>
          <p className="text-gray-600">{user?.email}</p>
          {user?.phone && <p className="text-gray-600 mt-1">{user.phone}</p>}
        </div>

        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          <PencilIcon className="w-4 h-4 mr-2" />
          Редактировать
        </button>
      </div>

      <div className="border-t pt-6 mt-6">
        <h3 className="text-lg font-semibold mb-4">Личная информация</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Имя</p>
            <p>{user?.name || '—'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Email</p>
            <p>{user?.email || '—'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Телефон</p>
            <p>{user?.phone || '—'}</p>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Адрес</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Улица</p>
            <p>{user?.address?.street || '—'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Город</p>
            <p>{user?.address?.city || '—'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Регион</p>
            <p>{user?.address?.state || '—'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Страна</p>
            <p>{user?.address?.country || '—'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Почтовый индекс</p>
            <p>{user?.address?.postalCode || '—'}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const ProfileForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        <div className="relative">
          <div
            className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 cursor-pointer group"
            onClick={handleAvatarClick}
          >
            {avatarPreview ? (
              <>
                <img
                  src={avatarPreview}
                  alt={formData.name}
                  className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <PencilIcon className="w-6 h-6 text-white" />
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 text-2xl font-semibold group-hover:opacity-75 transition-opacity">
                {formData.name.charAt(0).toUpperCase()}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <PencilIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              className="hidden"
              accept="image/jpeg,image/png,image/webp"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">Нажмите для изменения</p>
        </div>
        
        <div className="flex-1">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Имя
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Адрес</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
              Улица
            </label>
            <input
              type="text"
              id="street"
              name="address.street"
              value={formData.address.street}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              Город
            </label>
            <input
              type="text"
              id="city"
              name="address.city"
              value={formData.address.city}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              Регион
            </label>
            <input
              type="text"
              id="state"
              name="address.state"
              value={formData.address.state}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
              Страна
            </label>
            <input
              type="text"
              id="country"
              name="address.country"
              value={formData.address.country}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
              Почтовый индекс
            </label>
            <input
              type="text"
              id="postalCode"
              name="address.postalCode"
              value={formData.address.postalCode}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={cancelEdit}
          className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
          disabled={isLoading}
        >
          <XMarkIcon className="w-4 h-4 mr-2" />
          Отмена
        </button>
        <button
          type="submit"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <ArrowPathIcon className="w-4 h-4 mr-2 animate-spin" />
              Сохранение...
            </>
          ) : (
            <>
              <CheckIcon className="w-4 h-4 mr-2" />
              Сохранить
            </>
          )}
        </button>
      </div>
    </form>
  );

  return (
    <AccountLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Мой профиль</h1>
        <p className="text-gray-600">Управление личной информацией и настройками профиля</p>
      </div>

      {isEditing ? <ProfileForm /> : <ProfileDetails />}
      
      {/* Секция смены пароля */}
      {!isEditing && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Безопасность</h3>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium">Изменить пароль</h4>
              <p className="text-sm text-gray-600">Для изменения пароля вы будете перенаправлены на страницу безопасности</p>
            </div>
            <Link href="/account/security" className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors">
              Изменить пароль
            </Link>
          </div>
        </div>
      )}
    </AccountLayout>
  );
}