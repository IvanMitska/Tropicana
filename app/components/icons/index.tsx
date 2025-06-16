import React from 'react';

interface IconProps {
  className?: string;
  color?: string;
  size?: number | string;
}

export const WalkingIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M13.5 5.5C14.6046 5.5 15.5 4.60457 15.5 3.5C15.5 2.39543 14.6046 1.5 13.5 1.5C12.3954 1.5 11.5 2.39543 11.5 3.5C11.5 4.60457 12.3954 5.5 13.5 5.5Z"
      fill={color}
    />
    <path
      d="M16 10.27V8.5C16 7.67 15.33 7 14.5 7H10.5C10.03 7 9.62 7.26 9.38 7.66L6.5 12.5V20H8V13.5L10.51 9.69L10.5 14.5L7.5 21.5H9.17L12 15.73L14.83 21.5H16.5L13.5 14.5V10.36L14.65 13H17L16.09 10.27H16Z"
      fill={color}
    />
  </svg>
);

export const CarIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H6.5C5.84 5 5.29 5.42 5.08 6.01L3 12V20C3 20.55 3.45 21 4 21H5C5.55 21 6 20.55 6 20V19H18V20C18 20.55 18.45 21 19 21H20C20.55 21 21 20.55 21 20V12L18.92 6.01ZM6.5 16C5.67 16 5 15.33 5 14.5C5 13.67 5.67 13 6.5 13C7.33 13 8 13.67 8 14.5C8 15.33 7.33 16 6.5 16ZM17.5 16C16.67 16 16 15.33 16 14.5C16 13.67 16.67 13 17.5 13C18.33 13 19 13.67 19 14.5C19 15.33 18.33 16 17.5 16ZM5 11L6.5 6.5H17.5L19 11H5Z"
      fill={color}
    />
  </svg>
);

export const BusIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M4 16C4 17.1 4.9 18 6 18C7.1 18 8 17.1 8 16C8 14.9 7.1 14 6 14C4.9 14 4 14.9 4 16ZM19 16C19 14.9 18.1 14 17 14C15.9 14 15 14.9 15 16C15 17.1 15.9 18 17 18C18.1 18 19 17.1 19 16ZM17 2H7C4.8 2 3 3.8 3 6V16C3 16.9 3.4 17.7 4 18.2V21C4 21.6 4.4 22 5 22H6C6.6 22 7 21.6 7 21V19H17V21C17 21.6 17.4 22 18 22H19C19.6 22 20 21.6 20 21V18.2C20.6 17.7 21 16.9 21 16V6C21 3.8 19.2 2 17 2ZM5 8V5C5 4.4 5.4 4 6 4H18C18.6 4 19 4.4 19 5V8H5ZM5 10H19V14.7C18.7 14.3 18.1 14 17.5 14C16.8 14 16.2 14.3 15.9 14.7H8.1C7.8 14.3 7.2 14 6.5 14C5.9 14 5.3 14.3 5 14.7V10Z"
      fill={color}
    />
  </svg>
);

export const BoatIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M20 21C18.61 21 17.22 20.53 16 19.67C13.56 21.38 10.44 21.38 8 19.67C6.78 20.53 5.39 21 4 21H2V19H4C5.12 19 6.16 18.58 7 17.83C8.79 19.18 11.21 19.18 13 17.83C13.84 18.58 14.88 19 16 19C17.12 19 18.16 18.58 19 17.83C19.84 18.58 20.88 19 22 19H22L22 21H20ZM12 3L1 11.4V16H3.14C3.66 16 4.15 15.78 4.51 15.4L12 7.98L19.5 15.4C19.85 15.78 20.34 16 20.86 16H23V11.4L12 3Z"
      fill={color}
    />
  </svg>
);

export const MotorcycleIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M17.5 10C16.12 10 15 11.12 15 12.5C15 13.88 16.12 15 17.5 15C18.88 15 20 13.88 20 12.5C20 11.12 18.88 10 17.5 10ZM6.5 10C5.12 10 4 11.12 4 12.5C4 13.88 5.12 15 6.5 15C7.88 15 9 13.88 9 12.5C9 11.12 7.88 10 6.5 10ZM16.08 5.9L17.6 7.79C16.56 8.43 15.68 9.39 15.19 10.5H11.26C11 8.48 9.3 7 7.25 7C5.66 7 4.27 7.87 3.53 9.2L4.91 10.23C5.38 9.47 6.26 9 7.25 9C8.47 9 9.46 9.77 9.84 10.82L10.25 12H14.86C15.4 12 15.9 12.21 16.26 12.55L17.28 11.16C17.08 10.96 16.96 10.69 16.96 10.4C16.96 9.91 17.15 9.47 17.47 9.15L15.69 6.98C16.07 6.75 16.5 6.58 16.96 6.47L15.64 5C14.48 5.18 13.37 5.59 12.47 6.25C11.32 7.11 10.54 8.13 10.16 9.3C9.84 8.53 9.14 8 8.31 8C7.85 8 7.43 8.15 7.07 8.39L8.43 9.4C8.8 9.16 9.24 9.37 9.24 9.8C9.24 10.1 9.03 10.35 8.74 10.4L7.4 9.4C7.15 9.84 7 10.34 7 10.9C7 12.36 8.22 13.5 9.77 13.5H14.6C14.08 13.98 13.26 14.3 12.4 14.3C11.9 14.3 11.43 14.23 11 14.07V16.12C11.6 16.29 12.24 16.39 12.9 16.39C14.95 16.39 16.78 15.45 18 14.05C18.33 14.33 18.7 14.58 19.09 14.76L20.16 12.92C19.94 12.81 19.73 12.67 19.55 12.5H19.24C19.24 11.8 19.08 11.14 18.8 10.55L20.4 8.32C20.67 7.94 20.84 7.5 20.94 7.05L18.97 6.12C18.81 6.79 18.4 7.36 17.84 7.74L16.08 5.9Z"
      fill={color}
    />
  </svg>
);

export const YachtIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M20 21C18.61 21 17.22 20.53 16 19.67C13.56 21.38 10.44 21.38 8 19.67C6.78 20.53 5.39 21 4 21H2V19H4C5.37 19 6.74 18.35 8 17C10.5 19 13.5 19 16 17C17.26 18.35 18.62 19 20 19H22V21H20ZM19 5V4H5V13.37C5.9 13.9 6.76 14.1 8 14.1C9.24 14.1 10.1 13.9 11 13.37V11H20C20 10.3 20 5.67 20 5H19ZM12 10.53C10.24 11.5 8.24 11.5 6 10.53V6H12V10.53Z"
      fill={color}
    />
  </svg>
);

// Иконки для поиска
export const LocationIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
      fill={color}
    />
  </svg>
);

export const CalendarIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M19 4H18V2H16V4H8V2H6V4H5C3.9 4 3 4.9 3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V10H19V20ZM19 8H5V6H19V8Z"
      fill={color}
    />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
      fill={color}
    />
  </svg>
);

export const HomeIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z"
      fill={color}
    />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z"
      fill={color}
    />
  </svg>
);

export const ChevronUpIcon: React.FC<IconProps> = ({ className, color = 'currentColor', size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M7.41 15.41L12 10.83L16.59 15.41L18 14L12 8L6 14L7.41 15.41Z"
      fill={color}
    />
  </svg>
); 