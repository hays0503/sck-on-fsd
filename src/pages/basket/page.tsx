"use server";

import { ApiUrl, UrlApi, UrlApiWithDomain, UrlRevalidate } from "@/shared/api/url";
import { ProvidersClient } from "@/shared/providers/providersClient";
import { ProvidersServer } from "@/shared/providers/providersServer";
import { FooterMobile } from "@/widgets/FooterMobile";
import { LayoutCustom } from "@/widgets/LayoutCustom";
import HeaderText from "@/shared/ui/HeaderText";
import {getTranslations} from 'next-intl/server';
import { BasketMobile } from "@/widgets/BasketMobile";


interface BasketPageProps {
  readonly params: {
    locale: string;
    city: string;
    basket_id: string;
  };
}


async function BasketPage({params}: BasketPageProps) {

  const {basket_id} = params;

  const fetchCity = await (
    await fetch(UrlApiWithDomain.getCity, {
      ...UrlRevalidate.getCity,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
  ).json();

  const UrlApiBasketByUuid_id = `/basket_api/v1/bascket/by/${basket_id}/`;
  const UrlApiWithDomainBasketByUuid_id = `${ApiUrl}:8777${UrlApiBasketByUuid_id}`;

  console.log(UrlApiWithDomainBasketByUuid_id)
  console.log(UrlApiBasketByUuid_id)

  const fetchBasketByUuid_id = await (
    await fetch(UrlApiWithDomainBasketByUuid_id, {
      ...UrlRevalidate.getPopulatesId,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
  ).json();

  const fallback = {
    [UrlApi.getCity]: fetchCity,
    [UrlApiBasketByUuid_id]: fetchBasketByUuid_id
  };

  const t = await getTranslations()

  return (
    <ProvidersServer>
      <ProvidersClient params={params} fallback={fallback}>
        <LayoutCustom
          h="px"
          hightHeader={70}
          hightFooter={70}
          headerContent={<HeaderText text={t('korzina')} />}
          content={<BasketMobile basket_id={basket_id}/>}
          footerContent={<FooterMobile defaultKey="3" />}
        />
      </ProvidersClient>
    </ProvidersServer>
  );
}

export default BasketPage;
