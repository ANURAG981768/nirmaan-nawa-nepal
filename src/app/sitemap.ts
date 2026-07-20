import type { MetadataRoute } from "next";
import { locales, NAV, SITE_URL } from "@/lib/org";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...NAV.map((item) => item.href)];

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((alt) => [alt, `${SITE_URL}/${alt}${path}`]),
        ),
      },
    })),
  );
}
