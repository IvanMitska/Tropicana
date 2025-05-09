import { Suspense } from 'react';
import BlogCard from '../components/blog/BlogCard';
import BlogCategorySidebar from '../components/blog/BlogCategorySidebar';
import BlogSearchWidget from '../components/blog/BlogSearchWidget';
import { IBlogPost } from '../models/BlogPost';

async function getBlogPosts(searchParams: { [key: string]: string | string[] | undefined }) {
  const category = searchParams.category as string;
  const search = searchParams.search as string;
  const sort = searchParams.sort as string;
  const page = Number(searchParams.page) || 1;
  const limit = 9;

  const query: any = { status: 'published' };
  
  if (category) {
    query.categories = category;
  }
  
  if (search) {
    query.$text = { $search: search };
  }

  const sortOptions: { [key: string]: any } = {
    newest: { publishDate: -1 },
    popular: { viewCount: -1 },
    comments: { commentCount: -1 }
  };

  const posts = await mongoose.models.BlogPost
    .find(query)
    .sort(sortOptions[sort] || sortOptions.newest)
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  const total = await mongoose.models.BlogPost.countDocuments(query);

  return {
    posts,
    total,
    totalPages: Math.ceil(total / limit)
  };
}

async function getCategories() {
  const categories = await mongoose.models.BlogPost.aggregate([
    { $match: { status: 'published' } },
    { $unwind: '$categories' },
    {
      $group: {
        _id: '$categories',
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        name: '$_id',
        slug: '$_id',
        count: 1,
        _id: 0
      }
    }
  ]);

  return categories;
}

export default async function BlogPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const [{ posts, total, totalPages }, categories] = await Promise.all([
    getBlogPosts(searchParams),
    getCategories()
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="mb-8">
            <BlogSearchWidget />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: IBlogPost) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <a
                    key={page}
                    href={`/blog?page=${page}${
                      searchParams.category ? `&category=${searchParams.category}` : ''
                    }${searchParams.search ? `&search=${searchParams.search}` : ''}${
                      searchParams.sort ? `&sort=${searchParams.sort}` : ''
                    }`}
                    className={`px-4 py-2 rounded-md ${
                      Number(searchParams.page) === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <BlogCategorySidebar categories={categories} />
        </div>
      </div>
    </div>
  );
} 