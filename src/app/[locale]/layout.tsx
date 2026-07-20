import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Tiro_Devanagari_Hindi, Mukta, IBM_Plex_Mono } from "next/font/google";
import { locales, isLocale, ORG, SITE_URL, type Locale } from "@/lib/org";
import { getCopy } from "@/lib/content";
import Masthead from "@/components/Masthead";
import Footer from "@/components/Footer";
import "../globals.css";

/**
 * Display face for both scripts. Tiro Devanagari Hindi is a Devanagari-first
 * serif with a Latin companion designed to sit alongside it — so the Nepali
 * is not bolted onto a Latin design. It ships one weight, which is a feature
 * here: hierarchy comes from size and the rules, not from weight.
 */
const display = Tiro_Devanagari_Hindi({
  subsets: ["devanagari", "latin"],
  weight: "400",
  variable: "--font-tiro",
  display: "swap",
});

/** Body face, built for Devanagari and Latin together (Ek Type). */
const body = Mukta({
  subsets: ["devanagari", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mukta",
  display: "swap",
});

/** Records: registration numbers, clause citations, reference codes. */
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getCopy(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t.home.metaTitle,
      template: `%s — ${locale === "ne" ? ORG.nameNe : ORG.nameEn}`,
    },
    description: t.home.metaDesc,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", ne: "/ne" },
    },
    openGraph: {
      type: "website",
      siteName: locale === "ne" ? ORG.nameNe : ORG.nameEn,
      title: t.home.metaTitle,
      description: t.home.metaDesc,
      locale: locale === "ne" ? "ne_NP" : "en_US",
      url: `/${locale}`,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: locale === "ne" ? ORG.nameNe : ORG.nameEn,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.home.metaTitle,
      description: t.home.metaDesc,
      images: ["/og.png"],
    },
    icons: { icon: "/favicon.png", apple: "/favicon.png" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getCopy(locale as Locale);

  // Published so search engines and anyone checking us can see the
  // registration details as structured data, not just as page text.
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: locale === "ne" ? ORG.nameNe : ORG.nameEn,
    alternateName: locale === "ne" ? ORG.nameEn : ORG.nameNe,
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/nirmaan-logo.png`,
    email: ORG.email,
    telephone: ORG.phones[0],
    foundingDate: ORG.established,
    address: {
      "@type": "PostalAddress",
      streetAddress:
        locale === "ne" ? ORG.addressNe : ORG.addressEn,
      addressLocality: "Kathmandu",
      addressCountry: "NP",
    },
    identifier: [
      { "@type": "PropertyValue", name: "Registration number", value: ORG.registrationNo },
      { "@type": "PropertyValue", name: "PAN", value: ORG.pan },
    ],
  };

  return (
    /* The font variables go on <html>, not <body>: the design tokens in
       globals.css are declared on :root, and a var() there can only see
       variables defined on :root itself. */
    <html
      lang={t.htmlLang}
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <a className="skip" href="#main">
          {t.common.skip}
        </a>
        <Masthead locale={locale as Locale} />
        <main id="main">{children}</main>
        <Footer locale={locale as Locale} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </body>
    </html>
  );
}
