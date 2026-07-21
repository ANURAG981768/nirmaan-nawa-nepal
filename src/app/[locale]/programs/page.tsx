import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, ORG, type Locale } from "@/lib/org";
import { getCopy } from "@/lib/content";
import { Band, Hang } from "@/components/Band";
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
    title: t.programs.tag,
    description: t.programs.metaDesc,
    alternates: { canonical: `/${locale}/programs` },
  };
}

export default async function ProgramsPage({
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
        <p className="tag">{t.programs.tag}</p>
        <h1 className="d-lg" style={{ marginTop: "0.75rem" }}>
          {t.programs.title}
        </h1>
        <p className="lead" style={{ marginTop: "1.5rem", maxWidth: "58ch" }}>
          {t.programs.lead}
        </p>
      </Band>

      <Band>
        <div className="grid-3">
          {t.programs.items.map((item) => (
            <Hang key={item.title} title={item.title} body={item.body} />
          ))}
        </div>
      </Band>

      <Band ink tight>
        <div className="split" style={{ alignItems: "center" }}>
          <div>
            <p className="tag">{t.programs.proposeTag}</p>
            <h2 className="d-md" style={{ marginTop: "0.75rem" }}>
              {t.programs.proposeTitle}
            </h2>
          </div>
          <div>
            <p className="prose-body">{t.programs.proposeBody}</p>
            <a
              className="btn btn-primary"
              href={`mailto:${ORG.email}?subject=${encodeURIComponent(
                ne ? "सहकार्य प्रस्ताव" : "Collaboration proposal",
              )}`}
              style={{ marginTop: "1.5rem" }}
            >
              {t.nav.contact}
            </a>
          </div>
        </div>
      </Band>

      <BackHome locale={l} />
    </>
  );
}
