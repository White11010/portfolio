import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Send, Mail, Copy, Check } from 'lucide-react';
import Tag from '../components/Tag';
import { posts } from '../data/posts';

function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="!mb-6 !rounded-card overflow-hidden">
        <code className="!block !p-4 !bg-code-bg !text-gray-200 !text-sm !leading-relaxed !rounded-card font-mono">
          {children}
        </code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-tag bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white transition-colors duration-200 opacity-0 group-hover:opacity-100"
        aria-label="Copy code"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  );
}

function renderMarkdown(body: string) {
  const lines = body.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code blocks
    if (line.startsWith('```')) {
      const _lang = line.slice(3).trim(); void _lang;
      i++;
      const codeLines: string[] = [];
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <CodeBlock key={key++}>{codeLines.join('\n')}</CodeBlock>
      );
      continue;
    }

    // Headings
    if (line.startsWith('## ')) {
      elements.push(<h2 key={key++}>{processInline(line.slice(3))}</h2>);
      i++; continue;
    }
    if (line.startsWith('### ')) {
      elements.push(<h3 key={key++}>{processInline(line.slice(4))}</h3>);
      i++; continue;
    }

    // Blockquotes
    if (line.startsWith('> ')) {
      const quoteLines: string[] = [line.slice(2)];
      i++;
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <blockquote key={key++}>
          {quoteLines.map((ql, qi) => (
            <p key={qi}>{processInline(ql)}</p>
          ))}
        </blockquote>
      );
      continue;
    }

    // Unordered lists
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const items: string[] = [line.slice(2)];
      i++;
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* '))) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={key++}>
          {items.map((item, ii) => (
            <li key={ii}>{processInline(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered lists
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [line.replace(/^\d+\.\s/, '')];
      i++;
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ''));
        i++;
      }
      elements.push(
        <ol key={key++}>
          {items.map((item, ii) => (
            <li key={ii}>{processInline(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // Horizontal rule
    if (line.match(/^---+$/)) {
      elements.push(<hr key={key++} />);
      i++; continue;
    }

    // Paragraphs
    if (line.trim() === '') {
      i++; continue;
    }

    const paraLines: string[] = [line];
    i++;
    while (i < lines.length && lines[i].trim() !== '' && !lines[i].startsWith('#') && !lines[i].startsWith('```') && !lines[i].startsWith('> ') && !lines[i].startsWith('- ') && !lines[i].startsWith('* ') && !/^\d+\.\s/.test(lines[i])) {
      paraLines.push(lines[i]);
      i++;
    }
    elements.push(<p key={key++}>{processInline(paraLines.join(' '))}</p>);
  }

  return elements;
}

function processInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let partKey = 0;

  while (remaining) {
    // Inline code
    const codeMatch = remaining.match(/^(.*?)`([^`]+)`(.*)$/s);
    if (codeMatch) {
      if (codeMatch[1]) parts.push(codeMatch[1]);
      parts.push(<code key={partKey++}>{codeMatch[2]}</code>);
      remaining = codeMatch[3];
      continue;
    }

    // Bold
    const boldMatch = remaining.match(/^(.*?)\*\*([^*]+)\*\*(.*)$/s);
    if (boldMatch) {
      if (boldMatch[1]) parts.push(boldMatch[1]);
      parts.push(<strong key={partKey++}>{boldMatch[2]}</strong>);
      remaining = boldMatch[3];
      continue;
    }

    // Italic
    const italicMatch = remaining.match(/^(.*?)\*([^*]+)\*(.*)$/s);
    if (italicMatch) {
      if (italicMatch[1]) parts.push(italicMatch[1]);
      parts.push(<em key={partKey++}>{italicMatch[2]}</em>);
      remaining = italicMatch[3];
      continue;
    }

    parts.push(remaining);
    break;
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="py-16 text-center">
        <p className="text-text-secondary">Post not found.</p>
        <Link to="/blog" className="mt-4 inline-block link-accent">
          &larr; Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-[680px] px-4 sm:px-6">
        <Link to="/blog" className="text-sm link-accent">
          &larr; Blog
        </Link>

        <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-text-primary dark:text-text-primary-dark leading-tight">
          {post.title}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-text-secondary">
          <time>{post.date}</time>
          <span>&middot;</span>
          <span>{post.readingTime}</span>
          {post.tags.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        <hr className="my-6 border-border dark:border-border-dark" />

        <div className="prose-custom">
          {renderMarkdown(post.body)}
        </div>

        <div className="mt-12 pt-6 border-t border-border dark:border-border-dark">
          <p className="text-sm text-text-secondary">
            Written by <span className="font-medium text-text-primary dark:text-text-primary-dark">Alex Ivanov</span>
          </p>
          <div className="mt-2 flex gap-4">
            <a
              href="https://t.me/alexivanov"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm link-accent"
            >
              <Send size={14} /> Telegram
            </a>
            <a
              href="mailto:alex@ivanov.dev"
              className="inline-flex items-center gap-1 text-sm link-accent"
            >
              <Mail size={14} /> Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
