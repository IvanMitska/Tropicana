import React from 'react';

interface TourBookingWidgetProps {
  tour: any;
}

const TourBookingWidget: React.FC<TourBookingWidgetProps> = ({ tour }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg sticky top-8">
      <h3 className="text-xl font-semibold mb-4">Забронировать экскурсию</h3>
      
      <div className="mb-6">
        <div className="text-2xl font-bold text-primary mb-2">
          Договорная цена
        </div>
        <p className="text-gray-600 text-sm">
          Стоимость зависит от количества участников и даты
        </p>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Дата экскурсии
          </label>
          <input 
            type="date" 
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Количество участников
          </label>
          <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary">
            <option>1 человек</option>
            <option>2 человека</option>
            <option>3 человека</option>
            <option>4 человека</option>
            <option>5+ человек</option>
          </select>
        </div>
      </div>

      <a 
        href="https://wa.me/66994892917?text=Здравствуйте! Хотел бы забронировать экскурсию"
        className="block w-full bg-primary hover:bg-primary-dark text-white text-center py-3 rounded-lg transition-colors font-medium"
      >
        Забронировать в WhatsApp
      </a>

      <div className="mt-4 text-xs text-gray-500 text-center">
        Бесплатная отмена за 24 часа до начала
      </div>
    </div>
  );
};

export default TourBookingWidget;