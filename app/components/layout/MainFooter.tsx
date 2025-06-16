import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const MainFooter = () => {
  return (
    <footer className="bg-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Логотип и информация */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <div className="relative w-40 h-12">
                <Image 
                  src="/images/logo-white.png" 
                  alt="Пхукет" 
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              Аренда недвижимости, транспорта и экскурсии на Пхукете. Ваш комфортный отдых — наша забота.
            </p>
            <div className="flex space-x-3 mb-6">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-white transition-all transform hover:-translate-y-1"
              >
                <Facebook size={22} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-white transition-all transform hover:-translate-y-1"
              >
                <Instagram size={22} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-white transition-all transform hover:-translate-y-1"
              >
                <Twitter size={22} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-white transition-all transform hover:-translate-y-1"
              >
                <Youtube size={22} />
              </a>
            </div>
          </div>
          
          {/* Колонки с ссылками */}
          <div>
            <h3 className="text-lg font-medium mb-4">Сервисы</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/real-estate" className="text-gray-400 hover:text-white transition-colors">
                  Аренда жилья
                </Link>
              </li>
              <li>
                <Link href="/transport" className="text-gray-400 hover:text-white transition-colors">
                  Транспорт
                </Link>
              </li>
              <li>
                <Link href="/tours" className="text-gray-400 hover:text-white transition-colors">
                  Экскурсии
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Блог
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Информация</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  О нас
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Контакты</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">Таиланд, Пхукет</span>
              </li>
              <li className="flex items-center">
                <Phone size={22} className="mr-3 text-white flex-shrink-0" />
                <a href="tel:+66123456789" className="text-gray-400 hover:text-white transition-colors">
                  +66 12 345 67 89
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={22} className="mr-3 text-white flex-shrink-0" />
                <a href="mailto:info@phuketnaladoni.com" className="text-gray-400 hover:text-white transition-colors">
                  info@phuketnaladoni.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Нижняя часть футера */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between">
          <div className="text-gray-500 text-xs order-2 sm:order-1 text-center sm:text-left mt-4 sm:mt-0">
            © {new Date().getFullYear()} Пхукет. Все права защищены.
          </div>
          <div className="flex flex-col xs:flex-row gap-3 xs:gap-6 items-center order-1 sm:order-2 text-center xs:text-left">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-xs">
              Политика конфиденциальности
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-xs">
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter; 