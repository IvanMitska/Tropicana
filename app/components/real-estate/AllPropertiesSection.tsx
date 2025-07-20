'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MapPin, 
  Home,
  Bed,
  Bath,
  Square,
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
  Check,
  Wifi,
  Car,
  Waves
} from 'lucide-react';

interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  priceUnit: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageSrc: string;
  type: string;
  isPopular?: boolean;
  rating: number;
  category: string;
  amenities: string[];
}

interface AllPropertiesSectionProps {
  hasAnimated: boolean;
}

const AllPropertiesSection: React.FC<AllPropertiesSectionProps> = ({ hasAnimated }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFilterClosing, setIsFilterClosing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedBedrooms, setSelectedBedrooms] = useState<string>('');
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const sectionInView = inView;

  // Все объекты недвижимости
  const allProperties: Property[] = [
    {
      id: 1,
      title: 'Вилла с видом на море',
      description: 'Роскошная вилла с панорамным видом на Андаманское море, частный бассейн и сад.',
      price: 15000,
      priceUnit: '฿/сутки',
      location: 'Камала, Пхукет',
      bedrooms: 3,
      bathrooms: 2,
      area: 250,
      imageSrc: '/images/placeholder-property.jpg',
      type: 'Вилла',
      category: 'villa',
      isPopular: true,
      rating: 4.9,
      amenities: ['Бассейн', 'Wi-Fi', 'Парковка', 'Кондиционер']
    },
    {
      id: 2,
      title: 'Современная квартира в центре',
      description: 'Стильная квартира с одной спальней в самом сердце Патонга, рядом с пляжем.',
      price: 3500,
      priceUnit: '฿/сутки',
      location: 'Патонг, Пхукет',
      bedrooms: 1,
      bathrooms: 1,
      area: 65,
      imageSrc: '/images/placeholder-property.jpg',
      type: 'Квартира',
      category: 'apartment',
      isPopular: true,
      rating: 4.8,
      amenities: ['Wi-Fi', 'Кондиционер', 'Лифт', 'Охрана']
    },
    {
      id: 3,
      title: 'Таунхаус у пляжа',
      description: 'Уютный таунхаус в 5 минутах ходьбы от пляжа Карон, идеально для семьи.',
      price: 5500,
      priceUnit: '฿/сутки',
      location: 'Карон, Пхукет',
      bedrooms: 2,
      bathrooms: 2,
      area: 120,
      imageSrc: '/images/placeholder-property.jpg',
      type: 'Таунхаус',
      category: 'townhouse',
      rating: 4.7,
      amenities: ['Wi-Fi', 'Парковка', 'Кондиционер', 'Терраса']
    },
    {
      id: 4,
      title: 'Пентхаус с видом на город',
      description: 'Роскошный пентхаус на верхнем этаже с потрясающим видом на город и море.',
      price: 12000,
      priceUnit: '฿/сутки',
      location: 'Пхукет Таун',
      bedrooms: 3,
      bathrooms: 3,
      area: 200,
      imageSrc: '/images/placeholder-property.jpg',
      type: 'Пентхаус',
      category: 'penthouse',
      rating: 4.9,
      amenities: ['Бассейн', 'Wi-Fi', 'Парковка', 'Тренажерный зал']
    },
    {
      id: 5,
      title: 'Бунгало в тропическом саду',
      description: 'Традиционное тайское бунгало окруженное тропическим садом, тихое место.',
      price: 2500,
      priceUnit: '฿/сутки',
      location: 'Раваи, Пхукет',
      bedrooms: 1,
      bathrooms: 1,
      area: 50,
      imageSrc: '/images/placeholder-property.jpg',
      type: 'Бунгало',
      category: 'bungalow',
      isPopular: true,
      rating: 4.6,
      amenities: ['Wi-Fi', 'Кондиционер', 'Сад', 'Веранда']
    },
    {
      id: 6,
      title: 'Студия с видом на море',
      description: 'Компактная студия с балконом и частичным видом на море, современный дизайн.',
      price: 2000,
      priceUnit: '฿/сутки',
      location: 'Ката, Пхукет',
      bedrooms: 0,
      bathrooms: 1,
      area: 35,
      imageSrc: '/images/placeholder-property.jpg',
      type: 'Студия',
      category: 'studio',
      rating: 4.5,
      amenities: ['Wi-Fi', 'Кондиционер', 'Балкон', 'Кухня']
    },
    {
      id: 7,
      title: 'Дом с частным пляжем',
      description: 'Эксклюзивный дом с прямым выходом на частный пляж, полная приватность.',
      price: 25000,
      priceUnit: '฿/сутки',
      location: 'Май Као, Пхукет',
      bedrooms: 4,
      bathrooms: 4,
      area: 400,
      imageSrc: '/images/placeholder-property.jpg',
      type: 'Дом',
      category: 'house',
      rating: 5.0,
      amenities: ['Частный пляж', 'Бассейн', 'Wi-Fi', 'Персонал']
    },
    {
      id: 8,
      title: 'Апартаменты в кондоминиуме',
      description: 'Современные апартаменты в охраняемом комплексе с общим бассейном.',
      price: 4000,
      priceUnit: '฿/сутки',
      location: 'Сурин, Пхукет',
      bedrooms: 2,
      bathrooms: 2,
      area: 85,
      imageSrc: '/images/placeholder-property.jpg',
      type: 'Апартаменты',
      category: 'apartment',
      rating: 4.7,
      amenities: ['Бассейн', 'Wi-Fi', 'Парковка', 'Фитнес']
    }
  ];

  const categories = [
    { id: 'all', name: 'Вся недвижимость', icon: Grid3X3 },
    { id: 'villa', name: 'Виллы', icon: Home },
    { id: 'apartment', name: 'Квартиры', icon: Home },
    { id: 'townhouse', name: 'Таунхаусы', icon: Home },
    { id: 'penthouse', name: 'Пентхаусы', icon: Home },
    { id: 'studio', name: 'Студии', icon: Home },
    { id: 'house', name: 'Дома', icon: Home },
    { id: 'bungalow', name: 'Бунгало', icon: Home }
  ];

  const locations = [
    'Все районы',
    'Патонг',
    'Карон',
    'Ката',
    'Камала',
    'Сурин',
    'Раваи',
    'Пхукет Таун',
    'Май Као'
  ];

  const bedroomOptions = [
    'Любое количество',
    'Студия',
    '1 спальня',
    '2 спальни',
    '3 спальни',
    '4+ спальни'
  ];

  // Фильтрация объектов
  useEffect(() => {
    let filtered = allProperties;

    // Фильтр по категории
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(property => property.category === selectedCategory);
    }

    // Поиск по названию
    if (searchQuery.trim()) {
      filtered = filtered.filter(property => 
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Фильтр по цене
    filtered = filtered.filter(property => 
      property.price >= priceRange[0] && property.price <= priceRange[1]
    );

    // Фильтр по локации
    if (selectedLocation && selectedLocation !== 'Все районы') {
      filtered = filtered.filter(property => 
        property.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    // Фильтр по количеству спален
    if (selectedBedrooms && selectedBedrooms !== 'Любое количество') {
      if (selectedBedrooms === 'Студия') {
        filtered = filtered.filter(property => property.bedrooms === 0);
      } else if (selectedBedrooms === '4+ спальни') {
        filtered = filtered.filter(property => property.bedrooms >= 4);
      } else {
        const bedroomCount = parseInt(selectedBedrooms);
        filtered = filtered.filter(property => property.bedrooms === bedroomCount);
      }
    }

    setFilteredProperties(filtered);
  }, [selectedCategory, searchQuery, priceRange, selectedLocation, selectedBedrooms]);

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
          Поиск недвижимости
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Название или описание..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Категории */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Тип недвижимости
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

      {/* Район */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Район
        </label>
        <CustomDropdown
          options={locations}
          value={selectedLocation}
          onChange={setSelectedLocation}
          placeholder="Все районы"
        />
      </div>

      {/* Количество спален */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Спальни
        </label>
        <CustomDropdown
          options={bedroomOptions}
          value={selectedBedrooms}
          onChange={setSelectedBedrooms}
          placeholder="Любое количество"
        />
      </div>

      {/* Цена */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Цена за сутки (฿)
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
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 50000])}
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
          setPriceRange([0, 50000]);
          setSelectedLocation('');
          setSelectedBedrooms('');
        }}
        className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
      >
        Сбросить фильтры
      </button>
    </div>
  );

  const PropertyCard = ({ property, index }: { property: Property; index: number }) => (
    <div className="property-card bg-white rounded-xl border border-gray-200 overflow-hidden group hover:border-primary/30">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={property.imageSrc}
          alt={property.title}
          fill
          className="property-image object-cover"
        />
        <div className="absolute top-3 left-3 bg-primary/90 text-white px-2 py-1 rounded-lg text-xs font-medium">
          {property.type}
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium">{property.rating}</span>
        </div>
        {property.isPopular && (
          <div className="absolute bottom-3 left-3 bg-secondary text-white px-2 py-1 rounded-lg text-xs font-medium">
            Популярный выбор
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{property.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{property.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="line-clamp-1">{property.location}</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4 text-primary" />
              <span>{property.bedrooms === 0 ? 'Студия' : `${property.bedrooms} спал.`}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4 text-primary" />
              <span>{property.bathrooms} ванн.</span>
            </div>
            <div className="flex items-center gap-1">
              <Square className="w-4 h-4 text-primary" />
              <span>{property.area} м²</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {property.amenities.slice(0, 3).map((amenity, i) => (
              <span key={i} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                +{property.amenities.length - 3}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-primary">{property.price.toLocaleString()}</span>
            <span className="text-sm text-gray-600">{property.priceUnit}</span>
          </div>
          <Link
            href={`/real-estate/${property.id}`}
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
    <section id="all-properties" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div ref={ref} className={`transition-all duration-700 ${sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Заголовок */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Вся <span className="text-primary">недвижимость</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Выберите идеальное жилье для вашего отдыха на Пхукете из нашего полного каталога
            </p>
          </div>

          {/* Кнопка мобильного фильтра */}
          <div className="md:hidden mb-6">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="w-full bg-primary text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
            >
              <SlidersHorizontal size={20} />
              <span>Фильтры ({filteredProperties.length})</span>
            </button>
          </div>

          {/* Основной контент */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Боковая панель фильтров (десктоп) */}
            <div className="hidden md:block">
              <FilterSidebar />
            </div>

            {/* Список недвижимости */}
            <div className="md:col-span-3">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-gray-600">
                  Найдено объектов: <span className="font-medium">{filteredProperties.length}</span>
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((property, index) => (
                  <PropertyCard key={property.id} property={property} index={index} />
                ))}
              </div>

              {filteredProperties.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search size={48} className="mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Объекты не найдены
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
        .property-card {
          transform: translateY(0) scale(1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, box-shadow;
        }
        
        .property-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .property-card .property-image {
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .property-card:hover .property-image {
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

export default AllPropertiesSection;