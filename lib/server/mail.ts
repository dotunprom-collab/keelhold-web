import "server-only";
import { ENQUIRY_TYPES, type EnquiryType } from "@/lib/enquiry";
import type { EnquiryInput } from "@/lib/validation";

/**
 * Recipient per enquiry type. Each falls back to ENQUIRY_TO_DEFAULT.
 * e.g. ENQUIRY_TO_ADVISORY=advisory@keelholdcapital.com
 */
const ROUTING_ENV: Record<EnquiryType, string> = {
  general: "ENQUIRY_TO_GENERAL",
  advisory: "ENQUIRY_TO_ADVISORY",
  technology: "ENQUIRY_TO_TECHNOLOGY",
  partnership: "ENQUIRY_TO_PARTNERSHIP",
  investment: "ENQUIRY_TO_INVESTMENT",
};

export function recipientFor(type: EnquiryType): string | undefined {
  return process.env[ROUTING_ENV[type]] || process.env.ENQUIRY_TO_DEFAULT || undefined;
}

export interface OutgoingMail {
  to: string;
  replyTo: string;
  subject: string;
  text: string;
}

export function composeEnquiryMail(input: EnquiryInput, to: string): OutgoingMail {
  const typeLabel = ENQUIRY_TYPES.find((t) => t.value === input.type)!.label;
  return {
    to,
    replyTo: input.email,
    subject: `[Website] ${typeLabel} — ${input.name}`,
    text: [
      `Enquiry type: ${typeLabel}`,
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      `Consent to processing: yes`,
      "",
      input.message,
    ].join("\n"),
  };
}

/**
 * Delivery adapter. Wire this to the chosen email provider before launch.
 * Until then, development logs the message and production reports failure, so
 * enquiries are never silently dropped.
 */
export async function sendMail(mail: OutgoingMail): Promise<void> {
  if (process.env.NODE_ENV !== "production") {
    console.info("[contact] Email delivery not configured; would send:\n", mail);
    return;
  }
  throw new Error("Email delivery is not configured.");
}
