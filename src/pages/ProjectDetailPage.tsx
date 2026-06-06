import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Github, ExternalLink, Package } from 'lucide-react';
import Tag from '../components/Tag';
import { projects } from '../data/projects';

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="py-16 text-center">
        <p className="text-text-secondary">Project not found.</p>
        <Link to="/projects" className="mt-4 inline-block link-accent">
          &larr; Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-[720px] px-4 sm:px-6">
        <Link to="/projects" className="text-sm link-accent">
          &larr; Projects
        </Link>

        <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-text-primary dark:text-text-primary-dark">
          {project.emoji} {project.title}
        </h1>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        <div className="mt-6 space-y-4 text-text-primary dark:text-text-primary-dark leading-relaxed">
          {project.longDescription.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-3">
            Key Technical Decisions
          </h2>
          <ul className="space-y-2">
            {project.decisions.map((decision, i) => (
              <li key={i} className="flex gap-2 text-sm text-text-secondary leading-relaxed">
                <span className="text-accent dark:text-accent-border mt-0.5 shrink-0">&bull;</span>
                {decision}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 rounded-card border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-8 flex items-center justify-center">
          <span className="text-sm text-text-secondary">Screenshot placeholder</span>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <Github size={16} className="mr-2" /> GitHub
          </a>
          {project.npm && (
            <a
              href={project.npm}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <Package size={16} className="mr-2" /> npm
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <ExternalLink size={16} className="mr-2" /> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
