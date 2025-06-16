// @ts-nocheck 
// TODO: fix typescript errors
import { Suspense } from 'react';
import BlogCard from '../components/blog/BlogCard';
import BlogCategorySidebar from '../components/blog/BlogCategorySidebar';
import BlogSearchWidget from '../components/blog/BlogSearchWidget';
import BlogPost, { IBlogPost } from '../models/BlogPost'; // Прямой импорт модели
import MainLayout from '../components/layout/MainLayout';
import dbConnect from '@/lib/mongodb'; // Импорт функции подключения
import Link from 'next/link'; // Для пагинации

// Моковые данные для блога
const MOCK_POSTS: IBlogPost[] = [
  {
    _id: '1',
    title: 'Лучшие пляжи Пхукета для отдыха с детьми',
    slug: 'best-beaches-for-families',
    description: 'Обзор самых безопасных и комфортных пляжей Пхукета для семейного отдыха с детьми.',
    content: 'Полное содержание статьи...',
    featuredImage: '/images/blog/beaches.jpg',
    categories: ['Пляжи', 'Семейный отдых'],
    tags: ['пляжи', 'дети', 'отдых', 'семья'],
    author: {
      name: 'Елена Смирнова',
      avatar: '/images/avatars/elena.jpg'
    },
    publishDate: new Date('2023-06-15'),
    status: 'published',
    viewCount: 1250,
    commentCount: 23
  },
  {
    _id: '2',
    title: 'Топ-10 ресторанов тайской кухни на Пхукете',
    slug: 'top-thai-restaurants',
    description: 'Гид по лучшим ресторанам аутентичной тайской кухни на острове Пхукет.',
    content: 'Полное содержание статьи...',
    featuredImage: '/images/blog/thai-food.jpg',
    categories: ['Еда', 'Рестораны'],
    tags: ['еда', 'рестораны', 'тайская кухня'],
    author: {
      name: 'Алексей Петров',
      avatar: '/images/avatars/alexey.jpg'
    },
    publishDate: new Date('2023-07-22'),
    status: 'published',
    viewCount: 980,
    commentCount: 15
  },
  {
    _id: '3',
    title: 'Как арендовать скутер на Пхукете и не попасть в неприятности',
    slug: 'scooter-rental-guide',
    description: 'Советы по безопасной аренде и использованию скутера на Пхукете.',
    content: 'Полное содержание статьи...',
    featuredImage: '/images/blog/scooter.jpg',
    categories: ['Транспорт', 'Советы'],
    tags: ['транспорт', 'скутер', 'аренда', 'безопасность'],
    author: {
      name: 'Иван Сидоров',
      avatar: '/images/avatars/ivan.jpg'
    },
    publishDate: new Date('2023-08-05'),
    status: 'published',
    viewCount: 1560,
    commentCount: 42
  }
];

// Моковые категории
const MOCK_CATEGORIES = [
  { name: 'Пляжи', slug: 'beaches', count: 8 },
  { name: 'Еда', slug: 'food', count: 12 },
  { name: 'Транспорт', slug: 'transport', count: 5 },
  { name: 'Советы', slug: 'tips', count: 15 },
  { name: 'Семейный отдых', slug: 'family', count: 7 },
  { name: 'Рестораны', slug: 'restaurants', count: 10 }
];

