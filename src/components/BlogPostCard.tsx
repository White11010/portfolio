import { Link } from 'react-router-dom';
import Tag from './Tag';
import type { Post } from '../data/posts';

export default function BlogPostCard({ post }: { post: Post }) {
  const content = (
    <article className="group cursor-pointer">
      <time className="text-xs text-text-secondary">{post.date}</time>
      <h3 className="mt-1 text-base font-semibold text-text-primary dark:text-text-primary-dark group-hover:text-accent dark:group-hover:text-accent-border transition-colors duration-200">
        {post.title}
      </h3>
      <p className="mt-1 text-sm text-text-secondary leading-relaxed line-clamp-2">
        {post.excerpt}
      </p>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-xs text-text-secondary">{post.readingTime}</span>
        {post.tags.map(tag => (
          <Tag key={tag}>{tag}</Tag>
        ))}
        {post.external && (
          <span className="text-[10px] px-1.5 py-0.5 rounded border border-border dark:border-border-dark text-text-secondary">
            External
          </span>
        )}
      </div>
    </article>
  );

  if (post.external && post.externalUrl) {
    return (
      <a href={post.externalUrl} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return (
    <Link to={`/blog/${post.slug}`} className="block">
      {content}
    </Link>
  );
}
