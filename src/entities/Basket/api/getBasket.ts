import { CreateBasketResponse } from "./createBasket";

type BasketResponse = CreateBasketResponse

type GetBasket = (uuid:string) => Promise<BasketResponse>;

const getBasket: GetBasket = async (uuid) => {
    return await fetch("/basket_api/v1/bascket/create_or_update/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ uuid: uuid }),
    }).then((response) => response.json());
  }

  export default getBasket