async function getBlogPosts(searchParams: { [key: string]: string | string[] | undefined }) {
  await dbConnect(); // Устанавливаем соединение с БД

  const category = searchParams.category as string;
  const search = searchParams.search as string;
  const sort = (searchParams.sort as string) || 'newest';
  const page = Number(searchParams.page) || 1;
  const limit = 9;
  const skip = (page - 1) * limit;

  const query: any = { status: 'published' }; // Базовый запрос для опубликованных постов

  if (category) {
    query.categories = category; // Mongoose может искать по одному элементу в массиве
  }

  if (search) {
    query.$text = { $search: search }; // Для текстового поиска (требуется текстовый индекс в схеме)
    // Альтернативно, если нет текстового индекса или нужна более гибкая логика:
    // query.$or = [
    //   { title: { $regex: search, $options: 'i' } },
    //   { description: { $regex: search, $options: 'i' } },
    //   // { content: { $regex: search, $options: 'i' } } // Поиск по контенту может быть медленным
    // ];
  }

  const sortOptions: any = {
    newest: { publishDate: -1 },
    popular: { viewCount: -1 },
    comments: { commentCount: -1 },
  };

  try {
    const posts = await BlogPost
      .find(query)
      .sort(sortOptions[sort])
      .skip(skip)
      .limit(limit)
      .lean(); // .lean() для получения простых JS объектов

    const totalPosts = await BlogPost.countDocuments(query);
    
    // Преобразование дат, если это необходимо (lean() может не делать это автоматически для всех случаев)
    const processedPosts = posts.map(post => ({
      ...post,
      _id: post._id.toString(), // Важно для ключей React
      publishDate: post.publishDate instanceof Date ? post.publishDate : new Date(post.publishDate),
      // другие преобразования, если нужны
    }));

    return {
      posts: processedPosts,
      total: totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return { posts: [], total: 0, totalPages: 1, currentPage: 1 }; // Возвращаем пустые данные в случае ошибки
  }
}

async function getCategories() {
  // Здесь также можно будет загружать категории из БД, если модель категорий будет создана
  // await dbConnect();
  // const categories = await CategoryModel.find()... (пример)
  return MOCK_CATEGORIES;
}

export default async function BlogPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const [{ posts, total, totalPages, currentPage }, categories] = await Promise.all([
    getBlogPosts(searchParams),
    getCategories()
  ]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="mb-8">
              {/* Suspense нужен, если BlogSearchWidget или его дочерние компоненты используют асинхронные операции или use } 
              {/* <Suspense fallback={<div>Загрузка поиска...</div>}> */}
                <BlogSearchWidget />
              {/* </Suspense> */}
            </div>

            {posts && posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post: IBlogPost) => (
                  <BlogCard key={post._id.toString()} post={post} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-10">Статьи не найдены. Попробуйте изменить критерии поиска.</p>
            )}

            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center gap-2">
                  {currentPage > 1 && (
                    <Link 
                      href={`/blog?page=${currentPage - 1}${
                        searchParams.category ? `&category=${searchParams.category}` : ''
                      }${searchParams.search ? `&search=${searchParams.search}` : ''}${
                        searchParams.sort ? `&sort=${searchParams.sort}` : ''
                      }`}
                      className="px-4 py-2 rounded-md bg-white text-gray-700 hover:bg-gray-100 transition-colors shadow-sm"
                    >
                      Назад
                    </Link>
                  )}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <Link
                      key={pageNumber}
                      href={`/blog?page=${pageNumber}${
                        searchParams.category ? `&category=${searchParams.category}` : ''
                      }${searchParams.search ? `&search=${searchParams.search}` : ''}${
                        searchParams.sort ? `&sort=${searchParams.sort}` : ''
                      }`}
                      className={`px-4 py-2 rounded-md transition-colors shadow-sm ${
                        currentPage === pageNumber
                          ? 'bg-[#1e3c3c] text-white ring-2 ring-[#e5916e]'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {pageNumber}
                    </Link>
                  ))}
                  {currentPage < totalPages && (
                     <Link 
                      href={`/blog?page=${currentPage + 1}${
                        searchParams.category ? `&category=${searchParams.category}` : ''
                      }${searchParams.search ? `&search=${searchParams.search}` : ''}${
                        searchParams.sort ? `&sort=${searchParams.sort}` : ''
                      }`}
                      className="px-4 py-2 rounded-md bg-white text-gray-700 hover:bg-gray-100 transition-colors shadow-sm"
                    >
                      Вперед
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {/* <Suspense fallback={<div>Загрузка категорий...</div>}> */}
              <BlogCategorySidebar categories={categories} />
            {/* </Suspense> */}
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 