'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './SearchInterface.module.css'; // Import CSS module
import CalendarInterface from '../calendar/CalendarInterface';
import calendarStyles from '../calendar/CalendarInterface.module.css';
import { HomeIcon, LocationIcon, CalendarIcon, SearchIcon, ChevronDownIcon } from '../icons';
import { useMediaQuery } from '@/app/hooks/useMediaQuery';

interface ServiceType {
  id: string;
  name: string;
  // icon?: React.ReactNode; // Optional: if services have icons like in the image
}

interface SearchInterfaceProps {
  serviceTypes: ServiceType[]; 
  onSearch: (params: { serviceType: string; location: string; dateRange: [Date | null, Date | null] }) => void;
  // primaryColor?: string; // '#E69980'
  // secondaryColor?: string; // '#2F4741'
}

// TODO: Define these styles in SearchInterface.module.css or using Tailwind utilities
// Based on Image 3 provided:
// Container seems to have a semi-transparent dark background with rounded corners.
// Inputs are light-colored with icons and placeholder text.
// Search button is coral/orange.

const SearchInterface: React.FC<SearchInterfaceProps> = ({
  serviceTypes,
  onSearch,
}) => {
  const [selectedService, setSelectedService] = useState<string>(serviceTypes[0]?.id || '');
  const [location, setLocation] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [participantCount, setParticipantCount] = useState(2);
  const dateButtonRef = useRef<HTMLButtonElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ 
      serviceType: selectedService, 
      location: location, 
      dateRange: [startDate, endDate] 
    });
  };

  const handleDateChange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
  };

  const toggleServiceDropdown = () => setIsServiceDropdownOpen(!isServiceDropdownOpen);

  const selectService = (serviceId: string) => {
    setSelectedService(serviceId);
    setIsServiceDropdownOpen(false);
  };
  
  const currentSelectedServiceName = serviceTypes.find(st => st.id === selectedService)?.name || 'Выберите услугу';

  const formatDateRange = () => {
    if (startDate && endDate) {
      return `${startDate.toLocaleDateString('ru')} - ${endDate.toLocaleDateString('ru')}`;
    } else if (startDate) {
      return startDate.toLocaleDateString('ru');
    }
    return 'Выберите дату';
  };

  // Закрываем дропдаун услуг при клике вне его области
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isServiceDropdownOpen && 
          !event.target ||
          (event.target instanceof Node && 
           !document.querySelector(`.${styles.serviceSelectWrapper}`)?.contains(event.target))) {
        setIsServiceDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isServiceDropdownOpen]);

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Dropdown для выбора услуги */}
        <div className={`${styles.formGroup} ${styles.serviceSelectWrapper}`}>
          <HomeIcon className={styles.serviceIcon} size={isMobile ? 18 : 20} color="#757575" />
          <button 
            type="button" 
            className={styles.serviceSelect}
            onClick={toggleServiceDropdown}
            aria-haspopup="listbox"
            aria-expanded={isServiceDropdownOpen}
          >
            <span className="truncate block">{currentSelectedServiceName}</span>
            <span>
              <ChevronDownIcon size={isMobile ? 14 : 16} />
            </span>
          </button>
          {isServiceDropdownOpen && (
            <ul role="listbox" className={styles.serviceDropdownList}>
              {serviceTypes.map(type => (
                <li 
                  key={type.id} 
                  role="option"
                  aria-selected={selectedService === type.id}
                  onClick={() => selectService(type.id)}
                  className={styles.serviceDropdownItem}
                >
                  {type.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Поле ввода места назначения */}
        <div className={`${styles.formGroup} ${styles.locationInputWrapper}`}>
          <LocationIcon className={styles.locationIcon} size={isMobile ? 18 : 20} color="#757575" />
          <input 
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder={isMobile ? "Куда поедете" : "Куда вы хотите поехать"}
            className={styles.locationInput}
          />
        </div>

        {/* Единое поле выбора даты */}
        <div className={`${styles.formGroup} ${styles.datePickerWrapper}`}>
          <CalendarInterface 
            startDate={startDate}
            endDate={endDate}
            onDateChange={handleDateChange}
            onReset={handleReset}
            initialParticipants={participantCount}
            onParticipantChange={setParticipantCount}
            minParticipants={1}
            maxParticipants={10}
          />
        </div>
        
        {/* Кнопка поиска */}
        <button type="submit" className={styles.searchButton}>
          <SearchIcon className={styles.searchIcon} color="white" size={isMobile ? 18 : 20} />
          {isMobile ? "Поиск" : "Найти"}
        </button>
      </form>
    </div>
  );
};

export default SearchInterface; 