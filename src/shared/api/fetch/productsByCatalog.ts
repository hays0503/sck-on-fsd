"use client";
import useSWR from "swr";
import defaultFetcher from "./defaultFetcher";
import { Products } from "@/shared/types/products";

export default function useFetcherProductsByCatalog({
  city,
  slug,
}: {
  city: string;
  slug: string;
}) {
  const url = `/api/by_city/catalog?slug=${slug}&city=${city}`;
  const object = useSWR<Products[]>(url, (url: string) => defaultFetcher(url));

  return object;
}
