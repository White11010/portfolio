import { getTranslations } from 'next-intl/server';
import { Github, Send, Mail } from 'lucide-react';

export default async function Footer() {
  const t = await getTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border dark:border-border-dark bg-surface dark:bg-surface-dark safe-bottom">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 sm:px-6 py-6">
        <span className="text-sm text-text-secondary dark:text-text-secondary-dark">
          {t('copyright', { year })}
        </span>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/white11010"
            target="_blank"
            rel="noopener noreferrer"
            className="touch-target text-text-secondary dark:text-text-secondary-dark hover:text-accent dark:hover:text-accent-border transition-colors duration-200"
            aria-label={t('github')}
          >
            <Github size={20} />
          </a>
          <a
            href="https://t.me/wh1te26"
            target="_blank"
            rel="noopener noreferrer"
            className="touch-target text-text-secondary dark:text-text-secondary-dark hover:text-accent dark:hover:text-accent-border transition-colors duration-200"
            aria-label={t('telegram')}
          >
            <Send size={20} />
          </a>
          <a
            href="mailto:beliavski26@gmail.com"
            className="touch-target text-text-secondary dark:text-text-secondary-dark hover:text-accent dark:hover:text-accent-border transition-colors duration-200"
            aria-label={t('email')}
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
