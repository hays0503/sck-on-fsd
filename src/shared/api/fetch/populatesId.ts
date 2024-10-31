"use client";
import useSWR from "swr";
import {UrlApi, UrlRevalidate} from "../url";
import defaultFetcher from "./defaultFetcher";
import { Products } from "@/shared/types/products";


export default function useFetcherPopulatesId() {
  const object = useSWR<Products[]>(UrlApi.getPopulatesId, (url: string) =>
    defaultFetcher(url, UrlRevalidate.getPopulatesId)
  );

  return object;
}
