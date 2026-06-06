import { Link } from 'react-router-dom';
import { Github, Send, Mail } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import BlogPostCard from '../components/BlogPostCard';
import { projects } from '../data/projects';
import { posts } from '../data/posts';

export default function HomePage() {
  const latestPosts = posts.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 sm:py-28">
        <div className="absolute inset-0 dot-grid" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary dark:text-text-primary-dark leading-tight">
            Frontend &amp; Fullstack<br className="hidden sm:block" /> Developer
          </h1>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-text-secondary leading-relaxed">
            I build open-source tools, browser games, and write about TypeScript and software architecture.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/projects" className="btn-primary">
              View Projects
            </Link>
            <Link to="/blog" className="btn-outline">
              Read Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary dark:text-text-primary-dark mb-6">
            Projects
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map(project => (
              <ProjectCard key={project.slug} project={project} compact />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="py-12 sm:py-16 border-t border-border dark:border-border-dark">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary dark:text-text-primary-dark mb-6">
            From the Blog
          </h2>
          <div className="space-y-6">
            {latestPosts.map(post => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
          <Link to="/blog" className="mt-6 inline-block text-sm font-medium link-accent">
            View all posts &rarr;
          </Link>
        </div>
      </section>

      {/* Contact Strip */}
      <section className="py-12 sm:py-16 bg-surface dark:bg-surface-dark border-t border-border dark:border-border-dark">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <h2 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-4">
            Let&apos;s connect
          </h2>
          <div className="flex items-center justify-center gap-5">
            <a
              href="https://t.me/alexivanov"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border dark:border-border-dark text-text-secondary hover:border-accent-border dark:hover:border-accent-dark hover:text-accent dark:hover:text-accent-border transition-all duration-200"
              aria-label="Telegram"
            >
              <Send size={20} />
            </a>
            <a
              href="mailto:alex@ivanov.dev"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border dark:border-border-dark text-text-secondary hover:border-accent-border dark:hover:border-accent-dark hover:text-accent dark:hover:text-accent-border transition-all duration-200"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            <a
              href="https://github.com/alexivanov"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border dark:border-border-dark text-text-secondary hover:border-accent-border dark:hover:border-accent-dark hover:text-accent dark:hover:text-accent-border transition-all duration-200"
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
