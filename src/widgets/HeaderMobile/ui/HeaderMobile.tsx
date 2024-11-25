"use client";
import { CategoryListMobile } from "@/entities/Category";
import { SearchProduct } from "@/features/search-products";
import { Flex } from "antd";

interface IHeaderMobileProps {
  readonly SelectCity: React.FC;
}

const HeaderMobile: React.FC<IHeaderMobileProps> = ({ SelectCity }) => {
  return (
    <Flex vertical={true} gap={5} style={{ width: "100%" }}>
      <Flex justify="space-around" align="center" style={{ width: "100%" }}>
        <SelectCity />
        <span>{`8 000 0000 00 00`}</span>
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
export default HeaderMobile;