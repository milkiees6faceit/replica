export const locales = ["en", "ro", "ru"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "EN",
  ro: "RO",
  ru: "RU"
};
