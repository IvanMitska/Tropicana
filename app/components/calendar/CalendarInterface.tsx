'use client';

import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { format, addMonths, getDaysInMonth, startOfMonth, getDay, isToday, isBefore, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, subMonths, isWeekend, startOfDay, isAfter, addDays } from 'date-fns';
import { ru } from 'date-fns/locale';
import styles from './CalendarInterface.module.css';
import { FaChevronLeft, FaChevronRight, FaCalendarAlt, FaTimes } from 'react-icons/fa';

interface CalendarInterfaceProps {
  initialStartDate: Date | null;
  initialEndDate: Date | null;
  onDateChange: (dateRange: [Date | null, Date | null]) => void;
  onReset: () => void;
  participantCount: number;
  onParticipantChange: (count: number) => void;
  resultsForSelection: number;
}

// Компонент модального окна, который будет монтироваться через портал
const CalendarModal = ({
  isOpen,
  onClose,
  currentMonth,
  changeMonth,
  days,
  weekDays,
  tempStartDate,
  tempEndDate,
  handleDateClick,
  participants,
  minParticipants,
  maxParticipants,
  countAnimation,
  handleParticipantChange,
  handleReset,
  handleApply,
  onParticipantChange
}: {
  isOpen: boolean;
  onClose: () => void;
  currentMonth: Date;
  changeMonth: (increment: number) => void;
  days: ReturnType<any>;
  weekDays: string[];
  tempStartDate: Date | null;
  tempEndDate: Date | null;
  handleDateClick: (day: Date) => void;
  participants: number;
  minParticipants: number;
  maxParticipants: number;
  countAnimation: boolean;
  handleParticipantChange: (change: number) => void;
  handleReset: () => void;
  handleApply: () => void;
  onParticipantChange?: (count: number) => void;
}) => {
  if (!isOpen) return null;
  
  // Используем портал для монтирования модального окна в корень DOM-дерева
  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div 
        className={styles.modalContent} 
        onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие при клике на само модальное окно
      >
        {/* Заголовок модального окна */}
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Даты</h2>
          <button className={styles.closeButton} onClick={onClose} aria-label="Закрыть">
            <FaTimes />
          </button>
        </div>
        
        <div className={styles.calendarWrapper}>
          {/* Навигация по месяцам */}
          <div className={styles.calendarNavigation}>
            <button 
              className={styles.navButton} 
              onClick={() => changeMonth(-1)}
              aria-label="Предыдущий месяц"
            >
              <FaChevronLeft />
            </button>
            <span className={styles.currentMonthDisplay}>
              {format(currentMonth, 'LLLL yyyy', { locale: ru })}
            </span>
            <button 
              className={styles.navButton} 
              onClick={() => changeMonth(1)}
              aria-label="Следующий месяц"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Сетка календаря */}
          <div className={styles.calendarGrid}>
            {/* Дни недели */}
            <div className={styles.weekDays}>
              {weekDays.map((day, index) => (
                <div 
                  key={index} 
                  className={`${styles.weekDay} ${(index === 5 || index === 6) ? styles.weekendWeekDay : ''}`}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Дни месяца */}
            <div className={styles.days}>
              {/* Пустые ячейки в начале месяца */}
              {Array.from({ length: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() === 0 ? 6 : new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() - 1 }).map((_, index) => (
                <div key={`empty-${index}`} className={`${styles.day} ${styles.emptyDay}`}></div>
              ))}
              
              {/* Дни месяца */}
              {days.map((day: any, index: number) => {
                const today = new Date();
                const isToday = isSameDay(day.date, today);
                
                // Определение классов для ячейки дня
                let dayClasses = `${styles.day}`;
                
                if (day.isPast) {
                  dayClasses += ` ${styles.pastDay}`;
                }
                
                if (day.isWeekendDay) {
                  dayClasses += ` ${styles.weekendDay}`;
                }
                
                if (isToday) {
                  dayClasses += ` ${styles.today}`;
                }
                
                if (tempStartDate && tempEndDate && (isSameDay(day.date, tempStartDate) || isSameDay(day.date, tempEndDate))) {
                  dayClasses += ` ${styles.rangeEndDay}`;
                } else if (day.isInRange) {
                  dayClasses += ` ${styles.rangeDay}`;
                }
                
                return (
                  <div
                    key={index}
                    className={dayClasses}
                    onClick={() => handleDateClick(day.date)}
                  >
                    {format(day.date, 'd')}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Секция для выбора количества гостей */}
          {onParticipantChange && (
            <div className={styles.guestsSection}>
              <div className={styles.guestsLabel}>Количество гостей</div>
              <div className={styles.guestsControls}>
                <button 
                  className={styles.guestButton}
                  onClick={() => handleParticipantChange(-1)}
                  disabled={participants <= minParticipants}
                  aria-label="Уменьшить количество гостей"
                >
                  -
                </button>
                <span className={`${styles.guestCount} ${countAnimation ? styles.pulse : ''}`}>
                  {participants}
                </span>
                <button 
                  className={styles.guestButton}
                  onClick={() => handleParticipantChange(1)}
                  disabled={participants >= maxParticipants}
                  aria-label="Увеличить количество гостей"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Кнопки действий */}
          <div className={styles.actionButtons}>
            <button 
              className={styles.resetButton} 
              onClick={handleReset}
            >
              Сбросить
            </button>
            <button 
              className={styles.applyButton} 
              onClick={handleApply}
              disabled={!tempStartDate}
            >
              Применить
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body // Монтируем в body
  );
};

const CalendarInterface: React.FC<CalendarInterfaceProps> = ({
  initialStartDate,
  initialEndDate,
  onDateChange,
  onReset,
  participantCount,
  onParticipantChange,
  resultsForSelection
}) => {
  const currentDate = new Date();
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [nextMonth, setNextMonth] = useState<Date>(addMonths(new Date(), 1));
  const calendarRef = useRef<HTMLDivElement>(null);
  const [tempStartDate, setTempStartDate] = useState<Date | null>(startDate);
  const [tempEndDate, setTempEndDate] = useState<Date | null>(endDate);
  const [participants, setParticipants] = useState<number>(participantCount);
  const [countAnimation, setCountAnimation] = useState<boolean>(false);

  // Обработчик клика вне календаря для его закрытия
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    };

    if (isCalendarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCalendarOpen]);

  // Генерация дней для календаря месяца
  const generateCalendarDays = (date: Date) => {
    const firstDay = startOfMonth(date);
    const daysInMonth = getDaysInMonth(date);
    const startingDayIndex = getDay(firstDay) || 7; // Преобразуем воскресенье (0) в 7
    
    const days = [];
    // Добавляем пустые ячейки для дней недели до первого дня месяца
    for (let i = 1; i < startingDayIndex; i++) {
      days.push(null);
    }
    
    // Добавляем дни месяца
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = new Date(date.getFullYear(), date.getMonth(), day);
      days.push(currentDay);
    }
    
    return days;
  };

  // Проверка, выбран ли день
  const isDaySelected = (day: Date | null) => {
    if (!day || !startDate) return false;
    
    const dayTimestamp = new Date(day).setHours(0, 0, 0, 0);
    const startTimestamp = new Date(startDate).setHours(0, 0, 0, 0);
    
    if (!endDate) {
      return dayTimestamp === startTimestamp;
    }
    
    const endTimestamp = new Date(endDate).setHours(0, 0, 0, 0);
    return dayTimestamp >= startTimestamp && dayTimestamp <= endTimestamp;
  };

  // Проверка, является ли день промежуточным в диапазоне
  const isDayInRange = (day: Date | null) => {
    if (!day || !startDate || !endDate) return false;
    
    const dayTimestamp = new Date(day).setHours(0, 0, 0, 0);
    const startTimestamp = new Date(startDate).setHours(0, 0, 0, 0);
    const endTimestamp = new Date(endDate).setHours(0, 0, 0, 0);
    
    return dayTimestamp > startTimestamp && dayTimestamp < endTimestamp;
  };

  // Проверка, является ли день началом или концом диапазона
  const isDayRangeEnd = (day: Date | null) => {
    if (!day || !startDate) return false;
    
    const dayTimestamp = new Date(day).setHours(0, 0, 0, 0);
    const startTimestamp = new Date(startDate).setHours(0, 0, 0, 0);
    
    if (endDate) {
      const endTimestamp = new Date(endDate).setHours(0, 0, 0, 0);
      return dayTimestamp === startTimestamp || dayTimestamp === endTimestamp;
    }
    
    return dayTimestamp === startTimestamp;
  };

  // Проверка, является ли день прошедшим
  const isPastDay = (day: Date | null) => {
    if (!day) return false;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return day < today;
  };

  // Обработчик выбора даты
  const handleDayClick = (day: Date | null) => {
    if (!day || isPastDay(day)) return;
    
    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
    } else {
      // Если startDate существует, но endDate не установлен
      const clickedDay = new Date(day);
      const start = new Date(startDate);
      
      if (clickedDay < start) {
        setEndDate(start);
        setStartDate(clickedDay);
      } else {
        setEndDate(clickedDay);
      }
    }
  };

  // Переключение на предыдущий месяц
  const handlePrevMonth = () => {
    setCurrentMonth(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
    setNextMonth(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  // Переключение на следующий месяц
  const handleNextMonth = () => {
    setCurrentMonth(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
    setNextMonth(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  // Функция для отображения выбранного диапазона
  const getDisplayDateRange = () => {
    if (startDate && endDate) {
      return `${format(startDate, 'dd.MM.yyyy')} - ${format(endDate, 'dd.MM.yyyy')}`;
    } else if (startDate) {
      return `${format(startDate, 'dd.MM.yyyy')} - ...`;
    } else {
      return 'Выберите даты';
    }
  };

  // Сброс выбранных дат
  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    onReset();
  };

  // Применение выбранных дат
  const handleApply = () => {
    if (startDate) {
      onDateChange([startDate, endDate]);
      setIsCalendarOpen(false);
    }
  };

  // Закрытие календаря
  const handleClose = () => {
    setIsCalendarOpen(false);
  };

  // Обновление пропсов родителя при изменении
  useEffect(() => {
    if (startDate !== initialStartDate || endDate !== initialEndDate) {
      onDateChange([startDate, endDate]);
    }
  }, [startDate, endDate]);

  // Названия дней недели
  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  // Обновляем временные даты при изменении props
  useEffect(() => {
    setTempStartDate(startDate);
    setTempEndDate(endDate);
  }, [startDate, endDate]);

  // Обработчик открытия/закрытия календаря
  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
    
    // При открытии календаря устанавливаем текущий месяц на месяц начальной даты или текущий
    if (!isCalendarOpen && tempStartDate) {
      setCurrentMonth(tempStartDate);
    } else if (!isCalendarOpen) {
      setCurrentMonth(new Date());
    }
  };

  // Обработчик изменения месяца
  const changeMonth = (increment: number) => {
    setCurrentMonth(increment > 0 ? addMonths(currentMonth, 1) : subMonths(currentMonth, 1));
  };

  // Генерация дней в месяце
  const generateDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    // Получаем сегодняшний день в начале дня (0:00)
    const today = startOfDay(new Date());
    
    return days.map(day => {
      const dayDate = startOfDay(day);
      const isPast = isBefore(dayDate, today);
      const isWeekendDay = isWeekend(day);
      
      // Проверяем, является ли день выбранным
      let isSelected = false;
      let isInRange = false;
      
      if (tempStartDate && tempEndDate) {
        // Если у нас есть начальная и конечная даты, проверяем, входит ли текущий день в этот диапазон
        isSelected = isSameDay(day, tempStartDate) || isSameDay(day, tempEndDate);
        isInRange = isAfter(day, tempStartDate) && isBefore(day, tempEndDate);
      } else if (tempStartDate) {
        // Если у нас есть только начальная дата, проверяем, является ли текущий день начальной датой
        isSelected = isSameDay(day, tempStartDate);
      }
      
      return {
        date: day,
        isPast,
        isWeekendDay,
        isSelected,
        isInRange
      };
    });
  };

  // Обработчик выбора даты
  const handleDateClick = (day: Date) => {
    // Получаем сегодняшний день в начале дня (0:00)
    const today = startOfDay(new Date());
    
    // Если выбранный день в прошлом, игнорируем
    if (isBefore(day, today)) {
      return;
    }
    
    if (day.getDay() === 0 || day.getDay() === 6) {
      // Если выбранный день выходной, устанавливаем его как конечную дату
      setTempEndDate(day);
      setTempStartDate(null);
    } else {
      // Если выбранный день будний, устанавливаем его как начальную дату
      setTempStartDate(day);
      setTempEndDate(null);
    }
  };

  // Обработчик изменения количества участников
  const handleParticipantChange = (change: number) => {
    const newCount = participants + change;
    if (newCount >= 1 && newCount <= 10) {
      setParticipants(newCount);
      // Активируем анимацию
      setCountAnimation(true);
      // Сбрасываем анимацию после завершения
      setTimeout(() => setCountAnimation(false), 300);
      
      if (onParticipantChange) {
        onParticipantChange(newCount);
      }
    }
  };

  // Форматирование отображаемых дат
  const formatDateDisplay = () => {
    if (startDate && endDate) {
      return `${format(startDate, 'dd.MM.yyyy', { locale: ru })} — ${format(endDate, 'dd.MM.yyyy', { locale: ru })}`;
    } else if (startDate) {
      return format(startDate, 'dd.MM.yyyy', { locale: ru });
    } else {
      return 'Выберите дату';
    }
  };

  // Получаем все дни текущего месяца
  const days = generateDays();

  return (
    <div className={styles.calendarContainer}>
      {/* Поле для отображения выбранных дат и открытия календаря */}
      <div 
        className={styles.dateDisplay} 
        onClick={toggleCalendar}
      >
        <span className={styles.dateRangeText}>{formatDateDisplay()}</span>
        <FaCalendarAlt className={styles.calendarIcon} />
      </div>

      {/* Используем компонент модального окна, который будет монтироваться через портал */}
      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={handleClose}
        currentMonth={currentMonth}
        changeMonth={changeMonth}
        days={days}
        weekDays={weekDays}
        tempStartDate={tempStartDate}
        tempEndDate={tempEndDate}
        handleDateClick={handleDateClick}
        participants={participants}
        minParticipants={1}
        maxParticipants={10}
        countAnimation={countAnimation}
        handleParticipantChange={handleParticipantChange}
        handleReset={handleReset}
        handleApply={handleApply}
        onParticipantChange={onParticipantChange}
      />
    </div>
  );
};

export default CalendarInterface; 