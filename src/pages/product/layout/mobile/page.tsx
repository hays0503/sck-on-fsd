import { UrlApi, UrlApiWithDomain, UrlRevalidate } from "@/shared/api/url";
import { ProvidersClient } from "@/shared/providers/providersClient";
import { ProvidersServer } from "@/shared/providers/providersServer";
import findRootAndDescendants from "@/shared/tools/findRootAndDescandants";
import {
  selectDataByLangCategory,
} from "@/shared/tools/selectDataByLang";
import { Category } from "@/shared/types/category";
import { ProductsDetail } from "@/shared/types/productsDetail";
import { Reviews } from "@/shared/types/reviews";
import { Specification } from "@/shared/types/specification";
import HeaderText from "@/shared/ui/HeaderText";
import { FooterMobile } from "@/widgets/FooterMobile";
import { LayoutCustom } from "@/widgets/LayoutCustom";
import { ProductDetail } from "@/widgets/ProductDetail";

interface IProductPageProps {
  params: {
    locale: string;
    city: string;
    slug: string;
  };
}

type ProductPageComponent = (props: IProductPageProps) => Promise<JSX.Element>;

const ProductPage: ProductPageComponent = async (props) => {
  const { locale, slug } = props.params;

  const fetchCity = await (
    await fetch(UrlApiWithDomain.getCity, {
      ...UrlRevalidate.getCity,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
  ).json();

  const UrlProduct = `${UrlApi.getProducts}${slug}`;
  const UrlWithDomainProduct = `${UrlApiWithDomain.getProducts}${slug}`;

  const fetchProduct: ProductsDetail = await (
    await fetch(UrlWithDomainProduct, {
      ...UrlRevalidate.getProducts,
    })
  ).json();

  const fetchCategory: Category[] = await (
    await fetch(UrlApiWithDomain.getCategory, {
      ...UrlRevalidate.getCategory,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
  ).json();

  const urlBuilderSpecification = `${UrlApi.getProductSpecificationsById}filter_by_prod/${fetchProduct.id}`;
  const urlBuilderSpecificationWithDomain = `${UrlApiWithDomain.getProductSpecificationsById}filter_by_prod/${fetchProduct.id}`;
  const fetchSpecification:Specification[] = await (
    await fetch(urlBuilderSpecificationWithDomain,{
      ...UrlRevalidate.getProductSpecificationsById,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
  ).json();

  const urlBuilderReviews = `${UrlApi.getProductReviewsById}${fetchProduct.id}`
  const urlBuilderReviewsWithDomain = `${UrlApiWithDomain.getProductReviewsById}${fetchProduct.id}`
  const fetchReviews:Reviews[] = await (
    await fetch(urlBuilderReviewsWithDomain,{
      ...UrlRevalidate.getProductReviewsById,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
  ).json();

  const fallback = {
    [UrlApi.getCity]: fetchCity,
    [UrlApi.getCategory]: fetchCategory,
    [UrlProduct]: fetchProduct,
    [urlBuilderSpecification]: fetchSpecification,
    [urlBuilderReviews]: fetchReviews
  };

  const { root: breadcrumbsRoot } = findRootAndDescendants(fetchCategory, fetchProduct.category.id);


  return (
    <ProvidersServer>
      <ProvidersClient params={props.params} fallback={fallback}>
        <LayoutCustom
          h="px"
          hightHeader={70}
          hightFooter={80}
          headerContent={
            <HeaderText
              text={selectDataByLangCategory(breadcrumbsRoot, locale) ?? ""}
            />
          }
          content={
            <ProductDetail slug={slug}/>            
          }
          footerContent={<FooterMobile defaultKey="1" />}
        />
      </ProvidersClient>
    </ProvidersServer>
  );
};

export default ProductPage;
