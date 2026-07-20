import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/org";
import { getCopy } from "@/lib/content";
import { Band, BandHead } from "@/components/Band";
import ComplaintForm from "@/components/ComplaintForm";
import TrackForm from "@/components/TrackForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getCopy(locale);
  return {
    title: t.complaints.tag,
    description: t.complaints.metaDesc,
    alternates: { canonical: `/${locale}/complaints` },
  };
}

export default async function ComplaintsPage({
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
        <p className="tag">{t.complaints.tag}</p>
        <h1 className="d-lg" style={{ marginTop: "0.75rem" }}>
          {t.complaints.title}
        </h1>
        <p className="lead" style={{ marginTop: "1.5rem", maxWidth: "58ch" }}>
          {t.complaints.lead}
        </p>
      </Band>

      <Band>
        <div className="split">
          {/* What we can and cannot do, stated before they write. */}
          <div>
            <p className="tag">{t.complaints.noticeTitle}</p>
            <ul className="list-plain stack-sm" style={{ marginTop: "1.25rem" }}>
              {t.complaints.noticePoints.map((point) => (
                <li
                  key={point.slice(0, 24)}
                  style={{
                    borderTop: "1px solid var(--line-strong)",
                    paddingTop: "0.85rem",
                    fontSize: "0.9375rem",
                    lineHeight: 1.6,
                    color: "var(--slate)",
                  }}
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <ComplaintForm locale={l} />
        </div>
      </Band>

      <Band ink id="track">
        <BandHead
          tag={t.complaints.trackTag}
          title={t.complaints.trackTitle}
          lead={t.complaints.trackLead}
        />
        <TrackForm locale={l} />
      </Band>
    </>
  );
}
