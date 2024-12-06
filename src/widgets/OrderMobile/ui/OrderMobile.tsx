"use client";

import { Flex, message, Typography } from "antd";
import { Total } from "./SubModule";
import { useTranslations } from "next-intl";
import useFetcherBasket from "@/shared/api/fetch/basket";
import { iBasket } from "@/shared/types/basket";
import useSelectedCity from "@/shared/hooks/useSelectedCity";
import { getPrice } from "@/entities/ProductCart";
import beautifulCost from "@/shared/tools/beautifulCost";
import { CreateOrder } from "@/features/create-order";

const { Title } = Typography

const OrderMobile: React.FC<{ basket_id: string }> = ({ basket_id }) => {

    const { data: dataBasket, isLoading, error } = useFetcherBasket({ by_id: basket_id });
    const [messageApi, contextHolder] = message.useMessage();

    const t = useTranslations();

    const selectedCity = useSelectedCity();

    const LoadingTotal: React.FC<{ dataBasket: iBasket | undefined, isLoading: boolean, error: boolean }> = ({ dataBasket, isLoading, error }) => {

        if (isLoading) {
            return <Flex justify="center" align="center">
                <Title level={5}>{t("loading")}</Title>
            </Flex>
        }
        if (error) {
            return <Flex justify="center" align="center">
                <Title level={5}>{t("error")}</Title>
            </Flex>
        }
        const total = dataBasket?.basket_items?.reduce((acc, item) => acc + item.count, 0);

        const totalPrice = dataBasket?.basket_items?.reduce((acc, item) => {
            const { price } = getPrice(item.prod, selectedCity);
            return acc + (price ?? 0) * item.count;
        }, 0);

        return <Total total={total ?? 0} totalPrice={beautifulCost(totalPrice ?? 0) ?? ""} />
    }


    return <Flex justify="center" align="center" >
        {contextHolder}
        <Flex vertical style={{ width: "95%" }}>
            <LoadingTotal dataBasket={dataBasket} isLoading={isLoading} error={error} />
            <CreateOrder basket_id={basket_id} />
        </Flex>
    </Flex>
};


export default OrderMobile;