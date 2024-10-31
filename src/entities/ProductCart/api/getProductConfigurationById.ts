import { Products } from "@/shared/types/products";
import getProductById from "./getProductById";

export type GetProductConfigurationById = (id: string) => Promise<Products>;

const getProductConfigurationById:GetProductConfigurationById = async (id) => {
    return getProductById(id);
}

export default getProductConfigurationById;