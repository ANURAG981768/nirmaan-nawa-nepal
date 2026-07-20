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
    <div className="band band-tight">
      <div className="shell">
        <Link className="back-home" href={`/${locale}`}>
          <span aria-hidden="true">←</span>
          {t.common.backHome}
        </Link>
      </div>
    </div>
  );
}
