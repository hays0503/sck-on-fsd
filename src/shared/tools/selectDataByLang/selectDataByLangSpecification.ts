import {
  NameSpecification,
  Specification,
  SpecificationNameSpecificationParams,
  ValueSpecification,
} from "@/shared/types/specification";

export const selectDataByLangSpecificationName: SpecificationNameSpecificationParams =
  (
    object: Specification | NameSpecification | null | undefined,
    currentLang: "ru" | "en" | "kz" | string
  ): string | undefined => {
    if (!object) return undefined;
    if ((<Specification>object).product) {
      switch (currentLang) {
        case "ru":
          return (<Specification>object).name_specification.name_specification;
        case "en":
          return (<Specification>object).name_specification.additional_data.EN;
        case "kz":
          return (<Specification>object).name_specification.additional_data.KZ;
        default:
          return undefined;
      }
    }
    if ((<NameSpecification>object).additional_data) {
      switch (currentLang) {
        case "ru":
          return (<NameSpecification>object).name_specification;
        case "en":
          return (<NameSpecification>object).additional_data.EN;
        case "kz":
          return (<NameSpecification>object).additional_data.KZ;
        default:
          return undefined;
      }
    }

    return undefined;
  };

export const selectDataByLangSpecificationValue = (
  object: Specification | ValueSpecification | null | undefined,
  currentLang: "ru" | "en" | "kz" | string
): string | undefined => {
  if (!object) return undefined;

  if ((<Specification>object).product) {
    switch (currentLang) {
      case "ru":
        return (<Specification>object).value_specification.value_specification;
      case "en":
        return (<Specification>object).value_specification.additional_data.EN;
      case "kz":
        return (<Specification>object).value_specification.additional_data.KZ;
      default:
        return undefined;
    }
  }
  if ((<ValueSpecification>object).additional_data) {
    switch (currentLang) {
      case "ru":
        return (<ValueSpecification>object).value_specification;
      case "en":
        return (<ValueSpecification>object).additional_data.EN;
      case "kz":
        return (<ValueSpecification>object).additional_data.KZ;
      default:
        return undefined;
    }
  }

  return undefined;
};
