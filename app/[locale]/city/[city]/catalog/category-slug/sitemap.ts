import { locales } from "@/i18n/routing";
import { ApiUrl, UrlApiWithDomain, UrlRevalidate } from "@/shared/api/url";
import { MetadataRoute } from "next/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let fetchCity = undefined;
  try {
    fetchCity = await (
      await fetch(UrlApiWithDomain.getCity, {
        ...UrlRevalidate.getCity,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
    ).json();
  } catch (error) {
    console.log("Ошибка запроса города ", error);
  }

  let fetchCategory = undefined;
  try {
    fetchCategory = await (
      await fetch(UrlApiWithDomain.getCategory, {
        ...UrlRevalidate.getCategory,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
    ).json();
  } catch (error) {
    console.log("Ошибка запроса категории  товаров", error);
  }

  const HOST_URL = process.env.HOST_URL ?? ApiUrl;

  const urls = fetchCity.map((i: { additional_data: { EN: string } }) => {
      const city = i.additional_data.EN;

      return fetchCategory.map((category: { slug: string }) => {
        const _languages: Record<string, string> = {};
        locales.filter((locale) => locale !== "ru").forEach((locale) => {
            _languages[locale] = `${HOST_URL}/${locale}/city/${city}/catalog/category-slug/${category.slug}`;
        });

        const sitemap = {
          url: `${HOST_URL}/ru/city/${city}/catalog/category-slug/${category.slug}`,
          lastModified: new Date(),
          alternates: {languages: _languages},
        };

        return sitemap;
      });
    }).flat();
  return await urls;
}
