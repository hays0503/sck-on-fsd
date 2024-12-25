import { getPrice } from "@/entities/ProductCart";
import { Products } from "@/shared/types/products";

const descFunc = (a: Products, b: Products,selectedCity: string) => {
  const left = getPrice(a, selectedCity).price??0;//a?.price?.[selectedCity] ?? 0;
  const right = getPrice(a, selectedCity).price??0;//b?.price?.[selectedCity] ?? 0;
  if (left < right) {
    return 1;
  }
  if (left > right) {
    return -1;
  }
  return 0;
};
export default descFunc;