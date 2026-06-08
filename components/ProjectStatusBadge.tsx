import type { ProjectStatus } from '@/data/projects';

const statusStyles: Record<ProjectStatus, string> = {
  released:
    'bg-accent-light text-accent dark:bg-accent-dark-surface dark:text-accent-border',
  'in-development':
    'border border-border text-text-secondary dark:border-border-dark dark:text-text-secondary-dark',
};

interface ProjectStatusBadgeProps {
  status: ProjectStatus;
  label: string;
}

export default function ProjectStatusBadge({ status, label }: ProjectStatusBadgeProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-tag px-2 py-0.5 text-xs font-medium ${statusStyles[status]}`}
    >
      {label}
    </span>
  );
}
