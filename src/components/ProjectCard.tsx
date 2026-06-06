import { Link } from 'react-router-dom';
import { Github, ExternalLink } from 'lucide-react';
import Tag from './Tag';
import type { Project } from '../data/projects';

export default function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="card group block"
    >
      <div className="mb-3 text-2xl">{project.emoji}</div>
      <h3 className="mb-1.5 text-base font-semibold text-text-primary dark:text-text-primary-dark group-hover:text-accent dark:group-hover:text-accent-border transition-colors duration-200">
        {project.title}
      </h3>
      <p className={`mb-3 text-sm text-text-secondary leading-relaxed ${compact ? 'line-clamp-2' : ''}`}>
        {project.description}
      </p>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {project.tags.map(tag => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1 text-xs text-text-secondary group-hover:text-accent dark:group-hover:text-accent-border transition-colors duration-200">
          <Github size={14} /> Source
        </span>
        {project.demo && (
          <span className="flex items-center gap-1 text-xs text-text-secondary group-hover:text-accent dark:group-hover:text-accent-border transition-colors duration-200">
            <ExternalLink size={14} /> Demo
          </span>
        )}
      </div>
    </Link>
  );
}
