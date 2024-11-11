import { Products } from "@/shared/types/products";

const ascFunc = (a: Products, b: Products, selectedCity: string) => {
  const left = a?.price?.[selectedCity] ?? 0;
  const right = b?.price?.[selectedCity] ?? 0;
  if (left < right) {
    return -1;
  }
  if (left > right) {
    return 1;
  }
  return 0;
};

export default ascFunc;
