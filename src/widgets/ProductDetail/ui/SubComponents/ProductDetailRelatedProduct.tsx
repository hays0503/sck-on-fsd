"use client";
import { ProductCart } from "@/entities/ProductCart";
import { useUser } from "@/entities/User";
import { AddToFavoriteProduct } from "@/features/add-to-favorite-product";
import { AddToBasketProduct, useGetUsersBasket } from "@/features/operation-in-basket-product";
import { Products } from "@/shared/types/products";
import { Flex, Typography } from "antd";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { useReadLocalStorage } from "usehooks-ts";

const { Title } = Typography;


interface IProductDetailRelatedProductProps {
    readonly related_products: Products[];
}

const ProductDetailRelatedProduct: React.FC<
  IProductDetailRelatedProductProps
> = (props) => {
  const { related_products } = props;
  const t = useTranslations();

  useUser();
  const token = useReadLocalStorage<{ token: string }>("accessToken");
  const userBasket = useGetUsersBasket(token?.token);
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
              addToCartSlot={<AddToBasketProduct prod_id={product.id} userBasket={userBasket} token={token?.token} />}
              addToFavoriteSlot={<AddToFavoriteProduct prod_id={product.id}/>}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Flex>
  );
};
export default ProductDetailRelatedProduct;