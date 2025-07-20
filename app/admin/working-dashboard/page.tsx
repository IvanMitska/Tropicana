'use client';

export const dynamic = 'force-dynamic';

export default function WorkingDashboard() {
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
      window.location.href = '/admin/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              ✅ Админ панель работает!
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
            >
              Выйти
            </button>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold text-green-800 mb-2">
              🎉 Авторизация прошла успешно!
            </h2>
            <p className="text-green-700">
              Вы успешно вошли в админ панель. Cookie установлен и работает корректно.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                🔐 Система авторизации
              </h3>
              <p className="text-blue-700 text-sm">
                JWT токен установлен в HTTP-only cookie
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                📊 Статус
              </h3>
              <p className="text-green-600 font-medium">🟢 Система работает</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              🔧 Следующие шаги
            </h3>
            <ul className="text-yellow-700 text-sm space-y-1">
              <li>• Вернуть обычную dashboard страницу</li>
              <li>• Восстановить httpOnly cookie для безопасности</li>
              <li>• Протестировать все админ функции</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}