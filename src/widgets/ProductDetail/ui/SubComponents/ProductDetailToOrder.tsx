
import { getPrice } from "@/entities/ProductCart";
import useSelectedCity from "@/shared/hooks/useSelectedCity";
import beautifulCost from "@/shared/tools/beautifulCost";
import { ProductsDetail } from "@/shared/types/productsDetail";
import { Button, Flex,Typography } from "antd"
import { useTranslations } from "next-intl";


const { Text } = Typography;

interface ProductDetailToOrder {
   readonly fetchProduct: ProductsDetail
}

const ProductDetailToOrder: React.FC<ProductDetailToOrder> = (props) => {

    const { fetchProduct } = props;

    const t = useTranslations();

    const selectedCity = useSelectedCity();

    const { price, discountPrice } = getPrice(fetchProduct, selectedCity);

    return <Flex style={{ width: "100%",padding: "10px" }} justify="space-between" align="center">
        <Text strong>{price ? beautifulCost(price) : t("utochnit-cenu")}</Text>
        {discountPrice && (
          <Text disabled delete>
            {beautifulCost(discountPrice)}
          </Text>
        )}
        <Button
          shape="default"
          size="large"
          style={{ backgroundColor: "#4954F0", width: "35%" }}
        >
          <Text
            style={{
              backgroundColor: "#4954F0",
              color: "#fff",
              fontSize: "14px",
              lineHeight: "22px",
              fontWeight: "400",
            }}
          >
            {t("oformit")}
          </Text>
        </Button>
    </Flex>
}

export default ProductDetailToOrder