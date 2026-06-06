import { Github, Send, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border dark:border-border-dark bg-surface dark:bg-surface-dark">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 sm:px-6 py-6">
        <span className="text-sm text-text-secondary">
          &copy; 2026 Alex Ivanov
        </span>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/alexivanov"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-accent dark:hover:text-accent-border transition-colors duration-200"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://t.me/alexivanov"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-accent dark:hover:text-accent-border transition-colors duration-200"
            aria-label="Telegram"
          >
            <Send size={20} />
          </a>
          <a
            href="mailto:alex@ivanov.dev"
            className="text-text-secondary hover:text-accent dark:hover:text-accent-border transition-colors duration-200"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
