import { UrlApi } from "@/shared/api/url";
import { CreateBasketResponse } from "./createBasket";

type BasketResponse = CreateBasketResponse;

type GetBasket = (uuid: string) => Promise<BasketResponse>;

const getBasket: GetBasket = async (uuid) => {
  const url = `${UrlApi.getBasketApi}/by/${uuid}`;
  console.log("URL=>",url)
  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((response) => response.json());
};

export default getBasket;
