import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Генерирует уникальный номер бронирования
 * Формат: BK-YYYYMMDD-XXXX (где XXXX - случайное 4-значное число)
 */
export function generateBookingNumber(): string {
  const date = new Date();
  const dateStr = date.getFullYear().toString() +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    date.getDate().toString().padStart(2, '0');
  const randomPart = Math.floor(1000 + Math.random() * 9000); // 4-значное число
  return `BK-${dateStr}-${randomPart}`;
}

/**
 * Форматирует цену с валютой
 */
export function formatPrice(amount: number, currency: string = 'THB'): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Вычисляет разницу в днях между двумя датами
 */
export function calculateDaysDifference(startDate: Date, endDate: Date): number {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Склонение слова "день" в зависимости от числа
 */
export function getDayWord(count: number): string {
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

/**
 * Проверяет, перекрываются ли диапазоны дат
 */
export function areDatesOverlapping(
  startDate1: Date,
  endDate1: Date,
  startDate2: Date,
  endDate2: Date
): boolean {
  return (
    (startDate1 <= endDate2 && startDate2 <= endDate1) || // Перекрываются
    (startDate1 >= startDate2 && endDate1 <= endDate2) || // Первый диапазон внутри второго
    (startDate2 >= startDate1 && endDate2 <= endDate1)    // Второй диапазон внутри первого
  );
}

/**
 * Функция для получения статуса бронирования на русском языке
 */
export function getBookingStatusText(status: string): string {
  switch (status) {
    case 'draft':
      return 'Черновик';
    case 'pending':
      return 'Ожидает подтверждения';
    case 'confirmed':
      return 'Подтверждено';
    case 'cancelled':
      return 'Отменено';
    case 'completed':
      return 'Завершено';
    default:
      return status;
  }
}

/**
 * Функция для получения статуса оплаты на русском языке
 */
export function getPaymentStatusText(status: string): string {
  switch (status) {
    case 'pending':
      return 'Ожидает оплаты';
    case 'partial':
      return 'Частично оплачено';
    case 'completed':
      return 'Оплачено';
    case 'refunded':
      return 'Возвращено';
    case 'failed':
      return 'Ошибка оплаты';
    default:
      return status;
  }
}

export function formatDate(date: Date | string): string {
  const newDate = date instanceof Date ? date : new Date(date);
  return newDate.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
} 