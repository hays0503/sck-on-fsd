"use client";
import { useFetcherCategory } from "@/entities/Category";
import useFetcherProducts from "@/shared/api/fetch/product";
import findRootAndDescendants from "@/shared/tools/findRootAndDescandants";
import {
  selectDataByLangCategory,
  selectDataByLangProducts,
} from "@/shared/tools/selectDataByLang";
import { Category } from "@/shared/types/category";
import { ProductsDetail } from "@/shared/types/productsDetail";
import { Breadcrumb, Button, Flex, Typography } from "antd";
import { useLocale, useTranslations } from "next-intl";
import ProductDetailSwiper from "./SubComponents/ProductCartSwiper";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import getPrice from "@/entities/ProductCart/model/getPrice";
import useSelectedCity from "@/shared/hooks/useSelectedCity";
import beautifulCost from "@/shared/tools/beautifulCost";

const { Text, Title } = Typography;

interface IProductDetailProps {
  slug: string;
}

const ProductDetail: React.FC<IProductDetailProps> = (props) => {
  const { slug } = props;

  const fetchProduct: ProductsDetail = useFetcherProducts({
    as: "by_slug",
    params: slug,
  }).data! as ProductsDetail;

  const currentCity = useGetCityParams();

  const selectedCity = useSelectedCity();

  const fetchCategory: Category[] = useFetcherCategory().data!;

  console.log("fetchCategory", fetchCategory);

  const localeActive = useLocale();

  const { descendants: breadcrumbs } = findRootAndDescendants(
    fetchCategory,
    fetchProduct.category.id
  );

  const breadcrumbsItems = breadcrumbs.map((category: Category) => {
    return {
      title:
        selectDataByLangCategory(category, localeActive) ??
        selectDataByLangCategory(category, "ru"),
    };
  });

  const { price, discountPrice } = getPrice(fetchProduct, selectedCity);

  const t = useTranslations();

  return (
    <Flex vertical={true} gap={10}>
      <Flex
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#fff",
        }}
      >
        <Breadcrumb
          items={[
            { title: "Главная" },
            { title: "Каталог" },
            ...breadcrumbsItems,
            {
              title:
                selectDataByLangProducts(fetchProduct, localeActive) ??
                selectDataByLangProducts(fetchProduct, "ru"),
            },
          ]}
        />
      </Flex>
      <Flex
        vertical={true}
        align="center"
        justify="center"
        style={{
          width: "100%",
          backgroundColor: "#fff",
        }}
      >
        <ProductDetailSwiper
          images={fetchProduct.list_url_to_image}
          name={fetchProduct.name_product}
          width={300}
          height={300}
        />
      </Flex>

      {fetchProduct?.configuration && (
        <Flex
          vertical={true}
          gap={10}
          style={{
            width: "100%",
            backgroundColor: "#fff",
            padding: "10px",
          }}
        >
          {selectDataByLangProducts(fetchProduct, localeActive)}
          <Flex gap={10}>
            {fetchProduct.configuration.map((item) => {
              return (
                <Link
                  key={item.id}
                  href={`/${currentCity}/product/${item.slug}`}
                >
                  <Flex
                    style={{
                      padding: "10px",
                      backgroundColor: "#fff",
                      border: "1px solid #d7d7d7",
                    }}
                  >
                    <Image
                      src={item.list_url_to_image[0]}
                      alt={item.name}
                      width={30}
                      height={30}
                    />
                  </Flex>
                </Link>
              );
            })}
          </Flex>
        </Flex>
      )}

      <Flex
        justify="space-between"
        align="center"
        gap={10}
        style={{ width: "100%", padding: "10px", backgroundColor: "#fff" }}
      >
        <Text strong>{beautifulCost(price)}</Text>
        <Text disabled delete>
          {beautifulCost(discountPrice)}
        </Text>
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
    </Flex>
  );
};
export default ProductDetail;
