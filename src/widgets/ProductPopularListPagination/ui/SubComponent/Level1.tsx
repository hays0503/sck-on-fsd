import { ProductCart } from "@/entities/ProductCart";
import { AddToBasketProduct } from "@/features/operation-in-basket-product";
import { AddToFavoriteProduct } from "@/features/add-to-favorite-product";

import { Products } from "@/shared/types/products";
import { Col, ColProps, Row } from "antd";

  
  interface Level1Props {
    readonly Products: Products[]
  }
  
  // Первый уровень карты (карточки товаров)
  const Level1: React.FC<Level1Props> = (props) => {
    const { Products } = props;

    const ColResponsive:ColProps = {
      xs:{offset: 1}
    }


    return (
      <Row gutter={[16, 16]} justify="center" align="stretch">
        {Products?.map((item, index) => (
          <Col {...ColResponsive} key={index}>
          <ProductCart
            Product={item}
            addToCartSlot={<AddToBasketProduct />}
            addToFavoriteSlot={<AddToFavoriteProduct />}
          />
          </Col>
        ))}
      </Row>
    );
  };


  export default Level1