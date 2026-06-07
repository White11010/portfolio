import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Github, Send, Mail, Download } from 'lucide-react';
import Tag from '@/components/Tag';

type PageProps = {
  params: Promise<{ locale: string }>;
};

const stack = ['TypeScript', 'Vue', 'Nuxt', 'React', 'Node.js', 'PostgreSQL'];

const socials = [
  { labelKey: 'github' as const, href: 'https://github.com/white11010', icon: Github },
  { labelKey: 'telegram' as const, href: 'https://t.me/wh1te26', icon: Send },
  { labelKey: 'email' as const, href: 'mailto:beliavski26@gmail.com', icon: Mail },
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.about' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('about');
  const tf = await getTranslations('footer');

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-[640px] px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary dark:text-text-primary-dark">
          {t('title')}
        </h1>
        <p className="mt-1 text-text-secondary dark:text-text-secondary-dark">{t('role')}</p>

        <div className="mt-6 space-y-4 text-text-primary dark:text-text-primary-dark leading-relaxed">
          <p>{t('bio1')}</p>
          <p>{t('bio2')}</p>
          <p>{t('bio3')}</p>
        </div>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-3">
            {t('stackHeading')}
          </h2>
          <div className="flex flex-wrap gap-2">
            {stack.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-3">
            {t('findMeHeading')}
          </h2>
          <ul className="space-y-2">
            {socials.map(({ labelKey, href, icon: Icon }) => (
              <li key={labelKey}>
                <a
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="inline-flex items-center gap-2 text-sm link-accent min-h-[44px]"
                >
                  <Icon size={16} /> {tf(labelKey)}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-3">
            {t('resumeHeading')}
          </h2>
          <div className="flex flex-wrap gap-3">
            <a href="/cv-ru.pdf" className="btn-outline" download>
              <Download size={16} className="mr-2" /> {t('downloadCvRu')}
            </a>
            <a href="/cv-en.pdf" className="btn-outline" download>
              <Download size={16} className="mr-2" /> {t('downloadCvEn')}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
