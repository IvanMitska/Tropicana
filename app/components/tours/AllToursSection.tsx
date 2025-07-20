'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  ArrowRight, 
  Heart, 
  Filter, 
  X,
  Search,
  Calendar,
  Wallet,
  Grid3X3,
  SlidersHorizontal,
  ChevronDown,
  Check
} from 'lucide-react';

interface Tour {
  id: number;
  title: string;
  description: string;
  price: number;
  priceUnit: string;
  location: string;
  duration: string;
  groupSize: string;
  imageSrc: string;
  type: string;
  isPopular?: boolean;
  rating: number;
  category: string;
}

interface AllToursSectionProps {
  hasAnimated: boolean;
}

const AllToursSection: React.FC<AllToursSectionProps> = ({ hasAnimated }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFilterClosing, setIsFilterClosing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const sectionInView = inView;

  // Все экскурсии
  const allTours: Tour[] = [
    {
      id: 1,
      title: 'Морская экскурсия на острова',
      description: 'Увлекательное путешествие на живописные острова с кристально чистой водой и белоснежными пляжами.',
      price: 3500,
      priceUnit: '฿/чел',
      location: 'Пхукет, отправление из Чалонг Пирс',
      duration: '8 часов',
      groupSize: '10-15 человек',
      imageSrc: '/images/placeholder-tour.jpg',
      type: 'Морские экскурсии',
      category: 'sea',
      isPopular: true,
      rating: 4.9,
    },
    {
      id: 2,
      title: 'Обзорная экскурсия по острову',
      description: 'Посещение знаковых культурных и религиозных достопримечательностей острова с панорамными видами.',
      price: 2200,
      priceUnit: '฿/чел',
      location: 'Пхукет, самые интересные локации',
      duration: '6 часов',
      groupSize: '6-10 человек',
      imageSrc: '/images/placeholder-tour.jpg',
      type: 'Культурные места',
      category: 'culture',
      isPopular: true,
      rating: 4.8,
    },
    {
      id: 3,
      title: 'Природная экскурсия в джунгли',
      description: 'Экскурсия в национальный парк с посещением живописных водопадов и прогулкой по джунглям.',
      price: 2800,
      priceUnit: '฿/чел',
      location: 'Национальный парк Као Пра Тео',
      duration: '7 часов',
      groupSize: '8-12 человек',
      imageSrc: '/images/placeholder-tour.jpg',
      type: 'Природные красоты',
      category: 'nature',
      rating: 4.7,
    },
    {
      id: 4,
      title: 'Активная экскурсия с приключениями',
      description: 'Зип-лайн, рафтинг и треккинг в одном туре для любителей активного отдыха.',
      price: 3200,
      priceUnit: '฿/чел',
      location: 'Провинция Пханг-Нга',
      duration: '9 часов',
      groupSize: '6-12 человек',
      imageSrc: '/images/placeholder-tour.jpg',
      type: 'Активный отдых',
      category: 'active',
      rating: 4.9,
    },
    {
      id: 5,
      title: 'Экскурсия на удаленные острова',
      description: 'Посещение малоизвестных островов с девственной природой и уединенными пляжами.',
      price: 4500,
      priceUnit: '฿/чел',
      location: 'Пхукет, отправление из Тап-Кео',
      duration: '10 часов',
      groupSize: '10-15 человек',
      imageSrc: '/images/placeholder-tour.jpg',
      type: 'Морские экскурсии',
      category: 'sea',
      isPopular: true,
      rating: 4.8,
    },
    {
      id: 6,
      title: 'Кулинарный мастер-класс',
      description: 'Изучение секретов тайской кухни с посещением местного рынка и приготовлением аутентичных блюд.',
      price: 1800,
      priceUnit: '฿/чел',
      location: 'Пхукет, Патонг',
      duration: '4 часа',
      groupSize: '4-8 человек',
      imageSrc: '/images/placeholder-tour.jpg',
      type: 'Гастрономические туры',
      category: 'gastro',
      rating: 4.9,
    },
    {
      id: 7,
      title: 'Храмовый комплекс Ват Чалонг',
      description: 'Посещение главного буддийского храма Пхукета с гидом и погружение в местную культуру.',
      price: 1200,
      priceUnit: '฿/чел',
      location: 'Пхукет, Чалонг',
      duration: '3 часа',
      groupSize: '6-15 человек',
      imageSrc: '/images/placeholder-tour.jpg',
      type: 'Культурные места',
      category: 'culture',
      rating: 4.6,
    },
    {
      id: 8,
      title: 'Рыбалка на закате',
      description: 'Морская рыбалка с профессиональными гидами и ужином из свежевыловленной рыбы.',
      price: 2900,
      priceUnit: '฿/чел',
      location: 'Пхукет, Чалонг Пирс',
      duration: '6 часов',
      groupSize: '8-12 человек',
      imageSrc: '/images/placeholder-tour.jpg',
      type: 'Морские экскурсии',
      category: 'sea',
      rating: 4.7,
    }
  ];

  const categories = [
    { id: 'all', name: 'Все экскурсии', icon: Grid3X3 },
    { id: 'sea', name: 'Морские', icon: MapPin },
    { id: 'culture', name: 'Культурные', icon: Star },
    { id: 'nature', name: 'Природные', icon: Heart },
    { id: 'active', name: 'Активные', icon: ArrowRight },
    { id: 'gastro', name: 'Гастрономические', icon: Users }
  ];

  const locations = [
    'Все локации',
    'Пхукет',
    'Чалонг',
    'Патонг',
    'Пханг-Нга',
    'Као Пра Тео'
  ];

  // Фильтрация туров
  useEffect(() => {
    let filtered = allTours;

    // Фильтр по категории
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tour => tour.category === selectedCategory);
    }

    // Поиск по названию
    if (searchQuery.trim()) {
      filtered = filtered.filter(tour => 
        tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Фильтр по цене
    filtered = filtered.filter(tour => 
      tour.price >= priceRange[0] && tour.price <= priceRange[1]
    );

    // Фильтр по локации
    if (selectedLocation && selectedLocation !== 'Все локации') {
      filtered = filtered.filter(tour => 
        tour.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    setFilteredTours(filtered);
  }, [selectedCategory, searchQuery, priceRange, selectedLocation]);

  const handleCloseFilter = () => {
    setIsFilterClosing(true);
    setTimeout(() => {
      setIsFilterOpen(false);
      setIsFilterClosing(false);
    }, 300);
  };

  const CustomDropdown = ({ 
    options, 
    value, 
    onChange, 
    placeholder = "Выберите опцию" 
  }: {
    options: string[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest('.custom-dropdown')) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('click', handleClickOutside);
      }

      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, [isOpen]);
    
    return (
      <div className="relative custom-dropdown">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 flex items-center justify-between text-left transition-colors hover:border-primary/30"
        >
          <span className={value ? 'text-gray-700' : 'text-gray-500'}>
            {value || placeholder}
          </span>
          <ChevronDown 
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        
        {isOpen && (
          <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto animate-dropdown-appear">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center justify-between transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  value === option ? 'bg-primary/5 text-primary' : 'text-gray-700'
                }`}
              >
                <span>{option}</span>
                {value === option && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const FilterSidebar = () => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 h-fit sticky top-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Фильтры</h3>
        <button
          onClick={handleCloseFilter}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
        >
          <X size={20} />
        </button>
      </div>

      {/* Поиск */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Поиск экскурсий
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Название экскурсии..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Категории */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Категории
        </label>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <category.icon size={18} />
              <span className="text-sm">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Локация */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Локация
        </label>
        <CustomDropdown
          options={locations}
          value={selectedLocation}
          onChange={setSelectedLocation}
          placeholder="Все локации"
        />
      </div>

      {/* Цена */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Цена (฿)
        </label>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
            placeholder="От"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 10000])}
            placeholder="До"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Сброс фильтров */}
      <button
        onClick={() => {
          setSelectedCategory('all');
          setSearchQuery('');
          setPriceRange([0, 10000]);
          setSelectedLocation('');
        }}
        className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
      >
        Сбросить фильтры
      </button>
    </div>
  );

  const TourCard = ({ tour, index }: { tour: Tour; index: number }) => (
    <div className="tour-card bg-white rounded-xl border border-gray-200 overflow-hidden group hover:border-primary/30">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={tour.imageSrc}
          alt={tour.title}
          fill
          className="tour-image object-cover"
        />
        <div className="absolute top-3 left-3 bg-primary/90 text-white px-2 py-1 rounded-lg text-xs font-medium">
          {tour.type}
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium">{tour.rating}</span>
        </div>
        {tour.isPopular && (
          <div className="absolute bottom-3 left-3 bg-secondary text-white px-2 py-1 rounded-lg text-xs font-medium">
            Популярный выбор
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{tour.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{tour.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="line-clamp-1">{tour.location}</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-primary" />
              <span>{tour.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-primary" />
              <span>{tour.groupSize}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-primary">{tour.price}</span>
            <span className="text-sm text-gray-600">{tour.priceUnit}</span>
          </div>
          <Link
            href={`/tours/${tour.id}`}
            className="bg-primary text-white px-4 py-2 rounded-lg transform transition-all duration-300 ease-out hover:bg-primary/90 hover:scale-105 flex items-center gap-2 group"
          >
            <span>Подробнее</span>
            <ArrowRight className="w-4 h-4 transform transition-transform duration-300 ease-out group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <section id="all-tours" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div ref={ref} className={`transition-all duration-700 ${sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Заголовок */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Все <span className="text-primary">экскурсии</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Выберите идеальную экскурсию из нашего полного каталога приключений на Пхукете
            </p>
          </div>

          {/* Кнопка мобильного фильтра */}
          <div className="md:hidden mb-6">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="w-full bg-primary text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
            >
              <SlidersHorizontal size={20} />
              <span>Фильтры ({filteredTours.length})</span>
            </button>
          </div>

          {/* Основной контент */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Боковая панель фильтров (десктоп) */}
            <div className="hidden md:block">
              <FilterSidebar />
            </div>

            {/* Список экскурсий */}
            <div className="md:col-span-3">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-gray-600">
                  Найдено экскурсий: <span className="font-medium">{filteredTours.length}</span>
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTours.map((tour, index) => (
                  <TourCard key={tour.id} tour={tour} index={index} />
                ))}
              </div>

              {filteredTours.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search size={48} className="mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Экскурсии не найдены
                  </h3>
                  <p className="text-gray-600">
                    Попробуйте изменить параметры поиска или сбросить фильтры
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Мобильный фильтр */}
      {isFilterOpen && (
        <div 
          className="fixed inset-0 z-50 md:hidden"
          onClick={handleCloseFilter}
        >
          {/* Анимированное затемнение фона */}
          <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ease-out ${
            isFilterClosing ? 'animate-fade-out' : 'animate-fade-in'
          }`} />
          
          {/* Анимированная панель фильтра */}
          <div 
            className={`absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto transform transition-transform duration-300 ease-out ${
              isFilterClosing ? 'animate-slide-out-right' : 'animate-slide-in-right'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <FilterSidebar />
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .tour-card {
          transform: translateY(0) scale(1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, box-shadow;
        }
        
        .tour-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .tour-card .tour-image {
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .tour-card:hover .tour-image {
          transform: scale(1.08);
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes fade-out {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        @keyframes slide-out-right {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(100%);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-fade-out {
          animation: fade-out 0.3s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-slide-out-right {
          animation: slide-out-right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @keyframes dropdown-appear {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-dropdown-appear {
          animation: dropdown-appear 0.2s ease-out;
        }
      `}</style>
    </section>
  );
};

export default AllToursSection;