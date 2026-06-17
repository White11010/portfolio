import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import ProjectStatusBadge from '@/components/ProjectStatusBadge';
import Tag from '@/components/Tag';
import { pick } from '@/lib/i18n';
import { getProjectIcon } from '@/lib/project-icons';
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
  const Icon = getProjectIcon(project.slug);

  return (
    <Link href={`/projects/${project.slug}`} className="card group flex h-full flex-col will-change-transform backface-hidden">
      <div className="mb-3 flex items-start justify-between gap-2">
        <Icon
          size={24}
          className="shrink-0 text-text-primary dark:text-text-primary-dark"
          aria-hidden
        />
        <ProjectStatusBadge
          status={project.status}
          label={t(`status.${project.status}`)}
        />
      </div>
      <h3 className="mb-1.5 text-base font-semibold text-text-primary dark:text-text-primary-dark group-hover:text-accent dark:group-hover:text-accent-border transition-colors duration-200">
        {pick(project.title, locale)}
      </h3>
      <p
        className={`flex-1 text-sm text-text-secondary dark:text-text-secondary-dark leading-relaxed ${compact ? 'line-clamp-2' : ''}`}
      >
        {pick(project.description, locale)}
      </p>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </Link>
  );
}
