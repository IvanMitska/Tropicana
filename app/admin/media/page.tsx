'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
// import { useAdmin } from '@/app/hooks/useAdmin';
import ImageUpload from '@/app/components/admin/ImageUpload';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import { Modal } from '@/app/components/ui/Modal';

interface MediaFile {
  url: string;
  publicId?: string;
  filename: string;
  size: number;
  uploadDate: string;
  usedIn?: string[];
  width?: number;
  height?: number;
  format?: string;
}

export default function MediaPage() {
  // const { user, logout } = useAdmin();
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
      window.location.href = '/admin/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    fetchMediaFiles();
  }, []);

  const fetchMediaFiles = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/upload/cloudinary');
      if (response.ok) {
        const data = await response.json();
        setMediaFiles(data.files || []);
      }
    } catch (error) {
      console.error('Error fetching media files:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteFile = async (file: MediaFile) => {
    if (confirm('Вы уверены, что хотите удалить это изображение?')) {
      try {
        const response = await fetch(`/api/admin/upload/cloudinary?publicId=${encodeURIComponent(file.publicId || '')}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          fetchMediaFiles();
        } else {
          alert('Ошибка при удалении файла');
        }
      } catch (error) {
        console.error('Error deleting file:', error);
        alert('Ошибка при удалении файла');
      }
    }
  };

  const handleUpload = async (urls: string[]) => {
    setIsUploadModalOpen(false);
    fetchMediaFiles();
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('URL скопирован в буфер обмена');
  };

  const filteredFiles = mediaFiles.filter(file =>
    file.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

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
                  Управление медиафайлами
                </h1>
                <p className="text-white/90 text-sm">Добро пожаловать, Admin</p>
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
        {/* Header Actions */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-primary/10">
          <Input
            placeholder="Поиск по названию файла..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          
          <Button
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <span className="mr-2">📸</span>
            Загрузить изображения
          </Button>
        </div>

        {/* Media Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredFiles.map((file) => (
              <div
                key={file.filename}
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 border border-primary/10"
              >
                <div className="aspect-square relative">
                  <img
                    src={file.url}
                    alt={file.filename}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => setSelectedImage(file.url)}
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={() => copyToClipboard(file.url)}
                      className="bg-primary/80 hover:bg-primary text-white rounded-full p-1.5 text-sm backdrop-blur-sm transition-all duration-300 hover:scale-110"
                      title="Скопировать URL"
                    >
                      📋
                    </button>
                    <button
                      onClick={() => handleDeleteFile(file)}
                      className="bg-red-500/80 hover:bg-red-600 text-white rounded-full p-1.5 text-sm backdrop-blur-sm transition-all duration-300 hover:scale-110"
                      title="Удалить"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                
                <div className="p-3">
                  <h3 className="font-medium text-sm truncate text-dark" title={file.filename}>
                    {file.filename}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    {formatFileSize(file.size)}
                  </p>
                  <p className="text-xs text-gray-600">
                    {new Date(file.uploadDate).toLocaleDateString('ru-RU')}
                  </p>
                  {file.usedIn && file.usedIn.length > 0 && (
                    <div className="mt-2">
                      <span className="text-xs text-primary font-medium">
                        Используется в: {file.usedIn.join(', ')}
                      </span>
                    </div>
                  )}
                  {file.width && file.height && (
                    <p className="text-xs text-gray-500 mt-1">
                      {file.width} × {file.height}px
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredFiles.length === 0 && !isLoading && (
          <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-primary/10">
            <div className="text-primary text-6xl mb-4">📷</div>
            <h3 className="text-lg font-medium text-dark mb-2">
              Нет загруженных изображений
            </h3>
            <p className="text-gray-600 mb-4">
              Загрузите изображения для использования на сайте
            </p>
            <Button
              onClick={() => setIsUploadModalOpen(true)}
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Загрузить первое изображение
            </Button>
          </div>
        )}

      {/* Upload Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Загрузить изображения"
      >
        <div className="p-6">
          <ImageUpload
            onUpload={handleUpload}
            multiple={true}
            className="mb-4"
          />
          <div className="text-sm text-gray-600">
            <p>• Поддерживаемые форматы: JPG, PNG, WebP</p>
            <p>• Максимальный размер файла: 10MB</p>
            <p>• Можно загружать несколько файлов одновременно</p>
          </div>
        </div>
      </Modal>

      {/* Image Preview Modal */}
      <Modal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        title="Предпросмотр изображения"
      >
        {selectedImage && (
          <div className="p-6">
            <img
              src={selectedImage}
              alt="Предпросмотр"
              className="max-w-full max-h-96 mx-auto rounded-lg"
            />
            <div className="mt-4 flex justify-center gap-2">
              <Button
                onClick={() => copyToClipboard(selectedImage)}
                variant="outline"
              >
                Скопировать URL
              </Button>
              <Button
                onClick={() => setSelectedImage(null)}
                className="bg-gray-600 hover:bg-gray-700 text-white"
              >
                Закрыть
              </Button>
            </div>
          </div>
        )}
      </Modal>
      </main>
    </div>
  );
} 