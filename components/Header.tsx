'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, Link, useRouter } from '@/i18n/navigation';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import type { Locale } from '@/i18n/routing';

const navLinks = [
  { href: '/projects' as const, key: 'projects' as const },
  { href: '/blog' as const, key: 'blog' as const },
  { href: '/about' as const, key: 'about' as const },
];

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const { dark, toggle: toggleTheme } = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  const switchLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b border-border dark:border-border-dark transition-all duration-200 safe-top ${
          scrolled
            ? 'bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-md'
            : 'bg-surface dark:bg-surface-dark'
        }`}
      >
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="text-base font-semibold tracking-tight text-text-primary dark:text-text-primary-dark hover:text-accent dark:hover:text-accent-border"
          >
            Alex Ivanov
          </Link>

          <nav className="hidden items-center gap-6 sm:flex" aria-label="Main">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-accent dark:hover:text-accent-border ${
                  isActive(link.href)
                    ? 'text-accent dark:text-accent-border underline underline-offset-4 decoration-accent dark:decoration-accent-dark'
                    : 'text-text-secondary dark:text-text-secondary-dark'
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => switchLocale(locale === 'en' ? 'ru' : 'en')}
              className="touch-target flex items-center gap-1 rounded-full border border-border dark:border-border-dark px-2.5 text-xs font-medium text-text-secondary dark:text-text-secondary-dark hover:border-accent-border dark:hover:border-accent-dark hover:text-accent dark:hover:text-accent-border transition-colors duration-200"
              aria-label={t('switchLanguage')}
            >
              <span
                className={
                  locale === 'en' ? 'text-accent dark:text-accent-border font-semibold' : ''
                }
              >
                EN
              </span>
              <span className="text-border dark:text-border-dark">|</span>
              <span
                className={
                  locale === 'ru' ? 'text-accent dark:text-accent-border font-semibold' : ''
                }
              >
                RU
              </span>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="touch-target flex items-center justify-center rounded-full border border-border dark:border-border-dark text-text-secondary dark:text-text-secondary-dark hover:border-accent-border dark:hover:border-accent-dark hover:text-accent dark:hover:text-accent-border transition-colors duration-200"
              aria-label={t('toggleTheme')}
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="touch-target flex items-center justify-center rounded-full border border-border dark:border-border-dark text-text-secondary dark:text-text-secondary-dark hover:border-accent-border dark:hover:border-accent-dark hover:text-accent dark:hover:text-accent-border transition-colors duration-200 sm:hidden"
              aria-label={t('openMenu')}
            >
              <Menu size={16} />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-[60] bg-bg dark:bg-bg-dark flex flex-col items-center justify-center gap-8 animate-fade-in safe-top safe-bottom"
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setMobileOpen(false)}
            className="absolute top-4 right-4 touch-target flex items-center justify-center text-text-secondary dark:text-text-secondary-dark hover:text-accent dark:hover:text-accent-border transition-colors safe-top"
            aria-label={t('closeMenu')}
          >
            <X size={24} />
          </button>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`text-2xl font-semibold transition-colors duration-200 ${
                isActive(link.href)
                  ? 'text-accent dark:text-accent-border'
                  : 'text-text-primary dark:text-text-primary-dark hover:text-accent dark:hover:text-accent-border'
              }`}
            >
              {t(link.key)}
            </Link>
          ))}

          <div className="flex items-center gap-4 mt-4">
            <button
              type="button"
              onClick={() => switchLocale(locale === 'en' ? 'ru' : 'en')}
              className="touch-target flex items-center gap-1.5 rounded-full border border-border dark:border-border-dark px-4 text-sm font-medium text-text-secondary dark:text-text-secondary-dark hover:border-accent-border dark:hover:border-accent-dark hover:text-accent dark:hover:text-accent-border transition-colors duration-200"
            >
              <span
                className={
                  locale === 'en' ? 'text-accent dark:text-accent-border font-semibold' : ''
                }
              >
                EN
              </span>
              <span className="text-border dark:text-border-dark">|</span>
              <span
                className={
                  locale === 'ru' ? 'text-accent dark:text-accent-border font-semibold' : ''
                }
              >
                RU
              </span>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="touch-target flex items-center justify-center rounded-full border border-border dark:border-border-dark text-text-secondary dark:text-text-secondary-dark hover:border-accent-border dark:hover:border-accent-dark hover:text-accent dark:hover:text-accent-border transition-colors duration-200"
              aria-label={t('toggleTheme')}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
