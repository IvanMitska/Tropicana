export default function PropertyDetailSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Галерея */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <div className="lg:col-span-2 bg-gray-200 rounded-lg h-96"></div>
        <div className="hidden lg:grid grid-cols-2 grid-rows-2 gap-4">
          <div className="bg-gray-200 rounded-lg h-44"></div>
          <div className="bg-gray-200 rounded-lg h-44"></div>
          <div className="bg-gray-200 rounded-lg h-44"></div>
          <div className="bg-gray-200 rounded-lg h-44"></div>
        </div>
      </div>

      {/* Основная информация */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="h-8 bg-gray-200 rounded mb-2 w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded mb-4 w-1/2"></div>
          <div className="flex gap-4 mb-4">
            <div className="h-8 bg-gray-200 rounded w-24"></div>
            <div className="h-8 bg-gray-200 rounded w-24"></div>
            <div className="h-8 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="h-6 bg-gray-200 rounded mb-4 w-full"></div>
          <div className="h-6 bg-gray-200 rounded mb-2 w-full"></div>
          <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded mb-2 w-5/6"></div>
        </div>
        
        {/* Компонент бронирования */}
        <div className="border border-gray-200 rounded-lg p-4 h-96 bg-gray-50">
          <div className="h-8 bg-gray-200 rounded mb-4 w-1/2"></div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded mb-4"></div>
          <div className="h-6 bg-gray-200 rounded mb-2 w-full"></div>
          <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded mb-4 w-1/2"></div>
          <div className="h-12 bg-gray-200 rounded mb-4"></div>
        </div>
      </div>

      {/* Табы с информацией */}
      <div className="mb-8">
        <div className="flex gap-4 mb-4 border-b border-gray-200">
          <div className="h-8 bg-gray-200 rounded w-24"></div>
          <div className="h-8 bg-gray-200 rounded w-24"></div>
          <div className="h-8 bg-gray-200 rounded w-24"></div>
          <div className="h-8 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-6 bg-gray-200 rounded mb-2 w-full"></div>
          <div className="h-6 bg-gray-200 rounded mb-2 w-full"></div>
          <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded mb-2 w-5/6"></div>
          <div className="h-6 bg-gray-200 rounded mb-2 w-2/3"></div>
          <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
        </div>
      </div>

      {/* Карта */}
      <div className="mb-8">
        <div className="h-8 bg-gray-200 rounded mb-4 w-1/4"></div>
        <div className="h-64 bg-gray-200 rounded-lg"></div>
      </div>

      {/* Отзывы */}
      <div className="mb-8">
        <div className="h-8 bg-gray-200 rounded mb-4 w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div className="h-6 bg-gray-200 rounded mb-2 w-full"></div>
          <div className="h-6 bg-gray-200 rounded mb-2 w-full"></div>
          <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded mb-2 w-5/6"></div>
        </div>
        <div className="flex justify-center">
          <div className="h-10 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>

      {/* Похожие предложения */}
      <div>
        <div className="h-8 bg-gray-200 rounded mb-4 w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="h-64 bg-gray-200 rounded-lg"></div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
} 