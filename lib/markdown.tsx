import type { ReactNode } from 'react';
import CodeBlock from '@/components/CodeBlock';

function processInline(text: string): ReactNode {
  const parts: ReactNode[] = [];
  let remaining = text;
  let partKey = 0;

  while (remaining) {
    const codeMatch = remaining.match(/^(.*?)`([^`]+)`([\s\S]*)$/);
    if (codeMatch) {
      if (codeMatch[1]) parts.push(codeMatch[1]);
      parts.push(<code key={partKey++}>{codeMatch[2]}</code>);
      remaining = codeMatch[3];
      continue;
    }

    const boldMatch = remaining.match(/^(.*?)\*\*([^*]+)\*\*([\s\S]*)$/);
    if (boldMatch) {
      if (boldMatch[1]) parts.push(boldMatch[1]);
      parts.push(<strong key={partKey++}>{boldMatch[2]}</strong>);
      remaining = boldMatch[3];
      continue;
    }

    const italicMatch = remaining.match(/^(.*?)\*([^*]+)\*([\s\S]*)$/);
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

export function renderMarkdown(body: string): ReactNode[] {
  const lines = body.split('\n');
  const elements: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('```')) {
      i++;
      const codeLines: string[] = [];
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      elements.push(<CodeBlock key={key++}>{codeLines.join('\n')}</CodeBlock>);
      continue;
    }

    if (line.startsWith('## ')) {
      elements.push(<h2 key={key++}>{processInline(line.slice(3))}</h2>);
      i++;
      continue;
    }
    if (line.startsWith('### ')) {
      elements.push(<h3 key={key++}>{processInline(line.slice(4))}</h3>);
      i++;
      continue;
    }

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
        </blockquote>,
      );
      continue;
    }

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
        </ul>,
      );
      continue;
    }

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
        </ol>,
      );
      continue;
    }

    if (line.match(/^---+$/)) {
      elements.push(<hr key={key++} />);
      i++;
      continue;
    }

    if (line.trim() === '') {
      i++;
      continue;
    }

    const paraLines: string[] = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].startsWith('#') &&
      !lines[i].startsWith('```') &&
      !lines[i].startsWith('> ') &&
      !lines[i].startsWith('- ') &&
      !lines[i].startsWith('* ') &&
      !/^\d+\.\s/.test(lines[i])
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    elements.push(<p key={key++}>{processInline(paraLines.join(' '))}</p>);
  }

  return elements;
}
