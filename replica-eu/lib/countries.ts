export const SUPPORTED_COUNTRIES = [
  "Austria",
  "Czech Republic",
  "Estonia",
  "France",
  "Germany",
  "Hungary",
  "Italy",
  "Latvia",
  "Lithuania",
  "Moldova",
  "Poland",
  "Romania",
  "Slovakia",
  "Spain",
  "The Netherlands",
  "Ukraine",
  "United Kingdom",
  "USA"
] as const;

export const DEFAULT_COUNTRY = "Germany";

export type SupportedCountry = (typeof SUPPORTED_COUNTRIES)[number];
