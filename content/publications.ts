export const PUBLICATION_CATEGORIES = [
  "Annual letters",
  "Investment perspectives",
  "Industry research",
  "Business updates",
  "Announcements",
] as const;

export type PublicationCategory = (typeof PUBLICATION_CATEGORIES)[number];

export interface Publication {
  slug: string;
  title: string;
  category: PublicationCategory;
  /** ISO date, e.g. "2027-03-31". */
  date: string;
  summary: string;
  /** Link to the article or PDF (e.g. "/publications/annual-letter-2026.pdf"). */
  file?: string;
}

/**
 * Only genuine, approved publications belong here. Do not add placeholders —
 * the empty state is the intended launch state.
 */
export const PUBLICATIONS: Publication[] = [];
