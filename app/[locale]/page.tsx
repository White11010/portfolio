import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Github, Send, Mail } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import ProjectCard from '@/components/ProjectCard';
import BlogPostCard from '@/components/BlogPostCard';
import { projects } from '@/data/projects';
import { posts } from '@/data/posts';
import type { Locale } from '@/i18n/routing';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.home' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      languages: {
        en: '/en',
        ru: '/ru',
      },
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('hero');
  const th = await getTranslations('home');
  const localeTyped = locale as Locale;
  const latestPosts = posts.slice(0, 3);

  return (
    <div>
      <section className="relative overflow-hidden py-16 sm:py-28">
        <div className="absolute inset-0 dot-grid" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary dark:text-text-primary-dark leading-tight">
            {t('title')}
          </h1>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-text-secondary dark:text-text-secondary-dark leading-relaxed">
            {t('subtitle')}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/projects" className="btn-primary">
              {t('viewProjects')}
            </Link>
            <Link href="/blog" className="btn-outline">
              {t('readBlog')}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary dark:text-text-primary-dark mb-6">
            {th('projectsHeading')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} locale={localeTyped} compact />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 border-t border-border dark:border-border-dark">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary dark:text-text-primary-dark mb-6">
            {th('blogHeading')}
          </h2>
          <div className="space-y-6">
            {latestPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} locale={localeTyped} />
            ))}
          </div>
          <Link href="/blog" className="mt-6 inline-block text-sm font-medium link-accent">
            {th('viewAllPosts')}
          </Link>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-surface dark:bg-surface-dark border-t border-border dark:border-border-dark">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <h2 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-4">
            {th('connectHeading')}
          </h2>
          <div className="flex items-center justify-center gap-5">
            <a
              href="https://t.me/wh1te26"
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target rounded-full border border-border dark:border-border-dark text-text-secondary dark:text-text-secondary-dark hover:border-accent-border dark:hover:border-accent-dark hover:text-accent dark:hover:text-accent-border transition-all duration-200"
              aria-label="Telegram"
            >
              <Send size={20} />
            </a>
            <a
              href="mailto:beliavski26@gmail.com"
              className="touch-target rounded-full border border-border dark:border-border-dark text-text-secondary dark:text-text-secondary-dark hover:border-accent-border dark:hover:border-accent-dark hover:text-accent dark:hover:text-accent-border transition-all duration-200"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            <a
              href="https://github.com/white11010"
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target rounded-full border border-border dark:border-border-dark text-text-secondary dark:text-text-secondary-dark hover:border-accent-border dark:hover:border-accent-dark hover:text-accent dark:hover:text-accent-border transition-all duration-200"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
