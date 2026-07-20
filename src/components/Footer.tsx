import Link from "next/link";
import { NAV, ORG, type Locale } from "@/lib/org";
import { getCopy } from "@/lib/content";
import Social from "./Social";

export default function Footer({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  const ne = locale === "ne";

  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-grid">
          <div>
            <p className="d-sm" style={{ color: "#fff", marginBottom: "0.5rem" }}>
              {ne ? ORG.nameNe : ORG.nameEn}
            </p>
            <p style={{ margin: 0, maxWidth: "34ch", lineHeight: 1.6 }}>
              {t.footer.tagline}
            </p>
            <div style={{ marginTop: "1.5rem" }}>
              <h4>{t.footer.followTitle}</h4>
              <Social size={19} />
            </div>
          </div>

          <div>
            <h4>{t.footer.exploreTitle}</h4>
            <div className="footer-links">
              {NAV.map((item) => (
                <Link key={item.href} href={`/${locale}${item.href}`}>
                  {t.nav[item.key]}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4>{t.footer.contactTitle}</h4>
            <div className="footer-links">
              <a href={`mailto:${ORG.email}`}>{ORG.email}</a>
              {ORG.phones.map((phone) => (
                <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`}>
                  {phone}
                </a>
              ))}
              <span style={{ lineHeight: 1.6 }}>
                {ne ? ORG.cityNe : ORG.cityEn}
              </span>
            </div>
          </div>
        </div>

        <div className="footer-base">
          <span>
            © {new Date().getFullYear()} {t.footer.rights} · {t.footer.nonProfit}
          </span>
          <span>
            {t.footer.registeredLine} ·{" "}
            {ne
              ? `दर्ता नं. ${ORG.registrationNoNe}`
              : `Reg. no. ${ORG.registrationNo}`}{" "}
            · {ne ? `स्थायी लेखा नं. ${ORG.panNe}` : `PAN ${ORG.pan}`}
          </span>
        </div>
      </div>
    </footer>
  );
}
