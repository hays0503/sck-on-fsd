"use client";
import useSWR from "swr";
import defaultFetcher from "./defaultFetcher";
import { Products } from "@/shared/types/products";

export default function useFetcherPopulates({ city }: { city: string }) {
  const object = useSWR<Products[]>(    
    `/api/by_city/populates?city=${city}`,
    (url: string) => defaultFetcher(url)
  );

  return object;
}
