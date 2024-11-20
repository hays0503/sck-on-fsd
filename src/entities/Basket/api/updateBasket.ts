import { BasketItems, CreateBasketResponse } from "./createBasket";

type BasketResponse = CreateBasketResponse



type UpdateBasket = (uuid:string,basket:BasketItems) => Promise<BasketResponse>;

const updateBasket: UpdateBasket = async (uuid,basket) => {
    return await fetch("/basket_api/v1/bascket/create_or_update/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ uuid_id: uuid,basket_items: basket }),
    }).then((response) => response.json());
  }

  export default updateBasket