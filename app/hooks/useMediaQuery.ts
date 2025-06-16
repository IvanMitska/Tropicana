'use client';

import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  // Проверка на SSR
  const getMatches = (query: string): boolean => {
    // Проверяем, есть ли доступ к window
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));
  
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    
    const mediaQuery = window.matchMedia(query);
    // Устанавливаем корректное начальное значение
    setMatches(mediaQuery.matches);
    
    // Создаем обработчик
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // Кроссбраузерная поддержка
    try {
      mediaQuery.addEventListener('change', handleChange);
    } catch (e) {
      // Для старых браузеров
      mediaQuery.addListener(handleChange as any);
    }
    
    // Очищаем слушатель при размонтировании
    return () => {
      try {
        mediaQuery.removeEventListener('change', handleChange);
      } catch (e) {
        // Для старых браузеров
        mediaQuery.removeListener(handleChange as any);
      }
    };
  }, [query]);
  
  return matches;
} 