import { Products } from "@/shared/types/products";
import { ProductsDetail } from "@/shared/types/productsDetail";


type GetPriceResult = {price: number|undefined|null,discountPrice: number|undefined|null} 

type GetPrice = (product: Products|ProductsDetail,city: string) => GetPriceResult
const getPrice: GetPrice = (
    product: Products | ProductsDetail,
    // city: string
): GetPriceResult => {

    // Check if product has a 'price' property
    if ('price' in product) {
        const productPrice = product.price;

        // Handle case where price exists but is an empty object
        if (productPrice && Object.keys(productPrice).length === 0) {
            return { price: 0, discountPrice: undefined };
        }

        // Calculate the price
        const prices = Object.values(productPrice || {}).sort((a: number, b: number) => b - a);
        const price = prices[0] ?? 0;

        // Calculate the discount price
        const discountAmountC = product?.discount_amount_c;
        const discountAmountP = product?.discount_amount_p;
        const discountAmount = discountAmountP || discountAmountC;

        const discountPrice = discountAmount
            ? price + (price * Number(discountAmount) / 100)
            : undefined;

        return { price, discountPrice };
    }

    // Fallback for products without a 'price' property
    return { price: undefined, discountPrice: undefined };
};

export default getPrice;

