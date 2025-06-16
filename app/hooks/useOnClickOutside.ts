import { RefObject, useEffect } from 'react';

/**
 * Хук для обработки кликов вне определенного элемента
 * @param ref - Ссылка на элемент
 * @param handler - Функция-обработчик, которая будет вызвана при клике вне элемента
 */
export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Если ссылка не существует или клик был внутри элемента, ничего не делаем
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      
      handler(event);
    };
    
    // Добавляем обработчики для мыши и тачскрина
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    
    // Очистка обработчиков при размонтировании компонента
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]); // Перерегистрируем обработчик при изменении ref или handler
} 