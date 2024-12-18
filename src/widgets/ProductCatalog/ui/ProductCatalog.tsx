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
import React, { Dispatch, SetStateAction, useState } from "react";
import { ProductsDetail } from "@/shared/types/productsDetail";
import useFetcherProducts from "@/shared/api/fetch/product";
// import { Filter } from "@/features/new-product-filter";
// import { ProductFilter } from "@/features/product-filter";


interface ProductsCatalogProps {
  params: { slug: string };
  Catalog: React.FC<{readonly Products: Products[] | ProductsDetail[]}>;
  Filter: React.FC<{category: string,filterActive: number[], setFilterActive: Dispatch<SetStateAction<number[]>>}>
}

const ProductCatalog: React.FC<ProductsCatalogProps> = (props) => {
  
  const { 
    params,
    Catalog,
    Filter 
  } = props;

  const selectedCity = useSelectedCity();



  const [activeFilterProductIds, setActiveFilterProductIds] = useState<number[]>([])


  const _Products: Products[] =
  useFetcherProductsByCatalog({
    city: selectedCity,
    slug: params.slug,
  }).data! ?? [];

  const _ProductsByIds = useFetcherProducts({
    as:'by_ids',
    params: activeFilterProductIds,
  }).data! as Products[] ?? [];

  const sortFunc = useGetSortFunc();

  const ProductOnPage = _ProductsByIds.length > 0 ? _ProductsByIds.sort(sortFunc) : _Products.sort(sortFunc);

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
        <Filter category={params.slug} filterActive={activeFilterProductIds} setFilterActive={setActiveFilterProductIds}/>
  
        {/* <ProductFilter Products={_Products}/> */}
      </Flex>
      <span id='catalog'/>
      <Catalog Products={Products} />
      <PaginationProducts totalProducts={ProductOnPage.length} />
    </Flex>
  );
};

export default ProductCatalog;
