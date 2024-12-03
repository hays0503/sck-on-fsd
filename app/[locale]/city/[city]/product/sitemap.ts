import { locales } from "@/i18n/routing";
import { ApiUrl, UrlApi, UrlApiWithDomain, UrlRevalidate } from "@/shared/api/url";
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

  let fetchSlugs = undefined;
  try {
    const url = `${ApiUrl}${UrlApi.getProducts}all/slugs/`
    fetchSlugs = await(await fetch(url,{
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })).json();
  } catch (error) {
    console.log("Ошибка запроса категории  товаров", error);
  }

  const HOST_URL = process.env.HOST_URL ?? ApiUrl;

  const urls = fetchCity.map((i: { additional_data: { EN: string } }) => {
      const city = i.additional_data.EN;

      return fetchSlugs.map((product: string) => {
        const _languages: Record<string, string> = {};
        locales.filter((locale) => locale !== "ru").forEach((locale) => {
            _languages[locale] = `${HOST_URL}/${locale}/city/${city}/product/${product}`;
        });

        const sitemap = {
          url: `${HOST_URL}/ru/city/${city}/product/${product}`,
          lastModified: new Date(),
          alternates: {languages: _languages},
        };

        return sitemap;
      });
    }).flat();
  return await urls;
}
