"use server";

import { Filter } from "@/features/new-product-filter";
import { UrlApi, UrlApiWithDomain, UrlRevalidate } from "@/shared/api/url";
import { ProvidersClient } from "@/shared/providers/providersClient";
import { ProvidersServer } from "@/shared/providers/providersServer";
import { selectDataByLangCategory } from "@/shared/tools/selectDataByLang";
import { iCity } from "@/shared/types/city";
import HeaderText from "@/shared/ui/HeaderText";
import { FooterAboutMobile } from "@/widgets/FooterAboutMobile";
import { FooterMobile } from "@/widgets/FooterMobile";
import { LayoutCustom } from "@/widgets/LayoutCustom";
import { ProductCatalog } from "@/widgets/ProductCatalog";
import { ShowcaseMobile } from "@/widgets/ShowcaseMobile";
import { Flex } from "antd";


// import { type SearchParams } from "nuqs/server";

type PageProps = {
  params: {
    slug: string;
    locale: string;
    city: string;
  };
  // searchParams: Promise<SearchParams>;
};

async function CatalogPage(
  { params,
    //  searchParams 
  }: PageProps) {

  // Slug - slug категории
  // locale - язык
  // city - город

  const { slug, locale } = params;

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
    try {
      const port = process.env.HOST_PORT ? `:${process.env.HOST_PORT}` : "";
      const RusCity: string = FindCity[0].name_city;
      const urlBuilderProductsByCategory = `/api/by_city/catalog?slug=${slug}&city=${RusCity}`;
      const urlBuilderProductsByCategoryWithDomain = `${process.env.HOST_URL}${port}${urlBuilderProductsByCategory}`;

      const fetchProductsByCategory = await fetch(urlBuilderProductsByCategoryWithDomain, {
        ...UrlRevalidate.getProducts,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })

      try {
        const data = await fetchProductsByCategory.json();
        fallback = {
          ...fallback,
          [urlBuilderProductsByCategory]: data,
        };
      } catch (error) {
        console.log(`Ошибка [разбора] запроса каталога по городам ${params.city} = > ${error}`,);
      }
    } catch (error) {
      console.log(`Ошибка запроса каталога по городам ${params.city} = > ${error}`,);
    }
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
              <ProductCatalog
                params={params}
                Catalog={ShowcaseMobile}
                Filter={Filter}
              />
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

{/* <Suspense fallback={
                <Flex align="center" justify="center" style={{ position: "relative" }}>
                  <Flex align="center" justify="center">
                    <svg style={{ position: "absolute" }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.6673 2.66545C14.6673 2.19874 14.667 1.96521 14.5762 1.78695C14.4963 1.63014 14.3693 1.50275 14.2125 1.42286C14.0342 1.33203 13.8004 1.33203 13.3337 1.33203H2.66699C2.20028 1.33203 1.96716 1.33203 1.7889 1.42286C1.6321 1.50275 1.50471 1.63014 1.42481 1.78695C1.33398 1.96521 1.33398 2.19874 1.33398 2.66545V3.27983C1.33398 3.48365 1.33398 3.58564 1.35701 3.68155C1.37742 3.76658 1.41118 3.8478 1.45687 3.92236C1.50839 4.00643 1.58057 4.07862 1.72461 4.22266L5.94356 8.44161C6.08768 8.58572 6.15935 8.6574 6.21088 8.74149C6.25657 8.81605 6.29078 8.89755 6.3112 8.98258C6.33399 9.07751 6.33399 9.1783 6.33398 9.37799V13.3412C6.33398 14.0555 6.33398 14.4129 6.48444 14.6281C6.61581 14.8159 6.81849 14.9412 7.04525 14.9747C7.30493 15.0131 7.62458 14.8535 8.26351 14.534L8.93018 14.2007C9.19773 14.0669 9.33118 13.9998 9.42891 13.9C9.51534 13.8117 9.58147 13.7058 9.62174 13.589C9.66729 13.4569 9.66732 13.307 9.66732 13.0079V9.3842C9.66732 9.18037 9.66732 9.07849 9.69034 8.98258C9.71076 8.89755 9.74451 8.81605 9.7902 8.74149C9.84139 8.65796 9.91287 8.58648 10.0551 8.44427L10.0579 8.44161L14.2769 4.22266C14.421 4.07853 14.4927 4.00646 14.5442 3.92236C14.5899 3.8478 14.6241 3.76658 14.6445 3.68155C14.6673 3.58662 14.6673 3.48573 14.6673 3.28603V2.66545Z" stroke="#464646" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg> 
                    <Spin size="default" />
                  </Flex>
                  <span>Загрузка фильтров...</span>
                </Flex>
              }>
                <Filter category={params.slug} />
              </Suspense> */}
