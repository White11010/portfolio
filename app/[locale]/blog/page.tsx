import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import BlogTagFilter from '@/components/BlogTagFilter';
import type { Locale } from '@/i18n/routing';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.blog' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('blog');

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary dark:text-text-primary-dark">
          {t('title')}
        </h1>
        <BlogTagFilter locale={locale as Locale} />
      </div>
    </div>
  );
}
