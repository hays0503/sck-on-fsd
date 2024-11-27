"use client";
import { Flex, Typography } from "antd";
import React from "react";
import useFetcherBasket from "@/shared/api/fetch/basket";
import { BasketDetail, BasketInfo, ProductsInBasket } from "./SubModule";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { useReadLocalStorage } from "usehooks-ts";
import { ShoppingCartOutlined } from '@ant-design/icons';
import { usePathname } from "next/navigation";

interface IBasketMobileProps {
  readonly basket_id: string;
}

const {Text} = Typography

const BasketMobile: React.FC<IBasketMobileProps> = ({ basket_id }) => {
  const t = useTranslations();
  const { data: fetchBasket, error } = useFetcherBasket({ by_id: basket_id });
  const accessToken = useReadLocalStorage<{ token: string }>("accessToken");
  const pathname  = usePathname();
  const city = useGetCityParams();
  const Empty = () => {
    return (
      <Flex justify="center" align="center" vertical={true}>
        <Typography.Title level={3}>{t("korzina-pusta")}</Typography.Title>
        <Link href={`/city/${city}/main`}>{t("na-glavnuyu")}</Link>
      </Flex>
    );
  };


  const ToOrder = ({accessToken}:{accessToken: string|undefined}) => {
    if (accessToken) {
      return (<Flex
        align="center"
        justify="center">
        <Link href={`/city/${city}/order/${basket_id}`} style={{
          width: "100%",
          height: 50,
          backgroundColor: "#4954F0",
          color: "white",
          borderRadius: 10,
          textAlign: "center",
          alignContent: "center",
        }}>
          {t('oformit-tovar')}
        </Link>
      </Flex>)
    }else{
      return (<Flex
        align="center"
        justify="center">
        <Link href={`/city/${city}/login/${pathname}`} style={{
          width: "100%",
          height: 50,
          backgroundColor: "#4954F0",
          color: "white",
          borderRadius: 10,
          textAlign: "center",
          alignContent: "center",
          display: "flex",
          justifyContent: "center",
          gap: 10,
          alignItems: "center"
        }}>
          <ShoppingCartOutlined />
          <Text style={{color: "white"}}>Авторизуйтесь для  продолжение оформление</Text>
          <ShoppingCartOutlined />
        </Link>
      </Flex>)
    }
  }

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
          <ToOrder accessToken={accessToken?.token} />
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
