"use client";

import { useActionState, useState } from "react";
import { submitApplication, type ApplicationState } from "@/lib/actions";
import { getCopy } from "@/lib/content";
import type { Locale } from "@/lib/org";

const initial: ApplicationState = { status: "idle" };

export default function JoinForm({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  const f = t.join.form;
  const [state, action, pending] = useActionState(submitApplication, initial);
  const [intent, setIntent] = useState<string>("general");

  if (state.status === "done") {
    return (
      <div className="receipt">
        <p className="tag">{t.join.successTag}</p>
        <h2 className="d-md" style={{ marginTop: "0.75rem" }}>
          {t.join.successTitle}
        </h2>
        <p className="field-hint" style={{ marginTop: "1rem" }}>
          {t.join.successBody}
        </p>
      </div>
    );
  }

  const errorKey =
    state.status === "error"
      ? (state.message as keyof typeof t.join.errors)
      : null;

  // See ComplaintForm: React resets the form after an action runs.
  const v = state.status === "error" ? (state.values ?? {}) : {};

  return (
    <form action={action} className="form-wrap" noValidate>
      <input type="hidden" name="locale" value={locale} />

      <div className="hp" aria-hidden="true">
        <label htmlFor="join-website">Website</label>
        <input
          id="join-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {errorKey ? (
        <p className="form-error" role="alert">
          {t.join.errors[errorKey]}
        </p>
      ) : null}

      <fieldset style={{ border: 0, padding: 0, margin: "0 0 1.5rem" }}>
        <legend
          style={{
            fontSize: "0.875rem",
            fontWeight: 600,
            padding: 0,
            marginBottom: "0.6rem",
          }}
        >
          {f.intentLabel}
        </legend>
        <div className="choice-set">
          {(Object.keys(f.intents) as Array<keyof typeof f.intents>).map(
            (key) => (
              <label className="choice" key={key}>
                <input
                  type="radio"
                  name="intent"
                  value={key}
                  checked={intent === key}
                  onChange={() => setIntent(key)}
                />
                <span className="choice-body">
                  <b>{f.intents[key]}</b>
                </span>
              </label>
            ),
          )}
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="join-name">{f.nameLabel}</label>
        <input
          id="join-name"
          name="name"
          type="text"
          required
          maxLength={200}
          autoComplete="name"
          defaultValue={v.name ?? ""}
        />
      </div>

      <div className="field">
        <label htmlFor="join-email">{f.emailLabel}</label>
        <input
          id="join-email"
          name="email"
          type="email"
          maxLength={320}
          autoComplete="email"
          defaultValue={v.email ?? ""}
        />
      </div>

      <div className="field">
        <label htmlFor="join-phone">{f.phoneLabel}</label>
        <input
          id="join-phone"
          name="phone"
          type="tel"
          maxLength={60}
          autoComplete="tel"
          defaultValue={v.phone ?? ""}
        />
      </div>

      <div className="field">
        <label htmlFor="join-address">{f.addressLabel}</label>
        <input
          id="join-address"
          name="address"
          type="text"
          maxLength={300}
          defaultValue={v.address ?? ""}
          placeholder={f.addressPlaceholder}
        />
      </div>

      {/* Only asked of people who say they represent an organisation. */}
      {intent === "partner" ? (
        <div className="field">
          <label htmlFor="join-org">{f.orgLabel}</label>
          <input
            id="join-org"
            name="organisation"
            type="text"
            maxLength={300}
            defaultValue={v.organisation ?? ""}
            placeholder={f.orgPlaceholder}
          />
        </div>
      ) : null}

      <div className="field">
        <label htmlFor="join-interest">{f.interestLabel}</label>
        <textarea
          id="join-interest"
          name="interest"
          maxLength={4000}
          rows={6}
          defaultValue={v.interest ?? ""}
          placeholder={f.interestPlaceholder}
        />
      </div>

      <label className="choice" style={{ marginBottom: "1.75rem" }}>
        <input
          type="checkbox"
          name="declaration"
          defaultChecked={v.declaration === "on"}
        />
        <span className="choice-body">
          <b style={{ fontWeight: 400 }}>{f.declarationLabel}</b>
        </span>
      </label>

      <button className="btn btn-primary" type="submit" disabled={pending}>
        {pending ? f.submitting : f.submit}
      </button>
    </form>
  );
}
