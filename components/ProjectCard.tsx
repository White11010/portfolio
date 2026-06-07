import { ExternalLink } from 'lucide-react';
import Github from '@/components/icons/Github';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Tag from '@/components/Tag';
import { pick } from '@/lib/i18n';
import type { Project } from '@/data/projects';
import type { Locale } from '@/i18n/routing';

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  compact?: boolean;
}

export default async function ProjectCard({
  project,
  locale,
  compact = false,
}: ProjectCardProps) {
  const t = await getTranslations('projects');

  return (
    <Link href={`/projects/${project.slug}`} className="card group block">
      <div className="mb-3 text-2xl">{project.emoji}</div>
      <h3 className="mb-1.5 text-base font-semibold text-text-primary dark:text-text-primary-dark group-hover:text-accent dark:group-hover:text-accent-border transition-colors duration-200">
        {pick(project.title, locale)}
      </h3>
      <p
        className={`mb-3 text-sm text-text-secondary dark:text-text-secondary-dark leading-relaxed ${compact ? 'line-clamp-2' : ''}`}
      >
        {pick(project.description, locale)}
      </p>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1 text-xs text-text-secondary dark:text-text-secondary-dark group-hover:text-accent dark:group-hover:text-accent-border transition-colors duration-200">
          <Github size={14} /> {t('source')}
        </span>
        {project.demo && (
          <span className="flex items-center gap-1 text-xs text-text-secondary dark:text-text-secondary-dark group-hover:text-accent dark:group-hover:text-accent-border transition-colors duration-200">
            <ExternalLink size={14} /> {t('demo')}
          </span>
        )}
      </div>
    </Link>
  );
}
