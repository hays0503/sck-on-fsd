import { iDescription } from "@/shared/types/descriptionProduct";


type GetProductDescriptionById = (id: string) => Promise<iDescription>

const getProductDescriptionById: GetProductDescriptionById = async (id: string) => {
    return await (await fetch(`/api/v1/descrip/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    })).json();
}

export default getProductDescriptionById;