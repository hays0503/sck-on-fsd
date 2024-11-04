"use client";
import { useFetcherCategory } from "@/entities/Category";
import useFetcherProducts from "@/shared/api/fetch/product";
import findRootAndDescendants from "@/shared/tools/findRootAndDescandants";
import {
  selectDataByLangCategory,
  selectDataByLangDescriptionBody,
  selectDataByLangDescriptionTitle,
  selectDataByLangProducts,
  selectDataByLangSpecificationName,
  selectDataByLangSpecificationValue,
} from "@/shared/tools/selectDataByLang";
import { Category } from "@/shared/types/category";
import { ProductsDetail } from "@/shared/types/productsDetail";
import { Breadcrumb, Button, Descriptions, Flex, Typography } from "antd";
import { useLocale, useTranslations } from "next-intl";
import ProductDetailSwiper from "./SubComponents/ProductCartSwiper";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import getPrice from "@/entities/ProductCart/model/getPrice";
import useSelectedCity from "@/shared/hooks/useSelectedCity";
import beautifulCost from "@/shared/tools/beautifulCost";
import { Specification } from "@/shared/types/specification";
import useFetcherSpecificationById from "@/shared/api/fetch/specif";
import type { DescriptionsProps } from "antd";
import { useState } from "react";
import truncateText from "@/shared/tools/truncateText";
import Credit from "@/entities/Credit/ui/Credit";

const { Text, Title } = Typography;

interface IProductDetailProps {
  slug: string;
}

const ProductDetail: React.FC<IProductDetailProps> = (props) => {
  const { slug } = props;

  const localeActive = useLocale();

  const [expandedSpecification, setExpandedSpecification] = useState(false);
  const [expandedDescription, setExpandedDescription] = useState(false);

  const fetchProduct: ProductsDetail = useFetcherProducts({
    as: "by_slug",
    params: slug,
  }).data! as ProductsDetail;

  const fetchProductSpecification: Specification[] =
    useFetcherSpecificationById(fetchProduct.id).data! as Specification[] | [];

  console.log("fetchProductSpecification", fetchProductSpecification);

  const specification: DescriptionsProps["items"] =
    fetchProductSpecification?.map((item) => {
      return {
        key: item.id,
        label: selectDataByLangSpecificationName(
          item.name_specification,
          localeActive
        ),
        children: selectDataByLangSpecificationValue(
          item.value_specification,
          localeActive
        ),
      };
    });

  const specificationCount = fetchProductSpecification?.length;

  const specificationHide: DescriptionsProps["items"] = specification?.slice(
    0,
    4
  );

  const currentCity = useGetCityParams();

  const selectedCity = useSelectedCity();

  const fetchCategory: Category[] = useFetcherCategory().data!;

  const descriptionBody = selectDataByLangDescriptionBody(
    fetchProduct.description,
    localeActive
  );

  const descriptionBodyHide = truncateText(
    descriptionBody ?? "",
    localeActive,
    expandedDescription
  );

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

  console.log("currentCity", currentCity);
  console.log("selectedCity", selectedCity);

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

      <Flex
        vertical={true}
        gap={10}
        style={{ width: "100%", padding: "10px", backgroundColor: "#fff" }}
      >
        <Title level={5}>
          {selectDataByLangProducts(fetchProduct, localeActive)}
        </Title>
        <Flex gap={10} justify="space-between">
          <Flex gap={10}>
            <Text>{t("artikul")}</Text>
            <Text>{fetchProduct.vendor_code}</Text>
          </Flex>
          <Flex gap={10} justify="space-between" align="center">
            <Flex gap={5} justify="space-between" align="center">
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
              <Text style={{ color: "#FFA600" }}>
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
                {fetchProduct.reviews_count ?? 0}
              </Text>
              <Text disabled>
                {t("otzyvy")}
                {")"}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex justify="space-between">
          <Flex vertical={true}>
            {discountPrice && (
              <Text disabled delete>
                {beautifulCost(discountPrice ?? "")}
              </Text>
            )}
            {price && (
              <Title level={5} style={{ color: "red" }}>
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

      <Flex
        vertical={true}
        gap={10}
        style={{ width: "100%", padding: "10px", backgroundColor: "#fff" }}
      >
        <Descriptions
          title={t("kharakteristiki")}
          items={expandedSpecification ? specification : specificationHide}
          column={1}
          contentStyle={{ justifyContent: "flex-end" }}
        />
        {specificationCount > 4 && (
          <Button
            onClick={() => {
              setExpandedSpecification(!expandedSpecification);
            }}
          >
            <Text style={{ color: "#4954F0" }}>
              {expandedSpecification
                ? t("svernut-kharakteristiki")
                : t("smotret-vse-kharakteristiki")}
            </Text>
          </Button>
        )}
      </Flex>

      {descriptionBody && (
        <Flex
          vertical={true}
          gap={10}
          style={{ width: "100%", padding: "10px", backgroundColor: "#fff" }}
        >
          <Title level={5}>{t("opisanie")}</Title>
          <Text disabled>
            {expandedDescription ? descriptionBody : descriptionBodyHide}
          </Text>
          <Button
            onClick={() => {
              setExpandedDescription(!expandedDescription);
            }}
          >
            <Text style={{ color: "#4954F0" }}>
              {expandedDescription ? t("svernut") : t("smotret-vse-opisanie")}
            </Text>
          </Button>
        </Flex>
      )}
    </Flex>
  );
};
export default ProductDetail;
