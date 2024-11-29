import { Brands } from "@/shared/types/brand";

export const selectDataByLangBrands = (
    object: Brands,
    currentLang: "ru" | "en" | "kk" | string
  ) => {
    if (!object) return undefined;
    switch (currentLang) {
      case "ru":
        return object.name_brand;
      case "en":
        return object.additional_data.EN;
      case "kk":
        return object.additional_data.KZ;
      default:
        return undefined;
    }
  };