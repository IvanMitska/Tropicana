'use client';

import React, { useState, useEffect } from 'react';
import AccountLayout from '@/app/components/layout/AccountLayout';
import { useAuth } from '@/app/hooks/useAuth';
import { 
  ShieldCheckIcon, 
  ArrowPathIcon, 
  CheckIcon, 
  XMarkIcon,
  KeyIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';
import { toast } from 'sonner';

interface LoginHistory {
  id: string;
  date: string;
  ipAddress: string;
  device: string;
  location?: string;
  successful: boolean;
  current: boolean;
}

interface Device {
  id: string;
  name: string;
  type: 'mobile' | 'desktop' | 'tablet' | 'other';
  lastActive: string;
  ipAddress: string;
  location?: string;
  current: boolean;
}

// Демо-данные для отображения
const demoLoginHistory: LoginHistory[] = [
  {
    id: '1',
    date: '2023-07-28T15:40:22',
    ipAddress: '192.168.1.1',
    device: 'Chrome on macOS',
    location: 'Москва, Россия',
    successful: true,
    current: true,
  },
  {
    id: '2',
    date: '2023-07-25T09:12:45',
    ipAddress: '192.168.1.1',
    device: 'Safari on iPhone',
    location: 'Москва, Россия',
    successful: true,
    current: false,
  },
  {
    id: '3',
    date: '2023-07-20T18:30:12',
    ipAddress: '192.168.1.100',
    device: 'Chrome on Windows',
    location: 'Санкт-Петербург, Россия',
    successful: false,
    current: false,
  },
  {
    id: '4',
    date: '2023-07-15T11:22:05',
    ipAddress: '192.168.1.1',
    device: 'Firefox on macOS',
    location: 'Москва, Россия',
    successful: true,
    current: false,
  },
];

const demoDevices: Device[] = [
  {
    id: '1',
    name: 'MacBook Pro',
    type: 'desktop',
    lastActive: '2023-07-28T15:40:22',
    ipAddress: '192.168.1.1',
    location: 'Москва, Россия',
    current: true,
  },
  {
    id: '2',
    name: 'iPhone 13',
    type: 'mobile',
    lastActive: '2023-07-25T09:12:45',
    ipAddress: '192.168.1.1',
    location: 'Москва, Россия',
    current: false,
  },
  {
    id: '3',
    name: 'Windows PC',
    type: 'desktop',
    lastActive: '2023-07-15T11:22:05',
    ipAddress: '192.168.1.100',
    location: 'Санкт-Петербург, Россия',
    current: false,
  },
];

export default function SecurityPage() {
  const { user } = useAuth();
  const [loginHistory, setLoginHistory] = useState<LoginHistory[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  // Состояния для формы смены пароля
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  
  // Состояния для двухфакторной аутентификации
  const [tfaLoading, setTfaLoading] = useState(false);
  const [tfaCode, setTfaCode] = useState('');
  const [tfaQrCode, setTfaQrCode] = useState<string | null>(null);
  const [tfaSecret, setTfaSecret] = useState<string | null>(null);

  useEffect(() => {
    // В реальном приложении здесь будет запрос к API
    setTimeout(() => {
      setLoginHistory(demoLoginHistory);
      setDevices(demoDevices);
      setIsLoading(false);
    }, 500);
  }, []);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = (field: keyof typeof showPassword) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field],
    });
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Проверка совпадения паролей
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Новые пароли не совпадают');
      return;
    }
    
    // Проверка сложности пароля
    if (passwordData.newPassword.length < 8) {
      toast.error('Пароль должен содержать не менее 8 символов');
      return;
    }
    
    setPasswordLoading(true);
    
    try {
      // Здесь будет запрос к API для смены пароля
      
      // Имитация задержки API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Сброс формы
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setShowChangePassword(false);
      
      toast.success('Пароль успешно изменен');
    } catch (error) {
      toast.error('Ошибка при изменении пароля');
      console.error('Error changing password:', error);
    } finally {
      setPasswordLoading(false);
    }
  };

  const setupTwoFactorAuth = async () => {
    setTfaLoading(true);
    
    try {
      // Здесь будет запрос к API для получения QR-кода и секрета
      
      // Имитация задержки API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Для демо используем статический QR-код
      setTfaQrCode('https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=otpauth://totp/RentWeb:user%40example.com?secret=JBSWY3DPEHPK3PXP&issuer=RentWeb');
      setTfaSecret('JBSWY3DPEHPK3PXP');
      
    } catch (error) {
      toast.error('Ошибка при настройке двухфакторной аутентификации');
      console.error('Error setting up 2FA:', error);
    } finally {
      setTfaLoading(false);
    }
  };

  const verifyTwoFactorAuth = async () => {
    if (tfaCode.length !== 6 || !/^\d+$/.test(tfaCode)) {
      toast.error('Код должен содержать 6 цифр');
      return;
    }
    
    setTfaLoading(true);
    
    try {
      // Здесь будет запрос к API для проверки кода
      
      // Имитация задержки API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Для демо всегда успешно
      setTwoFactorEnabled(true);
      setShowTwoFactorSetup(false);
      setTfaCode('');
      setTfaQrCode(null);
      setTfaSecret(null);
      
      toast.success('Двухфакторная аутентификация успешно включена');
    } catch (error) {
      toast.error('Ошибка при проверке кода');
      console.error('Error verifying 2FA code:', error);
    } finally {
      setTfaLoading(false);
    }
  };

  const disableTwoFactorAuth = async () => {
    if (!confirm('Вы уверены, что хотите отключить двухфакторную аутентификацию? Это снизит уровень безопасности вашего аккаунта.')) {
      return;
    }
    
    setTfaLoading(true);
    
    try {
      // Здесь будет запрос к API для отключения 2FA
      
      // Имитация задержки API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTwoFactorEnabled(false);
      
      toast.success('Двухфакторная аутентификация отключена');
    } catch (error) {
      toast.error('Ошибка при отключении двухфакторной аутентификации');
      console.error('Error disabling 2FA:', error);
    } finally {
      setTfaLoading(false);
    }
  };

  const terminateSession = async (deviceId: string) => {
    if (!confirm('Вы действительно хотите завершить эту сессию?')) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Здесь будет запрос к API для завершения сессии
      
      // Имитация задержки API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Удаляем устройство из списка
      setDevices(devices.filter(device => device.id !== deviceId));
      
      toast.success('Сессия успешно завершена');
    } catch (error) {
      toast.error('Ошибка при завершении сессии');
      console.error('Error terminating session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDeviceIcon = (type: Device['type']) => {
    switch (type) {
      case 'mobile':
        return <DevicePhoneMobileIcon className="w-5 h-5 text-gray-600" />;
      case 'desktop':
        return <ComputerDesktopIcon className="w-5 h-5 text-gray-600" />;
      default:
        return <DevicePhoneMobileIcon className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <AccountLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Безопасность</h1>
        <p className="text-gray-600">Управление паролем, двухфакторной аутентификацией и активными сессиями</p>
      </div>

      {/* Пароль и двухфакторная аутентификация */}
      <div className="mb-8 bg-white border rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b">
          <h2 className="text-lg font-medium">Настройки безопасности</h2>
        </div>
        
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Пароль</h3>
              <p className="text-sm text-gray-500">Рекомендуется менять пароль каждые 3 месяца</p>
            </div>
            <button
              onClick={() => setShowChangePassword(!showChangePassword)}
              className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {showChangePassword ? 'Отмена' : 'Изменить пароль'}
            </button>
          </div>
          
          {showChangePassword && (
            <div className="mt-4 border rounded-md p-4 bg-gray-50">
              <form onSubmit={handlePasswordSubmit}>
                <div className="mb-4">
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Текущий пароль
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword.current ? 'text' : 'password'}
                      id="currentPassword"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => togglePasswordVisibility('current')}
                    >
                      {showPassword.current ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Новый пароль
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword.new ? 'text' : 'password'}
                      id="newPassword"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => togglePasswordVisibility('new')}
                    >
                      {showPassword.new ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Пароль должен содержать не менее 8 символов
                  </p>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Подтвердите новый пароль
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword.confirm ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => togglePasswordVisibility('confirm')}
                    >
                      {showPassword.confirm ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    disabled={passwordLoading}
                  >
                    {passwordLoading ? (
                      <>
                        <ArrowPathIcon className="w-4 h-4 inline mr-2 animate-spin" />
                        Сохранение...
                      </>
                    ) : (
                      'Сохранить новый пароль'
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Двухфакторная аутентификация (2FA)</h3>
              <p className="text-sm text-gray-500">
                {twoFactorEnabled 
                  ? 'У вас включена двухфакторная аутентификация' 
                  : 'Защитите свой аккаунт с помощью двухфакторной аутентификации'}
              </p>
            </div>
            {twoFactorEnabled ? (
              <button
                onClick={disableTwoFactorAuth}
                className="px-4 py-2 text-sm border border-red-300 rounded-md text-red-700 hover:bg-red-50 transition-colors"
                disabled={tfaLoading}
              >
                {tfaLoading ? (
                  <>
                    <ArrowPathIcon className="w-4 h-4 inline mr-2 animate-spin" />
                    Отключение...
                  </>
                ) : (
                  'Отключить 2FA'
                )}
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowTwoFactorSetup(true);
                  setupTwoFactorAuth();
                }}
                className="px-4 py-2 text-sm border border-green-500 rounded-md text-green-700 hover:bg-green-50 transition-colors"
                disabled={tfaLoading}
              >
                {tfaLoading && !showTwoFactorSetup ? (
                  <>
                    <ArrowPathIcon className="w-4 h-4 inline mr-2 animate-spin" />
                    Загрузка...
                  </>
                ) : (
                  'Включить 2FA'
                )}
              </button>
            )}
          </div>
          
          {showTwoFactorSetup && !twoFactorEnabled && (
            <div className="mt-4 border rounded-md p-4 bg-gray-50">
              <h4 className="font-medium mb-3">Настройка двухфакторной аутентификации</h4>
              
              {tfaLoading && !tfaQrCode ? (
                <div className="text-center py-4">
                  <ArrowPathIcon className="w-8 h-8 inline animate-spin text-gray-400" />
                  <p className="mt-2 text-gray-500">Генерация ключа безопасности...</p>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-3">
                      1. Установите приложение Google Authenticator или другое TOTP-приложение на ваш телефон.
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      2. Отсканируйте QR-код ниже или введите ключ вручную:
                    </p>
                    
                    <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4">
                      <div className="bg-white p-2 border rounded-lg">
                        {tfaQrCode && (
                          <img 
                            src={tfaQrCode} 
                            alt="QR-код для 2FA" 
                            className="w-40 h-40"
                          />
                        )}
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Секретный ключ (для ручного ввода):</p>
                        <div className="bg-gray-100 p-2 rounded-md font-mono text-sm mb-2">
                          {tfaSecret || 'Загрузка...'}
                        </div>
                        <p className="text-xs text-gray-500">
                          Сохраните этот ключ в надежном месте. Он понадобится при потере доступа к устройству.
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">
                      3. Введите одноразовый код из приложения для подтверждения:
                    </p>
                    
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={tfaCode}
                        onChange={(e) => setTfaCode(e.target.value.replace(/[^0-9]/g, '').substring(0, 6))}
                        placeholder="000000"
                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-center font-mono text-lg"
                        maxLength={6}
                        style={{ width: '8rem' }}
                      />
                      
                      <button
                        onClick={verifyTwoFactorAuth}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                        disabled={tfaLoading || tfaCode.length !== 6}
                      >
                        {tfaLoading ? (
                          <>
                            <ArrowPathIcon className="w-4 h-4 mr-2 animate-spin" />
                            Проверка...
                          </>
                        ) : (
                          <>
                            <CheckIcon className="w-4 h-4 mr-2" />
                            Подтвердить
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}
              
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowTwoFactorSetup(false)}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Отмена
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Активные сессии */}
      <div className="mb-8 bg-white border rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b">
          <h2 className="text-lg font-medium">Активные сессии</h2>
        </div>
        
        <div className="divide-y">
          {isLoading ? (
            <div className="flex justify-center items-center py-6">
              <ArrowPathIcon className="w-6 h-6 text-gray-400 animate-spin" />
            </div>
          ) : devices.length > 0 ? (
            devices.map((device) => (
              <div key={device.id} className={`p-4 ${device.current ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="mr-4">
                      {getDeviceIcon(device.type)}
                    </div>
                    <div>
                      <div className="font-medium flex items-center">
                        {device.name}
                        {device.current && (
                          <span className="ml-2 text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                            Текущее устройство
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        <div>Последняя активность: {formatDateTime(device.lastActive)}</div>
                        <div>IP: {device.ipAddress}</div>
                        {device.location && <div>Местоположение: {device.location}</div>}
                      </div>
                    </div>
                  </div>
                  
                  {!device.current && (
                    <button
                      onClick={() => terminateSession(device.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Завершить сессию
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center">
              <p className="text-gray-500">Нет активных сессий</p>
            </div>
          )}
        </div>
      </div>

      {/* История входов */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b">
          <h2 className="text-lg font-medium">История входов</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дата и время
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Устройство
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP-адрес
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Местоположение
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center">
                    <ArrowPathIcon className="w-6 h-6 text-gray-400 animate-spin inline" />
                  </td>
                </tr>
              ) : loginHistory.length > 0 ? (
                loginHistory.map((login) => (
                  <tr key={login.id} className={login.current ? 'bg-blue-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDateTime(login.date)}
                      {login.current && (
                        <span className="ml-2 text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                          Текущая сессия
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {login.device}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {login.ipAddress}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {login.location || 'Неизвестно'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {login.successful ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Успешно
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Неудачно
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    История входов отсутствует
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AccountLayout>
  );
} 