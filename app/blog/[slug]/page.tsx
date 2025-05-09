import Image from 'next/image';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { IBlogPost } from '@/app/models/BlogPost';
import BlogCard from '@/app/components/blog/BlogCard';

async function getPost(slug: string) {
  const post = await mongoose.models.BlogPost.findOne({ slug, status: 'published' }).lean();
  
  if (!post) {
    notFound();
  }

  // Увеличиваем счетчик просмотров
  await mongoose.models.BlogPost.updateOne(
    { _id: post._id },
    { $inc: { viewCount: 1 } }
  );

  return post;
}

async function getRelatedPosts(post: IBlogPost) {
  const relatedPosts = await mongoose.models.BlogPost
    .find({
      _id: { $ne: post._id },
      status: 'published',
      $or: [
        { categories: { $in: post.categories } },
        { tags: { $in: post.tags } }
      ]
    })
    .sort({ publishDate: -1 })
    .limit(3)
    .lean();

  return relatedPosts;
}

export default async function BlogPostPage({
  params
}: {
  params: { slug: string }
}) {
  const [post, relatedPosts] = await Promise.all([
    getPost(params.slug),
    getRelatedPosts(post)
  ]);

  return (
    <article className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Заголовок и метаданные */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center justify-between text-gray-600">
            <div className="flex items-center gap-4">
              {post.author.avatar && (
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <div>
                <div className="font-medium">{post.author.name}</div>
                <time dateTime={post.publishDate.toISOString()}>
                  {format(post.publishDate, 'd MMMM yyyy', { locale: ru })}
                </time>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                {post.viewCount}
              </span>
              <span className="flex items-center gap-1">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                {post.commentCount}
              </span>
            </div>
          </div>
        </header>

        {/* Главное изображение */}
        <div className="relative h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Категории и теги */}
        <div className="flex flex-wrap gap-2 mb-8">
          {post.categories.map((category) => (
            <span
              key={category}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {category}
            </span>
          ))}
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Контент */}
        <div className="prose prose-lg max-w-none mb-12">
          {post.content}
        </div>

        {/* Похожие статьи */}
        {relatedPosts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Похожие статьи</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost._id} post={relatedPost} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
} 