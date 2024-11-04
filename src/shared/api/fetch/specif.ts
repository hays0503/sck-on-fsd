"use client";
import useSWR from "swr";
import {UrlApi, UrlRevalidate} from "../url";
import defaultFetcher from "./defaultFetcher";
import { Specification } from "@/shared/types/specification";


export default function useFetcherSpecificationById(productId: number|string) {
  const urlBuilder = `${UrlApi.getProductSpecificationsById}filter_by_prod/${productId}`;
  console.log(urlBuilder);
  const object = useSWR<Specification[]>(urlBuilder, (url: string) =>
    defaultFetcher(url, UrlRevalidate.getProductSpecificationsById)
  );

  return object;
}
