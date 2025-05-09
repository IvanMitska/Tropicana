'use client';

import { Feature } from '@/app/models/Property';
import { Wifi, AirVent, Tv, Snowflake } from 'lucide-react';

// Иконки для удобств
const featureIcons: Record<string, React.ReactNode> = {
  wifi: <Wifi className="h-5 w-5" />,
  ac: <AirVent className="h-5 w-5" />,
  tv: <Tv className="h-5 w-5" />,
  dishwasher: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M4 7H20" stroke="currentColor" strokeWidth="2" />
      <path d="M4 17H20" stroke="currentColor" strokeWidth="2" />
      <path d="M8 11H16" stroke="currentColor" strokeWidth="2" />
      <path d="M8 14H16" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  'washing-machine': (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="7" cy="7" r="1" fill="currentColor" />
      <circle cx="11" cy="7" r="1" fill="currentColor" />
    </svg>
  ),
  balcony: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 8h16v12H4z" stroke="currentColor" strokeWidth="2" />
      <path d="M2 8h20" stroke="currentColor" strokeWidth="2" />
      <path d="M7 8V4h10v4" stroke="currentColor" strokeWidth="2" />
      <path d="M7 12h10M7 16h10" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  elevator: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M10 8l-3 3h10l-3-3" stroke="currentColor" strokeWidth="2" />
      <path d="M10 16l-3-3h10l-3 3" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  security: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 12l-3 3 3 3 3-3-3-3z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  ),
};

// Получение иконки для удобства
function getFeatureIcon(icon: string): React.ReactNode {
  return featureIcons[icon] || <Snowflake className="h-5 w-5" />;
}

// Группировка удобств по категориям
function groupFeaturesByCategory(features: Feature[]): Record<string, Feature[]> {
  return features.reduce((acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = [];
    }
    acc[feature.category].push(feature);
    return acc;
  }, {} as Record<string, Feature[]>);
}

// Названия категорий
const categoryNames: Record<string, string> = {
  connectivity: 'Связь и интернет',
  climate: 'Климат и комфорт',
  appliances: 'Бытовая техника',
  entertainment: 'Развлечения',
  outdoor: 'На улице',
  building: 'Здание',
  security: 'Безопасность',
};

interface PropertyTabsProps {
  description: string;
  features: Feature[];
  rules: string[];
  cancellationPolicy: string;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

export default function PropertyTabs({
  description,
  features,
  rules,
  cancellationPolicy,
  selectedTab,
  setSelectedTab,
}: PropertyTabsProps) {
  const groupedFeatures = groupFeaturesByCategory(features);

  return (
    <div>
      {/* Табы */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setSelectedTab('description')}
            className={`py-4 text-sm font-medium border-b-2 ${
              selectedTab === 'description'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Описание
          </button>
          <button
            onClick={() => setSelectedTab('features')}
            className={`py-4 text-sm font-medium border-b-2 ${
              selectedTab === 'features'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Удобства
          </button>
          <button
            onClick={() => setSelectedTab('rules')}
            className={`py-4 text-sm font-medium border-b-2 ${
              selectedTab === 'rules'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Правила
          </button>
          <button
            onClick={() => setSelectedTab('cancellation')}
            className={`py-4 text-sm font-medium border-b-2 ${
              selectedTab === 'cancellation'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Отмена
          </button>
        </nav>
      </div>

      {/* Контент табов */}
      <div className="py-6">
        {/* Описание */}
        {selectedTab === 'description' && (
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-line">{description}</p>
          </div>
        )}

        {/* Удобства */}
        {selectedTab === 'features' && (
          <div>
            {Object.entries(groupedFeatures).map(([category, categoryFeatures]) => (
              <div key={category} className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  {categoryNames[category] || category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categoryFeatures.map((feature) => (
                    <div key={feature.id} className="flex items-center">
                      <div className="text-gray-500 mr-3">
                        {getFeatureIcon(feature.icon)}
                      </div>
                      <span>{feature.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Правила */}
        {selectedTab === 'rules' && (
          <div>
            <ul className="space-y-3">
              {rules.map((rule, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 font-bold mr-2">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Политика отмены */}
        {selectedTab === 'cancellation' && (
          <div className="prose max-w-none">
            <p className="text-gray-700">{cancellationPolicy}</p>
          </div>
        )}
      </div>
    </div>
  );
} 