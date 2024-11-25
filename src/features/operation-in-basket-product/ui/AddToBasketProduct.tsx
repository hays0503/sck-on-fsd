import { Button, Flex, Typography } from "antd";
import { useTranslations } from "next-intl";
import type { TIncButton } from "./IncButton";
import { useBasketAdd } from "../model";
import { memo, useCallback } from "react";
const { Text } = Typography;



const AddToBasketProduct:TIncButton  = memo( function AddToBasketProduct({ prod_id }){

  const addAction = useBasketAdd({ prod_id });

  const handleAddToBasket = useCallback(() => {
    addAction();
  }, [addAction]);

  const t = useTranslations();

  return (
    <Flex style={{ width: "100%" }}>
      <Button
        onClick={handleAddToBasket}
        shape="default"
        size="large"
        style={{ backgroundColor: "#4954F0", width: "100%" }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: "14px",
            lineHeight: "22px",
            fontWeight: "500",
          }}
        >
          {t("v-korzinu")}
        </Text>
      </Button>
    </Flex>
  );
});

export default AddToBasketProduct