import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/org";
import { getCopy } from "@/lib/content";
import Link from "next/link";
import { Band, BandHead, Hang } from "@/components/Band";
import BackHome from "@/components/BackHome";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getCopy(locale);
  return {
    title: t.about.tag,
    description: t.about.metaDesc,
    alternates: { canonical: `/${locale}/about` },
  };
}

export default async function AboutPage({
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
        <p className="tag">{t.about.tag}</p>
        <h1 className="d-lg" style={{ marginTop: "0.75rem" }}>
          {t.about.title}
        </h1>
        <p className="lead" style={{ marginTop: "1.5rem", maxWidth: "58ch" }}>
          {t.about.lead}
        </p>
      </Band>

      <Band>
        <div className="split">
          <div>
            <p className="tag">{t.about.storyTag}</p>
            <h2 className="d-md" style={{ marginTop: "0.75rem" }}>
              {t.about.storyTitle}
            </h2>
          </div>
          <div className="prose-body">
            {t.about.storyBody.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Band>

      {/* Governance — the structure the constitution requires. */}
      <Band>
        <BandHead
          tag={t.about.govTag}
          title={t.about.govTitle}
          lead={t.about.govLead}
        />
        <div className="grid-4">
          {t.about.govItems.map((item) => (
            <Hang
              key={item.clause}
              title={item.title}
              body={item.body}
              clause={item.clause}
              clauseLabel={t.common.clausePrefix}
            />
          ))}
        </div>
      </Band>

      {/* Money — where funds come from and the legal limits on them. */}
      <Band ink>
        <BandHead
          tag={t.about.moneyTag}
          title={t.about.moneyTitle}
          lead={t.about.moneyLead}
        />
        <div className="split">
          <ul className="list-plain stack-sm">
            {t.about.moneyItems.map((item) => (
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
          <div className="stack">
            <p className="prose-body">{t.about.moneyForeign}</p>
            <p className="prose-body">{t.about.moneyAudit}</p>
          </div>
        </div>
      </Band>

      <Band tight>
        <div className="split" style={{ alignItems: "center" }}>
          <div>
            <p className="tag">{t.about.docsTag}</p>
            <h2 className="d-md" style={{ marginTop: "0.75rem" }}>
              {t.about.docsTitle}
            </h2>
          </div>
          <div>
            <p className="prose-body">{t.about.docsBody}</p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href={`/${l}/contact`}>
                {t.about.docsCta}
              </Link>
              <Link className="btn btn-ghost" href={`/${l}/complaints`}>
                {t.about.docsReport}
              </Link>
            </div>
          </div>
        </div>
      </Band>

      <BackHome locale={l} />
    </>
  );
}
