import Link from 'next/link';
import { Header } from '@/app/components/layout/Header';
import { Footer } from '@/app/components/layout/Footer';

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom max-w-md mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-6">Вход в аккаунт</h1>
            
            <form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ваш email"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 mb-2">
                  Пароль
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ваш пароль"
                  required
                />
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                    Запомнить меня
                  </label>
                </div>
                
                <div className="text-sm">
                  <Link href="/auth/forgot-password" className="text-primary hover:text-primary-dark">
                    Забыли пароль?
                  </Link>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full btn-primary py-2 px-4"
              >
                Войти
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Еще нет аккаунта?{' '}
                <Link href="/auth/register" className="text-primary hover:text-primary-dark font-medium">
                  Зарегистрироваться
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 