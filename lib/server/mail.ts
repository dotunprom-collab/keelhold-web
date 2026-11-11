import "server-only";
import { enquiryLabel, type EnquirySource, type EnquiryType } from "@/lib/enquiry";
import type { EnquiryInput } from "@/lib/validation";

/**
 * Recipient per enquiry type. Each falls back to ENQUIRY_TO_DEFAULT.
 * e.g. ENQUIRY_TO_ADVISORY=advisory@keelholdcapital.com
 */
const ROUTING_ENV: Record<EnquiryType, string> = {
  general: "ENQUIRY_TO_GENERAL",
  advisory: "ENQUIRY_TO_ADVISORY",
  software: "ENQUIRY_TO_SOFTWARE",
  partnership: "ENQUIRY_TO_PARTNERSHIP",
  investment: "ENQUIRY_TO_INVESTMENT",
  modelling: "ENQUIRY_TO_ADVISORY",
  transaction: "ENQUIRY_TO_ADVISORY",
  "due-diligence": "ENQUIRY_TO_ADVISORY",
  automation: "ENQUIRY_TO_ADVISORY",
  operations: "ENQUIRY_TO_ADVISORY",
};

/** Everything submitted from the Advisory page goes to the Advisory inbox. */
export function recipientFor(type: EnquiryType, source: EnquirySource): string | undefined {
  const envName = source === "advisory" ? "ENQUIRY_TO_ADVISORY" : ROUTING_ENV[type];
  return process.env[envName] || process.env.ENQUIRY_TO_DEFAULT || undefined;
}

export interface OutgoingMail {
  to: string;
  replyTo: string;
  subject: string;
  text: string;
}

export function composeEnquiryMail(input: EnquiryInput, source: EnquirySource, to: string): OutgoingMail {
  const typeLabel = enquiryLabel(input.type);
  const prefix = source === "advisory" ? "Keelhold Advisory" : "Website";
  return {
    to,
    replyTo: input.email,
    subject: `[${prefix}] ${typeLabel} — ${input.name}`,
    text: [
      `Enquiry type: ${typeLabel}`,
      `Submitted from: ${source === "advisory" ? "Keelhold Advisory contact page" : "Keelhold Capital Group website"}`,
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      `Company: ${input.company || "—"}`,
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
