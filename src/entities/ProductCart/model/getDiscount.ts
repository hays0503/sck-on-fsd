import { Products } from "@/shared/types/products";
import { ProductsDetail } from "@/shared/types/productsDetail";


type GetDiscount = (product: Products|ProductsDetail) => string|undefined|null;

const getDiscount: GetDiscount = (product) => {
    const discount_amount_product = product?.discount_amount_p;
    const discount_amount_category = product?.discount_amount_c;
    const discount = discount_amount_product || discount_amount_category;
    return discount
}

export default getDiscount