'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { PaperClipIcon, XMarkIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const formSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  email: z.string().email('Введите корректный email'),
  phone: z.string().regex(/^\+?[1-9]\d{10,14}$/, 'Введите корректный номер телефона'),
  subject: z.string().min(1, 'Выберите тему обращения'),
  message: z.string().min(10, 'Сообщение должно содержать минимум 10 символов'),
  files: z.any().optional(), // Изменяем на z.any() для совместимости с SSR
  captcha: z.string().min(1, 'Пожалуйста, подтвердите, что вы не робот')
});

type FormData = z.infer<typeof formSchema>;

const subjects = [
  'Общий вопрос',
  'Техническая поддержка',
  'Сотрудничество',
  'Жалоба',
  'Предложение'
];

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange'
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'files') {
          files.forEach(file => formData.append('files', file));
        } else {
          formData.append(key, value);
        }
      });

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Ошибка при отправке формы');
      }

      toast.success('Сообщение успешно отправлено');
      reset();
      setFiles([]);
    } catch (error) {
      toast.error('Произошла ошибка при отправке формы');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 md:p-10 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-[#1e3c3c] mb-8 text-center">Свяжитесь с нами</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
            Ваше имя
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            placeholder="Иван Иванов"
            className={`w-full px-4 py-2.5 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e5916e]/50 focus:border-[#e5916e] transition-colors duration-200`}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              placeholder="you@example.com"
              className={`w-full px-4 py-2.5 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e5916e]/50 focus:border-[#e5916e] transition-colors duration-200`}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
              Телефон
            </label>
            <input
              id="phone"
              type="tel"
              {...register('phone')}
              placeholder="+7 (999) 123-45-67"
              className={`w-full px-4 py-2.5 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e5916e]/50 focus:border-[#e5916e] transition-colors duration-200`}
            />
            {errors.phone && (
              <p className="mt-1.5 text-xs text-red-600">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">
            Тема обращения
          </label>
          <select
            id="subject"
            {...register('subject')}
            className={`w-full px-4 py-2.5 border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e5916e]/50 focus:border-[#e5916e] transition-colors duration-200 bg-white`}
          >
            <option value="">Выберите тему...</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          {errors.subject && (
            <p className="mt-1.5 text-xs text-red-600">{errors.subject.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
            Сообщение
          </label>
          <textarea
            id="message"
            {...register('message')}
            rows={5}
            placeholder="Расскажите подробнее о вашем вопросе..."
            className={`w-full px-4 py-2.5 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e5916e]/50 focus:border-[#e5916e] transition-colors duration-200`}
          />
          {errors.message && (
            <p className="mt-1.5 text-xs text-red-600">{errors.message.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Прикрепить файлы (необязательно)
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <PaperClipIcon className="mx-auto h-10 w-10 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-[#e5916e] hover:text-[#c97b5e] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#e5916e]/50"
                >
                  <span>Загрузите файлы</span>
                  <input id="file-upload" type="file" multiple onChange={handleFileChange} className="sr-only" />
                </label>
                <p className="pl-1">или перетащите сюда</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF, PDF до 10MB</p>
            </div>
          </div>
          {files.length > 0 && (
            <div className="mt-3 space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2.5 rounded-md border border-gray-200">
                  <span className="text-sm text-gray-700 truncate mr-2">{file.name} <span className="text-gray-500 text-xs">({(file.size / 1024).toFixed(1)} KB)</span></span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700 transition-colors p-1 rounded-full hover:bg-red-100"
                    aria-label="Удалить файл"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-2">
          <label className="flex items-center space-x-2.5 cursor-pointer">
            <input
              type="checkbox"
              {...register('captcha')}
              className={`h-4 w-4 text-[#e5916e] focus:ring-[#e5916e]/50 border-gray-300 rounded ${errors.captcha ? 'ring-2 ring-red-500 ring-offset-1' : ''}`}
            />
            <span className="text-sm text-gray-700">
              Я подтверждаю, что я не робот и согласен с обработкой персональных данных
            </span>
          </label>
          {errors.captcha && (
            <p className="mt-1.5 text-xs text-red-600">{errors.captcha.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !isDirty || !isValid}
          className="w-full flex items-center justify-center bg-[#e5916e] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#c97b5e] focus:outline-none focus:ring-2 focus:ring-[#e5916e]/50 focus:ring-offset-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
        >
          {isSubmitting ? (
            <>
              <ArrowPathIcon className="animate-spin h-5 w-5 mr-2.5" />
              Отправка...
            </>
          ) : 'Отправить сообщение'}
        </button>
      </form>
    </div>
  );
} 