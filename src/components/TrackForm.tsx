"use client";

import { useActionState } from "react";
import { trackComplaint, type TrackState } from "@/lib/actions";
import { getCopy } from "@/lib/content";
import type { Locale } from "@/lib/org";

const initial: TrackState = { status: "idle" };

export default function TrackForm({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  const c = t.complaints;
  const [state, action, pending] = useActionState(trackComplaint, initial);

  const formatted =
    state.status === "found"
      ? new Intl.DateTimeFormat(locale === "ne" ? "ne-NP" : "en-GB", {
          dateStyle: "long",
        }).format(new Date(state.complaint.createdAt))
      : null;

  return (
    <div className="form-wrap">
      <form action={action}>
        <div className="field">
          <label htmlFor="reference">{c.trackLabel}</label>
          <input
            id="reference"
            name="reference"
            type="text"
            required
            maxLength={40}
            placeholder="NNN-2083-04F7A1"
            style={{
              fontFamily: "var(--mono)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          />
        </div>
        <button className="btn btn-primary" type="submit" disabled={pending}>
          {pending ? c.trackChecking : c.trackSubmit}
        </button>
      </form>

      {state.status === "error" ? (
        <p className="form-error" role="alert" style={{ marginTop: "1.5rem" }}>
          {state.message === "code" ? c.errors.code : c.trackNotFound}
        </p>
      ) : null}

      {state.status === "found" ? (
        <div className="receipt" style={{ marginTop: "2rem" }}>
          <p className="tag">{state.complaint.reference}</p>
          <h3 className="d-sm" style={{ marginTop: "0.75rem" }}>
            {state.complaint.subject}
          </h3>

          <dl className="seal-facts" style={{ marginTop: "1.5rem" }}>
            <div className="fact">
              <dt>{c.trackStatus}</dt>
              <dd>
                {
                  c.statuses[
                    state.complaint.status as keyof typeof c.statuses
                  ]
                }
              </dd>
            </div>
            <div className="fact">
              <dt>{c.trackCategory}</dt>
              <dd>
                {
                  c.form.categories[
                    state.complaint.category as keyof typeof c.form.categories
                  ]
                }
              </dd>
            </div>
            <div className="fact">
              <dt>{c.trackFiled}</dt>
              <dd>{formatted}</dd>
            </div>
          </dl>

          {state.complaint.note ? (
            <div style={{ marginTop: "1.5rem" }}>
              <p className="tag tag-quiet">{c.trackNote}</p>
              <p
                style={{
                  marginTop: "0.5rem",
                  color: "var(--slate)",
                  lineHeight: 1.6,
                }}
              >
                {state.complaint.note}
              </p>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
