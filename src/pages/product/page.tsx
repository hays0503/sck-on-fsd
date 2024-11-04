import { UrlApi, UrlApiWithDomain, UrlRevalidate } from "@/shared/api/url";
import { ProvidersClient } from "@/shared/providers/providersClient";
import { ProvidersServer } from "@/shared/providers/providersServer";
import findRootAndDescendants from "@/shared/tools/findRootAndDescandants";
import {
  selectDataByLangCategory,
} from "@/shared/tools/selectDataByLang";
import { Category } from "@/shared/types/category";
import { ProductsDetail } from "@/shared/types/productsDetail";
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
  const { locale, city, slug } = props.params;

  console.log(locale, city, slug);

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

  const fallback = {
    [UrlApi.getCategory]: fetchCategory,
    [UrlProduct]: fetchProduct,
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
