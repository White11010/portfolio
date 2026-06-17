import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  LayoutGrid,
  Package,
  Search,
  Sparkles,
  Swords,
  HardHat,
} from 'lucide-react';
import type { ProjectSlug } from '@/data/projects';

export const projectIcons: Record<ProjectSlug, LucideIcon> = {
  'eslint-plugin-vue-arch': HardHat,
  blindspot: Search,
  nevernullable: Package,
  'kanban-app': LayoutGrid,
  grin: BarChart3,
  guildmaster: Swords,
  portfolio: Sparkles,
};

export function getProjectIcon(slug: string): LucideIcon {
  return projectIcons[slug as ProjectSlug] ?? Sparkles;
}
