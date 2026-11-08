import type { BusinessId } from "./brand";
import type { EnquiryType } from "./enquiry";

export interface Business {
  id: BusinessId;
  slug: string;
  index: string;
  name: string;
  category: string;
  operating: boolean;
  status: string;
  description: string;
  product?: string;
  /** Supplied before launch. */
  legalEntity: string;
  /** Contact form preset on this business's page. */
  enquiryType: EnquiryType;
}

export const BUSINESSES: readonly Business[] = [
  {
    id: "advisory",
    slug: "advisory",
    index: "01",
    name: "Advisory",
    category: "Professional Services",
    operating: true,
    status: "Initial operating business",
    description:
      "Strategic, financial and transaction advisory for business owners, investors and management teams.",
    legalEntity: "[legal entity name for Keelhold Advisory]",
    enquiryType: "advisory",
  },
  {
    id: "technology",
    slug: "technology",
    index: "02",
    name: "Technology",
    category: "Technology",
    operating: true,
    status: "Initial operating business",
    description:
      "Independent financial technology and software development serving the investment industry, including fundCorridor.",
    product: "fundCorridor",
    legalEntity: "[legal entity name for Keelhold Technology]",
    enquiryType: "technology",
  },
  {
    id: "proprietary",
    slug: "proprietary-capital",
    index: "03",
    name: "Proprietary Capital",
    category: "Investments",
    operating: false,
    status: "Future investment business",
    description: "Long-term investment of the group’s own capital into businesses and assets.",
    legalEntity: "[legal entity name for Keelhold Proprietary Capital]",
    enquiryType: "investment",
  },
  {
    id: "realestate",
    slug: "real-estate",
    index: "04",
    name: "Real Estate",
    category: "Property",
    operating: false,
    status: "Future investment business",
    description:
      "Property investment, ownership and development opportunities focused on long-term value creation.",
    legalEntity: "[legal entity name for Keelhold Real Estate]",
    enquiryType: "investment",
  },
];

export function getBusiness(id: BusinessId): Business {
  return BUSINESSES.find((b) => b.id === id)!;
}

export function getBusinessBySlug(slug: string): Business | undefined {
  return BUSINESSES.find((b) => b.slug === slug);
}

export function getNextBusiness(business: Business): Business {
  const i = BUSINESSES.indexOf(business);
  return BUSINESSES[(i + 1) % BUSINESSES.length];
}

/** fundCorridor product site — set once the URL exists. */
export const FUNDCORRIDOR_URL: string | null = "https://app.fundcorridor.com";
