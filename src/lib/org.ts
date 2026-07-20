/**
 * Verified organisational facts.
 *
 * Every value here is taken from an official document:
 *   - प्रमाण-पत्र, जिल्ला प्रशासन कार्यालय बबरमहल, काठमाडौं (registration certificate)
 *   - स्थायी लेखा नम्बर (PAN) दर्ता प्रमाण पत्र, आ.रा.का. जोरपाटी
 *   - निर्माण नव नेपालको विधान, २०८२ (the constitution)
 *
 * Do not add anything to this file that cannot be pointed at in one of
 * those documents. The credibility of the whole site rests on it.
 */

export const ORG = {
  nameNe: "निर्माण नव नेपाल",
  nameEn: "Nirmaan Nawa Nepal",
  nameEnLegal: "Build New Nepal",

  /** Society registration — विधान दफा १, प्रमाण-पत्र */
  registrationNo: "34",
  registrationNoNe: "३४",
  registeredUnder: "Association Registration Act, 2034 — Section 4",
  registeredUnderNe: "संस्था दर्ता ऐन, २०३४ को दफा ४",
  registeredWith: "District Administration Office, Babarmahal, Kathmandu",
  registeredWithNe: "जिल्ला प्रशासन कार्यालय, बबरमहल, काठमाडौं",
  registeredOn: "2082/05/06 (BS)",
  registeredOnNe: "२०८२।०५।०६",
  fileNo: "2082/083",
  fileNoNe: "२०८२/०८३",

  /** PAN — स्थायी लेखा नम्बर दर्ता प्रमाण पत्र */
  pan: "623219195",
  panNe: "६२३२१९१९५",
  panOffice: "Inland Revenue Office, Jorpati",
  panOfficeNe: "आन्तरिक राजस्व कार्यालय, जोरपाटी",
  taxpayerType: "Non-governmental organisation",
  taxpayerTypeNe: "गैर सरकारी संस्था",

  /** विधान passed — पारित भएको मिति */
  constitutionName: "The Constitution of Nirmaan Nawa Nepal, 2082",
  constitutionNameNe: "निर्माण नव नेपालको विधान, २०८२",
  constitutionPassed: "2082/03/25 (BS)",
  constitutionPassedNe: "२०८२।०३।२५",

  /** Office — विधान दफा १(क) */
  addressEn: "Kageshwari Manohara Municipality–6, Kathmandu, Nepal",
  addressNe: "कागेश्वरी मनोहरा न.पा.–६, काठमाडौं, नेपाल",
  workingAreaEn: "Kathmandu district",
  workingAreaNe: "काठमाडौं जिल्ला",

  established: "2082",
  establishedNe: "२०८२",

  email: "Nirmannawanepal@gmail.com",
  phones: ["+977 9824271665", "+977 9861041148"],
} as const;

/** Site URL — set NEXT_PUBLIC_SITE_URL on Vercel to the real domain. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://nirmaannawanepal.org";

export const locales = ["en", "ne"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const NAV = [
  { key: "about", href: "/about" },
  { key: "programs", href: "/programs" },
  { key: "publications", href: "/publications" },
  { key: "complaints", href: "/complaints" },
  { key: "join", href: "/join" },
  { key: "contact", href: "/contact" },
] as const;

/**
 * Official social accounts. Tracking parameters (?mibextid, ?igsh) have
 * been stripped — they identify the person who shared the link and have no
 * business in a link we publish.
 */
export const SOCIAL = [
  {
    key: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/share/1BZPS5dUGR/",
  },
  {
    key: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/nirman_nawa_np",
  },
  {
    key: "tiktok",
    label: "TikTok",
    href: "https://vt.tiktok.com/ZSXXAhPFD/",
  },
] as const;

export type SocialKey = (typeof SOCIAL)[number]["key"];
