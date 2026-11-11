"use server";

import { headers } from "next/headers";
import { ENQUIRY_SOURCES, isEnquiryType, type EnquirySource } from "@/lib/enquiry";
import { composeEnquiryMail, recipientFor, sendMail } from "@/lib/server/mail";
import { rateLimit } from "@/lib/server/rate-limit";
import { verifyTurnstile } from "@/lib/server/turnstile";
import { validateEnquiry, type FieldErrors } from "@/lib/validation";

export interface EnquiryPayload {
  name: string;
  email: string;
  company: string;
  type: string;
  source: string;
  message: string;
  consent: boolean;
  /** Honeypot — must be empty. */
  website: string;
  turnstileToken?: string;
}

export type EnquiryResult = { ok: true } | { ok: false; fieldErrors?: FieldErrors; error?: "failed" | "rate-limited" };

export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResult> {
  // Bots that fill the honeypot get a success response and nothing is sent.
  if (typeof payload?.website === "string" && payload.website.trim() !== "") return { ok: true };

  const fieldErrors = validateEnquiry(payload);
  if (Object.keys(fieldErrors).length > 0 || !isEnquiryType(payload.type)) return { ok: false, fieldErrors };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || null;

  if (!rateLimit(ip ?? "unknown")) return { ok: false, error: "rate-limited" };
  if (!(await verifyTurnstile(payload.turnstileToken, ip))) return { ok: false, error: "failed" };

  const source: EnquirySource = ENQUIRY_SOURCES.includes(payload.source as EnquirySource)
    ? (payload.source as EnquirySource)
    : "group";
  const to = recipientFor(payload.type, source);
  if (!to && process.env.NODE_ENV === "production") {
    console.error("[contact] No recipient configured for", payload.type);
    return { ok: false, error: "failed" };
  }

  try {
    await sendMail(
      composeEnquiryMail(
        {
          name: payload.name.trim(),
          email: payload.email.trim(),
          company: typeof payload.company === "string" ? payload.company.trim() : "",
          type: payload.type,
          message: payload.message.trim(),
          consent: true,
        },
        source,
        to ?? "dev@localhost",
      ),
    );
    return { ok: true };
  } catch (err) {
    console.error("[contact] Failed to send enquiry", err);
    return { ok: false, error: "failed" };
  }
}
