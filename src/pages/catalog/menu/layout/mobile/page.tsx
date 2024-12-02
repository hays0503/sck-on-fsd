"use server";

import { UrlApi, UrlApiWithDomain, UrlRevalidate } from "@/shared/api/url";
import { ProvidersClient } from "@/shared/providers/providersClient";
import { ProvidersServer } from "@/shared/providers/providersServer";
import { buildFlatCategory } from "@/shared/tools/buildFlatCategory";
import { FooterMobile } from "@/widgets/FooterMobile";
import { LayoutCustom } from "@/widgets/LayoutCustom";
import HeaderText from "@/shared/ui/HeaderText";
import { selectDataByLangCategory } from "@/shared/tools/selectDataByLang";
import { Category } from "@/shared/types/category";
import { CatalogMenu } from "@/widgets/CatalogMenu";
import {getTranslations} from 'next-intl/server';

interface CategoryMenuPageProps {
  readonly params: {
    locale: string;
    city: string;
    slug: string;
  };
}

export async function generateStaticParams() {
  const fetchCategory = await (
    await fetch(UrlApiWithDomain.getCategory, {
      ...UrlRevalidate.getCategory,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
  ).json();

  const categoryFlat: Category[] = buildFlatCategory(fetchCategory);

  const categorySlugs = categoryFlat.map((item) => item.slug);

  return categorySlugs
}

async function CategoryMenuPage({params}: CategoryMenuPageProps) {

  const {slug} = params;
  console.log("slug", slug);

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

  const fallback = {
    [UrlApi.getCity]: fetchCity,
    [UrlApi.getCategory]: fetchCategory,
  };

  const t = await getTranslations()

  const categoryFlat: Category[] = buildFlatCategory(fetchCategory);

  const categoryFind = categoryFlat.find((item: Category) => item.slug === slug);

  const categoryName =
    selectDataByLangCategory(
      categoryFind,
      params.locale
    ) ?? t('vse-kategorii');

  return (
    <ProvidersServer>
      <ProvidersClient params={params} fallback={fallback}>
        <LayoutCustom
          h="px"
          hightHeader={70}
          hightFooter={70}
          headerContent={<HeaderText text={categoryName} />}
          content={<CatalogMenu slugCategory={slug} />}
          footerContent={<FooterMobile defaultKey="2" />}
        />
      </ProvidersClient>
    </ProvidersServer>
  );
}

export default CategoryMenuPage;
