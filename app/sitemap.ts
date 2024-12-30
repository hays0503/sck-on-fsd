import { locales } from "@/i18n/routing";
import { ApiUrl, UrlApiWithDomain, UrlRevalidate } from "@/shared/api/url";
import { iCity } from "@/shared/types/city";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const response = await fetch(UrlApiWithDomain.getCity, {
      ...UrlRevalidate.getCity,
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data: iCity[] = await response.json();

    const url = process.env.HOST_URL ?? ApiUrl;

    return locales.flatMap((locale) =>
      data.map((city) => ({
        url: `${url}/${locale}/city/${city.additional_data.EN}/main`,
        lastModified: new Date(),
      }))
    );
  } catch (error) {
    console.error("Ошибка при создании sitemap:", error);
    return [];
  }
}
