// type ProductSpecsType = {
//     id: number;
//     name_specification: {
//         id: number;
//         additional_data: {
//             EN: string;
//             KZ: string;
//         };
//         name_specification: string;
//     };
//     value_specification: {
//         id: number;
//         additional_data: {
//             EN: string;
//             KZ: string;
//         };
//         value_specification: string;
//     };
//     product: number;
// };

import { Specification } from "@/shared/types/specification";

// Получаем сырые данные спецификаций
const getRawSpecsByProductIds = async (
    productIds: number[]
): Promise<Specification[]> => {
    const urlsProductSpecs = `/api/v1/specif/configurations/${productIds.join(",")}/`;
    let responseProductSpecs: Response;
    try {
        responseProductSpecs = await fetch(urlsProductSpecs);
    } catch (error) {
        console.log("Шаг 4.");
        console.log("Ошибка при получении спецификации продуктов", error);
        return [];
    }

    let productSpecs: Specification[];
    try {
        productSpecs = await responseProductSpecs.json();
    } catch (error) {
        console.log("Шаг 5.");
        console.log("Ошибка при парсинге спецификации продуктов", error);
        return [];
    }

    return productSpecs;
};

export default getRawSpecsByProductIds;