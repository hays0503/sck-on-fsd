
import { Products } from "@/shared/types/products";
import getProductById from "./getProductById";

type GetProductPresentById = (id: string) => Promise<Products>;

const getProductPresentById: GetProductPresentById = async (id) => {
    return getProductById(id);
};

export default getProductPresentById;
