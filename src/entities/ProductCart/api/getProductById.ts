import { Products } from "@/shared/types/products";

export type GetProductById = (id: string) => Promise<Products>;

const getProductById: GetProductById = async (id) => {
  return await (await fetch(`/api/v1/products/by_ids/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })).json();
};

export default getProductById;