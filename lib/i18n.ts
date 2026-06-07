import type { Locale } from '@/i18n/routing';

export interface LocalizedText {
  en: string;
  ru: string;
}

export function pick(text: LocalizedText, locale: Locale): string {
  return text[locale];
}
