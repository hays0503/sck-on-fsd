import { getBasket, updateBasket } from "../api";
import { EditBasketResponse } from "./addPresent";

type addProduct = (
  uuid: string,
  productId: number
) => Promise<EditBasketResponse>;

export const addProduct: addProduct = async (uuid, productId) => {
  try {
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
    // Если товара нет в корзине
    if (newBasket.find((item) => item.prod_id === productId) === undefined) {
      // Добавляем новый товар в корзину
      const response = updateBasket(uuid, [
        ...newBasket,
        {
          prod_id: productId,
          price: 0,
          count: 1,
        },
      ]);
      return response;
    } else {
      // Увеличиваем кол-во товара
      const response = updateBasket(uuid, newBasket);
      return response;
    }
  } catch (error) {
    console.log(
      "Не вышло запросить данные из корзины по uuid возможно её нет: ",
      uuid,
      error
    );
    console.log("Попытка создать корзину с этим uuid", uuid);
    const response = updateBasket(uuid, [
      {
        prod_id: productId,
        price: 0,
        count: 1,
      },
    ]);
    return response;
  }
};
