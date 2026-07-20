import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, ORG, type Locale } from "@/lib/org";
import { getCopy } from "@/lib/content";
import { Band } from "@/components/Band";
import JoinForm from "@/components/JoinForm";
import Social from "@/components/Social";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getCopy(locale);
  return {
    title: t.contact.tag,
    description: t.contact.metaDesc,
    alternates: { canonical: `/${locale}/contact` },
  };
}

export default async function ContactPage({
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
      <Band tight ticks={false}>
        <p className="tag">{t.contact.tag}</p>
        <h1 className="d-lg" style={{ marginTop: "0.75rem" }}>
          {t.contact.title}
        </h1>
        <p className="lead" style={{ marginTop: "1.5rem", maxWidth: "58ch" }}>
          {t.contact.lead}
        </p>
      </Band>

      <Band>
        <div className="grid-4">
          <article className="hang">
            <div className="hang-head">
              <h3>{t.contact.officeTitle}</h3>
            </div>
            <p>{ne ? ORG.addressNe : ORG.addressEn}</p>
            <p className="mono">
              {ne
                ? `कार्यक्षेत्र: ${ORG.workingAreaNe}`
                : `Working area: ${ORG.workingAreaEn}`}
            </p>
          </article>

          <article className="hang">
            <div className="hang-head">
              <h3>{t.contact.emailTag}</h3>
            </div>
            <p>
              <a
                href={`mailto:${ORG.email}`}
                style={{ color: "var(--clay)", textDecoration: "none" }}
              >
                {ORG.email}
              </a>
            </p>
            <p>{t.contact.hoursNote}</p>
          </article>

          <article className="hang">
            <div className="hang-head">
              <h3>{t.contact.phoneTag}</h3>
            </div>
            {ORG.phones.map((phone) => (
              <p key={phone} style={{ margin: 0 }}>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  style={{ color: "var(--clay)", textDecoration: "none" }}
                >
                  {phone}
                </a>
              </p>
            ))}
          </article>

          <article className="hang">
            <div className="hang-head">
              <h3>{t.contact.followTitle}</h3>
            </div>
            <p>{t.contact.followBody}</p>
            <Social size={19} />
          </article>
        </div>
      </Band>

      {/* Route problem reports to the tracked channel, not to email. */}
      <Band ink tight>
        <div className="split" style={{ alignItems: "center" }}>
          <div>
            <p className="tag">{t.contact.complaintPrompt}</p>
            <h2 className="d-md" style={{ marginTop: "0.75rem" }}>
              {t.complaints.title}
            </h2>
          </div>
          <div>
            <p className="prose-body">{t.contact.complaintPromptBody}</p>
            <Link
              className="btn btn-primary"
              href={`/${l}/complaints`}
              style={{ marginTop: "1.5rem" }}
            >
              {t.contact.complaintPromptCta}
            </Link>
          </div>
        </div>
      </Band>

      {/* The one form: questions, membership, volunteering, partnership. */}
      <Band>
        <div className="split">
          <div>
            <p className="tag">{t.contact.formTag}</p>
            <h2 className="d-md" style={{ marginTop: "0.75rem" }}>
              {t.contact.formTitle}
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
