import { useState } from 'react';
import BlogPostCard from '../components/BlogPostCard';
import { posts, blogTags } from '../data/posts';

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState('All');

  const filtered = activeTag === 'All'
    ? posts
    : posts.filter(p => p.tags.includes(activeTag));

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary dark:text-text-primary-dark">
          Blog
        </h1>

        <div className="mt-6 flex gap-2 overflow-x-auto hide-scrollbar pb-2">
          {blogTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`shrink-0 rounded-tag px-3 py-1.5 text-xs font-medium transition-all duration-200 min-h-[44px] flex items-center ${
                activeTag === tag
                  ? 'bg-accent text-white'
                  : 'bg-accent-light text-accent dark:bg-accent-dark-surface dark:text-accent-border hover:bg-accent/10 dark:hover:bg-accent-dark-surface/80'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="mt-8 divide-y divide-border dark:divide-border-dark">
          {filtered.map(post => (
            <div key={post.slug} className="py-6 first:pt-0 last:pb-0">
              <BlogPostCard post={post} />
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="py-8 text-sm text-text-secondary">No posts found for this tag.</p>
          )}
        </div>
      </div>
    </div>
  );
}
