import { isEnquiryType, MESSAGE_MAX, type EnquiryType } from "./enquiry";

export interface EnquiryInput {
  name: string;
  email: string;
  type: EnquiryType;
  message: string;
  consent: boolean;
}

export type EnquiryField = keyof EnquiryInput;
export type FieldErrors = Partial<Record<EnquiryField, string>>;

/** Field order — used to focus the first invalid field. */
export const FIELD_ORDER: EnquiryField[] = ["name", "email", "type", "message", "consent"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Shared by the client form and the server action. */
export function validateEnquiry(input: Partial<Record<EnquiryField, unknown>>): FieldErrors {
  const errors: FieldErrors = {};
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim() : "";
  const message = typeof input.message === "string" ? input.message.trim() : "";

  if (!name) errors.name = "Please enter your full name.";
  else if (name.length > 200) errors.name = "Please shorten your name.";

  if (!email) errors.email = "Please enter your email address.";
  else if (email.length > 254 || !EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";

  if (!isEnquiryType(input.type)) errors.type = "Please choose an enquiry type.";

  if (!message) errors.message = "Please enter a message.";
  else if (message.length > MESSAGE_MAX) errors.message = `Please keep your message under ${MESSAGE_MAX.toLocaleString("en-GB")} characters.`;

  if (input.consent !== true) errors.consent = "Please confirm you agree so we can respond.";

  return errors;
}
