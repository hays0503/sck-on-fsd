"use client";
import { Flex, Typography } from "antd";
import React from "react";
import useFetcherBasket from "@/shared/api/fetch/basket";
import { BasketDetail, BasketInfo, ProductsInBasket } from "./SubModule";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";

interface IBasketMobileProps {
  readonly basket_id: string;
}

const BasketMobile: React.FC<IBasketMobileProps> = ({ basket_id }) => {
  const t = useTranslations();
  const { data: fetchBasket, error } = useFetcherBasket({ by_id: basket_id });
  const city = useGetCityParams();
  const Empty = () => {
    return (
      <Flex justify="center" align="center" vertical={true}>
        <Typography.Title level={3}>{t("korzina-pusta")}</Typography.Title>
        <Link href={`/city/${city}/main`}>{t("na-glavnuyu")}</Link>
      </Flex>
    );
  };

  try {
    if (!fetchBasket || error) {
      throw error;
    }

    if (!fetchBasket?.basket_items) {
      return <div>empty</div>;
    }

    return (
      <Flex justify="center" align="center" gap={10} style={{ width: "100%" }}>
        <Flex vertical={true} style={{ width: "95%" }} gap={10}>
          <ProductsInBasket Products={fetchBasket.basket_items} />
          <BasketInfo />
          <BasketDetail Products={fetchBasket.basket_items} />
        </Flex>
      </Flex>
    );
  } catch (error) {
    console.log(error);
    return <Empty />;
  }
};

export default BasketMobile;
