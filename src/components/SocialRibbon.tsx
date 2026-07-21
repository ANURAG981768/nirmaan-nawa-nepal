import { SOCIAL, ORG } from "@/lib/org";

/**
 * A slim top ribbon with the official social accounts in their own brand
 * colours, aligned left. Sits above the masthead — a quiet, familiar strip
 * that gives the pages an anchored, finished top edge.
 */

const BRAND: Record<string, string> = {
  facebook: "#1877F2",
  instagram: "#E4405F",
  tiktok: "#111111",
};

function Glyph({ name }: { name: string }) {
  switch (name) {
    case "facebook":
      return (
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.14 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.8 8.44-4.94 8.44-9.94z" />
      );
    case "instagram":
      return (
        <>
          <rect x="2.8" y="2.8" width="18.4" height="18.4" rx="5.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="17.2" cy="6.8" r="1.2" />
        </>
      );
    case "tiktok":
      return (
        <path d="M16.6 5.82a4.28 4.28 0 0 1-1.05-2.82h-3.2v12.4a2.6 2.6 0 0 1-2.6 2.5 2.6 2.6 0 1 1 .77-5.08V9.5a5.9 5.9 0 0 0-.77-.05 5.8 5.8 0 1 0 5.8 5.8V9.01a7.44 7.44 0 0 0 4.34 1.39V7.2a4.28 4.28 0 0 1-3.29-1.38z" />
      );
    default:
      return null;
  }
}

export default function SocialRibbon() {
  return (
    <div className="topbar">
      <div className="shell topbar-inner">
        <ul className="topbar-social">
          {SOCIAL.map((item) => (
            <li key={item.key}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                title={item.label}
                style={{ color: BRAND[item.key] }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <Glyph name={item.key} />
                </svg>
              </a>
            </li>
          ))}
        </ul>
        <a className="topbar-mail" href={`mailto:${ORG.email}`}>
          {ORG.email}
        </a>
      </div>
    </div>
  );
}
