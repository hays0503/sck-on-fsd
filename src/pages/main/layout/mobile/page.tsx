"use server";
import { UrlApi, UrlApiWithDomain, UrlRevalidate } from "@/shared/api/url";
import { ProvidersClient } from "@/shared/providers/providersClient";
import { ProvidersServer } from "@/shared/providers/providersServer";
import { iCity } from "@/shared/types/city";
import { Populates } from "@/shared/types/populates";
import { FooterAboutMobile } from "@/widgets/FooterAboutMobile";
import { FooterMobile } from "@/widgets/FooterMobile";
import { HeaderMobile } from "@/widgets/HeaderMobile";
import { LayoutMain } from "@/widgets/LayoutMain";
import { Flex } from "antd";
import { type SearchParams } from "nuqs/server";
import { searchParamsCache } from "./searchParams";
import { ProductPopularListPagination } from "@/widgets/ProductPopularListPagination";
import { SelectCity } from "@/features/select-city";

import { Category } from "@/shared/types/category";
import { BannerMobileSlider } from "@/widgets/BannerMobileSlider";

type PageProps = {
  params: {
    slug: string;
    locale: string;
    city: string;
  };
  searchParams: Promise<SearchParams>;
};
export default async function HomePage({ params, searchParams }: PageProps) {
  const { page } = searchParamsCache.parse(await searchParams);

  let fallback = {};
  try {
    let fetchCity; 
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

      fallback = { [UrlApi.getCity]: fetchCity };

    } catch (error) {
      console.error("Возникла ошибка при получении городов:", error);
    }


    // Поиск города
    const FindCity: iCity[] = fetchCity.filter(
      (i: iCity) => i.additional_data.EN === params.city
    );

    // Если найден город, добавляем данные о населенных пунктах города
    if (FindCity.length > 0) {
      const RusCity: string = FindCity[0].name_city;
      const UrlPopulatesByCity = `/api/by_city/populates?city=${RusCity}`;
      const port = `:${process.env.PORT}`;
      const UrlWithDomainPopulatesByCity = `${process.env.HOST_URL}${port ?? ""}${UrlPopulatesByCity}`;

      const fetchPopulatesByCity = await (
        await fetch(UrlWithDomainPopulatesByCity, {
          ...UrlRevalidate.getPopulatesId,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
      ).json();

      fallback = {
        ...fallback,
        [UrlPopulatesByCity]: fetchPopulatesByCity,
      };
    }
  } catch (error) {
    console.error("Возникла ошибка при получении населенных пунктов:", error);
  }

  try {
    const fetchPopulates = await (
      await fetch(UrlApiWithDomain.getPopulatesId, {
        ...UrlRevalidate.getPopulatesId,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
    ).json();

    fallback = { [UrlApi.getPopulatesId]: fetchPopulates, ...fallback };
    try {
      const PopularProductsByIds = `by_ids/${fetchPopulates
        .flatMap((i: Populates) => i.products)
        .join(",")}`;
      const UrlApiPopularProductsByIds = UrlApi.getProducts + PopularProductsByIds;
      const UrlApiWithDomainPopularProductsByIds =
        UrlApiWithDomain.getProducts + PopularProductsByIds;
      const fetchPopularProductsByIds = await (
        await fetch(UrlApiWithDomainPopularProductsByIds, {
          ...UrlRevalidate.getProducts,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
      ).json();


      fallback = { [UrlApiPopularProductsByIds]: fetchPopularProductsByIds, ...fallback };
    } catch (error) {
      console.error("Возникла ошибка при получении популярных продуктов:", error);
    }
  } catch (error) {
    console.error("Возникла ошибка при получении населенных пунктов:", error);
  }


  let fetchCategory: Category[] = [];
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
    fallback = { [UrlApi.getCategory]: fetchCategory, ...fallback };
  } catch (error) {
    console.error("Возникла ошибка при получении категорий:", error);
  }
  
  const categoryForBanner:Category[] = [...fetchCategory.filter((i:Category)=>i.list_url_to_baner.length>0)] ;
  

  return (
    <ProvidersServer>
      <ProvidersClient params={params} fallback={fallback}>
        <LayoutMain
          headerContent={
            <HeaderMobile SelectCity={SelectCity} />
          }
          content={
            <Flex vertical={true} gap={20}>
              <BannerMobileSlider  category={categoryForBanner} />
              <ProductPopularListPagination
                searchParams={{ page }}
              />
              <FooterAboutMobile />
            </Flex>
          }
          footerContent={

            <FooterMobile />
          }
        />
      </ProvidersClient>
    </ProvidersServer>
  );
}
