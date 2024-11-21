import { getPrice } from "@/entities/ProductCart";
import useSelectedCity from "@/shared/hooks/useSelectedCity";
import beautifulCost from "@/shared/tools/beautifulCost";
import { iBasketItem } from "@/shared/types/basket";
import { Divider, Flex, Typography } from "antd";
import { useTranslations } from "next-intl";

const { Text, Title } = Typography;

interface IBasketDetailProps {
  readonly Products: iBasketItem[];
}

const BasketDetail: React.FC<IBasketDetailProps> = ({ Products }) => {
  const t = useTranslations();

  const selectedCity = useSelectedCity();

  const allPrice = Products.reduce((acc, item) => {
    const { price } = getPrice(item.prod, selectedCity);
    return acc + (price ?? 0) * item.count;
  }, 0);

  const allDiscount = Products.reduce((acc, item) => {
    const { discountPrice, price } = getPrice(item.prod, selectedCity);
    return acc + (discountPrice ?? price ?? 0) * item.count;
  }, 0);

  const deltaPrice = allPrice - allDiscount;

  const deltaPriceString = beautifulCost(deltaPrice);

  const allDiscountString = beautifulCost(allDiscount);

  const allPriceString = beautifulCost(allPrice);

  const Discount = () => {
    return (
      <>
        {deltaPrice!==0 && (
          <Flex align="center" justify="space-between" style={{ width: "95%" }}>
            <Text
              style={{
                color: "#808185",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "22px",
                letterSpacing: "-0.084px",
              }}
            >
              {t("ekonomiya")}
            </Text>
            <Text
              style={{
                color: "#19B28D",
              }}
            >{`${deltaPriceString}`}</Text>
          </Flex>
        )}
      </>
    );
  };

  return (
    <Flex
      vertical={true}
      gap={10}
      style={{ width: "100%", backgroundColor: "#fff", padding: "5px" }}
    >
      <Flex>
        <Title level={5}>{t("detali-zakaza")}</Title>
      </Flex>
      <Flex align="center" justify="space-between" style={{ width: "95%" }}>
        <Text
          style={{
            color: "#808185",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "22px",
            letterSpacing: "-0.084px",
          }}
        >
          {`${Products.length} ${t("tovarov-na-summu")}`}
        </Text>
        <Text>{allDiscountString}</Text>
      </Flex>
      <Discount />
      <Divider />
      <Flex align="center" justify="space-between" style={{ width: "95%" }}>
        <Text
          style={{
            color: "#808185",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "22px",
            letterSpacing: "-0.084px",
          }}
        >
          {`${t("total")}:`}
        </Text>
        <Text>{allPriceString}</Text>
      </Flex>
    </Flex>
  );
};

export default BasketDetail;
