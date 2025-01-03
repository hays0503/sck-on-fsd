
import { Credit } from "@/entities/Credit";
import { getPrice } from "@/entities/ProductCart";
import useSelectedCity from "@/shared/hooks/useSelectedCity";
import beautifulCost from "@/shared/tools/beautifulCost";
import { selectDataByLangProducts } from "@/shared/tools/selectDataByLang";
import { ProductsDetail } from "@/shared/types/productsDetail";
import { Flex,Typography } from "antd";
import { useLocale, useTranslations } from "next-intl";


const { Title, Text } = Typography;

interface IProductDetailPriceProps {
  readonly fetchProduct: ProductsDetail;
}

const ProductDetailPrice: React.FC<IProductDetailPriceProps> = (props) => {
  const { fetchProduct } = props;
  const t = useTranslations();
  const localeActive = useLocale();
  const selectedCity = useSelectedCity();
  const { price,discountPrice } = getPrice(fetchProduct,selectedCity);
  return (
    <Flex style={{ width: "100%",padding:"10px" }} vertical={true}>
      <Title level={5}>
        {selectDataByLangProducts(fetchProduct, localeActive)}
      </Title>
      <Flex gap={10} justify="space-between">
        <Flex gap={10}>
          <Text>{t("artikul")}</Text>
          <Text>{fetchProduct.vendor_code}</Text>
        </Flex>
        <Flex gap={10} justify="space-between" align="center" itemProp="aggregateRating" itemScope={true} itemType="http://schema.org/AggregateRating">
          <Flex gap={5} justify="space-between" align="center" >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.32745 1.36274C8.60256 0.805305 9.39744 0.805305 9.67255 1.36274L11.7644 5.60133C11.8737 5.82269 12.0848 5.97612 12.3291 6.01161L17.0067 6.6913C17.6219 6.78069 17.8675 7.53667 17.4224 7.97057L14.0376 11.2699C13.8609 11.4422 13.7802 11.6904 13.8219 11.9337L14.621 16.5924C14.726 17.2051 14.083 17.6723 13.5327 17.383L9.34901 15.1835C9.13051 15.0686 8.86949 15.0686 8.65099 15.1835L4.46725 17.383C3.91703 17.6723 3.27396 17.2051 3.37904 16.5924L4.17806 11.9337C4.21979 11.6904 4.13913 11.4422 3.96237 11.2699L0.577647 7.97057C0.13251 7.53667 0.378142 6.78069 0.993307 6.6913L5.67087 6.01161C5.91516 5.97612 6.12633 5.82269 6.23558 5.60133L8.32745 1.36274Z"
                fill="#FFA600"
              />
            </svg>
            <Text style={{ color: "#FFA600" }} itemProp="ratingValue">
              {fetchProduct.average_rating ?? 0}
            </Text>
          </Flex>
          <svg
            width="2"
            height="2"
            viewBox="0 0 2 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="1" cy="1" r="1" fill="#8C8C8C" />
          </svg>

          <Flex gap={5} justify="space-between" align="center">
            <Text disabled>
              {"("}
            </Text>
            <Text disabled itemProp="reviewCount">
              {fetchProduct.reviews_count ?? 0}
            </Text>
            <Text disabled>
              {t("otzyvy")}
              {")"}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex justify="space-between" itemProp="offers" itemScope={true} itemType="http://schema.org/Offer">
        <Flex vertical={true}>
          {discountPrice && (
            <Text disabled delete >
              {beautifulCost(discountPrice ?? "")}
            </Text>
          )}
          {price && (
            <Title level={5} style={{ color: "red" }} itemProp="price">
              {beautifulCost(price ?? "")}
            </Title>
          )}
        </Flex>
        {discountPrice && (
          <Text strong style={{ color: "green", fontSize: "17px" }}>
            {" "}
            - {beautifulCost(discountPrice - (price ?? 0))}
          </Text>
        )}
      </Flex>
      <Flex
        gap={5}
        style={{
          width: "100%",
          overflow: "auto",
          scrollbarWidth: "none",
        }}
      >
        {selectedCity && (
          <Credit currentCity={selectedCity} product={fetchProduct} />
        )}
      </Flex>
    </Flex>
  );
};

export default ProductDetailPrice;
