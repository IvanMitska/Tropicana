import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  description: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  publishDate: Date;
  categories: string[];
  tags: string[];
  featuredImage: string;
  gallery?: string[];
  status: 'draft' | 'published';
  viewCount: number;
  commentCount: number;
  isFeatured: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

const BlogPostSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  author: {
    name: { type: String, required: true },
    avatar: String,
    bio: String
  },
  publishDate: { type: Date, default: Date.now },
  categories: [{ type: String }],
  tags: [{ type: String }],
  featuredImage: { type: String, required: true },
  gallery: [String],
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  viewCount: { type: Number, default: 0 },
  commentCount: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  metaTitle: String,
  metaDescription: String
}, {
  timestamps: true
});

// Индексы для оптимизации поиска
BlogPostSchema.index({ title: 'text', description: 'text', content: 'text' });
BlogPostSchema.index({ slug: 1 });
BlogPostSchema.index({ categories: 1 });
BlogPostSchema.index({ tags: 1 });
BlogPostSchema.index({ status: 1 });
BlogPostSchema.index({ isFeatured: 1 });

export default mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema); 