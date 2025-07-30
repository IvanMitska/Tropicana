import React from 'react';

interface SimilarToursProps {
  currentTourId: string;
  category: string;
  city: string;
  tags?: string[];
}

const SimilarTours: React.FC<SimilarToursProps> = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Похожие экскурсии</h2>
      <p className="text-gray-600">
        Свяжитесь с нами для получения информации о других экскурсиях.
      </p>
      <div 
        className="inline-block mt-4 bg-primary/50 text-white/60 px-6 py-2 rounded-lg transition-colors opacity-50 cursor-not-allowed"
        title="Контакты - скоро будет доступно"
      >
        Связаться с нами
      </div>
    </div>
  );
};

export default SimilarTours;