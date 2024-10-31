import { Products } from "@/shared/types/products";
import { ProductsDetail } from "@/shared/types/productsDetail";

export const selectDataByLangProducts = (
    object: ProductsDetail | Products | null | undefined,
    currentLang: "ru" | "en" | "kz" | string
  ) => {
    if (!object) return undefined;
    switch (currentLang) {
      case "ru":
        return object.name_product;
      case "en":
        return object.additional_data.EN;
      case "kz":
        return object.additional_data.KZ;
      default:
        return undefined;
    }
};