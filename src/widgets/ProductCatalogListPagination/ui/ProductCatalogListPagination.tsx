"use client";

import { Products } from "@/shared/types/products";
import { Flex } from "antd";
import { Level1, Level2 } from "./SubComponent";
import { useLayoutEffect } from "react";
import useSelectedCity from "@/shared/hooks/useSelectedCity";
import useFetcherProductsByCatalog from "@/shared/api/fetch/productsByCatalog";
import { parseAsInteger, useQueryState } from "nuqs";
import { SortingProducts,useGetSortFunc } from "@/features/sorting-products";

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
  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1)
  );
  const _Products: Products[] =
    useFetcherProductsByCatalog({
      city: selectedCity,
      slug: params.slug,
    }).data! ?? [];

  useLayoutEffect(() => {
    setCurrentPage(searchParams.page);
  }, []);

  const sortFunc = useGetSortFunc();
  
  const Products = _Products.sort(sortFunc);

  const ProductsPerPage = 8;
  const indexOfLastProduct = currentPage * ProductsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - ProductsPerPage;
  const currentProducts = Products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );


  return (
    <Flex
      vertical={true}
      align="center"
      justify="space-evenly"
      gap={10}
      style={{ width: "100%", height: "100%", backgroundColor: "#EEEFF1" }}
    >
      <SortingProducts slugCatalog={params.slug} />
      <Level1 Products={currentProducts} />
      <Level2
        pageSize={ProductsPerPage}
        total={Products.length}
        current={currentPage}
        onChange={setCurrentPage}
      />
    </Flex>
  );
}
