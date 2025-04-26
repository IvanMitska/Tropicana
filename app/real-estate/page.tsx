import { Header } from '@/app/components/layout/Header';
import { Footer } from '@/app/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';

// Заглушка для демонстрации
const properties = [
  {
    id: 1,
    title: 'Современная квартира в центре',
    description: 'Уютная квартира с современным ремонтом в центре города',
    price: 5000,
    priceUnit: 'руб/сутки',
    location: 'Москва, Центральный район',
    bedrooms: 2,
    bathrooms: 1,
    area: 65,
    imageSrc: '/images/real-estate.jpg',
    type: 'apartment',
  },
  {
    id: 2,
    title: 'Загородный дом с бассейном',
    description: 'Просторный дом с бассейном и барбекю-зоной на природе',
    price: 15000,
    priceUnit: 'руб/сутки',
    location: 'Подмосковье, 20 км от МКАД',
    bedrooms: 4,
    bathrooms: 2,
    area: 150,
    imageSrc: '/images/real-estate.jpg',
    type: 'house',
  },
  {
    id: 3,
    title: 'Офисное помещение',
    description: 'Современный офис с отдельным входом и парковкой',
    price: 50000,
    priceUnit: 'руб/месяц',
    location: 'Москва, Бизнес-центр "Горизонт"',
    bedrooms: 0,
    bathrooms: 1,
    area: 80,
    imageSrc: '/images/real-estate.jpg',
    type: 'commercial',
  },
  {
    id: 4,
    title: 'Студия с видом на море',
    description: 'Стильная студия с панорамным видом на море',
    price: 3500,
    priceUnit: 'руб/сутки',
    location: 'Сочи, Адлерский район',
    bedrooms: 1,
    bathrooms: 1,
    area: 40,
    imageSrc: '/images/real-estate.jpg',
    type: 'apartment',
  },
];

export default function RealEstatePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <section className="py-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <div className="container-custom">
            <h1 className="text-4xl font-bold mb-4">Аренда недвижимости</h1>
            <p className="text-xl mb-8">
              Найдите идеальное место для проживания, работы или отдыха
            </p>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="location" className="block text-gray-700 mb-2">
                    Местоположение
                  </label>
                  <select
                    id="location"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Все города</option>
                    <option value="moscow">Москва</option>
                    <option value="spb">Санкт-Петербург</option>
                    <option value="sochi">Сочи</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="type" className="block text-gray-700 mb-2">
                    Тип недвижимости
                  </label>
                  <select
                    id="type"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Все типы</option>
                    <option value="apartment">Квартиры</option>
                    <option value="house">Дома</option>
                    <option value="commercial">Коммерческая</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="price" className="block text-gray-700 mb-2">
                    Цена до (руб)
                  </label>
                  <input
                    type="number"
                    id="price"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Макс. цена"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full btn-primary py-2 px-4"
                  >
                    Найти
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Доступные объекты</h2>
              <div>
                <label htmlFor="sort" className="text-gray-700 mr-2">
                  Сортировать:
                </label>
                <select
                  id="sort"
                  className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="price-asc">По цене (возр.)</option>
                  <option value="price-desc">По цене (убыв.)</option>
                  <option value="newest">Сначала новые</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={property.imageSrc}
                      alt={property.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">{property.title}</h3>
                      <div className="font-bold text-lg text-primary">
                        {property.price} <span className="text-sm">{property.priceUnit}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{property.description}</p>
                    <div className="text-gray-500 mb-4">{property.location}</div>
                    <div className="flex justify-between text-gray-600 mb-4">
                      <div>
                        <span className="font-medium">{property.bedrooms}</span> спален
                      </div>
                      <div>
                        <span className="font-medium">{property.bathrooms}</span> ванных
                      </div>
                      <div>
                        <span className="font-medium">{property.area}</span> м²
                      </div>
                    </div>
                    <Link 
                      href={`/real-estate/${property.id}`}
                      className="btn-primary inline-block w-full text-center"
                    >
                      Подробнее
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 