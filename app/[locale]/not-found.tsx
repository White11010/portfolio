import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function NotFound() {
  const t = await getTranslations('notFound');

  return (
    <div className="py-16 text-center px-4">
      <h1 className="text-2xl font-bold text-text-primary dark:text-text-primary-dark">
        {t('title')}
      </h1>
      <p className="mt-2 text-text-secondary dark:text-text-secondary-dark">{t('description')}</p>
      <Link href="/" className="mt-6 inline-block link-accent">
        {t('backHome')}
      </Link>
    </div>
  );
}
