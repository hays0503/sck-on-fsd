"use server";

import { UrlApi, UrlApiWithDomain, UrlRevalidate } from "@/shared/api/url";
import { ProvidersClient } from "@/shared/providers/providersClient";
import { ProvidersServer } from "@/shared/providers/providersServer";
import { selectDataByLangCategory } from "@/shared/tools/selectDataByLang";
import { iCity } from "@/shared/types/city";
import HeaderText from "@/shared/ui/HeaderText";
import { FooterAboutMobile } from "@/widgets/FooterAboutMobile";
import { FooterMobile } from "@/widgets/FooterMobile";
import { LayoutCustom } from "@/widgets/LayoutCustom";
import { ProductCatalogListPagination } from "@/widgets/ProductCatalogListPagination";
import { Flex } from "antd";

import { type SearchParams } from "nuqs/server";
import { searchParamsCache } from "./searchParams";

type PageProps = {
  params: {
    slug: string;
    locale: string;
    city: string;
  };
  searchParams: Promise<SearchParams>;
};

async function CatalogPage({ params, searchParams }: PageProps) {
  // Slug - slug категории
  // locale - язык
  // city - город
  const { slug, locale } = params;

  const { page, sortOrder } = await searchParamsCache.parse(searchParams);

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

  const fetchCurrentCategory = await (
    await fetch(UrlApiWithDomain.getCategory + slug, {
      ...UrlRevalidate.getCategory,
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
  };

  if (FindCity.length > 0) {
    const RusCity: string = FindCity[0].name_city;
    const urlBuilderProductsByCategory = `/api/by_city/catalog?slug=${slug}&city=${RusCity}`;
    const urlBuilderProductsByCategoryWithDomain = `${process.env.HOST_URL}${urlBuilderProductsByCategory}`;
    const fetchProductsByCategory = await (
      await fetch(urlBuilderProductsByCategoryWithDomain, {
        ...UrlRevalidate.getProducts,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
    ).json();

    fallback = {
      ...fallback,
      [urlBuilderProductsByCategory]: fetchProductsByCategory,
    };
  }


  return (
    <ProvidersServer>
      <ProvidersClient params={params} fallback={fallback}>
        <LayoutCustom
          h="px"
          hightHeader={70}
          hightFooter={80}
          headerContent={
            <HeaderText
              text={
                selectDataByLangCategory(fetchCurrentCategory, locale) ?? ""
              }
            />
          }
          content={
            <Flex vertical={true} gap={20}>
              <ProductCatalogListPagination params={params} searchParams={{page, sortOrder}}/>
              <FooterAboutMobile />
            </Flex>
          }
          footerContent={<FooterMobile defaultKey="2" />}
        />
      </ProvidersClient>
    </ProvidersServer>
  );
}
export default CatalogPage;
