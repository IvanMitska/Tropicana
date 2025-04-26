'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Информация о сайте */}
          <div>
            <h3 className="text-xl font-bold mb-4">RentWeb</h3>
            <p className="text-gray-400 mb-4">
              Лучшая платформа для аренды недвижимости, транспорта и экскурсий
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Категории */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Категории</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/real-estate" className="text-gray-400 hover:text-white transition-colors">
                  Недвижимость
                </Link>
              </li>
              <li>
                <Link href="/transport" className="text-gray-400 hover:text-white transition-colors">
                  Транспорт
                </Link>
              </li>
              <li>
                <Link href="/excursions" className="text-gray-400 hover:text-white transition-colors">
                  Экскурсии
                </Link>
              </li>
            </ul>
          </div>

          {/* Информация */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Информация</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  О нас
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="text-gray-400 hover:text-white transition-colors">
                  Контакты
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Условия использования
                </Link>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Связаться с нами</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="text-gray-400 mr-2 h-5 w-5 mt-0.5" />
                <address className="text-gray-400 not-italic">
                  ул. Примерная, 123<br />
                  г. Москва, 123456
                </address>
              </div>
              <div className="flex items-center">
                <Mail className="text-gray-400 mr-2 h-5 w-5" />
                <a href="mailto:info@rentweb.ru" className="text-gray-400 hover:text-white transition-colors">
                  info@rentweb.ru
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="text-gray-400 mr-2 h-5 w-5" />
                <a href="tel:+74951234567" className="text-gray-400 hover:text-white transition-colors">
                  +7 (495) 123-45-67
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} RentWeb. Все права защищены.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Конфиденциальность
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Пользовательское соглашение
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-white text-sm transition-colors">
                Карта сайта
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}; 