import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, ORG, type Locale } from "@/lib/org";
import { getCopy } from "@/lib/content";
import { Band, BandHead } from "@/components/Band";
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
    title: t.publications.tag,
    description: t.publications.metaDesc,
    alternates: { canonical: `/${locale}/publications` },
  };
}

export default async function PublicationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const t = getCopy(l);
  const ne = l === "ne";

  return (
    <>
      <Band tight ticks={false} contour>
        <p className="tag">{t.publications.tag}</p>
        <h1 className="d-lg" style={{ marginTop: "0.75rem" }}>
          {t.publications.title}
        </h1>
        <p className="lead" style={{ marginTop: "1.5rem", maxWidth: "58ch" }}>
          {t.publications.lead}
        </p>
      </Band>

      <Band>
        <div className="grid-3">
          {t.publications.kinds.map((kind) => (
            <article className="card" key={kind.title}>
              <p className="tag tag-quiet">{kind.kind}</p>
              <h3>{kind.title}</h3>
              <p>{kind.body}</p>
            </article>
          ))}
        </div>
      </Band>

      {/* Honest empty state. Filling this with borrowed content to look
          established would undercut the point of the organisation. */}
      <Band>
        <BandHead tag={t.publications.emptyTag} title={t.publications.emptyTitle} />
        <div className="card card-empty" style={{ maxWidth: "52rem" }}>
          <p>{t.publications.emptyBody}</p>
          <div style={{ marginTop: "0.75rem" }}>
            <Link className="btn btn-ghost" href={`/${l}/join`}>
              {t.publications.emptyCta}
            </Link>
          </div>
        </div>
      </Band>

      <Band ink tight>
        <div className="split" style={{ alignItems: "center" }}>
          <div>
            <p className="tag">{t.publications.submitTag}</p>
            <h2 className="d-md" style={{ marginTop: "0.75rem" }}>
              {t.publications.submitTitle}
            </h2>
          </div>
          <div>
            <p className="prose-body">{t.publications.submitBody}</p>
            <a
              className="btn btn-primary"
              href={`mailto:${ORG.email}?subject=${encodeURIComponent(
                ne ? "प्रकाशनका लागि सामग्री" : "Publication submission",
              )}`}
              style={{ marginTop: "1.5rem" }}
            >
              {t.publications.submitCta}
            </a>
          </div>
        </div>
      </Band>
      <BackHome locale={l} />
    </>
  );
}
