export const ENQUIRY_TYPES = [
  { value: "general", label: "General enquiry" },
  { value: "advisory", label: "Advisory enquiry" },
  { value: "software", label: "Software enquiry" },
  { value: "partnership", label: "Business partnership" },
  { value: "investment", label: "Investment opportunity" },
  { value: "modelling", label: "Financial Modelling & Analysis" },
  { value: "transaction", label: "Transaction & Acquisition Support" },
  { value: "due-diligence", label: "Financial Due Diligence" },
  { value: "automation", label: "AI & Finance Automation" },
  { value: "operations", label: "Investment Operations" },
] as const;

export type EnquiryType = (typeof ENQUIRY_TYPES)[number]["value"];
export type EnquiryOption = { value: EnquiryType; label: string };

export function isEnquiryType(value: unknown): value is EnquiryType {
  return ENQUIRY_TYPES.some((t) => t.value === value);
}

export function enquiryLabel(type: EnquiryType): string {
  return ENQUIRY_TYPES.find((t) => t.value === type)!.label;
}

/** Options shown on the homepage, legal pages and non-advisory business pages. */
export const GENERAL_ENQUIRY_OPTIONS: EnquiryOption[] = [
  { value: "general", label: "General enquiry" },
  { value: "advisory", label: "Advisory enquiry" },
  { value: "software", label: "Software enquiry" },
  { value: "partnership", label: "Business partnership" },
  { value: "investment", label: "Investment opportunity" },
];

/** Options on the /contact page (Keelhold Advisory enquiries), in display order. */
export const ADVISORY_ENQUIRY_OPTIONS: EnquiryOption[] = [
  { value: "modelling", label: "Financial Modelling & Analysis" },
  { value: "transaction", label: "Transaction & Acquisition Support" },
  { value: "due-diligence", label: "Financial Due Diligence" },
  { value: "automation", label: "AI & Finance Automation" },
  { value: "operations", label: "Investment Operations" },
  { value: "advisory", label: "General Advisory Enquiry" },
];

/** Which form a submission came from; advisory submissions route to the Advisory inbox. */
export const ENQUIRY_SOURCES = ["group", "advisory"] as const;
export type EnquirySource = (typeof ENQUIRY_SOURCES)[number];

export const MESSAGE_MAX = 5000;

/** Public contact address — placeholder until confirmed by the client. */
export const CONTACT_EMAIL = "enquiries@keelholdcapital.com";

/** Dispatched on window to preset the contact form from elsewhere on the page. */
export const PREFILL_EVENT = "kh:prefill-enquiry";
export type PrefillDetail = { type?: EnquiryType; message?: string };
