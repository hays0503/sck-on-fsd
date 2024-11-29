import { Products } from "@/shared/types/products";
import { ProductsDetail } from "@/shared/types/productsDetail";

export const selectDataByLangProducts = (
    object: ProductsDetail | Products | null | undefined,
    currentLang: "ru" | "en" | "kk" | string
  ) => {
    if (!object) return undefined;
    switch (currentLang) {
      case "ru":
        return object.name_product;
      case "en":
        return object.additional_data.EN;
      case "kk":
        return object.additional_data.KZ;
      default:
        return undefined;
    }
};