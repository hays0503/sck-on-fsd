import { ApiUrl, UrlApi } from "@/shared/api/url";

const assignBasketToUser = async (uuid_id: string, accessToken: string) => {
  const url = `${ApiUrl}${UrlApi.getBasketApi}/sign/${uuid_id}`;
  return await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      body: JSON.stringify({ access_token: accessToken }),
    },
  }).then((response) => response.status);
};
export default assignBasketToUser;