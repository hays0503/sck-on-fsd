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
import { ProductListPagination } from "@/widgets/ProductListPagination";
import { Flex } from "antd";

export default async function HomePage({
  params,
}: {
  params: { locale: string; city: string };
}) {
  const fetchCity = await (
    await fetch(UrlApiWithDomain.getCity, {
      ...UrlRevalidate.getCity,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
  ).json();

  const fetchCategory = await (
    await fetch(UrlApiWithDomain.getCategory, {
      ...UrlRevalidate.getCategory,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
  ).json();

  const fetchPopulates = await (
    await fetch(UrlApiWithDomain.getPopulatesId, {
      ...UrlRevalidate.getPopulatesId,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
  ).json();

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

  // Поиск города
  const FindCity: iCity[] = fetchCity.filter(
    (i: iCity) => i.additional_data.EN === params.city
  );

  let fallback = {
    [UrlApi.getCity]: fetchCity,
    [UrlApi.getCategory]: fetchCategory,
    [UrlApi.getPopulatesId]: fetchPopulates,
    [UrlApiPopularProductsByIds]: fetchPopularProductsByIds,
  };

  // Если найден город, добавляем данные о населенных пунктах города
  if (FindCity.length > 0) {
    const RusCity: string = FindCity[0].name_city;
    const UrlPopulatesByCity = `/api/by_city/populates?city=${RusCity}`;
    const UrlWithDomainPopulatesByCity = `http://localhost:3000${UrlPopulatesByCity}`;
    console.log("UrlFetchPopulatesByCity =>", UrlWithDomainPopulatesByCity);
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

  return (
    <ProvidersServer>
      <ProvidersClient params={params} fallback={fallback}>
        <LayoutMain
          headerContent={<HeaderMobile />}
          content={
            <Flex vertical={true} gap={20}>
              <ProductListPagination />
              <FooterAboutMobile />
            </Flex>
          }
          footerContent={<FooterMobile />}
        />
      </ProvidersClient>
    </ProvidersServer>
  );
}
