'use client';

import React, { useState, useEffect, useRef } from 'react';
import AccountLayout from '@/app/components/layout/AccountLayout';
import { 
  DocumentIcon, 
  ArrowPathIcon,
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  DocumentArrowUpIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { toast } from 'sonner';

interface Document {
  _id: string;
  type: 'passport' | 'driverLicense' | 'other';
  documentNumber: string;
  issuedDate: string;
  expiryDate?: string;
  filename: string;
  verified: boolean;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  rejectionReason?: string;
  verifiedAt?: string;
  uploadedAt: string;
}

// Демо-данные для отображения
const demoDocuments: Document[] = [
  {
    _id: '1',
    type: 'passport',
    documentNumber: '1234567890',
    issuedDate: '2018-05-15',
    expiryDate: '2028-05-15',
    filename: 'passport.jpg',
    verified: true,
    verificationStatus: 'verified',
    verifiedAt: '2023-02-10T14:22:00',
    uploadedAt: '2023-02-01T10:30:00',
  },
  {
    _id: '2',
    type: 'driverLicense',
    documentNumber: '9876543210',
    issuedDate: '2020-03-20',
    expiryDate: '2030-03-20',
    filename: 'driver_license.jpg',
    verified: false,
    verificationStatus: 'pending',
    uploadedAt: '2023-06-15T09:45:00',
  },
  {
    _id: '3',
    type: 'other',
    documentNumber: '5555555555',
    issuedDate: '2022-01-10',
    filename: 'insurance.pdf',
    verified: false,
    verificationStatus: 'rejected',
    rejectionReason: 'Документ нечитаем. Пожалуйста, загрузите более качественное изображение.',
    uploadedAt: '2023-06-20T16:20:00',
  },
];

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddDocumentModal, setShowAddDocumentModal] = useState(false);
  const [viewDocument, setViewDocument] = useState<Document | null>(null);
  
  // Состояния для формы добавления документа
  const [formData, setFormData] = useState({
    type: 'passport',
    documentNumber: '',
    issuedDate: '',
    expiryDate: '',
  });
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // В реальном приложении здесь будет запрос к API
    setTimeout(() => {
      setDocuments(demoDocuments);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Проверка размера и типа файла
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Размер файла не должен превышать 10MB');
      return;
    }

    // Разрешенные типы файлов: изображения и PDF
    if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
      toast.error('Поддерживаются только JPG, PNG и PDF форматы');
      return;
    }

    setDocumentFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!documentFile) {
      toast.error('Пожалуйста, загрузите файл документа');
      return;
    }

    setIsLoading(true);

    try {
      // Здесь будет отправка данных на сервер
      // В реальном приложении код будет включать загрузку документа
      
      // Имитация задержки API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Добавляем новый документ в список (в реальном приложении документ будет возвращен с сервера)
      const newDocument: Document = {
        _id: Date.now().toString(),
        type: formData.type as 'passport' | 'driverLicense' | 'other',
        documentNumber: formData.documentNumber,
        issuedDate: formData.issuedDate,
        expiryDate: formData.expiryDate,
        filename: documentFile.name,
        verified: false,
        verificationStatus: 'pending',
        uploadedAt: new Date().toISOString(),
      };
      
      setDocuments([...documents, newDocument]);
      setShowAddDocumentModal(false);
      resetForm();
      
      toast.success('Документ успешно загружен и отправлен на проверку');
    } catch (error) {
      toast.error('Ошибка при загрузке документа');
      console.error('Error uploading document:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      type: 'passport',
      documentNumber: '',
      issuedDate: '',
      expiryDate: '',
    });
    setDocumentFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDeleteDocument = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот документ?')) {
      return;
    }

    setIsLoading(true);

    try {
      // Здесь будет запрос к API для удаления документа
      
      // Имитация задержки API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Удаляем документ из списка
      setDocuments(documents.filter(doc => doc._id !== id));
      
      toast.success('Документ успешно удален');
    } catch (error) {
      toast.error('Ошибка при удалении документа');
      console.error('Error deleting document:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTypeLabel = (type: Document['type']) => {
    switch (type) {
      case 'passport':
        return 'Паспорт';
      case 'driverLicense':
        return 'Водительские права';
      case 'other':
        return 'Другой документ';
      default:
        return type;
    }
  };

  const getStatusInfo = (document: Document) => {
    switch (document.verificationStatus) {
      case 'verified':
        return {
          icon: <CheckCircleIcon className="w-5 h-5 text-green-500" />,
          text: 'Подтвержден',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
        };
      case 'pending':
        return {
          icon: <ClockIcon className="w-5 h-5 text-yellow-500" />,
          text: 'На проверке',
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
        };
      case 'rejected':
        return {
          icon: <XCircleIcon className="w-5 h-5 text-red-500" />,
          text: 'Отклонен',
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
        };
      default:
        return {
          icon: <DocumentIcon className="w-5 h-5 text-gray-500" />,
          text: 'Неизвестно',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
        };
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  return (
    <AccountLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Мои документы</h1>
          <p className="text-gray-600">Управление документами для аренды</p>
        </div>
        <button
          onClick={() => setShowAddDocumentModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Добавить документ
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center p-12">
          <ArrowPathIcon className="w-8 h-8 text-gray-400 animate-spin" />
        </div>
      ) : documents.length > 0 ? (
        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Документ
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Номер
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дата выдачи
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Срок действия
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map(document => {
                const statusInfo = getStatusInfo(document);
                return (
                  <tr key={document._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                          <DocumentIcon className="h-6 w-6 text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {getTypeLabel(document.type)}
                          </div>
                          <div className="text-xs text-gray-500">
                            Загружен {formatDate(document.uploadedAt)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {document.documentNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(document.issuedDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(document.expiryDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {statusInfo.icon}
                        <span className={`ml-2 inline-flex text-xs font-semibold rounded-full px-2 py-1 ${statusInfo.bgColor} ${statusInfo.textColor}`}>
                          {statusInfo.text}
                        </span>
                      </div>
                      {document.verificationStatus === 'rejected' && document.rejectionReason && (
                        <div className="mt-1 text-xs text-red-600">
                          {document.rejectionReason}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => setViewDocument(document)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteDocument(document._id)}
                        className="text-red-600 hover:text-red-900"
                        disabled={document.verificationStatus === 'verified'}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-lg border p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto flex items-center justify-center mb-4">
            <DocumentIcon className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">У вас пока нет загруженных документов</h3>
          <p className="text-gray-500 mb-4">Загрузите свои документы для бронирования и аренды</p>
          <button
            onClick={() => setShowAddDocumentModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Добавить документ
          </button>
        </div>
      )}

      {/* Информация о документах */}
      <div className="mt-8 bg-blue-50 rounded-lg p-4">
        <h3 className="font-medium text-blue-800 mb-2">Информация о документах</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-blue-700">
          <li>Загружайте только четкие, хорошо читаемые копии/фотографии документов</li>
          <li>На документах должны быть видны все необходимые данные</li>
          <li>Проверка документов обычно занимает от 24 до 48 часов</li>
          <li>После подтверждения документы нельзя удалить</li>
          <li>Документы с истекшим сроком действия необходимо обновить</li>
        </ul>
      </div>

      {/* Модальное окно добавления документа */}
      {showAddDocumentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 border-b bg-gray-50">
              <h3 className="text-lg font-medium">Добавление нового документа</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-4">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Тип документа
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="passport">Паспорт</option>
                  <option value="driverLicense">Водительские права</option>
                  <option value="other">Другой документ</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="documentNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Номер документа
                </label>
                <input
                  type="text"
                  id="documentNumber"
                  name="documentNumber"
                  value={formData.documentNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="issuedDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Дата выдачи
                </label>
                <input
                  type="date"
                  id="issuedDate"
                  name="issuedDate"
                  value={formData.issuedDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Срок действия (если применимо)
                </label>
                <input
                  type="date"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Загрузить файл
                </label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-md px-6 pt-5 pb-6 flex justify-center">
                  <div className="space-y-1 text-center">
                    <DocumentArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                      >
                        <span>Загрузить файл</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                          ref={fileInputRef}
                          accept=".jpg,.jpeg,.png,.pdf"
                          required
                        />
                      </label>
                      <p className="pl-1">или перетащите сюда</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG или PDF до 10MB</p>
                    {documentFile && (
                      <p className="text-sm text-green-600">
                        Выбран файл: {documentFile.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowAddDocumentModal(false);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                  disabled={isLoading}
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <ArrowPathIcon className="w-4 h-4 mr-2 inline animate-spin" />
                      Загрузка...
                    </>
                  ) : (
                    'Загрузить документ'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Модальное окно просмотра документа */}
      {viewDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h3 className="text-lg font-medium">Просмотр документа</h3>
              <button
                onClick={() => setViewDocument(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Закрыть</span>
                <XCircleIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="bg-gray-100 h-64 mb-4 rounded-lg flex items-center justify-center">
                {/* В реальном приложении здесь будет превью документа */}
                <div className="text-gray-500 text-center p-6">
                  <DocumentIcon className="h-12 w-12 mx-auto mb-2" />
                  <p>Предпросмотр документа: {viewDocument.filename}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    (В демо-версии изображение не отображается)
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Тип документа</p>
                  <p className="font-medium">{getTypeLabel(viewDocument.type)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Номер</p>
                  <p className="font-medium">{viewDocument.documentNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Дата выдачи</p>
                  <p className="font-medium">{formatDate(viewDocument.issuedDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Срок действия</p>
                  <p className="font-medium">{formatDate(viewDocument.expiryDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Загружен</p>
                  <p className="font-medium">{formatDate(viewDocument.uploadedAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Статус</p>
                  <div className="flex items-center">
                    {getStatusInfo(viewDocument).icon}
                    <span className="ml-2">{getStatusInfo(viewDocument).text}</span>
                  </div>
                </div>
              </div>
              
              {viewDocument.verificationStatus === 'rejected' && viewDocument.rejectionReason && (
                <div className="bg-red-50 text-red-700 p-3 rounded-md mb-6">
                  <p className="font-medium">Причина отклонения:</p>
                  <p>{viewDocument.rejectionReason}</p>
                </div>
              )}
              
              <div className="flex justify-end">
                <button
                  onClick={() => setViewDocument(null)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AccountLayout>
  );
} 