"use client";
import useSWR from "swr";
import {UrlApi} from "../url";
import { iCity } from "@/shared/types/city";
import defaultFetcher from "./defaultFetcher";

export default function useFetcherCity() {
  const object = useSWR<iCity[]>(UrlApi.getCity, (url: string) =>
    defaultFetcher(url, {})
  );

  return object;
}
