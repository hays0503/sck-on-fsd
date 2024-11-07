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

const ProductDetailSpecification: React.FC<IProductDetailDescriptionsProps> = (
  props
) => {
  const { fetchProduct } = props;
  const localeActive = useLocale();
  const t = useTranslations();

  const [expandedSpecification, setExpandedSpecification] = useState(false);

  const fetchProductSpecification: Specification[] =
    useFetcherSpecificationById(fetchProduct.id).data! as Specification[] | [];

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

  return (
    <Flex vertical={true} style={{ width: "100%", padding: "10px" }}>
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
  );
};
export default ProductDetailSpecification;
