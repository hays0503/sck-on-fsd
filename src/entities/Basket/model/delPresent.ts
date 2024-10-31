import { getBasket, updateBasket } from "../api"
import { CreateBasketResponse } from "../api/createBasket"

export type EditBasketResponse = CreateBasketResponse

type delPresent = (uuid: string, productId: number) => Promise<EditBasketResponse>

const delPresent: delPresent = async (uuid,productId) => {
    // Для удаления подарка
    // 1.Запрашиваем корзину
    // 2.Удаляем подарок
    // 3.Сохраняем корзину

    const currentBasket = await getBasket(uuid);

    const newBasket = currentBasket.basket_items.map((item) => {
        if(item.prod_id === productId){
            const newItem = {
                count:item.count,
                price:item.price,
                prod_id:item.prod_id,                
            }
            return newItem
        }
        return item;
    });

    const response = updateBasket(uuid, newBasket);
    return response
}

export default delPresent
