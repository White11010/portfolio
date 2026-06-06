import { Github, Send, Mail, Download } from 'lucide-react';
import Tag from '../components/Tag';

const stack = ['TypeScript', 'Vue', 'Nuxt', 'React', 'Node.js', 'PostgreSQL'];

const socials = [
  { label: 'GitHub', href: 'https://github.com/alexivanov', icon: Github },
  { label: 'Telegram', href: 'https://t.me/alexivanov', icon: Send },
  { label: 'Email', href: 'mailto:alex@ivanov.dev', icon: Mail },
];

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-[640px] px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary dark:text-text-primary-dark">
          Alex Ivanov
        </h1>
        <p className="mt-1 text-text-secondary">
          Frontend &amp; Fullstack Developer
        </p>

        <div className="mt-6 space-y-4 text-text-primary dark:text-text-primary-dark leading-relaxed">
          <p>
            I am a developer who builds open-source tools and writes about TypeScript, software architecture,
            and functional programming patterns. Most of my work lives on GitHub, where I maintain a handful
            of libraries and side projects that I use as a laboratory for ideas I find interesting.
          </p>
          <p>
            My day-to-day stack revolves around TypeScript — on the frontend with React and Vue, and on the
            backend with Node.js and PostgreSQL. I care about developer experience, type safety, and code that
            is easy to delete. I also have a soft spot for browser-based games and have shipped a couple of
            text-based strategy experiments.
          </p>
          <p>
            When I am not coding, I write about the things I learn — mostly around design patterns, the
            intersection of functional programming and practical TypeScript, and lessons from maintaining
            open-source projects. I write in both English and Russian.
          </p>
        </div>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-3">
            Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {stack.map(tech => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-3">
            Find me
          </h2>
          <ul className="space-y-2">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="inline-flex items-center gap-2 text-sm link-accent"
                >
                  <Icon size={16} /> {label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-3">
            Resume
          </h2>
          <div className="flex flex-wrap gap-3">
            <a
              href="/cv-ru.pdf"
              className="btn-outline"
              download
            >
              <Download size={16} className="mr-2" /> Download CV (RU)
            </a>
            <a
              href="/cv-en.pdf"
              className="btn-outline"
              download
            >
              <Download size={16} className="mr-2" /> Download CV (EN)
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
