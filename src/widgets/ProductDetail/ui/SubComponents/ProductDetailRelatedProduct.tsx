"use client";
import { ProductCart } from "@/entities/ProductCart";
import { Products } from "@/shared/types/products";
import { Flex, Typography } from "antd";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";

const { Title } = Typography;


interface IProductDetailRelatedProductProps {
    readonly related_products: Products[];
}

const ProductDetailRelatedProduct: React.FC<
  IProductDetailRelatedProductProps
> = (props) => {
  const { related_products } = props;
  const t = useTranslations();
  return (
    <Flex vertical={true} style={{ width: "100%",padding:"10px" }} justify="flex-start">
      <Title level={5}>{t("rekomenduemye-tovary")}</Title>
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        loop={true}
        width={320}
        height={500}
      >
        {related_products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCart
              key={product.id}
              Product={product}
              addToCartSlot={<></>}
              addToFavoriteSlot={<></>}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Flex>
  );
};
export default ProductDetailRelatedProduct;