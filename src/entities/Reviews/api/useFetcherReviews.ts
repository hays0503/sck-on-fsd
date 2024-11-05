"use client";
import useSWR from "swr";
import {UrlApi, UrlRevalidate} from "@/shared/api/url";
import defaultFetcher from "@/shared/api/fetch/defaultFetcher";
import { Reviews } from "@/shared/types/reviews";

export default function useFetcherReviews(byId: number|string) {
  const urlBuilder = `${UrlApi.getProductReviewsById}${byId}`;
  const object = useSWR<Reviews[]>(urlBuilder, (url: string) =>
    defaultFetcher(url, UrlRevalidate.getProductReviewsById)
  );

  return object;
}
