import { getPrice } from "@/entities/ProductCart";
import beautifulCost from "@/shared/tools/beautifulCost";
import { Products } from "@/shared/types/products";
import { Flex, Typography } from "antd";
import Image from "next/image";
import React, { CSSProperties } from "react";
import style from "./BasketMobile.module.css";
import useSelectedCity from "@/shared/hooks/useSelectedCity";
import { selectDataByLangProducts } from "@/shared/tools/selectDataByLang";
import { useLocale } from "next-intl";
import type { TDecButton, TIncButton } from "@/features/operation-in-basket-product";
import { iBasket } from "@/shared/types/basket";


const { Text } = Typography;

interface IRowInBasketProps {
  readonly Product: Products;
  readonly count: number;
  readonly IncBasketSlot: TIncButton;
  readonly DecBasketSlot: TDecButton;
  readonly token: string | undefined;
  readonly userBasket: iBasket | undefined;
}

const RowInBasket: React.FC<IRowInBasketProps> = ({
  Product,
  count,
  IncBasketSlot,
  DecBasketSlot,
  token,
  userBasket,
}) => {
  const localeActive = useLocale();
  const selectedCity = useSelectedCity();
  const { price, discountPrice } = getPrice(Product, selectedCity);
  const priceString = beautifulCost(price ?? 0);
  const discountString = discountPrice
    ? beautifulCost(discountPrice)
    : undefined;
  const stylePrice: CSSProperties = {
    color: discountPrice ? "red" : "black",
  };


  return (
    <Flex gap={10} style={{ width: "100%" }}>
      <Flex
        align="center"
        justify="center"
        style={{ width: "30%", display: "flex" }}
      >
        <Image
          src={Product.list_url_to_image[0]}
          alt={Product.name_product}
          width={80}
          height={100}
          style={{
            objectFit: "scale-down",
            objectPosition: "center",
          }}
        />
      </Flex>
      <Flex vertical style={{ width: "70%" }}>
        <Text className={style.headerProduct}>
          {selectDataByLangProducts(Product, localeActive)}
        </Text>
        <Flex gap={10} align="baseline" justify="left">
          <Flex>
            <span className={style.priceProduct} style={stylePrice}>
              {priceString}
            </span>
          </Flex>

          {discountString && (
            <Flex>
              <span className={style.discountProduct}>{discountString}</span>
            </Flex>
          )}
        </Flex>
        <Flex gap={10} align="center" justify="right">
          <DecBasketSlot count={count} prod_id={Product.id} token={token}/>
          <Text style={{ color: "gray" }}>{count}</Text>
          <IncBasketSlot prod_id={Product.id} userBasket={userBasket} token={token}/>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RowInBasket;
