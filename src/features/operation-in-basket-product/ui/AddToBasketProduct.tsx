import { Button, Flex, Typography } from "antd";
import { useTranslations } from "next-intl";

const { Text } = Typography;

export default function AddToBasketProduct() {
  
  const t = useTranslations();
  return (
    <Flex style={{ width: "100%" }}>
      <Button shape="default" size="large" style={{backgroundColor:"#4954F0", width: "100%"}}>
        <Text style={{ color: "#fff", fontSize: "14px", lineHeight: "22px",fontWeight: "500" }}>{t("v-korzinu")}</Text>
      </Button>
    </Flex>
  );
}
