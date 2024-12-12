"use client";

import { Products } from "@/shared/types/products";
import { Flex } from "antd";
import useSelectedCity from "@/shared/hooks/useSelectedCity";
import useFetcherProductsByCatalog from "@/shared/api/fetch/productsByCatalog";
import { SortingProducts, useGetSortFunc } from "@/features/sorting-products";
import {
  useGetPaginationFunc,
  PaginationProducts,
} from "@/features/pagination-products";
import React from "react";
import { ProductsDetail } from "@/shared/types/productsDetail";
import { ProductFilter } from "@/features/product-filter";


interface ProductsCatalogProps {
  params: { slug: string };
  Catalog: React.FC<{readonly Products: Products[] | ProductsDetail[]}>;
}

const ProductCatalog: React.FC<ProductsCatalogProps> = (props) => {
  
  const { 
    params,
    Catalog 
  } = props;

  const selectedCity = useSelectedCity();

  const _Products: Products[] =
    useFetcherProductsByCatalog({
      city: selectedCity,
      slug: params.slug,
    }).data! ?? [];

  const sortFunc = useGetSortFunc();

  const ProductOnPage = _Products.sort(sortFunc);

  const Products = useGetPaginationFunc({ Products:ProductOnPage });

  return (
    <Flex
      vertical={true}
      align="center"
      justify="space-evenly"
      gap={10}
      style={{ width: "100%", height: "100%", backgroundColor: "#EEEFF1" }}
    >
      <Flex style={{ width: "100%",background:"#EEEFF1" }} justify="space-between">
        <SortingProducts slugCatalog={params.slug} />
        <ProductFilter Products={_Products}/>
      </Flex>
      <Catalog Products={Products} />
      <PaginationProducts totalProducts={_Products.length} />
    </Flex>
  );
};

export default ProductCatalog;
