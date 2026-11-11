"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { submitEnquiry } from "@/app/actions/contact";
import { Button } from "@/components/core/Button";
import { Toast } from "@/components/feedback/Toast";
import { Checkbox, Input, Select, Textarea } from "@/components/forms/Fields";
import { trackEvent } from "@/lib/analytics";
import {
  CONTACT_EMAIL,
  GENERAL_ENQUIRY_OPTIONS,
  MESSAGE_MAX,
  PREFILL_EVENT,
  type EnquiryOption,
  type EnquirySource,
  type EnquiryType,
  type PrefillDetail,
} from "@/lib/enquiry";
import { FIELD_ORDER, validateEnquiry, type FieldErrors } from "@/lib/validation";
import { Turnstile, type TurnstileHandle } from "./Turnstile";
import styles from "./ContactForm.module.css";

type Status = "idle" | "submitting" | "success" | "error";

const FIELD_IDS = {
  name: "contact-name",
  email: "contact-email",
  company: "contact-company",
  type: "contact-type",
  message: "contact-message",
  consent: "contact-consent",
} as const;

interface ContactFormProps {
  defaultType?: EnquiryType;
  options?: EnquiryOption[];
  source?: EnquirySource;
}

export function ContactForm({ defaultType = "general", options = GENERAL_ENQUIRY_OPTIONS, source = "group" }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [type, setType] = useState<EnquiryType>(defaultType);
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [toastOpen, setToastOpen] = useState(false);
  const turnstile = useRef<TurnstileHandle>(null);

  const offered = (value: string | null | undefined): value is EnquiryType => options.some((o) => o.value === value);

  // Preset from elsewhere on the page ("Request updates", service links) or from ?enquiry= in the URL.
  useEffect(() => {
    function apply(detail: PrefillDetail) {
      if (offered(detail.type)) setType(detail.type);
      if (detail.message) setMessage((m) => m || detail.message!);
    }
    const fromUrl = new URLSearchParams(window.location.search).get("enquiry");
    if (offered(fromUrl)) apply({ type: fromUrl });

    const onPrefill = (e: Event) => apply((e as CustomEvent<PrefillDetail>).detail ?? {});
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- options are static per page
  }, []);

  useEffect(() => {
    if (!toastOpen) return;
    const t = setTimeout(() => setToastOpen(false), 4000);
    return () => clearTimeout(t);
  }, [toastOpen]);

  function clearError(field: keyof FieldErrors) {
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function focusFirstInvalid(errs: FieldErrors) {
    const first = FIELD_ORDER.find((f) => errs[f]);
    if (first) document.getElementById(FIELD_IDS[first])?.focus();
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const values = { name, email, company, type, message, consent };
    const errs = validateEnquiry(values);
    setErrors(errs);
    setFormError(null);
    if (Object.keys(errs).length > 0) {
      focusFirstInvalid(errs);
      return;
    }

    setStatus("submitting");
    try {
      const result = await submitEnquiry({ ...values, source, website, turnstileToken: turnstile.current?.getToken() });
      if (result.ok) {
        trackEvent("Enquiry", { type, source });
        setName("");
        setEmail("");
        setCompany("");
        setType(defaultType);
        setMessage("");
        setConsent(false);
        setStatus("success");
        setToastOpen(true);
      } else if (result.fieldErrors && Object.keys(result.fieldErrors).length > 0) {
        setErrors(result.fieldErrors);
        setStatus("idle");
        focusFirstInvalid(result.fieldErrors);
      } else {
        throw new Error(result.error ?? "failed");
      }
    } catch {
      setStatus("error");
      setFormError(`Something went wrong. Please email ${CONTACT_EMAIL}.`);
    } finally {
      turnstile.current?.reset();
    }
  }

  const submitting = status === "submitting";

  return (
    <>
      <form className={styles.card} onSubmit={onSubmit} noValidate aria-label="Enquiry form">
        <div className={styles.row}>
          <Input
            id={FIELD_IDS.name}
            label="Full name"
            name="name"
            autoComplete="name"
            placeholder="Jane Morrow"
            value={name}
            error={errors.name}
            required
            onChange={(e) => {
              setName(e.target.value);
              clearError("name");
            }}
          />
          <Input
            id={FIELD_IDS.email}
            label="Business email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="jane@company.com"
            value={email}
            error={errors.email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
              clearError("email");
            }}
          />
        </div>

        <Input
          id={FIELD_IDS.company}
          label="Company (optional)"
          name="company"
          autoComplete="organization"
          placeholder="Morrow Holdings Ltd"
          value={company}
          error={errors.company}
          maxLength={200}
          onChange={(e) => {
            setCompany(e.target.value);
            clearError("company");
          }}
        />

        <Select
          id={FIELD_IDS.type}
          label="Enquiry type"
          name="type"
          options={options}
          value={type}
          error={errors.type}
          onChange={(e) => {
            if (offered(e.target.value)) setType(e.target.value);
            clearError("type");
          }}
        />

        <Textarea
          id={FIELD_IDS.message}
          label="Message"
          name="message"
          rows={4}
          maxLength={MESSAGE_MAX}
          placeholder="How can we help?"
          value={message}
          error={errors.message}
          required
          onChange={(e) => {
            setMessage(e.target.value);
            clearError("message");
          }}
        />

        {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <Checkbox
          id={FIELD_IDS.consent}
          name="consent"
          checked={consent}
          error={errors.consent}
          onChange={(e) => {
            setConsent(e.target.checked);
            clearError("consent");
          }}
        >
          I agree to Keelhold processing my details to respond to this enquiry, as set out in the{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </Checkbox>

        <Turnstile ref={turnstile} />

        {formError && (
          <p className={styles.formError} role="alert">
            {formError}
          </p>
        )}

        <div>
          <Button type="submit" variant="primary" icon={submitting ? undefined : "arrow-right"} disabled={!consent || submitting} aria-busy={submitting}>
            {submitting ? "Sending…" : "Send enquiry"}
          </Button>
        </div>
      </form>

      {toastOpen && (
        <Toast
          tone="positive"
          title="Enquiry sent"
          message="A member of the team will reply within one business day."
          onDismiss={() => setToastOpen(false)}
        />
      )}
    </>
  );
}
