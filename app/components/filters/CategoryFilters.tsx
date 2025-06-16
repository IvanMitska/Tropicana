import React, { useRef, useEffect } from 'react';
import styles from './CategoryFilters.module.css'; // Import CSS module

interface Category {
  id: string;
  name: string;
  count: number;
}

interface CategoryFiltersProps {
  availableCategories: Category[];
  selectedCategories: string[]; // Array of selected category IDs
  onCategoryChange: (selectedIds: string[]) => void;
  // TODO: Add props for styling if needed (e.g., primaryColor, secondaryColor for consistency)
}

// TODO: Define these styles in CategoryFilters.module.css or using Tailwind utilities
// const classNames = {
//   container: 'category-filters__container', // Main container, allows horizontal scrolling
//   list: 'category-filters__list', // Inner list that will actually scroll
//   pill: 'category-filters__pill', // Individual category pill/tab
//   pillSelected: 'category-filters__pill--selected', // Style for selected pill (e.g., coral background, dark text)
//   pillName: 'category-filters__pill-name',
//   pillCount: 'category-filters__pill-count',
// };

const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  availableCategories,
  selectedCategories,
  onCategoryChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleCategoryClick = (categoryId: string) => {
    const newSelectedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    onCategoryChange(newSelectedCategories);
  };

  // Горизонтальная прокрутка с помощью колесика мыши
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };
    
    container.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // TODO: Style pills according to site's color scheme (coral for selected, maintain overall theme)
  // TODO: Ensure accessibility for scrollable content and interactive elements

  return (
    <div className={styles.container} ref={containerRef}>
      <ul className={styles.list}>
        {availableCategories.map(category => {
          const isSelected = selectedCategories.includes(category.id);
          return (
            <li 
              key={category.id}
              className={`${styles.pill} ${isSelected ? styles.pillSelected : ''}`}
              onClick={() => handleCategoryClick(category.id)}
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleCategoryClick(category.id)}
            >
              <span className={styles.pillName}>{category.name}</span>
              <span className={styles.pillCount}>{category.count}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryFilters; 