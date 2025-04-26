/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'images.unsplash.com'], // Добавьте здесь домены для изображений
  },
  env: {
    API_URL: process.env.API_URL || 'http://localhost:3001/api',
  },
}

module.exports = nextConfig 