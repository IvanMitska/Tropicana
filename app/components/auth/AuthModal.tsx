'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { ResetPasswordForm } from './ResetPasswordForm';
import useAuthModalStore from '@/app/hooks/useAuthModalStore';
import useAuth from '@/app/hooks/useAuth';

type AuthType = 'login' | 'register' | 'reset';

const AuthModal: React.FC = () => {
  const { isOpen, onClose } = useAuthModalStore();
  const [authType, setAuthType] = useState<AuthType>('login');
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useAuth();

  const handleSuccessAuth = useCallback(() => {
    onClose();
  }, [onClose]);

  const switchAuthType = (type: AuthType) => {
    setAuthType(type);
  };

  useEffect(() => {
    if (user) {
      onClose();
    }
  }, [user, onClose]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'auto';
      // Сбрасываем authType к логину после закрытия
      setTimeout(() => setAuthType('login'), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen && !isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md z-10 transition-transform duration-300"
        style={{
          transform: isOpen ? 'translateY(0)' : 'translateY(-20px)',
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          aria-label="Закрыть"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="mt-4">
          {authType === 'login' && (
            <LoginForm
              onSuccess={handleSuccessAuth}
              onRegister={() => switchAuthType('register')}
              onForgotPassword={() => switchAuthType('reset')}
            />
          )}
          {authType === 'register' && (
            <RegisterForm
              onSuccess={handleSuccessAuth}
              onLogin={() => switchAuthType('login')}
            />
          )}
          {authType === 'reset' && (
            <ResetPasswordForm
              onSuccess={() => switchAuthType('login')}
              onLogin={() => switchAuthType('login')}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal; 