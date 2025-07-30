// Загружаем переменные окружения по умолчанию для Netlify (если файл существует)
try {
  if (process.env.NODE_ENV === 'production' || process.env.NETLIFY) {
    require('./netlify-env.js');
  }
} catch (error) {
  // Файл netlify-env.js не найден, продолжаем без него
  console.log('netlify-env.js not found, continuing without it');
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        port: '',
        pathname: '/**',
      }
    ],
    unoptimized: process.env.NODE_ENV === 'production', // Отключаем оптимизацию изображений для Netlify
  },
  env: {
    API_URL: process.env.API_URL || 'http://localhost:3001/api',
  },
  // Настройки для улучшения производительности сборки
  webpack: (config, { isServer }) => {
    // Оптимизация для серверной сборки
    if (isServer) {
      // Исключаем ненужные пакеты из серверной сборки
      config.externals = [...config.externals, 'canvas', 'jsdom'];
    }
    
    return config;
  },
  // Отключаем строгую проверку ESLint при сборке
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Отключаем проверку типов TypeScript при сборке
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig 