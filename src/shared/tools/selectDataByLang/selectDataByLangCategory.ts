import { Category } from "@/shared/types/category";

export const selectDataByLangCategory = (
    object: Category | null | undefined,
    currentLang: "ru" | "en" | "kz" | string
  ) => {
    if (!object) return undefined;
    switch (currentLang) {
      case "ru":
        return object.name_category;
      case "en":
        return object.additional_data.EN;
      case "kz":
        return object.additional_data.KZ;
      default:
        return undefined;
    }
  };
  