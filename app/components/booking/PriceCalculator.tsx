'use client';

import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface PriceCalculatorProps {
  itemType: 'real-estate' | 'transport' | 'tour';
  itemId: string;
  startDate?: Date;
  endDate?: Date;
  guestCount?: number;
  selectedOptions?: string[];
  className?: string;
}

interface PriceDetails {
  basePrice: number;
  optionsPrice: number;
  taxAmount: number;
  totalPrice: number;
  currency: string;
  daysCount: number;
}

export const PriceCalculator = ({
  itemType,
  itemId,
  startDate,
  endDate,
  guestCount = 1,
  selectedOptions = [],
  className = ''
}: PriceCalculatorProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [priceDetails, setPriceDetails] = useState<PriceDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const calculatePrice = async () => {
      // Пропускаем расчет, если не указаны даты
      if (!startDate || !endDate) {
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/bookings/calculate-price', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            itemType,
            itemId,
            startDate,
            endDate,
            options: selectedOptions,
            guestCount
          })
        });

        const data = await response.json();

        if (data.success) {
          setPriceDetails(data.price);
        } else {
          setError(data.message || 'Ошибка при расчете стоимости');
          setPriceDetails(null);
        }
      } catch (error) {
        console.error('Ошибка при расчете стоимости:', error);
        setError('Не удалось рассчитать стоимость');
        setPriceDetails(null);
      } finally {
        setIsLoading(false);
      }
    };

    calculatePrice();
  }, [itemType, itemId, startDate, endDate, guestCount, selectedOptions]);

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center p-4 ${className}`}>
        <Loader2 className="h-5 w-5 text-primary animate-spin" />
        <span className="ml-2 text-sm">Расчет стоимости...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-4 bg-red-50 border border-red-200 rounded-md ${className}`}>
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  if (!priceDetails) {
    return (
      <div className={`p-4 ${className}`}>
        <p className="text-sm text-gray-500">
          Выберите даты для расчета стоимости
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between">
        <span className="text-gray-600">
          Базовая стоимость{' '}
          {priceDetails.daysCount > 1 && `(${priceDetails.daysCount} ${getDayWord(priceDetails.daysCount)})`}
        </span>
        <span>{priceDetails.basePrice} {priceDetails.currency}</span>
      </div>

      {priceDetails.optionsPrice > 0 && (
        <div className="flex justify-between">
          <span className="text-gray-600">Дополнительные опции</span>
          <span>{priceDetails.optionsPrice} {priceDetails.currency}</span>
        </div>
      )}

      <div className="flex justify-between">
        <span className="text-gray-600">Налоги и сборы</span>
        <span>{priceDetails.taxAmount} {priceDetails.currency}</span>
      </div>

      <div className="flex justify-between font-semibold border-t pt-2 mt-2">
        <span>Итого</span>
        <span>{priceDetails.totalPrice} {priceDetails.currency}</span>
      </div>
    </div>
  );
};

// Функция для правильного склонения слова "день"
function getDayWord(count: number): string {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return 'дней';
  }

  if (lastDigit === 1) {
    return 'день';
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'дня';
  }

  return 'дней';
} 