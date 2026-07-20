import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale, ORG, type Locale } from "@/lib/org";
import { getCopy } from "@/lib/content";
import { Band, BandHead, Hang } from "@/components/Band";
import { ObjectiveIcon } from "@/components/Icons";
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
      {/* Hero. The credibility artifact is the hero: a registered
          organisation in a country where unregistered ones are common. */}
      <section className="hero">
        <div className="shell hero-grid">
          <div>
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

          <aside className="seal enter d4" aria-label={t.home.sealTitle}>
            <Image
              src="/nirmaan-logo.png"
              alt={ne ? ORG.nameNe : ORG.nameEn}
              width={420}
              height={420}
              priority
            />
            <dl className="seal-facts">
              <div className="fact">
                <dt>{t.home.facts.regNo}</dt>
                <dd>{ne ? ORG.registrationNoNe : ORG.registrationNo}</dd>
              </div>
              <div className="fact">
                <dt>{t.home.facts.pan}</dt>
                <dd>{ne ? ORG.panNe : ORG.pan}</dd>
              </div>
              <div className="fact">
                <dt>{t.home.facts.status}</dt>
                <dd>{t.home.facts.statusValue}</dd>
              </div>
              <div className="fact">
                <dt>{t.home.facts.location}</dt>
                <dd>{ne ? ORG.cityNe : ORG.cityEn}</dd>
              </div>
            </dl>
          </aside>
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
            <p className="clause" style={{ marginTop: "1.5rem" }}>
              {t.home.nonPartisanClause}
            </p>
          </div>
          <div>
            <h2 className="d-lg">{t.home.nonPartisanTitle}</h2>
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
          <div className="stack">
            <ul className="list-plain stack-sm">
              {t.complaints.noticePoints.slice(0, 3).map((point) => (
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
            <Link className="text-clay" href={`/${l}/complaints`} style={{ fontWeight: 600 }}>
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
