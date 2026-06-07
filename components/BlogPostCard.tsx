'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Tag from '@/components/Tag';
import { pick } from '@/lib/i18n';
import { formatDate } from '@/lib/format';
import type { Post } from '@/data/posts';
import type { Locale } from '@/i18n/routing';

interface BlogPostCardProps {
  post: Post;
  locale: Locale;
}

export default function BlogPostCard({ post, locale }: BlogPostCardProps) {
  const t = useTranslations('blog');

  const content = (
    <article className="group cursor-pointer">
      <time className="text-xs text-text-secondary dark:text-text-secondary-dark">
        {formatDate(post.date, locale)}
      </time>
      <h3 className="mt-1 text-base font-semibold text-text-primary dark:text-text-primary-dark group-hover:text-accent dark:group-hover:text-accent-border transition-colors duration-200">
        {pick(post.title, locale)}
      </h3>
      <p className="mt-1 text-sm text-text-secondary dark:text-text-secondary-dark leading-relaxed line-clamp-2">
        {pick(post.excerpt, locale)}
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="text-xs text-text-secondary dark:text-text-secondary-dark">
          {pick(post.readingTime, locale)}
        </span>
        {post.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
        {post.external && (
          <span className="text-xs px-1.5 py-0.5 rounded border border-border dark:border-border-dark text-text-secondary dark:text-text-secondary-dark">
            {t('external')}
          </span>
        )}
      </div>
    </article>
  );

  if (post.external && post.externalUrl) {
    return (
      <a href={post.externalUrl} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="block">
      {content}
    </Link>
  );
}
