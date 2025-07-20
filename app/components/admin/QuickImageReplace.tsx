'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/Button';
import { Modal } from '@/app/components/ui/Modal';
import ImageUpload from './ImageUpload';

interface QuickImageReplaceProps {
  currentImage: string;
  onImageUpdate: (newUrl: string) => void;
  title: string;
  description?: string;
}

export default function QuickImageReplace({
  currentImage,
  onImageUpdate,
  title,
  description
}: QuickImageReplaceProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async (urls: string[]) => {
    if (urls.length > 0) {
      setIsLoading(true);
      try {
        await onImageUpdate(urls[0]);
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error updating image:', error);
        alert('Ошибка при обновлении изображения');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const copyImageUrl = () => {
    navigator.clipboard.writeText(currentImage);
    alert('URL изображения скопирован в буфер обмена');
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
        <div className="aspect-video relative mb-3">
          <img
            src={currentImage}
            alt={title}
            className="w-full h-full object-cover rounded-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.jpg';
            }}
          />
          
          {/* Overlay с кнопками */}
          <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded-lg">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1"
            >
              Заменить
            </Button>
            <Button
              onClick={copyImageUrl}
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-black text-sm px-3 py-1"
            >
              URL
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium text-gray-900">{title}</h3>
          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 truncate max-w-32">
              {currentImage.split('/').pop()}
            </span>
            <Button
              onClick={() => setIsModalOpen(true)}
              size="sm"
              variant="outline"
              className="text-xs"
            >
              Изменить
            </Button>
          </div>
        </div>
      </div>

      {/* Modal для замены изображения */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Заменить: ${title}`}
      >
        <div className="p-6">
          <div className="mb-4">
            <h4 className="font-medium mb-2">Текущее изображение:</h4>
            <img
              src={currentImage}
              alt={title}
              className="w-full max-w-md h-32 object-cover rounded-lg mx-auto"
            />
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium mb-2">Загрузить новое изображение:</h4>
            <ImageUpload
              onUpload={handleImageUpload}
              multiple={false}
              className="mb-4"
            />
          </div>
          
          {description && (
            <div className="text-sm text-gray-600 mb-4">
              <p>{description}</p>
            </div>
          )}
          
          <div className="flex gap-2 justify-end">
            <Button
              onClick={() => setIsModalOpen(false)}
              variant="outline"
              disabled={isLoading}
            >
              Отмена
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
} 