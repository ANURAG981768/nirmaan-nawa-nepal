import type { ReactNode } from "react";
import ContourField from "./ContourField";

/**
 * The शिरोरेखा system.
 *
 * In Devanagari, letters hang beneath a horizontal headline stroke rather
 * than sitting on a baseline. Every band on this site is built the same
 * way: a rule across the top, short ticks descending from it, and the
 * content hanging underneath.
 */

export function Ticks({ count = 40 }: { count?: number }) {
  return (
    <div className="ticks" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <i key={index} />
      ))}
    </div>
  );
}

export function Band({
  children,
  ink = false,
  tight = false,
  ticks = true,
  contour = false,
  id,
}: {
  children: ReactNode;
  ink?: boolean;
  tight?: boolean;
  ticks?: boolean;
  contour?: boolean;
  id?: string;
}) {
  const className = [
    "band",
    ink ? "band-ink" : "",
    tight ? "band-tight" : "",
    contour ? "band-contour" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={className} id={id}>
      {contour ? <ContourField /> : null}
      {ticks ? <Ticks /> : null}
      <div className="shell">{children}</div>
    </section>
  );
}

export function BandHead({
  tag,
  title,
  lead,
  aside,
}: {
  tag: string;
  title: string;
  lead?: string;
  aside?: ReactNode;
}) {
  return (
    <div className="band-head">
      <div className="band-head-stack">
        <p className="tag">{tag}</p>
        <h2 className="d-lg">{title}</h2>
        {lead ? <p className="lead">{lead}</p> : null}
      </div>
      {aside ? <div>{aside}</div> : null}
    </div>
  );
}

/** An item hanging from its own short rule, optionally citing a clause. */
export function Hang({
  title,
  body,
  clause,
  clauseLabel,
}: {
  title: string;
  body: string;
  clause?: string;
  clauseLabel?: string;
}) {
  return (
    <article className="hang">
      <div className="hang-head">
        <h3>{title}</h3>
        {clause ? (
          <span className="clause">
            {clauseLabel} {clause}
          </span>
        ) : null}
      </div>
      <p>{body}</p>
    </article>
  );
}
