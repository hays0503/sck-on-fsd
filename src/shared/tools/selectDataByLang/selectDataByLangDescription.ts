import { iDescription } from "@/shared/types/descriptionProduct";

export const selectDataByLangDescriptionTitle = (
    object: iDescription | null | undefined,
    currentLang: "ru" | "en" | "kk" | string
  ) => {
    if (!object) return undefined;
    switch (currentLang) {
      case "ru":
        return object.title_description;
      case "en":
        return object.additional_data.EN;
      case "kk":
        return object.additional_data.KZ;
      default:
        return undefined;
    }
  };
  
export  const selectDataByLangDescriptionBody = (
    object: iDescription | null | undefined,
    currentLang: "ru" | "en" | "kk" | string
  ) => {
    if (!object) return undefined;
    switch (currentLang) {
      case "ru":
        return object.body_description;
      case "en":
        return object.additional_data_to_desc.EN;
      case "kk":
        return object.additional_data_to_desc.KZ;
      default:
        return ;
    }
  };