import { iBasketItem } from "@/shared/types/basket";
import { Button, Checkbox, Flex, Typography } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";
import style from "./BasketMobile.module.css";
import type { CheckboxOptionType, CheckboxProps } from "antd";
import RowInBasket from "./RowInBasket";
import { DecButton, IncButton } from "@/features/operation-in-basket-product";

const { Text } = Typography;
const CheckboxGroup = Checkbox.Group;

interface IProductsInBasketProps {
  readonly Products: iBasketItem[];
}

const ProductsInBasket: React.FC<IProductsInBasketProps> = ({ Products }) => {
  const [checkedList, setCheckedList] = useState<number[]>([]);
  const t = useTranslations();

  const checkAll = Products.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < Products.length;

  const onChangeAllChange: CheckboxProps["onChange"] = (e) => {
    if (Products)
      setCheckedList(
        e.target.checked ? Products.map((item) => item.prod_id) : []
      );
  };

  const onChange = (list: number[]) => {
    setCheckedList(list);
  };

  const GroupOptions: CheckboxOptionType[] = Products.map((item) => ({
    label: (
      <RowInBasket
        Product={item.prod}
        count={item.count}
        IncBasketSlot={IncButton}
        DecBasketSlot={DecButton}
      />
    ),
    value: item.prod_id,
  }));

  return (
    <>
      <Flex
        align="baseline"
        justify="space-between"
        style={{ width: "100%", backgroundColor: "#fff", padding: "5px" }}
      >
        <Checkbox
          onChange={onChangeAllChange}
          indeterminate={indeterminate}
          checked={checkAll}
        >
          <Text className={style.selectAll}>{t("vybrat-vsyo")}</Text>
        </Checkbox>
        <Button type="text">
          <Text className={style.deletedSelected}>
            {`${t("udalit-vybrannye")} (${checkedList.length})`}
          </Text>
        </Button>
      </Flex>

      <Flex
        vertical={true}
        style={{ width: "100%", backgroundColor: "#fff", padding: "5px" }}
      >
        <CheckboxGroup
          options={GroupOptions}
          value={checkedList}
          onChange={onChange}
          className={style.container}
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        />
      </Flex>
    </>
  );
};

export default ProductsInBasket;
