"use client";

import { Products } from "@/shared/types/products";
import { Flex} from "antd";
import { Level1, Level2 } from "./SubComponent";
import useFetcherPopulates from "@/shared/api/fetch/populates";
import useSelectedCity from "@/shared/hooks/useSelectedCity";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect } from "react";

export default function ProductPopularListPagination({
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
  const [currentPage, setCurrentPage] = useQueryState('page',parseAsInteger.withDefault(1));
  const Products: Products[] = useFetcherPopulates({ city: selectedCity}).data ?? []; 
 
  const ProductsPerPage = 8;
  const indexOfLastProduct = currentPage * ProductsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - ProductsPerPage;
  const currentProducts = Products.slice(indexOfFirstProduct, indexOfLastProduct);

  useEffect(() => {
    setCurrentPage(searchParams.page);
  }, []);

  return (
    <Flex vertical={true} align="center" justify="space-evenly" gap={10} style={{ width: "100%",height: "100%",backgroundColor: "#EEEFF1" }}>
      <Level1 Products={currentProducts} />
      <Level2 pageSize={ProductsPerPage} total={Products.length} current={currentPage} onChange={setCurrentPage}/>
    </Flex>
  );
}
