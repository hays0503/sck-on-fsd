import { UrlApi } from "@/shared/api/url";

const getUsersBasket = async (accessToken: string) => {
  const url = `${UrlApi.getBasketApi}/by_access_t`;
  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      'access-token': accessToken,
    },
  }).then((response) => response.json());
};
export default getUsersBasket;