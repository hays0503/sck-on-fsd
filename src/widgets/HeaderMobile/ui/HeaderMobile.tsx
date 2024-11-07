"use client";
import { CategoryListMobile } from "@/entities/Category";
import { SearchProduct } from "@/features/search-product";
import { Flex } from "antd";

export default function HeaderMobile() {
  return (
    <Flex vertical={true} gap={5} style={{ width: "100%" }}>
      <Flex justify="space-around" align="center" style={{ width: "100%" }}>
        <span>Выбор города </span> <span>{`8 000 0000 00 00`}</span>
      </Flex>
      <Flex
        justify="space-between"
        align="center"
        gap={10}
        style={{ width: "100%" }}
      >
        <SearchProduct />
      </Flex>
      <Flex
        gap={10}
        style={{
          width: "100%",
          overflow: "clip",
          overflowX: "scroll",
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
        }}
      >
        <CategoryListMobile />
      </Flex>
    </Flex>
  );
}
