"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { submitEnquiry } from "@/app/actions/contact";
import { Button } from "@/components/core/Button";
import { Input, Select, Textarea } from "@/components/forms/Fields";
import { trackEvent } from "@/lib/analytics";
import { ADVISORY_ENQUIRY_OPTIONS, CONTACT_EMAIL, MESSAGE_MAX, type EnquiryType } from "@/lib/enquiry";
import { FIELD_ORDER, validateEnquiry, type FieldErrors } from "@/lib/validation";
import { Turnstile, type TurnstileHandle } from "./Turnstile";
import styles from "./AdvisoryEnquiryForm.module.css";

type Status = "idle" | "submitting" | "success" | "error";

const DEFAULT_TYPE: EnquiryType = "advisory";

const IDS = {
  name: "enquiry-name",
  email: "enquiry-email",
  company: "enquiry-company",
  type: "enquiry-type",
  message: "enquiry-message",
  consent: "enquiry-consent",
} as const;

const labelFor = (type: EnquiryType) => ADVISORY_ENQUIRY_OPTIONS.find((o) => o.value === type)!.label;

/** ?type= preset: an exact match with an option label pre-selects it. Null on the server. */
function readPreset(): EnquiryType | null {
  const requested = new URLSearchParams(window.location.search).get("type");
  return ADVISORY_ENQUIRY_OPTIONS.find((o) => o.label === requested)?.value ?? null;
}
const noSubscribe = () => () => {};

export function AdvisoryEnquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const preset = useSyncExternalStore(noSubscribe, readPreset, () => null);
  const [chosenType, setType] = useState<EnquiryType | null>(null);
  const type = chosenType ?? preset ?? DEFAULT_TYPE;
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [sentType, setSentType] = useState<EnquiryType>(DEFAULT_TYPE);
  const turnstile = useRef<TurnstileHandle>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  function clearError(field: keyof FieldErrors) {
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function focusFirstInvalid(errs: FieldErrors) {
    const first = FIELD_ORDER.find((f) => errs[f]);
    if (first) document.getElementById(IDS[first])?.focus();
  }

  function reset() {
    setName("");
    setEmail("");
    setCompany("");
    setType(DEFAULT_TYPE);
    setMessage("");
    setConsent(false);
    setErrors({});
    setStatus("idle");
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const values = { name, email, company, type, message, consent };
    const errs = validateEnquiry(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      setStatus("idle");
      focusFirstInvalid(errs);
      return;
    }

    setStatus("submitting");
    try {
      const result = await submitEnquiry({
        ...values,
        source: "advisory",
        website,
        turnstileToken: turnstile.current?.getToken(),
      });
      if (result.ok) {
        trackEvent("Enquiry", { type, source: "advisory" });
        setSentType(type);
        setStatus("success");
      } else if (result.fieldErrors && Object.keys(result.fieldErrors).length > 0) {
        setErrors(result.fieldErrors);
        setStatus("idle");
        focusFirstInvalid(result.fieldErrors);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      turnstile.current?.reset();
    }
  }

  if (status === "success") {
    return (
      <div className={styles.card}>
        <div ref={successRef} role="status" tabIndex={-1} className={styles.success}>
          <span className={styles.rule} aria-hidden="true" />
          <p className={styles.successTitle}>Thank you. Your enquiry has been sent.</p>
          <p className={styles.successText}>
            A member of the Advisory team will reply by email. Category: {labelFor(sentType)}.
          </p>
          <div>
            <Button variant="secondary" onClick={reset}>
              Send another enquiry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form className={styles.card} onSubmit={onSubmit} noValidate aria-label="Advisory enquiry form">
      <div className={styles.row}>
        <Input
          id={IDS.name}
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
          id={IDS.email}
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
        id={IDS.company}
        label={
          <>
            Company <span className={styles.optional}>(optional)</span>
          </>
        }
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
        id={IDS.type}
        label="Enquiry type"
        name="type"
        options={ADVISORY_ENQUIRY_OPTIONS}
        value={type}
        error={errors.type}
        onChange={(e) => {
          const match = ADVISORY_ENQUIRY_OPTIONS.find((o) => o.value === e.target.value);
          if (match) setType(match.value);
          clearError("type");
        }}
      />

      <Textarea
        id={IDS.message}
        label="Message"
        name="message"
        rows={4}
        maxLength={MESSAGE_MAX}
        placeholder="Briefly describe the decision, transaction or process you are working on."
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
        <label htmlFor="enquiry-website">Website</label>
        <input
          id="enquiry-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className={styles.consentField}>
        <label className={styles.consent}>
          <input
            id={IDS.consent}
            type="checkbox"
            name="consent"
            checked={consent}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${IDS.consent}-hint` : undefined}
            onChange={(e) => {
              setConsent(e.target.checked);
              clearError("consent");
            }}
          />
          <span>
            I agree to Keelhold processing my details to respond to this enquiry, as set out in the{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </span>
        </label>
        {errors.consent && (
          <p id={`${IDS.consent}-hint`} className={styles.error}>
            {errors.consent}
          </p>
        )}
      </div>

      <Turnstile ref={turnstile} />

      {status === "error" && (
        <p className={styles.formError} role="alert">
          Something went wrong. Please email {CONTACT_EMAIL}.
        </p>
      )}

      <div>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          icon={submitting ? undefined : "arrow-right"}
          disabled={!consent || submitting}
          aria-busy={submitting}
        >
          {submitting ? "Sending…" : "Discuss your requirements"}
        </Button>
      </div>
    </form>
  );
}
