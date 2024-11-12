import { Products } from "@/shared/types/products";
import { ProductsDetail } from "@/shared/types/productsDetail";
import { parseAsInteger, useQueryState } from "nuqs";
import slicerPage from "./slicerPage";
import { paginationConfig } from "../config";

interface IGetPaginationFuncProps {
  Products: Products[] | ProductsDetail[];
}

const useGetPaginationFunc = ({ Products }: IGetPaginationFuncProps) => {
  const [currentPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const Page = slicerPage({
    ProductsPerPage: paginationConfig.pageSize,
    CurrentPage: currentPage as number,
    Products: Products,
  });

  return Page;
};

export default useGetPaginationFunc;
