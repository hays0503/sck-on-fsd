import { selectDataByLangDescriptionBody } from "@/shared/tools/selectDataByLang";
import truncateText from "@/shared/tools/truncateText";
import { ProductsDetail } from "@/shared/types/productsDetail"
import { Button, Flex,Typography } from "antd"
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";


interface IProductDetailDescriptionsProps {
    readonly fetchProduct: ProductsDetail
}

const { Text,Title } = Typography;

const ProductDetailDescription: React.FC<IProductDetailDescriptionsProps> = (props) => {
    const { fetchProduct } = props
    const localeActive = useLocale()
    const t = useTranslations()
    const [expandedDescription, setExpandedDescription] = useState(false);

    const descriptionBody = selectDataByLangDescriptionBody(
        fetchProduct.description,
        localeActive
      );
    
      const descriptionBodyHide = truncateText(
        descriptionBody ?? "",
        localeActive,
        expandedDescription
      );

    return <Flex vertical={true} style={{ width: "100%",padding:"10px" }}>
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
}
export default ProductDetailDescription