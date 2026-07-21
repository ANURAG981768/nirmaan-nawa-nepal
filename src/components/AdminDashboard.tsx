"use client";

import { useEffect, useState } from "react";
import {
  loadAdmin,
  setComplaintStatus,
  type AdminData,
  type AdminComplaint,
} from "@/lib/admin";

const CATEGORY: Record<string, string> = {
  service: "Public service",
  governance: "Governance",
  community: "Community",
  programme: "Our work",
  other: "Other",
};
const INTENT: Record<string, string> = {
  inquiry: "Question",
  general: "General member",
  life: "Life member",
  volunteer: "Volunteer",
  partner: "Partnership",
};
const STATUSES = ["received", "reviewing", "forwarded", "resolved", "closed"];
const STATUS_LABEL: Record<string, string> = {
  received: "Received",
  reviewing: "Reviewing",
  forwarded: "Forwarded",
  resolved: "Resolved",
  closed: "Closed",
};

function fmt(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [tab, setTab] = useState<"complaints" | "messages">("complaints");

  // Remember the password for the session so a refresh does not log out.
  useEffect(() => {
    const saved = sessionStorage.getItem("nnn_admin");
    if (saved) {
      setPassword(saved);
      void submit(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function submit(pw: string) {
    setLoading(true);
    setAuthError(false);
    const result = await loadAdmin(pw);
    setLoading(false);
    if (!result.ok) {
      setAuthError(true);
      sessionStorage.removeItem("nnn_admin");
      setData(null);
      return;
    }
    sessionStorage.setItem("nnn_admin", pw);
    setData(result);
  }

  function logout() {
    sessionStorage.removeItem("nnn_admin");
    setData(null);
    setPassword("");
  }

  if (!data || !data.ok) {
    return (
      <div className="admin-gate">
        <div className="admin-card">
          <p className="tag">Nirman Nawa Nepal</p>
          <h1 className="d-md" style={{ marginTop: "0.5rem" }}>
            Complaints inbox
          </h1>
          <p className="field-hint" style={{ margin: "0.75rem 0 1.5rem" }}>
            Enter the password to see every complaint and message.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void submit(password);
            }}
          >
            <div className="field">
              <label htmlFor="pw">Password</label>
              <input
                id="pw"
                type="password"
                value={password}
                autoFocus
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {authError ? (
              <p className="form-error">Wrong password. Try again.</p>
            ) : null}
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? "Checking…" : "Open inbox"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const complaints = data.complaints;
  const messages = data.applications;

  return (
    <div className="admin">
      <header className="admin-head">
        <div>
          <p className="tag">Complaints inbox</p>
          <h1 className="d-md">
            {complaints.length} complaint{complaints.length === 1 ? "" : "s"} ·{" "}
            {messages.length} message{messages.length === 1 ? "" : "s"}
          </h1>
        </div>
        <div className="admin-head-actions">
          <button
            className="btn btn-ghost"
            onClick={() => void submit(password)}
          >
            Refresh
          </button>
          <button className="btn btn-ghost" onClick={logout}>
            Log out
          </button>
        </div>
      </header>

      <div className="admin-tabs">
        <button
          data-active={tab === "complaints"}
          onClick={() => setTab("complaints")}
        >
          Complaints ({complaints.length})
        </button>
        <button
          data-active={tab === "messages"}
          onClick={() => setTab("messages")}
        >
          Messages ({messages.length})
        </button>
      </div>

      {tab === "complaints" ? (
        <div className="admin-list">
          {complaints.length === 0 ? (
            <p className="field-hint">No complaints yet.</p>
          ) : (
            complaints.map((c) => (
              <ComplaintRow key={c.reference} c={c} password={password} />
            ))
          )}
        </div>
      ) : (
        <div className="admin-list">
          {messages.length === 0 ? (
            <p className="field-hint">No messages yet.</p>
          ) : (
            messages.map((m, i) => (
              <article className="admin-item" key={i}>
                <div className="admin-item-head">
                  <span className="admin-badge">{INTENT[m.intent] || m.intent}</span>
                  <span className="admin-date">{fmt(m.created_at)}</span>
                </div>
                <h3>{m.name}</h3>
                {m.subject ? <p className="admin-sub">{m.subject}</p> : null}
                {m.interest ? <p className="admin-desc">{m.interest}</p> : null}
                <dl className="admin-meta">
                  {m.email ? (
                    <div>
                      <dt>Email</dt>
                      <dd>
                        <a href={`mailto:${m.email}`}>{m.email}</a>
                      </dd>
                    </div>
                  ) : null}
                  {m.phone ? (
                    <div>
                      <dt>Phone</dt>
                      <dd>
                        <a href={`tel:${m.phone}`}>{m.phone}</a>
                      </dd>
                    </div>
                  ) : null}
                  {m.address ? (
                    <div>
                      <dt>Lives in</dt>
                      <dd>{m.address}</dd>
                    </div>
                  ) : null}
                  {m.organisation ? (
                    <div>
                      <dt>Organisation</dt>
                      <dd>{m.organisation}</dd>
                    </div>
                  ) : null}
                </dl>
              </article>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function ComplaintRow({
  c,
  password,
}: {
  c: AdminComplaint;
  password: string;
}) {
  const [status, setStatus] = useState(c.status);
  const [note, setNote] = useState(c.public_note ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function save() {
    setSaving(true);
    setSaved(false);
    const ok = await setComplaintStatus(password, c.reference, status, note);
    setSaving(false);
    setSaved(ok);
  }

  const anonymous = !c.name && !c.email && !c.phone;

  return (
    <article className="admin-item">
      <div className="admin-item-head">
        <span className="admin-badge">{CATEGORY[c.category] || c.category}</span>
        <span className={`admin-status admin-status-${c.status}`}>
          {STATUS_LABEL[c.status] || c.status}
        </span>
        <span className="admin-ref">{c.reference}</span>
        <span className="admin-date">{fmt(c.created_at)}</span>
      </div>
      <h3>{c.subject}</h3>
      {c.location ? <p className="admin-sub">📍 {c.location}</p> : null}
      <p className="admin-desc">{c.description}</p>

      {c.attachment_urls.length > 0 ? (
        <div className="admin-files">
          {c.attachment_urls.map((url, i) => (
            <a key={i} href={url} target="_blank" rel="noopener noreferrer">
              📎 Photo/video {i + 1}
            </a>
          ))}
        </div>
      ) : null}

      <dl className="admin-meta">
        {anonymous ? (
          <div>
            <dt>Reporter</dt>
            <dd>
              <i>Anonymous</i>
            </dd>
          </div>
        ) : (
          <>
            {c.name ? (
              <div>
                <dt>Name</dt>
                <dd>{c.name}</dd>
              </div>
            ) : null}
            {c.email ? (
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${c.email}`}>{c.email}</a>
                </dd>
              </div>
            ) : null}
            {c.phone ? (
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={`tel:${c.phone}`}>{c.phone}</a>
                </dd>
              </div>
            ) : null}
          </>
        )}
        <div>
          <dt>Consent to forward</dt>
          <dd>{c.consent_to_forward ? "Yes" : "No"}</dd>
        </div>
      </dl>

      <div className="admin-actions">
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABEL[s]}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Note shown to the reporter (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button className="btn btn-ghost" onClick={save} disabled={saving}>
          {saving ? "Saving…" : saved ? "Saved ✓" : "Save"}
        </button>
      </div>
    </article>
  );
}
