import { getRawSpecsByProductIds } from "../api";
import ParserSpecifications, { SpecificationTypeParse } from "./parserSpecifications";


const getRawSpecsByProductIdsAndParse = async (
    productIds: number[]
): Promise<SpecificationTypeParse | undefined> => {
    // Получаем сырые данные спецификаций
    const productSpecs = await getRawSpecsByProductIds(productIds);

    let specifications: SpecificationTypeParse;
    try {
        specifications = ParserSpecifications(productSpecs);
    } catch (error) {
        console.log("Шаг 6.");
        console.log("Ошибка при разборе спецификации по продуктам", error);
        return undefined;
    }

    return specifications;
};
export default getRawSpecsByProductIdsAndParse;