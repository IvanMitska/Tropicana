'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  baseUrl?: string;
  className?: string;
  showFirstLastButtons?: boolean;
  siblingCount?: number;
  disabled?: boolean;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  baseUrl,
  className,
  showFirstLastButtons = false,
  siblingCount = 1,
  disabled = false,
}: PaginationProps) => {
  // Не показываем пагинацию, если у нас всего одна страница
  if (totalPages <= 1) return null;

  // Генерация массива страниц для отображения
  const getPageNumbers = () => {
    const totalPageNumbers = siblingCount * 2 + 3; // siblings + current + first + last

    // Если общее количество страниц меньше, чем нужно показать,
    // просто возвращаем все страницы
    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Вычисляем левую и правую границы для соседних страниц
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    // Определяем, нужны ли многоточия слева и справа
    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 1;

    // Различные случаи в зависимости от положения текущей страницы
    if (!showLeftDots && showRightDots) {
      // Нет многоточия слева, но есть справа
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, '...', totalPages];
    } else if (showLeftDots && !showRightDots) {
      // Есть многоточие слева, но нет справа
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [1, '...', ...rightRange];
    } else if (showLeftDots && showRightDots) {
      // Многоточия с обеих сторон
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [1, '...', ...middleRange, '...', totalPages];
    }

    // Не должны дойти до этой точки, но на всякий случай
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  const pageNumbers = getPageNumbers();

  // Функция для перехода на предыдущую страницу
  const handlePrevPage = () => {
    if (currentPage > 1 && !disabled) {
      if (onPageChange) onPageChange(currentPage - 1);
    }
  };

  // Функция для перехода на следующую страницу
  const handleNextPage = () => {
    if (currentPage < totalPages && !disabled) {
      if (onPageChange) onPageChange(currentPage + 1);
    }
  };

  // Функция для перехода на первую страницу
  const handleFirstPage = () => {
    if (currentPage !== 1 && !disabled) {
      if (onPageChange) onPageChange(1);
    }
  };

  // Функция для перехода на последнюю страницу
  const handleLastPage = () => {
    if (currentPage !== totalPages && !disabled) {
      if (onPageChange) onPageChange(totalPages);
    }
  };

  // Функция для определения URL страницы
  const getPageUrl = (page: number) => {
    if (!baseUrl) return '#';
    
    const url = new URL(baseUrl, window.location.origin);
    url.searchParams.set('page', page.toString());
    return url.pathname + url.search;
  };

  // Общие стили для кнопок страниц
  const buttonClass = 'px-3 py-2 border rounded-md text-sm';
  const activeButtonClass = 'bg-dark text-white border-dark';
  const inactiveButtonClass = 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50';
  const disabledClass = 'opacity-50 cursor-not-allowed';

  return (
    <nav className={`flex items-center justify-center space-x-1 ${className || ''}`}>
      {/* Кнопка первой страницы */}
      {showFirstLastButtons && (
        <>
          {baseUrl ? (
            <Link
              href={getPageUrl(1)}
              className={`${buttonClass} ${inactiveButtonClass} ${
                currentPage === 1 || disabled ? disabledClass : ''
              }`}
              aria-disabled={currentPage === 1 || disabled}
              tabIndex={currentPage === 1 || disabled ? -1 : undefined}
              aria-label="Первая страница"
            >
              First
            </Link>
          ) : (
            <button
              onClick={handleFirstPage}
              disabled={currentPage === 1 || disabled}
              className={`${buttonClass} ${inactiveButtonClass} ${
                currentPage === 1 || disabled ? disabledClass : ''
              }`}
              aria-label="Первая страница"
            >
              First
            </button>
          )}
        </>
      )}

      {/* Кнопка предыдущей страницы */}
      {baseUrl ? (
        <Link
          href={currentPage > 1 ? getPageUrl(currentPage - 1) : '#'}
          className={`${buttonClass} ${inactiveButtonClass} ${
            currentPage === 1 || disabled ? disabledClass : ''
          }`}
          aria-disabled={currentPage === 1 || disabled}
          tabIndex={currentPage === 1 || disabled ? -1 : undefined}
          aria-label="Предыдущая страница"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      ) : (
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1 || disabled}
          className={`${buttonClass} ${inactiveButtonClass} ${
            currentPage === 1 || disabled ? disabledClass : ''
          }`}
          aria-label="Предыдущая страница"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}

      {/* Кнопки страниц */}
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-3 py-2 text-gray-500"
            >
              ...
            </span>
          );
        }

        const pageNumber = page as number;
        const isActive = pageNumber === currentPage;

        return baseUrl ? (
          <Link
            key={pageNumber}
            href={getPageUrl(pageNumber)}
            className={`${buttonClass} ${
              isActive ? activeButtonClass : inactiveButtonClass
            } ${disabled ? disabledClass : ''}`}
            aria-current={isActive ? 'page' : undefined}
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : undefined}
          >
            {pageNumber}
          </Link>
        ) : (
          <button
            key={pageNumber}
            onClick={() => !disabled && onPageChange && onPageChange(pageNumber)}
            disabled={disabled}
            className={`${buttonClass} ${
              isActive ? activeButtonClass : inactiveButtonClass
            } ${disabled ? disabledClass : ''}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Кнопка следующей страницы */}
      {baseUrl ? (
        <Link
          href={currentPage < totalPages ? getPageUrl(currentPage + 1) : '#'}
          className={`${buttonClass} ${inactiveButtonClass} ${
            currentPage === totalPages || disabled ? disabledClass : ''
          }`}
          aria-disabled={currentPage === totalPages || disabled}
          tabIndex={currentPage === totalPages || disabled ? -1 : undefined}
          aria-label="Следующая страница"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages || disabled}
          className={`${buttonClass} ${inactiveButtonClass} ${
            currentPage === totalPages || disabled ? disabledClass : ''
          }`}
          aria-label="Следующая страница"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}

      {/* Кнопка последней страницы */}
      {showFirstLastButtons && (
        <>
          {baseUrl ? (
            <Link
              href={getPageUrl(totalPages)}
              className={`${buttonClass} ${inactiveButtonClass} ${
                currentPage === totalPages || disabled ? disabledClass : ''
              }`}
              aria-disabled={currentPage === totalPages || disabled}
              tabIndex={currentPage === totalPages || disabled ? -1 : undefined}
              aria-label="Последняя страница"
            >
              Last
            </Link>
          ) : (
            <button
              onClick={handleLastPage}
              disabled={currentPage === totalPages || disabled}
              className={`${buttonClass} ${inactiveButtonClass} ${
                currentPage === totalPages || disabled ? disabledClass : ''
              }`}
              aria-label="Последняя страница"
            >
              Last
            </button>
          )}
        </>
      )}
    </nav>
  );
}; 