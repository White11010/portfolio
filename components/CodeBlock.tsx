'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function CodeBlock({ children }: { children: string }) {
  const t = useTranslations('common');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="!mb-6 !rounded-card overflow-x-auto">
        <code className="!block !p-4 !bg-code-bg !text-gray-200 !text-sm !leading-relaxed !rounded-card font-mono">
          {children}
        </code>
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-2 right-2 flex h-11 w-11 items-center justify-center rounded-tag bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white transition-colors duration-200 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100 focus:opacity-100"
        aria-label={t('copyCode')}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  );
}
