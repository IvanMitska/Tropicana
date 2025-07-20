'use client';

import { useState, useRef } from 'react';
import { Button } from '@/app/components/ui/Button';

interface ImageUploadProps {
  onUpload: (urls: string[]) => void;
  multiple?: boolean;
  existingImages?: string[];
  className?: string;
}

export default function ImageUpload({
  onUpload,
  multiple = true,
  existingImages = [],
  className = ''
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>(existingImages);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      Array.from(files).forEach(file => {
        formData.append('files', file);
      });

      const response = await fetch('/api/admin/upload/cloudinary', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const newImageUrls = data.urls;
        const newImages = multiple 
          ? [...uploadedImages, ...newImageUrls]
          : newImageUrls;
        
        setUploadedImages(newImages);
        onUpload(newImages);
      } else {
        const error = await response.json();
        alert(error.error || 'Ошибка при загрузке');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Ошибка при загрузке файлов');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
    onUpload(newImages);
  };

  return (
    <div className={className}>
      <div className="space-y-4">
        {/* Upload Button */}
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple={multiple}
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            variant="outline"
            className="w-full h-32 border-2 border-dashed border-gray-300 hover:border-gray-400 flex flex-col items-center justify-center"
          >
            {isUploading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-sm text-gray-600">Загрузка...</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-4xl text-gray-400 mb-2">📷</div>
                <p className="text-sm text-gray-600">
                  Нажмите для выбора {multiple ? 'изображений' : 'изображения'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  JPG, PNG, WebP (Загрузка в Cloudinary)
                </p>
              </div>
            )}
          </Button>
        </div>

        {/* Preview Images */}
        {uploadedImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {uploadedImages.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Изображение ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}