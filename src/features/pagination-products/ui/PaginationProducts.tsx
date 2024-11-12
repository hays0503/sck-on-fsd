import { Pagination,Flex } from "antd";
import { parseAsInteger, useQueryState } from "nuqs";
import { paginationConfig } from "../config";

interface IPaginationProductsProps {
    readonly totalProducts: number
}

const PaginationProducts: React.FC<IPaginationProductsProps> = ({totalProducts}) => {
    const [currentPage, setCurrentPage] = useQueryState("page", parseAsInteger.withDefault(1));
    return (
        <Flex justify="center" align="center" style={{ width: "100%" }}>
          <Pagination 
            align="center"
            pageSize={paginationConfig.pageSize}
            total={totalProducts}
            current={currentPage} 
            defaultPageSize={paginationConfig.pageSize}
            defaultCurrent={paginationConfig.initialPage}
            onChange={(page: number)=>setCurrentPage(page)}
          />
        </Flex>
      );
}

export default PaginationProducts;