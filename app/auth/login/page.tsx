import Link from 'next/link';
import MainFooter from '@/app/components/layout/FooterWrapper';
import LoginForm from '@/app/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Войдите в свой аккаунт
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Или{' '}
              <Link href="/auth/register" className="font-medium text-primary hover:text-primary-dark">
                зарегистрируйтесь
              </Link>
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
      <MainFooter />
    </div>
  );
} 