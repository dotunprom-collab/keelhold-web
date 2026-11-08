export const ENQUIRY_TYPES = [
  { value: "general", label: "General enquiry" },
  { value: "advisory", label: "Advisory enquiry" },
  { value: "technology", label: "Technology enquiry" },
  { value: "partnership", label: "Business partnership" },
  { value: "investment", label: "Investment opportunity" },
] as const;

export type EnquiryType = (typeof ENQUIRY_TYPES)[number]["value"];

export function isEnquiryType(value: unknown): value is EnquiryType {
  return ENQUIRY_TYPES.some((t) => t.value === value);
}

export const MESSAGE_MAX = 5000;

/** Public contact address — placeholder until confirmed by the client. */
export const CONTACT_EMAIL = "enquiries@keelholdcapital.com";

/** Dispatched on window to preset the contact form from elsewhere on the page. */
export const PREFILL_EVENT = "kh:prefill-enquiry";
export type PrefillDetail = { type?: EnquiryType; message?: string };
