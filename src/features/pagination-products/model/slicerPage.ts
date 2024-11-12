import { Products } from "@/shared/types/products";
import { ProductsDetail } from "@/shared/types/productsDetail";

interface ISlicerPageProps {
    readonly ProductsPerPage: number;
    readonly CurrentPage: number;
    readonly Products: Products[]|ProductsDetail[];
}

type functionSlicerPage = ({ ProductsPerPage, CurrentPage, Products }: ISlicerPageProps) => Products[]|ProductsDetail[];

const slicerPage: functionSlicerPage = ({ ProductsPerPage, CurrentPage, Products }) => {
    const indexOfLastProduct = CurrentPage * ProductsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - ProductsPerPage;
    const currentProducts = Products.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );
    return currentProducts;
};


export default slicerPage   