import { Brands } from "@/shared/types/brand";

export const selectDataByLangBrands = (
    object: Brands,
    currentLang: "ru" | "en" | "kz" | string
  ) => {
    if (!object) return undefined;
    switch (currentLang) {
      case "ru":
        return object.name_brand;
      case "en":
        return object.additional_data.EN;
      case "kz":
        return object.additional_data.KZ;
      default:
        return undefined;
    }
  };