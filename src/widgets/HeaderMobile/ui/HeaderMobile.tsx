"use client";
import { CategoryListMobile } from "@/entities/Category";
import { ChangeLanguage } from "@/features/change-language";
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
        <Flex gap={10} justify="center" align="center">
          <span>{"+7 705 655 00 00"}</span>
          <ChangeLanguage />
        </Flex>
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