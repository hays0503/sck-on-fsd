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
    const baseUrl = process.env.HOST_URL ?? ApiUrl;

    return data.flatMap((city) => {
      const citySlug = city.additional_data.EN;

      // Генерация для всех локалей
      return locales.map((locale) => ({
        url: `${baseUrl}/${locale}/city/${citySlug}/main`,
        lastModified: new Date(),
        alternates: {
          languages: locales.reduce((acc, innerLocale) => {
            acc[innerLocale] = `${baseUrl}/${innerLocale}/city/${citySlug}/main`;
            return acc;
          }, {} as Record<string, string>),
        },
      }));
    });
  } catch (error) {
    console.error("Ошибка при создании sitemap:", error);
    return [];
  }
}
