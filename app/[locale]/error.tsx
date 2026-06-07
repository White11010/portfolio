'use client';

import { useTranslations } from 'next-intl';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('error');

  return (
    <div className="py-16 text-center px-4">
      <h1 className="text-2xl font-bold text-text-primary dark:text-text-primary-dark">
        {t('title')}
      </h1>
      <button type="button" onClick={reset} className="mt-6 btn-primary">
        {t('retry')}
      </button>
    </div>
  );
}
