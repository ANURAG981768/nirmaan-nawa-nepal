"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, ORG, type Locale } from "@/lib/org";
import { getCopy } from "@/lib/content";

export default function Masthead({ locale }: { locale: Locale }) {
  const t = getCopy(locale);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // A menu left open across a navigation is a papercut on phones.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const stripped = pathname.replace(/^\/(en|ne)/, "") || "/";
  const other: Locale = locale === "en" ? "ne" : "en";

  const links = NAV.map((item) => ({
    href: `/${locale}${item.href}`,
    label: t.nav[item.key],
    active: stripped === item.href,
  }));

  return (
    <header className="masthead">
      <div className="shell masthead-inner">
        <Link className="brand" href={`/${locale}`}>
          <Image
            src="/nirmaan-logo.png"
            alt=""
            width={42}
            height={42}
            priority
          />
          <span className="brand-name">
            <b>{locale === "ne" ? ORG.nameNe : ORG.nameEn}</b>
            <span>{locale === "ne" ? ORG.nameEn : ORG.nameEnLegal}</span>
          </span>
        </Link>

        <nav className="nav nav-desktop" aria-label={t.nav.menu}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-active={link.active}
              aria-current={link.active ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="nav-right">
          <div className="lang">
            <Link href={`/${locale}${stripped === "/" ? "" : stripped}`} data-active={true}>
              {locale === "en" ? "EN" : "ने"}
            </Link>
            <Link
              href={`/${other}${stripped === "/" ? "" : stripped}`}
              hrefLang={other}
              aria-label={t.otherLangName}
            >
              {other === "en" ? "EN" : "ने"}
            </Link>
          </div>

          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="nav-mobile"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? t.nav.close : t.nav.menu}
          </button>
        </div>
      </div>

      {open ? (
        <nav id="nav-mobile" className="shell nav nav-mobile" aria-label={t.nav.menu}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-active={link.active}
              aria-current={link.active ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
