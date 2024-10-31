import { getBasket, updateBasket } from "../api"
import { CreateBasketResponse } from "../api/createBasket"

export type EditBasketResponse = CreateBasketResponse

type AddPresent = (uuid: string, productId: number, presentId: number) => Promise<EditBasketResponse>

const addPresent: AddPresent = async (uuid,productId, presentId) => {
    // Для добавление подарка
    // 1.Запрашиваем корзину
    // 2.Добавляем подарок
    // 3.Сохраняем корзину

    const currentBasket = await getBasket(uuid);

    const newBasket = currentBasket.basket_items.map((item) => {
        if(item.prod_id === productId){
            const newItem = {
                ...item,
                gift_prod_id: presentId
            }
            return newItem
        }
        return item;
    });

    const response = updateBasket(uuid, newBasket);
    return response
}

export default addPresent
