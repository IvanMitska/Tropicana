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
      <a 
        href="https://wa.me/66994892917" 
        className="inline-block mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
      >
        Написать в WhatsApp
      </a>
    </div>
  );
};

export default SimilarTours;