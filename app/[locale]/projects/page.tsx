import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ProjectCard from '@/components/ProjectCard';
import { getOrderedProjects } from '@/data/projects';
import type { Locale } from '@/i18n/routing';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.projects' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function ProjectsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('projects');
  const localeTyped = locale as Locale;
  const orderedProjects = getOrderedProjects();

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary dark:text-text-primary-dark">
          {t('title')}
        </h1>
        <p className="mt-2 text-text-secondary dark:text-text-secondary-dark">{t('subtitle')}</p>
        <div className="mt-8 grid auto-rows-fr gap-5 sm:grid-cols-2">
          {orderedProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} locale={localeTyped} />
          ))}
        </div>
      </div>
    </div>
  );
}
