"use client";

import Link from "next/link";
import { useActionState } from "react";
import { submitComplaint, type ComplaintState } from "@/lib/actions";
import { getCopy } from "@/lib/content";
import type { Locale } from "@/lib/org";

const initial: ComplaintState = { status: "idle" };

export default function ComplaintForm({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  const f = t.complaints.form;
  const [state, action, pending] = useActionState(submitComplaint, initial);

  if (state.status === "done") {
    return (
      <div className="receipt">
        <p className="tag">{t.complaints.successTag}</p>
        <h2 className="d-md" style={{ marginTop: "0.75rem" }}>
          {t.complaints.successTitle}
        </h2>
        <p className="receipt-code">{state.reference}</p>
        <p className="field-hint">{t.complaints.successBody}</p>

        <h3
          className="tag tag-quiet"
          style={{ marginTop: "1.75rem", marginBottom: "0.75rem" }}
        >
          {t.complaints.successNext}
        </h3>
        <ul className="list-plain stack-sm">
          {t.complaints.successSteps.map((step) => (
            <li
              key={step.slice(0, 20)}
              style={{
                borderTop: "1px solid var(--line)",
                paddingTop: "0.7rem",
                fontSize: "0.9375rem",
                color: "var(--slate)",
                lineHeight: 1.6,
              }}
            >
              {step}
            </li>
          ))}
        </ul>

        <div className="hero-actions">
          <Link className="btn btn-ghost" href={`/${locale}/complaints#track`}>
            {t.complaints.successTrack}
          </Link>
          <a className="btn btn-ghost" href={`/${locale}/complaints`}>
            {t.complaints.successAnother}
          </a>
        </div>
      </div>
    );
  }

  const errorKey =
    state.status === "error"
      ? (state.message as keyof typeof t.complaints.errors)
      : null;

  // React resets the form after an action runs, so a validation error would
  // otherwise wipe a long description. Re-seed the fields from what was sent.
  const v = state.status === "error" ? (state.values ?? {}) : {};

  return (
    <form action={action} className="form-wrap" noValidate>
      <input type="hidden" name="locale" value={locale} />

      {/* Honeypot */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {errorKey ? (
        <p className="form-error" role="alert">
          {t.complaints.errors[errorKey]}
        </p>
      ) : null}

      <fieldset
        style={{ border: 0, padding: 0, margin: "0 0 1.5rem" }}
      >
        <legend
          style={{
            fontSize: "0.875rem",
            fontWeight: 600,
            padding: 0,
            marginBottom: "0.6rem",
          }}
        >
          {f.categoryLabel}
        </legend>
        <div className="choice-set">
          {(
            Object.keys(f.categories) as Array<keyof typeof f.categories>
          ).map((key, index) => (
            <label className="choice" key={key}>
              <input
                type="radio"
                name="category"
                value={key}
                defaultChecked={v.category ? v.category === key : index === 0}
              />
              <span className="choice-body">
                <b>{f.categories[key]}</b>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="subject">{f.subjectLabel}</label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          maxLength={200}
          defaultValue={v.subject ?? ""}
          placeholder={f.subjectPlaceholder}
        />
      </div>

      <div className="field">
        <label htmlFor="location">{f.locationLabel}</label>
        <input
          id="location"
          name="location"
          type="text"
          maxLength={300}
          defaultValue={v.location ?? ""}
          placeholder={f.locationPlaceholder}
        />
      </div>

      <div className="field">
        <label htmlFor="description">{f.descLabel}</label>
        <textarea
          id="description"
          name="description"
          required
          maxLength={8000}
          rows={8}
          defaultValue={v.description ?? ""}
          placeholder={f.descPlaceholder}
          aria-describedby="description-hint"
        />
        <p className="field-hint" id="description-hint">
          {f.descHint}
        </p>
      </div>

      <hr className="divider" style={{ margin: "2rem 0 1.5rem" }} />

      <p
        style={{
          fontSize: "0.875rem",
          fontWeight: 600,
          margin: "0 0 0.35rem",
        }}
      >
        {f.identityLabel}
      </p>
      <p className="field-hint" style={{ marginBottom: "1.25rem" }}>
        {f.identityHint}
      </p>

      <div className="field">
        <label htmlFor="name">
          {f.nameLabel}{" "}
          <span style={{ fontWeight: 400, color: "var(--slate)" }}>
            ({t.common.optional})
          </span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          maxLength={200}
          autoComplete="off"
          defaultValue={v.name ?? ""}
          placeholder={f.namePlaceholder}
        />
      </div>

      <div className="field">
        <label htmlFor="email">
          {f.emailLabel}{" "}
          <span style={{ fontWeight: 400, color: "var(--slate)" }}>
            ({t.common.optional})
          </span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          maxLength={320}
          defaultValue={v.email ?? ""}
        />
      </div>

      <div className="field">
        <label htmlFor="phone">
          {f.phoneLabel}{" "}
          <span style={{ fontWeight: 400, color: "var(--slate)" }}>
            ({t.common.optional})
          </span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          maxLength={60}
          defaultValue={v.phone ?? ""}
        />
      </div>

      <label className="choice" style={{ marginBottom: "1.75rem" }}>
        <input
          type="checkbox"
          name="consent"
          defaultChecked={v.consent === "on"}
        />
        <span className="choice-body">
          <b style={{ fontWeight: 400 }}>{f.consentLabel}</b>
        </span>
      </label>

      <button className="btn btn-primary" type="submit" disabled={pending}>
        {pending ? f.submitting : f.submit}
      </button>
    </form>
  );
}
