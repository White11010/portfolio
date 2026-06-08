'use client';

import { useTranslations } from 'next-intl';
import Tag from '@/components/Tag';
import { formatDate } from '@/lib/format';
import type { Post } from '@/data/posts';

interface BlogPostCardProps {
  post: Post;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const t = useTranslations('blog');

  return (
    <a
      href={post.externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <article className="cursor-pointer">
        <div className="flex flex-wrap items-center gap-2">
          <time className="text-xs text-text-secondary dark:text-text-secondary-dark">
            {formatDate(post.date, post.lang)}
          </time>
          <span className="inline-flex shrink-0 items-center rounded-tag border border-border px-2 py-0.5 text-xs font-medium text-text-secondary dark:border-border-dark dark:text-text-secondary-dark">
            {t(`lang.${post.lang}`)}
          </span>
          <span className="inline-flex shrink-0 items-center rounded-tag bg-accent-light px-2 py-0.5 text-xs font-medium text-accent dark:bg-accent-dark-surface dark:text-accent-border">
            {t(`platform.${post.platform}`)}
          </span>
        </div>
        <h3 className="mt-1 text-base font-semibold text-text-primary dark:text-text-primary-dark group-hover:text-accent dark:group-hover:text-accent-border transition-colors duration-200">
          {post.title}
        </h3>
        <p className="mt-1 text-sm text-text-secondary dark:text-text-secondary-dark leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-xs text-text-secondary dark:text-text-secondary-dark">
            {post.readingTime}
          </span>
          {post.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </article>
    </a>
  );
}
