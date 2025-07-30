# 🚀 Инструкции по деплою Tropicana

## ✅ Статус сборки

- ✅ Проект успешно собран без ошибок
- ✅ Размер сборки: 375MB
- ✅ 34 статические страницы сгенерированы
- ⚠️ Есть предупреждения о Edge Runtime (не критично)

## 📋 Подготовка к деплою

### 1. Проверьте environment variables

Убедитесь, что у вас есть все необходимые переменные окружения:

```bash
# В файле .env.local или на хостинге
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://your-domain.com
DATABASE_URL=your-database-url
STRIPE_SECRET_KEY=your-stripe-key
# и другие...
```

### 2. Финальная сборка

```bash
npm run build
```

## 🌐 Деплой на различные платформы

### Vercel (Рекомендуется для Next.js)

1. Установите Vercel CLI:

```bash
npm i -g vercel
```

2. Деплой:

```bash
vercel --prod
```

3. Или через GitHub:
   - Подключите репозиторий к Vercel
   - Автоматический деплой при push

### Netlify

1. Установите Netlify CLI:

```bash
npm i -g netlify-cli
```

2. Деплой:

```bash
netlify deploy --prod --dir=.next
```

3. Или используйте существующие настройки:
   - Файл `netlify.toml` уже настроен
   - Build command: `npm run build`
   - Publish directory: `.next`

### Railway

1. Установите Railway CLI:

```bash
npm i -g @railway/cli
```

2. Деплой:

```bash
railway login
railway deploy
```

### DigitalOcean App Platform

1. Создайте приложение в DigitalOcean
2. Подключите GitHub репозиторий
3. Настройки:
   - Build command: `npm run build`
   - Run command: `npm start`
   - HTTP Port: 3000

### Heroku

1. Установите Heroku CLI
2. Деплой:

```bash
heroku create your-app-name
git push heroku main
```

3. Добавьте в `package.json`:

```json
{
  "scripts": {
    "heroku-postbuild": "npm run build"
  }
}
```

## 📁 Структура сборки

```
.next/
├── static/           # Статические ассеты
├── server/          # Серверные компоненты
├── cache/           # Кэш Next.js
└── standalone/      # Standalone сборка (если включена)
```

## 🔧 Оптимизация для продакшена

### 1. Сжатие изображений

Убедитесь, что все изображения оптимизированы:

```bash
# Установите sharp для лучшей оптимизации
npm install sharp
```

### 2. Настройка кэширования

В `next.config.js` уже настроено:

```javascript
images: {
  remotePatterns: [...],
  unoptimized: false
}
```

### 3. Bundle анализ

Проанализируйте размер бандла:

```bash
npm install --save-dev @next/bundle-analyzer
npm run analyze
```

## 🚨 Важные замечания

1. **API Routes**: Убедитесь, что все API роуты работают на продакшене
2. **Environment Variables**: Все переменные должны быть настроены на хостинге
3. **Database**: Проверьте подключение к базе данных
4. **Stripe**: Используйте продакшн ключи Stripe
5. **CORS**: Настройте CORS для API если нужно

## 🔍 Проверка после деплоя

- [ ] Главная страница загружается
- [ ] Мобильное меню работает корректно
- [ ] Все изображения отображаются
- [ ] API endpoints отвечают
- [ ] Формы отправляются
- [ ] Платежи работают (в тестовом режиме)

## 📞 Поддержка

Если возникли проблемы:

1. Проверьте логи хостинга
2. Убедитесь в правильности environment variables
3. Проверьте совместимость Node.js версии (рекомендуется 18+)

---

**Последнее обновление**: $(date)
**Статус**: ✅ Готов к деплою
