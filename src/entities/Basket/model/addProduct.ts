import { getBasket, updateBasket } from "../api";
import { EditBasketResponse } from "./addPresent";

type addProduct = (
  uuid: string,
  productId: number
) => Promise<EditBasketResponse>;

export const addProduct: addProduct = async (uuid, productId) => {
  const currentBasket = await getBasket(uuid);
  const newBasket = currentBasket.basket_items.map((item) => {
    if (item.prod_id === productId) {
      const newItem = {
        prod_id: item.prod_id,
        price: item.price,
        count: item.count + 1,
      };
      return newItem;
    } else {
      return {
        prod_id: item.prod_id,
        price: item.price,
        count: item.count,
      };
    }
  });
  const response = updateBasket(uuid, newBasket);
  return response;
};
