import { Flex } from "antd";
import getDiscount from "../../model/getDiscount";
import getPrice from "../../model/getPrice";
import { useLocale } from "next-intl";
import { Products } from "@/shared/types/products";
import { Level1, Level2, Level3, ProductCartSwiper } from "./SubComponent";
import { selectDataByLangProducts } from "@/shared/tools/selectDataByLang";
import useSelectedCity from "@/shared/hooks/useSelectedCity";
import { Link } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { ProductsDetail } from "@/shared/types/productsDetail";

interface IProductCartProps {
  readonly Product: Products|ProductsDetail;
  readonly addToCartSlot: JSX.Element;
  readonly addToFavoriteSlot: JSX.Element;
}

const ProductCart: React.FC<IProductCartProps> = (props) => {
  const { Product, addToCartSlot, addToFavoriteSlot } = props;
  const currentCity = useGetCityParams();
  const selectedCity = useSelectedCity();
  const localActive = useLocale();
  const { price, discountPrice } = getPrice(props.Product, selectedCity);
  const discount = getDiscount(props.Product) ?? undefined;
  const name = selectDataByLangProducts(props.Product, localActive);

  const CartWidth = 150;

  return (
    <Flex
      wrap
      vertical={true}
      align="center"
      justify="space-between"
      gap={10}
      style={{
        backgroundColor: "#FFFFFF",
        width: CartWidth,
        padding: "10px",
      }}
    >
      <Level1
        discount={discount}
        addToFavoriteSlot={addToFavoriteSlot}
        Swiper={
          <ProductCartSwiper
            name={name}
            images={props.Product.list_url_to_image}
            width={CartWidth}
            height={CartWidth} //Квадрат высота равна ширине
          />
        }
      />
      <Link href={`/city/${currentCity}/product/${props.Product.slug}`} style={{ width: "100%" }}>
        <Level2
          name={name}
          average_rating={Product?.average_rating}
          reviews_count={Product?.reviews_count}
          price={price}
          discountPrice={discountPrice}
        />
      </Link>
      <Level3 addToCartSlot={addToCartSlot} />
    </Flex>
  );
};

export default ProductCart;
