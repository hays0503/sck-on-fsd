import { UrlApi } from "@/shared/api/url";
import { CreateBasketResponse } from "./createBasket";

type BasketResponse = CreateBasketResponse;

type GetBasket = (uuid: string) => Promise<BasketResponse>;

const getBasket: GetBasket = async (uuid) => {
  return await fetch(`${UrlApi.getBasketApi}/by/${uuid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((response) => response.json());
};

export default getBasket;
