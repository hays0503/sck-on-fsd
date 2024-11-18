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

interface ProductsCatalogProps {
  params: { slug: string };
  Catalog: any;
}

const ProductCatalog: React.FC<ProductsCatalogProps> = (props) => {

  console.log("ProductCatalog:",props)

  const { 
    params,
    Catalog 
  } = props;

  console.log(params)

  const selectedCity = useSelectedCity();

  const _Products: Products[] =
    useFetcherProductsByCatalog({
      city: selectedCity,
      slug: params.slug,
    }).data! ?? [];

  const sortFunc = useGetSortFunc();

  const Products = _Products.sort(sortFunc);

  const ProductOnPage = useGetPaginationFunc({ Products });

  console.log(ProductOnPage)

  return (
    <Flex
      vertical={true}
      align="center"
      justify="space-evenly"
      gap={10}
      style={{ width: "100%", height: "100%", backgroundColor: "#EEEFF1" }}
    >
      <SortingProducts slugCatalog={params.slug} />
      {/* <Catalog Products={ProductOnPage}/> */}
      {/* <Catalog {...props} /> */}
      {Catalog({ Products: ProductOnPage })}
      <PaginationProducts totalProducts={Products.length} />
    </Flex>
  );
};

export default ProductCatalog;
