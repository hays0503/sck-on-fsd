import { Specification } from "@/shared/types/specification";

export type SpecificationTypeParse = Map<string, Map<string, Set<number>>>;


const ParserSpecifications = (data: Specification[]): SpecificationTypeParse => {
    const specifications: SpecificationTypeParse = new Map();

    data.forEach((item: Specification) => {
        const key = item.name_specification?.name_specification;
        const value = item.value_specification?.value_specification;

        if (key && value) {
            // Получить или инициализировать карту значений для этой спецификации
            const values = specifications.get(key) ?? new Map();

            // Получить или инициализировать набор ID продуктов для этого значения
            const productIds = values.get(value) ?? new Set();

            // Добавить текущий ID продукта
            productIds.add(item.product);

            // Обновить карты с новыми значениями
            values.set(value, productIds);
            specifications.set(key, values);
        }
    });

    return specifications;
};

export default ParserSpecifications;