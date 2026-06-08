import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ExternalLink, Package } from 'lucide-react';
import Github from '@/components/icons/Github';
import { Link } from '@/i18n/navigation';
import ProjectStatusBadge from '@/components/ProjectStatusBadge';
import Tag from '@/components/Tag';
import BlogPostCard from '@/components/BlogPostCard';
import { getPostsByProject } from '@/data/posts';
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
    title: `${title} — Vladislav Belyavsky`,
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

  const relatedPosts = getPostsByProject(slug);

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-[720px] px-4 sm:px-6">
        <Link href="/projects" className="text-sm link-accent">
          {t('backLink')}
        </Link>

        <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-text-primary dark:text-text-primary-dark">
          {project.emoji} {pick(project.title, localeTyped)}
        </h1>

        <div className="mt-3">
          <ProjectStatusBadge
            status={project.status}
            label={t(`status.${project.status}`)}
          />
        </div>

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

        {project.image && (
          <div className="mt-10 overflow-hidden rounded-card border border-border dark:border-border-dark">
            <Image
              src={project.image.src}
              alt={pick(project.title, localeTyped)}
              width={project.image.width}
              height={project.image.height}
              sizes="(max-width: 720px) 100vw, 720px"
              className="h-auto w-full"
            />
          </div>
        )}

        <div className={`flex flex-wrap gap-3 ${project.image ? 'mt-8' : 'mt-10'}`}>
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

        {relatedPosts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border dark:border-border-dark">
            <h2 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-6">
              {t('relatedArticles')}
            </h2>
            <div className="divide-y divide-border dark:divide-border-dark">
              {relatedPosts.map((post) => (
                <div key={post.slug} className="py-6 first:pt-0 last:pb-0">
                  <BlogPostCard post={post} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
