"use client";

import { Products } from "@/shared/types/products";
import { Dropdown, Flex, Typography } from "antd";
import { Level1, Level2 } from "./SubComponent";
import React, { useEffect } from "react";
import useSelectedCity from "@/shared/hooks/useSelectedCity";
import useFetcherProductsByCatalog from "@/shared/api/fetch/productsByCatalog";
import type { MenuProps } from "antd";
import { Link } from "@/i18n/routing";
import { parseAsInteger, useQueryState } from "nuqs";
import { useTranslations } from "next-intl";
const { Title, Text } = Typography;

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
  
  const t = useTranslations();
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

  useEffect(() => {
    setCurrentPage(searchParams.page);
  }, []);

  const ascFunc = (a: Products, b: Products) => {
    const left = a?.price?.[selectedCity] ?? 0;
    const right = b?.price?.[selectedCity] ?? 0;
    if (left < right) {
      return -1;
    }
    if (left > right) {
      return 1;
    }
    return 0;
  };
  const descFunc = (a: Products, b: Products) => {
    const left = a?.price?.[selectedCity] ?? 0;
    const right = b?.price?.[selectedCity] ?? 0;
    if (left < right) {
      return 1;
    }
    if (left > right) {
      return -1;
    }
    return 0;
  };

  const { sortOrder } = searchParams;

  const sortFunc = sortOrder === "asc" ? ascFunc : descFunc;

  const Products = _Products.sort(sortFunc);

  const ProductsPerPage = 8;
  const indexOfLastProduct = currentPage * ProductsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - ProductsPerPage;
  const currentProducts = Products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const items: MenuProps["items"] = [
    {
      key: "asc",
      label: (
        <Link
          href={`/${params.city}/catalog/${params.slug}?&sortOrder=asc`}
          style={{ color: "black" }}
        >
          {"По возрастанию"}
        </Link>
      ),
    },
    {
      key: "desc",
      label: (
        <Link
          href={`/${params.city}/catalog/${params.slug}?&sortOrder=desc`}
          style={{ color: "black" }}
        >
          {"По убыванию"}
        </Link>
      ),
    },
  ];

  const selectedOrder = items.find((item) => item!.key === sortOrder) as { label: string };
  const currentOrderText = selectedOrder.label; 


  return (
    <Flex
      vertical={true}
      align="center"
      justify="space-evenly"
      gap={10}
      style={{ width: "100%", height: "100%", backgroundColor: "#EEEFF1" }}
    >
      <Flex
        align="baseline"
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#fff",
          marginTop: "1px",
        }}
        gap={10}
      >
        <svg
          width="18"
          height="12"
          viewBox="0 0 18 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.6667 8.5013H16.5M1.5 8.5013H3.16667M3.16667 8.5013C3.16667 9.65189 4.09941 10.5846 5.25 10.5846C6.40059 10.5846 7.33333 9.65189 7.33333 8.5013C7.33333 7.35071 6.40059 6.41797 5.25 6.41797C4.09941 6.41797 3.16667 7.35071 3.16667 8.5013ZM15.6667 3.5013H16.5M1.5 3.5013H7.33333M12.75 5.58464C11.5994 5.58464 10.6667 4.6519 10.6667 3.5013C10.6667 2.35071 11.5994 1.41797 12.75 1.41797C13.9006 1.41797 14.8333 2.35071 14.8333 3.5013C14.8333 4.6519 13.9006 5.58464 12.75 5.58464Z"
            stroke="#464646"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <Title level={5} style={{ color: "gray" }}>
          {t('sortirovka')}
        </Title>
        <Dropdown menu={{ items }}>
          <Text>{currentOrderText}</Text>
        </Dropdown>
      </Flex>
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
