import { locales } from "@/i18n/routing";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = process.env.HOST_URL ?? "http://pimenov.kz:3000";
  return locales.map((locale) => ({
    url: `${url}/${locale}/main`,
    lastModified: new Date(),
  }));
}
