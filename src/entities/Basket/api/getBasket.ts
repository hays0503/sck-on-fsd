import { CreateBasketResponse } from "./createBasket";

type BasketResponse = CreateBasketResponse;

type GetBasket = (uuid: string) => Promise<BasketResponse>;

const getBasket: GetBasket = async (uuid) => {
  return await fetch(`/basket_api/v1/bascket/by/${uuid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((response) => response.json());
};

export default getBasket;
