"use server"

import { UrlApi, UrlApiWithDomain, UrlRevalidate } from "@/shared/api/url";
import { ProvidersClient } from "@/shared/providers/providersClient";
import { ProvidersServer } from "@/shared/providers/providersServer";
import HeaderText from "@/shared/ui/HeaderText";
import { FooterMobile } from "@/widgets/FooterMobile";
import { LayoutCustom } from "@/widgets/LayoutCustom";
import { OrderHistoryMobile } from "@/widgets/OrderHistoryMobile";
import { getTranslations } from "next-intl/server";

interface OrderPageProps {
    readonly params: {
        locale: string;
        city: string;
        refreshToken: string;
    }
}
  

const OrderHistoryPage = async ({ params }: OrderPageProps) => {

    const t = await getTranslations()

    let fallback = {};

    try{
        const fetchCity = await (
            await fetch(UrlApiWithDomain.getCity, {
                ...UrlRevalidate.getCity,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            })
        ).json();
        fallback = { [UrlApi.getCity]: fetchCity };
    }catch(e) {
        console.log("Не вышло запросить города")
        console.log(e)
        return "Не вышло запросить города"
    }


    let fetchAccessToken = undefined;
    try{
        fetchAccessToken = await (
            await fetch(`http://sck.kz:8999/auth_api/v1/token/refresh`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    token: params.refreshToken,
                }),
            })
        );
        if(fetchAccessToken.status !== 201) {
            return JSON.stringify(fetchAccessToken.text)
        }
        fetchAccessToken = await fetchAccessToken.json();
    }
    catch(e) {
        console.log("Не вышло запросить токен")
        console.log(e)
        return "Не вышло запросить токен"
    }
    
    let Orders = [];
    try{
        const getHistory = await fetch('http://sck.kz:8777/basket_api/v1/order/by_access_t/', {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    'access-token': fetchAccessToken.token,
                }});
        if(getHistory.status !== 200) {
            return JSON.stringify(getHistory.text)
        }
        Orders = await getHistory.json();

    }catch(e) {
        console.log("Не вышло запросить историю заказов")
        console.log(e)
        return "Не вышло запросить историю заказов"
    }  

    return (
        <ProvidersServer>
            <ProvidersClient params={params} fallback={fallback}>
                <LayoutCustom
                    h="px"
                    hightHeader={70}
                    hightFooter={70}
                    headerContent={<HeaderText text={t('istoriya-zakazov')} />}
                    content={<OrderHistoryMobile Orders={Orders} />}
                    footerContent={<FooterMobile defaultKey="4" />}
                />
            </ProvidersClient>
        </ProvidersServer>
    );
}

export default OrderHistoryPage