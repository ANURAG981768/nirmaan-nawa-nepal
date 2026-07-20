import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/org";
import { getCopy } from "@/lib/content";
import { Band, BandHead } from "@/components/Band";
import JoinForm from "@/components/JoinForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getCopy(locale);
  return {
    title: t.join.tag,
    description: t.join.metaDesc,
    alternates: { canonical: `/${locale}/join` },
  };
}

export default async function JoinPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const t = getCopy(l);

  return (
    <>
      <Band tight ticks={false}>
        <p className="tag">{t.join.tag}</p>
        <h1 className="d-lg" style={{ marginTop: "0.75rem" }}>
          {t.join.title}
        </h1>
        <p className="lead" style={{ marginTop: "1.5rem", maxWidth: "58ch" }}>
          {t.join.lead}
        </p>
      </Band>

      {/* Tiers — fees fixed by the constitution, not by whoever is in charge. */}
      <Band>
        <BandHead
          tag={t.join.tiersTag}
          title={t.join.tiersTitle}
          lead={t.join.tiersLead}
        />
        <div className="grid-3">
          {t.join.tiers.map((tier) => (
            <article className="card" key={tier.name}>
              <div className="hang-head">
                <p className="tag tag-quiet">{tier.note}</p>
                <span className="clause">
                  {t.common.clausePrefix} {tier.clause}
                </span>
              </div>
              <h3>{tier.name}</h3>
              <p>{tier.body}</p>
            </article>
          ))}
        </div>
      </Band>

      {/* Eligibility, straight from Clause 7. */}
      <Band ink>
        <div className="split">
          <div>
            <p className="tag">{t.join.eligibilityTag}</p>
            <h2 className="d-md" style={{ marginTop: "0.75rem" }}>
              {t.join.eligibilityTitle}
            </h2>
            <p className="prose-body" style={{ marginTop: "1.25rem" }}>
              {t.join.eligibilityLead}
            </p>
          </div>
          <ul className="list-plain stack-sm">
            {t.join.eligibility.map((item) => (
              <li
                key={item}
                style={{
                  borderTop: "1px solid #3c4d73",
                  paddingTop: "0.75rem",
                  color: "#c3cbdd",
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Band>

      <Band>
        <div className="split">
          <div>
            <p className="tag">{t.join.formTag}</p>
            <h2 className="d-md" style={{ marginTop: "0.75rem" }}>
              {t.join.formTitle}
            </h2>
            <p className="prose-body" style={{ marginTop: "1.25rem" }}>
              {t.join.formLead}
            </p>
          </div>
          <JoinForm locale={l} />
        </div>
      </Band>
    </>
  );
}
