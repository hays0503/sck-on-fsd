import useSWR from "swr";
import defaultFetcher from "./defaultFetcher";
import { UrlApi } from "../url";
import { iBasket } from "@/shared/types/basket";

export default function useFetcherBasket({
  by_id,
  by_access_token,
}: {
  by_id?: string | undefined;
  by_access_token?: string | undefined;
}) {
  const urlForById = `${UrlApi.getBasketApi}/by/${by_id}`;
  const urlForByAccessToken = `${UrlApi.getBasketApi}/by_access_t/${by_access_token}`;
  const url = by_access_token ? urlForByAccessToken : urlForById;
  console.log("useFetcherBasket =>",url)
  const object = useSWR<iBasket>(url, (url: string) =>
    defaultFetcher(url, {})
  );

  return object;
}
