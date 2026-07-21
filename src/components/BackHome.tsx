import Link from "next/link";
import { type Locale } from "@/lib/org";
import { getCopy } from "@/lib/content";

/**
 * A clear way back to the home page at the foot of every inner page. The
 * masthead logo also links home, but an explicit control at the end of a
 * page saves people hunting for it — especially on a phone.
 */
export default function BackHome({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  return (
    <div className="band band-tight back-home-band">
      <div className="shell">
        <Link className="btn btn-ghost back-home-btn" href={`/${locale}`}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 10.5 12 3l9 7.5" />
            <path d="M5 9.5V21h14V9.5" />
            <path d="M9.5 21v-6h5v6" />
          </svg>
          {t.common.backHome}
        </Link>
      </div>
    </div>
  );
}
