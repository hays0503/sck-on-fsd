"use client";
import { Flex, Typography } from "antd";
import React from "react";
import useFetcherBasket from "@/shared/api/fetch/basket";
import { BasketDetail, BasketInfo, ProductsInBasket } from "./SubModule";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

interface IBasketMobileProps {
  readonly basket_id: string;
}

const BasketMobile: React.FC<IBasketMobileProps> = ({ basket_id }) => {
  const fetchBasket = useFetcherBasket({ by_id: basket_id })?.data;
  const t = useTranslations();
  if (!fetchBasket) {
    return (
      <Flex justify="center" align="center" vertical={true}>
        <Typography.Title level={3}>{t("korzina-pusta")}</Typography.Title>
        <Link href="/">{t('na-glavnuyu')}</Link>
      </Flex>
    );
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
};

export default BasketMobile;
