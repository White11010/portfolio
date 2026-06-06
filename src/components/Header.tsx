import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLang } from '../contexts/LanguageContext';

const navLinks = [
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { dark, toggle: toggleTheme } = useTheme();
  const { lang, toggle: toggleLang } = useLang();
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b border-border dark:border-border-dark transition-all duration-200 ${
          scrolled
            ? 'bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-md'
            : 'bg-surface dark:bg-surface-dark'
        }`}
      >
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link
            to="/"
            className="text-base font-semibold tracking-tight text-text-primary dark:text-text-primary-dark hover:text-accent dark:hover:text-accent-border"
          >
            Alex Ivanov
          </Link>

          <nav className="hidden items-center gap-6 sm:flex">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 hover:text-accent dark:hover:text-accent-border ${
                    isActive
                      ? 'text-accent dark:text-accent-border underline underline-offset-4 decoration-accent dark:decoration-accent-dark'
                      : 'text-text-secondary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="flex h-8 items-center gap-1 rounded-full border border-border dark:border-border-dark px-2.5 text-xs font-medium text-text-secondary hover:border-accent-border dark:hover:border-accent-dark hover:text-accent dark:hover:text-accent-border transition-colors duration-200"
              aria-label="Switch language"
            >
              <span className={lang === 'en' ? 'text-accent dark:text-accent-border font-semibold' : ''}>EN</span>
              <span className="text-border dark:text-border-dark">|</span>
              <span className={lang === 'ru' ? 'text-accent dark:text-accent-border font-semibold' : ''}>RU</span>
            </button>

            <button
              onClick={toggleTheme}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border dark:border-border-dark text-text-secondary hover:border-accent-border dark:hover:border-accent-dark hover:text-accent dark:hover:text-accent-border transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border dark:border-border-dark text-text-secondary hover:border-accent-border dark:hover:border-accent-dark hover:text-accent dark:hover:text-accent-border transition-colors duration-200 sm:hidden"
              aria-label="Open menu"
            >
              <Menu size={16} />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-bg dark:bg-bg-dark flex flex-col items-center justify-center gap-8 animate-fade-in">
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center text-text-secondary hover:text-accent dark:hover:text-accent-border transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>

          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `text-2xl font-semibold transition-colors duration-200 ${
                  isActive
                    ? 'text-accent dark:text-accent-border'
                    : 'text-text-primary dark:text-text-primary-dark hover:text-accent dark:hover:text-accent-border'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={toggleLang}
              className="flex h-10 items-center gap-1.5 rounded-full border border-border dark:border-border-dark px-4 text-sm font-medium text-text-secondary hover:border-accent-border dark:hover:border-accent-dark hover:text-accent dark:hover:text-accent-border transition-colors duration-200"
            >
              <span className={lang === 'en' ? 'text-accent dark:text-accent-border font-semibold' : ''}>EN</span>
              <span className="text-border dark:text-border-dark">|</span>
              <span className={lang === 'ru' ? 'text-accent dark:text-accent-border font-semibold' : ''}>RU</span>
            </button>

            <button
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border dark:border-border-dark text-text-secondary hover:border-accent-border dark:hover:border-accent-dark hover:text-accent dark:hover:text-accent-border transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
