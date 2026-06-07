import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Send, Mail } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Tag from '@/components/Tag';
import { getPost, posts } from '@/data/posts';
import { pick } from '@/lib/i18n';
import { formatDate } from '@/lib/format';
import { renderMarkdown } from '@/lib/markdown';
import type { Locale } from '@/i18n/routing';

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return posts.flatMap((post) => ['en', 'ru'].map((locale) => ({ locale, slug: post.slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const title = pick(post.title, locale as Locale);
  const description = pick(post.excerpt, locale as Locale);

  return {
    title: `${title} — Alex Ivanov`,
    description,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('blog');
  const localeTyped = locale as Locale;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const body = pick(post.body, localeTyped);

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-[680px] px-4 sm:px-6">
        <Link href="/blog" className="text-sm link-accent">
          {t('backLink')}
        </Link>

        <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-text-primary dark:text-text-primary-dark leading-tight">
          {pick(post.title, localeTyped)}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-text-secondary dark:text-text-secondary-dark">
          <time dateTime={post.date}>{formatDate(post.date, localeTyped)}</time>
          <span>&middot;</span>
          <span>{pick(post.readingTime, localeTyped)}</span>
          {post.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        <hr className="my-6 border-border dark:border-border-dark" />

        <div className="prose-custom">{renderMarkdown(body)}</div>

        <div className="mt-12 pt-6 border-t border-border dark:border-border-dark">
          <p className="text-sm text-text-secondary dark:text-text-secondary-dark">
            {t('writtenBy', { name: 'Alex Ivanov' })}
          </p>
          <div className="mt-2 flex gap-4">
            <a
              href="https://t.me/alexivanov"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm link-accent min-h-[44px]"
            >
              <Send size={14} /> {t('telegram')}
            </a>
            <a
              href="mailto:alex@ivanov.dev"
              className="inline-flex items-center gap-1 text-sm link-accent min-h-[44px]"
            >
              <Mail size={14} /> {t('email')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
