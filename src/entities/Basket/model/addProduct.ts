import { getBasket, updateBasket } from "../api";
import { EditBasketResponse } from "./addPresent";


type addProduct = (uuid: string, productId: number, presentId: number) => Promise<EditBasketResponse>

export const addProduct:addProduct = async (uuid, productId) => {
    const currentBasket = await getBasket(uuid);
    const newBasket = currentBasket.basket_items.map((item) => {
        if (item.prod_id === productId) {
            const newItem = {
                ...item,
                count: item.count + 1,
            };
            return newItem;
        }
        return item;
    });
    const response = updateBasket(uuid, newBasket);
    return response;
};