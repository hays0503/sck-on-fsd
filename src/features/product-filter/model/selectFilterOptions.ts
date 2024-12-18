import { SpecificationTypeParse } from "./parserSpecifications";

const SelectFilterOptions = (
    specifications: SpecificationTypeParse,
    selectedFilter: {
        key: string;
        value: string;}
): number[] => {
    const SelectedKey = specifications.get(selectedFilter.key);
    if (!SelectedKey) {
        // Нет такой спецификации
        return [];
    }
    const SelectedFiltered = SelectedKey.get(selectedFilter.value);
    return SelectedFiltered ? Array.from(SelectedFiltered) : [];
};

export default SelectFilterOptions;