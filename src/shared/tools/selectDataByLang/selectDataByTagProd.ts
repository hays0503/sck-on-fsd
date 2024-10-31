import { TagProd } from "@/shared/types/products";

export const selectDataByTagProd = (
    object: TagProd | null | undefined,
    currentLang: "ru" | "en" | "kz" | string
  ) => {
    if (!object) return undefined;
    switch (currentLang) {
      case "ru":
        return object.tag_text;
      case "en":
        return object.additional_data.EN;
      case "kz":
        return object.additional_data.KZ;
      default:
        return undefined;
    }
  };