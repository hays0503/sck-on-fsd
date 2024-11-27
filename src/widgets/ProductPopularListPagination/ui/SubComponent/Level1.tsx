import { ProductCart } from "@/entities/ProductCart";
import { AddToBasketProduct } from "@/features/operation-in-basket-product";
import { AddToFavoriteProduct } from "@/features/add-to-favorite-product";

import { Products } from "@/shared/types/products";
import { Col, ColProps, Row } from "antd";
import { useReadLocalStorage } from "usehooks-ts";
import { useUser } from "@/entities/User";
import {useGetUsersBasket} from "@/features/operation-in-basket-product";


interface Level1Props {
  readonly Products: Products[]
}

// Первый уровень карты (карточки товаров)
const Level1: React.FC<Level1Props> = (props) => {
  const { Products } = props;

  const ColResponsive: ColProps = {
    xs: { offset: 1 }
  }

  useUser();
  const token = useReadLocalStorage<{ token: string }>("accessToken");
  const userBasket = useGetUsersBasket(token?.token);

  return (
    <Row gutter={[16, 16]} justify="center" align="stretch">
      {Products?.map((item, index) => (
        <Col {...ColResponsive} key={index}>
          <ProductCart
            Product={item}
            addToCartSlot={
              <AddToBasketProduct prod_id={item.id} userBasket={userBasket} token={token?.token} />
            }
            addToFavoriteSlot={<AddToFavoriteProduct />}
          />
        </Col>
      ))}
    </Row>
  );
};


export default Level1