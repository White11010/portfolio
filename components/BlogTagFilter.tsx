'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import BlogPostCard from '@/components/BlogPostCard';
import { posts, blogTags } from '@/data/posts';
export default function BlogTagFilter() {
  const t = useTranslations('blog');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered =
    activeTag === null ? posts : posts.filter((p) => p.tags.includes(activeTag));

  const tags = [null, ...blogTags] as const;

  return (
    <>
      <div className="relative mt-6">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
          {tags.map((tag) => {
            const isActive = activeTag === tag;
            const label = tag === null ? t('allTags') : tag;
            return (
              <button
                key={tag ?? 'all'}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`shrink-0 rounded-tag px-3 py-1.5 text-xs font-medium transition-all duration-200 min-h-[44px] flex items-center ${
                  isActive
                    ? 'bg-accent text-white'
                    : 'bg-accent-light text-accent dark:bg-accent-dark-surface dark:text-accent-border hover:bg-accent/10 dark:hover:bg-accent-dark-surface/80'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 divide-y divide-border dark:divide-border-dark">
        {filtered.map((post) => (
          <div key={post.slug} className="py-6 first:pt-0 last:pb-0">
            <BlogPostCard post={post} />
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="py-8 text-sm text-text-secondary dark:text-text-secondary-dark">
            {t('noPosts')}
          </p>
        )}
      </div>
    </>
  );
}
