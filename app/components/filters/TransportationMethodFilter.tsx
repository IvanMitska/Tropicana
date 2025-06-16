import React, { useState } from 'react';
import styles from './TransportationMethodFilter.module.css'; // Import CSS module
import { 
  WalkingIcon, 
  CarIcon, 
  BusIcon, 
  BoatIcon, 
  MotorcycleIcon, 
  YachtIcon,
  ChevronUpIcon,
  ChevronDownIcon
} from '../icons';

// TODO: Import actual SVG icon components or paths
// Example: import { WalkingIcon, CarIcon, BusIcon } from '@/components/icons';

// Assuming SVG icons will be React components
interface TransportationMethod {
  id: string;
  name: string;
  icon?: React.ReactNode; // Placeholder for SVG icon component or <img> tag
}

interface TransportationMethodFilterProps {
  availableMethods: TransportationMethod[];
  selectedMethods: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  onReset: () => void;
  resultsCount: number;
  // TODO: Add props for custom styling or classNames if needed
}

// TODO: Define these base styles using Tailwind CSS or a dedicated CSS file
// For BEM, classes could be like: transportation-filter, transportation-filter__header, transportation-filter__option, etc.
// For Tailwind, you'd apply utility classes directly or use @apply in a CSS file.

// Example class names (adjust as per your BEM/Tailwind strategy)
// const classNames = {
//   container: 'transport-filter__container', // bg-[#2F4741] text-white p-4 rounded-lg font-[YourSiteFont] min-w-[250px]
//   header: 'transport-filter__header', // flex justify-between items-center cursor-pointer pb-3
//   headerTitle: 'transport-filter__header-title', // m-0 text-base font-bold
//   headerIcon: 'transport-filter__header-icon', // text-xs
//   optionsList: 'transport-filter__options-list', // border-t border-white/20 pt-3
//   optionItem: 'transport-filter__option-item', // flex items-center mb-2.5
//   optionCheckbox: 'transport-filter__option-checkbox', // mr-3 w-4 h-4 accent-[#E69980]
//   optionIcon: 'transport-filter__option-icon', // mr-2 flex items-center
//   optionLabel: 'transport-filter__option-label', // text-sm cursor-pointer
//   footer: 'transport-filter__footer', // flex justify-between items-center mt-4 border-t border-white/20 pt-4
//   resetButton: 'transport-filter__reset-button', // text-[#E69980] bg-transparent border border-[#E69980] py-2 px-4 rounded cursor-pointer text-sm font-[YourSiteFont]
//   showButton: 'transport-filter__show-button', // bg-[#E69980] text-[#2F4741] border-none py-2 px-4 rounded cursor-pointer text-sm font-bold font-[YourSiteFont]
// };

const TransportationMethodFilter: React.FC<TransportationMethodFilterProps> = ({
  availableMethods,
  selectedMethods,
  onSelectionChange,
  onReset,
  resultsCount
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMethodToggle = (methodId: string) => {
    const newSelectedMethods = selectedMethods.includes(methodId)
      ? selectedMethods.filter(id => id !== methodId)
      : [...selectedMethods, methodId];
    onSelectionChange(newSelectedMethods);
  };

  const handleReset = () => {
    onReset();
  };

  // TODO: Replace baseFontFamily and borderRadius with actual site values
  // const baseFontFamily = "YourSiteFont, sans-serif"; 
  // const primaryColor = '#E69980'; 
  // const secondaryColor = '#2F4741'; 
  // const borderRadius = 'siteBorderRadius'; 

  return (
    <div className={styles.container}>
      <div 
        className={styles.header}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="transportation-filter-options"
      >
        <h3 className={styles.headerTitle}>Способ передвижения</h3>
        <span className={styles.headerIcon}>
          {isOpen ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
        </span>
      </div>
      
      {isOpen && (
        <div id="transportation-filter-options" className={styles.optionsList}>
          {availableMethods.map(method => (
            <div key={method.id} className={styles.optionItem}>
              <input
                type="checkbox"
                id={`method-${method.id}`}
                name={method.name}
                checked={selectedMethods.includes(method.id)}
                onChange={() => handleMethodToggle(method.id)}
                className={styles.optionCheckbox}
              />
              <span className={styles.optionIcon}>
                {method.icon || getIconForMethodId(method.id)}
              </span>
              <label htmlFor={`method-${method.id}`} className={styles.optionLabel}>{method.name}</label>
            </div>
          ))}
          
          <div className={styles.footer}>
            <button 
              onClick={handleReset} 
              className={styles.resetButton}
            >
              Сбросить
            </button>
            <button className={styles.showButton}>
              Показать {resultsCount}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Хелпер-функция для получения иконки по ID метода
function getIconForMethodId(id: string): React.ReactNode {
  switch (id.toLowerCase()) {
    case 'walking':
      return <WalkingIcon size={20} />;
    case 'car':
      return <CarIcon size={20} />;
    case 'bus':
      return <BusIcon size={20} />;
    case 'boat':
      return <BoatIcon size={20} />;
    case 'motorcycle':
      return <MotorcycleIcon size={20} />;
    case 'yacht':
      return <YachtIcon size={20} />;
    default:
      return <CarIcon size={20} />; // Иконка по умолчанию
  }
}

export default TransportationMethodFilter; 