"use client";

import { Products } from "@/shared/types/products";
import { Flex, Pagination } from "antd";
import { Level1, Level2 } from "./SubComponent";
import { useLayoutEffect } from "react";
import useSelectedCity from "@/shared/hooks/useSelectedCity";
import useFetcherProductsByCatalog from "@/shared/api/fetch/productsByCatalog";
import { parseAsInteger, useQueryState } from "nuqs";
import { SortingProducts,useGetSortFunc } from "@/features/sorting-products";
import { PaginationProducts } from "@/features/pagination-products/ui";
import { useGetPaginationFunc } from "@/features/pagination-products";

export default function ProductCatalogListPagination({
  params,
  searchParams,
}: {
  params: { locale: string; city: string; slug: string };
  searchParams: {
    page: number;
    sortOrder: "asc" | "desc";
  };
}) {
 
  const selectedCity = useSelectedCity();

  const _Products: Products[] =
    useFetcherProductsByCatalog({
      city: selectedCity,
      slug: params.slug,
    }).data! ?? [];

  const sortFunc = useGetSortFunc();
  
  const Products = _Products.sort(sortFunc);

  const ProductOnPage = useGetPaginationFunc({Products});

  return (
    <Flex
      vertical={true}
      align="center"
      justify="space-evenly"
      gap={10}
      style={{ width: "100%", height: "100%", backgroundColor: "#EEEFF1" }}
    >
      <SortingProducts slugCatalog={params.slug} />
      <Level1 Products={ProductOnPage} />
      <PaginationProducts totalProducts={Products.length} />
    </Flex>
  );
}
