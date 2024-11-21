"use client";
import { ProductCart } from "@/entities/ProductCart";
import { AddToBasketProduct } from "@/features/operation-in-basket-product";
import { AddToFavoriteProduct } from "@/features/add-to-favorite-product";
import { Products } from "@/shared/types/products";
import { ProductsDetail } from "@/shared/types/productsDetail";
import { Col, ColProps, Row } from "antd";

interface ShowcaseMobileProps {
  readonly Products: Products[] | ProductsDetail[];
}

const ShowcaseMobile: React.FC<ShowcaseMobileProps> = (props) => {
  const { Products } = props;

  const ColResponsive: ColProps = {
    xs: { offset: 1 },
  };

  return (
    <Row gutter={[16, 16]} justify="center" align="stretch">
      {Products?.map((item, index) => (
        <Col {...ColResponsive} key={index}>
          <ProductCart
            Product={item}
            addToCartSlot={<AddToBasketProduct prod_id={item.id}/>}
            addToFavoriteSlot={<AddToFavoriteProduct />}
          />
        </Col>
      ))}
    </Row>
  );
};

export default ShowcaseMobile;
