import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale, ORG, type Locale } from "@/lib/org";
import { getCopy } from "@/lib/content";
import { Band, BandHead, Hang } from "@/components/Band";
import { ObjectiveIcon } from "@/components/Icons";
import ContourField from "@/components/ContourField";
import ComplaintForm from "@/components/ComplaintForm";

export default async function HomePage({
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
      {/* Hero: the emblem carries the identity, the copy carries the
          purpose, and a proof strip beneath holds the credentials. */}
      <section className="hero">
        <ContourField />
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="tag enter d1">{t.home.eyebrow}</p>
            <h1 className="d-xl enter d2" style={{ marginTop: "1.25rem" }}>
              {t.home.titleNe}
            </h1>
            <p className="hero-sub enter d3">{t.home.titleEn}</p>
            <p className="lead enter d3" style={{ marginTop: "1.75rem" }}>
              {t.home.lead}
            </p>
            <div className="hero-actions enter d4">
              <Link className="btn btn-primary" href="#report">
                {t.home.ctaComplaint}
              </Link>
              <Link className="btn btn-ghost" href={`/${l}/join`}>
                {t.home.ctaJoin}
              </Link>
            </div>
          </div>

          <div className="hero-emblem enter d3">
            <Image
              src="/nirmaan-logo.png"
              alt={ne ? ORG.nameNe : ORG.nameEn}
              width={718}
              height={720}
              sizes="(max-width: 999px) 74vw, 380px"
              quality={90}
              priority
            />
          </div>
        </div>

        {/* Proof strip — the credentials, as one clean line, no box. */}
        <div className="proof enter d4">
          <div className="shell proof-row">
            <div className="proof-item">
              <span>{t.home.facts.regNo}</span>
              <b>{ne ? ORG.registrationNoNe : ORG.registrationNo}</b>
            </div>
            <div className="proof-item">
              <span>{t.home.facts.pan}</span>
              <b>{ne ? ORG.panNe : ORG.pan}</b>
            </div>
            <div className="proof-item">
              <span>{t.home.facts.status}</span>
              <b>{t.home.facts.statusValue}</b>
            </div>
            <div className="proof-item">
              <span>{t.home.facts.location}</span>
              <b>{ne ? ORG.cityNe : ORG.cityEn}</b>
            </div>
          </div>
        </div>
      </section>

      {/* The four commitments — the homepage's main graphic device. */}
      <Band>
        <BandHead
          tag={t.home.purposeTag}
          title={t.home.purposeTitle}
          lead={t.home.purposeLead}
        />
        <div className="grid-4">
          {t.home.objectives.map((objective) => (
            <article className="objective" key={objective.title}>
              <span className="objective-icon">
                <ObjectiveIcon name={objective.icon} />
              </span>
              <h3>{objective.title}</h3>
              <p>{objective.body}</p>
            </article>
          ))}
        </div>
      </Band>

      {/* The trust moment. This is the single strongest thing the
          organisation can say, and it is verifiable in its constitution. */}
      <Band ink>
        <div className="split">
          <div>
            <p className="tag">{t.home.nonPartisanTag}</p>
            <h2 className="d-lg" style={{ marginTop: "0.75rem" }}>
              {t.home.nonPartisanTitle}
            </h2>
            <p className="prose-body" style={{ marginTop: "1.5rem" }}>
              {t.home.nonPartisanBody}
            </p>
            <Link
              className="btn btn-ghost"
              href={`/${l}/about`}
              style={{ marginTop: "1.75rem" }}
            >
              {t.nav.about}
            </Link>
          </div>
          <div>
            <p className="clause">{t.home.nonPartisanClause}</p>
            <ul className="checklist" style={{ marginTop: "1.25rem" }}>
              {t.join.eligibility.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Band>

      {/* Accountability — the reason most people will arrive here.
          The form is embedded so anyone can file from the front page. */}
      <Band id="report">
        <BandHead
          tag={t.home.complaintTag}
          title={t.home.complaintTitle}
          lead={t.home.complaintBody}
          aside={
            <Link
              className="btn btn-ghost"
              href={`/${l}/complaints#track`}
            >
              {t.home.complaintTrack}
            </Link>
          }
        />
        <div className="split">
          <div className="stack-lg report-aside">
            <div>
              <p className="tag">{t.home.reportWhatTag}</p>
              <ul className="checklist" style={{ marginTop: "1.25rem" }}>
                {t.home.complaintExamples.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <ul className="list-plain stack-sm">
              {t.complaints.noticePoints.slice(0, 2).map((point) => (
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
            <Link
              className="text-clay"
              href={`/${l}/complaints`}
              style={{ fontWeight: 600 }}
            >
              {t.home.complaintFull} →
            </Link>
          </div>
          <ComplaintForm locale={l} />
        </div>
      </Band>

      {/* Programs preview. */}
      <Band>
        <BandHead
          tag={t.home.workTag}
          title={t.home.workTitle}
          aside={
            <Link className="btn btn-ghost" href={`/${l}/programs`}>
              {t.home.workCta}
            </Link>
          }
        />
        <div className="grid-3">
          {t.programs.items.slice(0, 3).map((item) => (
            <Hang key={item.title} title={item.title} body={item.body} />
          ))}
        </div>
      </Band>

      {/* Publications preview. */}
      <Band>
        <BandHead
          tag={t.home.pubTag}
          title={t.home.pubTitle}
          aside={
            <Link className="btn btn-ghost" href={`/${l}/publications`}>
              {t.home.pubCta}
            </Link>
          }
        />
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

      {/* Join. */}
      <Band ink tight>
        <div className="split" style={{ alignItems: "center" }}>
          <div>
            <p className="tag">{t.home.joinTag}</p>
            <h2 className="d-md" style={{ marginTop: "0.75rem" }}>
              {t.home.joinTitle}
            </h2>
          </div>
          <div>
            <p className="prose-body">{t.home.joinBody}</p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href={`/${l}/join`}>
                {t.home.joinCta}
              </Link>
              <Link className="btn btn-ghost" href={`/${l}/contact`}>
                {t.nav.contact}
              </Link>
            </div>
          </div>
        </div>
      </Band>
    </>
  );
}
