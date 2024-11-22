import { deleteBasket, getBasket, updateBasket } from "../api";
import { EditBasketResponse } from "./addPresent";

type delProduct = (
  uuid: string,
  productId: number,
  accessToken?:string
) => Promise<EditBasketResponse|{status:number}>;

export const delProduct: delProduct = async (uuid, productId, accessToken) => {
  const currentBasket = await getBasket(uuid);
  const userData = accessToken?{ user_id: accessToken }:{}
  const newBasket = currentBasket.basket_items
    .map((item) => {
      if (item.prod_id === productId) {
        const newItem = {
          prod_id: item.prod_id,
          price: item.price,
          count: item.count - 1,
        };
        return newItem;
      } else {
        return {
          prod_id: item.prod_id,
          price: item.price,
          count: item.count,
        };
      }
      // Убираем товар у которых кол-во равно 0
    })
    .filter((item) => item.count > 0);

  if (newBasket.length === 0) {
    return {status:await deleteBasket(uuid)};
  } else {
    const response = updateBasket(uuid, newBasket,userData);
    return response;
  }
};
