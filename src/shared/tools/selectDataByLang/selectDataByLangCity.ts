import { iCity } from "@/shared/types/city";

export const selectDataByLangCity = (
    object: iCity | null | undefined ,
    currentLang: "ru" | "en" | "kk" | string
  ) => {
    if (!object) return undefined;
    switch (currentLang) {
      case "ru":
        return object.name_city;
      case "en":
        return object.additional_data.EN;
      case "kk":
        return object.additional_data.KZ;
      default:
        return undefined;
    }
  };