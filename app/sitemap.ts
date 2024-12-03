import { locales } from "@/i18n/routing";
import { ApiUrl } from "@/shared/api/url";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = process.env.HOST_URL ?? ApiUrl;
  return locales.map((locale) => ({
    url: `${url}/${locale}/main`,
    lastModified: new Date(),
  }));
}
