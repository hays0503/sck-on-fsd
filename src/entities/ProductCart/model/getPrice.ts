import { Products } from "@/shared/types/products";
import { ProductsDetail } from "@/shared/types/productsDetail";


type GetPriceResult = {price: number|undefined|null,discountPrice: number|undefined|null} 

type GetPrice = (product: Products|ProductsDetail,city: string) => GetPriceResult

const getPrice: GetPrice = (product: Products|ProductsDetail,city: string) => {
    const price = product?.price?.[city];
    const old_price_product = product?.old_price_p?.[city];
    const old_price_category = product?.old_price_c?.[city];
    const old_price = old_price_product || old_price_category;
    return  {price: price,discountPrice: old_price}
}

export default getPrice;

