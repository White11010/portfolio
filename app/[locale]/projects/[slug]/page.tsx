import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Github, ExternalLink, Package } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Tag from '@/components/Tag';
import { getProject, projects } from '@/data/projects';
import { pick } from '@/lib/i18n';
import type { Locale } from '@/i18n/routing';

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return projects.flatMap((project) =>
    ['en', 'ru'].map((locale) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = pick(project.title, locale as Locale);
  const description = pick(project.description, locale as Locale);

  return {
    title: `${title} — Alex Ivanov`,
    description,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('projects');
  const localeTyped = locale as Locale;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-[720px] px-4 sm:px-6">
        <Link href="/projects" className="text-sm link-accent">
          {t('backLink')}
        </Link>

        <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-text-primary dark:text-text-primary-dark">
          {project.emoji} {pick(project.title, localeTyped)}
        </h1>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        <div className="mt-6 space-y-4 text-text-primary dark:text-text-primary-dark leading-relaxed">
          {pick(project.longDescription, localeTyped)
            .split('\n\n')
            .map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-3">
            {t('keyDecisions')}
          </h2>
          <ul className="space-y-2">
            {project.decisions.map((decision) => (
              <li
                key={pick(decision, localeTyped)}
                className="flex gap-2 text-sm text-text-secondary dark:text-text-secondary-dark leading-relaxed"
              >
                <span className="text-accent dark:text-accent-border mt-0.5 shrink-0">&bull;</span>
                {pick(decision, localeTyped)}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 rounded-card border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-8 flex items-center justify-center">
          <span className="text-sm text-text-secondary dark:text-text-secondary-dark">
            {t('screenshotPlaceholder')}
          </span>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <Github size={16} className="mr-2" /> {t('github')}
          </a>
          {project.npm && (
            <a href={project.npm} target="_blank" rel="noopener noreferrer" className="btn-outline">
              <Package size={16} className="mr-2" /> {t('npm')}
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-outline">
              <ExternalLink size={16} className="mr-2" /> {t('liveDemo')}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
