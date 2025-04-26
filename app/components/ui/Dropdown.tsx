'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

export interface DropdownItem {
  id: string | number;
  label: React.ReactNode;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  className?: string;
  dropdownClassName?: string;
  withDividers?: boolean;
}

export const Dropdown = ({
  trigger,
  items,
  align = 'left',
  className,
  dropdownClassName,
  withDividers = false,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const closeDropdown = () => {
    setIsOpen(false);
  };

  // Вспомогательная функция для рендеринга элемента выпадающего меню
  const renderItem = (item: DropdownItem, index: number) => {
    const itemContent = (
      <div className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm w-full">
        {item.icon && <span className="mr-2">{item.icon}</span>}
        {item.label}
      </div>
    );

    // Если есть ссылка, используем Link
    if (item.href) {
      return (
        <Link 
          key={item.id} 
          href={item.href} 
          onClick={closeDropdown}
          className={`block ${item.disabled ? 'opacity-50 pointer-events-none' : ''}`}
        >
          {itemContent}
        </Link>
      );
    }

    // Если нет ссылки, используем кнопку
    return (
      <button
        key={item.id}
        onClick={() => {
          if (item.onClick) {
            item.onClick();
          }
          closeDropdown();
        }}
        disabled={item.disabled}
        className={`text-left ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''} w-full`}
      >
        {itemContent}
      </button>
    );
  };

  return (
    <div className={`relative inline-block ${className || ''}`} ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer select-none"
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`absolute z-10 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${
            align === 'right' ? 'right-0' : 'left-0'
          } min-w-[160px] ${dropdownClassName || ''}`}
        >
          <div className="py-1">
            {items.map((item, index) => (
              <React.Fragment key={item.id}>
                {renderItem(item, index)}
                {withDividers && index < items.length - 1 && <hr className="my-1 border-gray-200" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export interface DropdownButtonProps {
  label: string;
  onClick?: () => void;
  items: DropdownItem[];
  className?: string;
  align?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline';
  withDividers?: boolean;
  disabled?: boolean;
}

export const DropdownButton = ({
  label,
  onClick,
  items,
  className,
  align = 'left',
  size = 'md',
  variant = 'primary',
  withDividers = false,
  disabled = false,
}: DropdownButtonProps) => {
  const getButtonSize = () => {
    switch (size) {
      case 'sm':
        return 'text-xs px-2.5 py-1.5';
      case 'md':
        return 'text-sm px-4 py-2';
      case 'lg':
        return 'text-base px-5 py-2.5';
      default:
        return 'text-sm px-4 py-2';
    }
  };

  const getButtonVariant = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary text-white hover:bg-primary-dark';
      case 'secondary':
        return 'bg-secondary text-white hover:bg-secondary-dark';
      case 'outline':
        return 'bg-transparent border border-gray-300 hover:bg-gray-100 text-gray-700';
      default:
        return 'bg-primary text-white hover:bg-primary-dark';
    }
  };

  return (
    <Dropdown
      trigger={
        <div
          className={`inline-flex items-center justify-center rounded-md font-medium transition-colors ${getButtonSize()} ${getButtonVariant()} ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          } ${className || ''}`}
          onClick={onClick}
        >
          {label}
          <ChevronDown className="ml-2 h-4 w-4" />
        </div>
      }
      items={items}
      align={align}
      withDividers={withDividers}
    />
  );
}; 