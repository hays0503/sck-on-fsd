
export type BasketItem = {
    readonly count: number,
    readonly price: number,
    readonly prod_id: number
    readonly gift_prod_id?:number
}

export type BasketItems = readonly BasketItem[];

export type CreateBasketResponse = {
    readonly basket_items: BasketItems
    readonly gift_items?: BasketItems;
    readonly uuid_id: string;
    readonly user_id?: string;
    readonly completed?: boolean;
    
}

type CreateBasket = (uuid:string) => Promise<CreateBasketResponse>;

const createBasket: CreateBasket = async (uuid) => {
  return await fetch("/basket_api/v1/bascket/create_or_update/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({ uuid: uuid }),
  }).then((response) => response.json());
}

export default createBasket