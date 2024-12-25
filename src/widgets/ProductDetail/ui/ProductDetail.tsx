"use client";
import useFetcherProducts from "@/shared/api/fetch/product";
import { ProductsDetail } from "@/shared/types/productsDetail";
import { Flex } from "antd";
import ProductDetailSwiper from "./SubComponents/ProductDetailSwiper";

// import useSelectedCity from "@/shared/hooks/useSelectedCity";
import { ReviewsList } from "@/entities/Reviews";
import {
  ProductDetailBreadcrumb,
  ProductDetailConfiguration,
  ProductDetailDescription,
  ProductDetailItem,
  ProductDetailPrice,
  ProductDetailRelatedProduct,
  ProductDetailSpecification,
  ProductDetailToOrder,
} from "./SubComponents";


interface IProductDetailProps {
  slug: string;
}

const ProductDetail: React.FC<IProductDetailProps> = (props) => {
  const { slug } = props;

  const fetchProduct: ProductsDetail = useFetcherProducts({
    as: "by_slug",
    params: slug,
  }).data! as ProductsDetail;

  //const selectedCity = useSelectedCity();

  const related_products = fetchProduct.related_product;  // .filter((item) => {
  //   return selectedCity in item.price!;
  // });


  return (
    <Flex vertical={true} gap={10}>
      <ProductDetailItem>
        <ProductDetailBreadcrumb fetchProduct={fetchProduct} />
      </ProductDetailItem>

      <ProductDetailItem>
        <ProductDetailSwiper
          images={fetchProduct.list_url_to_image}
          name={fetchProduct.name_product}
          width={300}
          height={300}
        />
      </ProductDetailItem>

      {fetchProduct?.configuration && (
        <ProductDetailItem>
          <ProductDetailConfiguration fetchProduct={fetchProduct} />
        </ProductDetailItem>
      )}

      <ProductDetailItem>
        <ProductDetailToOrder fetchProduct={fetchProduct} />
      </ProductDetailItem>

      <ProductDetailItem>
        <ProductDetailPrice fetchProduct={fetchProduct} />
      </ProductDetailItem>

      <ProductDetailItem>
        <ProductDetailSpecification fetchProduct={fetchProduct} />
      </ProductDetailItem>

      {fetchProduct?.description && (
        <ProductDetailItem>
          <ProductDetailDescription fetchProduct={fetchProduct} />
        </ProductDetailItem>
      )}

      <ProductDetailItem>
        <ReviewsList productId={fetchProduct.id} />
      </ProductDetailItem>

      {related_products.length > 0 && (
        <ProductDetailItem>
          <ProductDetailRelatedProduct
            related_products={related_products}
          />
        </ProductDetailItem>
      )}
    </Flex>
  );
};
export default ProductDetail;
