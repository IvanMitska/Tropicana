import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const MainFooter = () => {
  return (
    <footer className="bg-dark text-secondary pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Логотип и о компании */}
          <div>
            <div className="mb-4">
              <Image 
                src="/images/logo-phuket-na-ladoni.png" 
                alt="Пхукет на ладони" 
                width={180} 
                height={60} 
                className="object-contain"
              />
            </div>
            <p className="mb-4 text-secondary-light">
              Ваш надежный партнер для комфортного отдыха на Пхукете. Аренда недвижимости, транспорта и экскурсии в одном месте.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-secondary hover:text-primary transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-secondary hover:text-primary transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-secondary hover:text-primary transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-secondary hover:text-primary transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Быстрые ссылки */}
          <div>
            <h3 className="font-semibold text-xl mb-4 text-secondary">Быстрые ссылки</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/real-estate" className="hover:text-primary text-secondary-light transition-colors">
                  Недвижимость
                </Link>
              </li>
              <li>
                <Link href="/transport" className="hover:text-primary text-secondary-light transition-colors">
                  Транспорт
                </Link>
              </li>
              <li>
                <Link href="/tours" className="hover:text-primary text-secondary-light transition-colors">
                  Экскурсии
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary text-secondary-light transition-colors">
                  Блог
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary text-secondary-light transition-colors">
                  О нас
                </Link>
              </li>
            </ul>
          </div>

          {/* Популярные направления */}
          <div>
            <h3 className="font-semibold text-xl mb-4 text-secondary">Популярные направления</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tours?city=patong" className="hover:text-primary text-secondary-light transition-colors">
                  Патонг
                </Link>
              </li>
              <li>
                <Link href="/tours?city=phi-phi" className="hover:text-primary text-secondary-light transition-colors">
                  Пхи-Пхи
                </Link>
              </li>
              <li>
                <Link href="/tours?city=krabi" className="hover:text-primary text-secondary-light transition-colors">
                  Краби
                </Link>
              </li>
              <li>
                <Link href="/tours?city=james-bond" className="hover:text-primary text-secondary-light transition-colors">
                  Остров Джеймса Бонда
                </Link>
              </li>
              <li>
                <Link href="/tours?city=big-buddha" className="hover:text-primary text-secondary-light transition-colors">
                  Биг Будда
                </Link>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="font-semibold text-xl mb-4 text-secondary">Контакты</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 text-primary mt-1" />
                <span className="text-secondary-light">Пхукет, Таиланд, Карон Бич, ул. Ароматная, 123</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-primary" />
                <a href="tel:+66123456789" className="text-secondary-light hover:text-primary transition-colors">
                  +66 12 345 67 89
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-primary" />
                <a href="mailto:info@phuketnaladoni.com" className="text-secondary-light hover:text-primary transition-colors">
                  info@phuketnaladoni.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Разделитель */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Нижняя часть футера */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-secondary-light mb-4 md:mb-0">
            © {new Date().getFullYear()} Пхукет на ладони. Все права защищены.
          </p>
          <div className="flex space-x-4">
            <Link href="/terms" className="text-secondary-light hover:text-primary transition-colors">
              Условия использования
            </Link>
            <Link href="/privacy" className="text-secondary-light hover:text-primary transition-colors">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter; 