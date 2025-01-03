import useFetcherSpecificationById from "@/shared/api/fetch/specif";
import {
  selectDataByLangSpecificationName,
  selectDataByLangSpecificationValue,
} from "@/shared/tools/selectDataByLang";
import { ProductsDetail } from "@/shared/types/productsDetail";
import { Specification } from "@/shared/types/specification";
import {
  Button,
  Descriptions,
  DescriptionsProps,
  Flex,
  Typography,
} from "antd";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

interface IProductDetailDescriptionsProps {
  readonly fetchProduct: ProductsDetail;
}

const { Text } = Typography;

const ProductDetailSpecification: React.FC<IProductDetailDescriptionsProps> = ({
  fetchProduct,
}) => {
  const localeActive = useLocale();
  const t = useTranslations();

  const [expandedSpecification, setExpandedSpecification] = useState(false);

  // Fetch specifications
  const fetchProductSpecification: Specification[] =
    useFetcherSpecificationById(fetchProduct.id)?.data || [];

  // Map specifications
  const specification: DescriptionsProps["items"] = fetchProductSpecification?.map(
    (item) => ({
      key: item.id,
      label: (
        <span itemProp="name">
          {selectDataByLangSpecificationName(
            item.name_specification,
            localeActive
          )}
        </span>
      ),
      children: (
        <span itemProp="value">
          {selectDataByLangSpecificationValue(
            item.value_specification,
            localeActive
          )}
        </span>
      ),
    })
  );

  // Specifications count and shortened list
  const specificationCount = fetchProductSpecification?.length || 0;
  const specificationHide: DescriptionsProps["items"] = specification.slice(0, 4);

  return (
    <Flex
      vertical={true}
      style={{ width: "100%", padding: "10px" }}
      itemScope={true}
      itemProp="additionalProperty"
      itemType="http://schema.org/PropertyValue"
    >

      {specificationCount > 0 ? (
        <>
          <Descriptions
            title={t("kharakteristiki")}
            items={expandedSpecification ? specification : specificationHide}
            column={1}
            contentStyle={{ justifyContent: "flex-end" }}
          />
          {specificationCount > 4 && (
            <Button onClick={() => setExpandedSpecification((prev) => !prev)}>
              <Text style={{ color: "#4954F0" }}>
                {expandedSpecification
                  ? t("svernut-kharakteristiki")
                  : t("smotret-vse-kharakteristiki")}
              </Text>
            </Button>
          )}
        </>
      ) : (
        <Text>{t("kh-otsutstvuyut")}</Text>
      )}
    </Flex>
  );
};

export default ProductDetailSpecification;
