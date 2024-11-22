import { BasketItems, CreateBasketResponse } from "./createBasket";

type BasketResponse = CreateBasketResponse



type UpdateBasket = (uuid:string,basket:BasketItems,arg?:{user_id?:string}) => Promise<BasketResponse>;

const updateBasket: UpdateBasket = async (uuid,basket,arg) => {
    return await fetch("/basket_api/v1/bascket/create_or_update/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ uuid_id: uuid,basket_items: basket,...arg}),
    }).then((response) => response.json());
  }

  export default updateBasket