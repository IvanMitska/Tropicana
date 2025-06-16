'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface Category {
  name: string;
  slug: string;
  count: number;
}

interface BlogCategorySidebarProps {
  categories: Category[];
}

export default function BlogCategorySidebar({ categories }: BlogCategorySidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Категории</h3>
      <ul className="space-y-2">
        <li>
          <Link
            href="/blog"
            className={`block px-3 py-2 rounded-md transition-colors ${
              !currentCategory
                ? 'bg-blue-50 text-blue-700'
                : 'hover:bg-gray-50'
            }`}
          >
            Все статьи
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category.slug}>
            <Link
              href={`/blog?category=${category.slug}`}
              className={`block px-3 py-2 rounded-md transition-colors ${
                currentCategory === category.slug
                  ? 'bg-blue-50 text-blue-700'
                  : 'hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center justify-between">
                <span>{category.name}</span>
                <span className="text-sm text-gray-500">({category.count})</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
} 