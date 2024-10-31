import { Products } from "@/shared/types/products";
import getProductById from "./getProductById";

type GetProductRelatedProductById = (id: string) => Promise<Products>;

const getProductRelatedProductById: GetProductRelatedProductById = (id) => {
  return getProductById(id);
};

export default getProductRelatedProductById;