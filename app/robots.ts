import { locales } from "@/i18n/routing";
import {  UrlApiWithDomain, UrlRevalidate } from "@/shared/api/url";
import { iCity } from "@/shared/types/city";
import { MetadataRoute } from "next";
 
export default async function robots(): Promise<MetadataRoute.Robots> {

  try {
    const response = await fetch(UrlApiWithDomain.getCity, {
      ...UrlRevalidate.getCity,
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data: iCity[] = await response.json();

    const disallow =  locales.flatMap((locale) =>
      data.map((city) => (
        [`/${locale}/city/${city.additional_data.EN}/basket/*`,
        `/${locale}/city/${city.additional_data.EN}/order/*`,
        `/${locale}/city/${city.additional_data.EN}/login-redirect/*`,
        `/${locale}/city/${city.additional_data.EN}/logout`,
        `/${locale}/city/${city.additional_data.EN}/order-history/*`,
        `/${locale}/city/${city.additional_data.EN}/profile`,
        `/${locale}/city/${city.additional_data.EN}/user/*`,
        ]))
    );

    return {
        rules: [
          {
            userAgent: '*',
            allow: '/',
            disallow: disallow.flat(),
          },
        ],
        sitemap: 'https://sck.kz/sitemap.xml',
    };

  } catch (error) {
    console.error("Ошибка при создании sitemap:", error);
    return {
      rules: [
        {
          userAgent: '*',
          allow: '/',
          disallow: [],
        },
      ],
      sitemap: 'https://sck.kz/sitemap.xml',
    };
  }
}