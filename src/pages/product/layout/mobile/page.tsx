import { UrlApi, UrlApiWithDomain, 
  // UrlRevalidate
 } from "@/shared/api/url";
import { ProvidersClient } from "@/shared/providers/providersClient";
import { ProvidersServer } from "@/shared/providers/providersServer";
import findRootAndDescendants from "@/shared/tools/findRootAndDescandants";
import {
  selectDataByLangCategory,
} from "@/shared/tools/selectDataByLang";
// import { Category } from "@/shared/types/category";
// import { ProductsDetail } from "@/shared/types/productsDetail";
// import { Reviews } from "@/shared/types/reviews";
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

  let fetchCity = undefined;
  try {
      const response = await fetch(UrlApiWithDomain.getCity, {
          cache: "force-cache",
          // ...UrlRevalidate.getCity,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
      

      try{
        fetchCity = await response.json();
      }catch(e){
        console.log("Не вышло запросить города так как не получилось разобрать их в ответе",e)
      }


  } catch (error) {
    console.log("Ошибка запроса города ", error);
  }

  const UrlProduct = `${UrlApi.getProducts}${slug}`;
  const UrlWithDomainProduct = `${UrlApiWithDomain.getProducts}${slug}`;

  let fetchProduct = undefined;
  try {
    const responseFetchProduct = await fetch(UrlWithDomainProduct, {
        cache: "force-cache",
        // ...UrlRevalidate.getProducts,
      });
    
    try{
      fetchProduct = await responseFetchProduct.json();
    }catch(e){
      console.log("Не вышло запросить продукт так как не получилось разобрать его в ответе",e)
    }
  } catch (error) {
    console.log("Ошибка запроса продукта ", error);
  }

  let fetchCategory = undefined;
  try {
    const responseFetchCategory =   await fetch(UrlApiWithDomain.getCategory, {
      cache: "force-cache",
      // ...UrlRevalidate.getCategory,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    try {
      fetchCategory = await responseFetchCategory.json();
    } catch (e) {
      console.log("Не вышло запросить категории так как не получилось разобрать их в ответе",e)
    }
  } catch (error) {
    console.log("Ошибка запроса категории ", error);
  }



  const urlBuilderSpecification = `${UrlApi.getProductSpecificationsById}filter_by_prod/${fetchProduct.id}`;
  const urlBuilderSpecificationWithDomain = `${UrlApiWithDomain.getProductSpecificationsById}filter_by_prod/${fetchProduct.id}`;
  let fetchSpecification:Specification[] = [];
  try{
    const responseFetchSpecification = await fetch(urlBuilderSpecificationWithDomain,{
      cache: "force-cache",
      // ...UrlRevalidate.getProductSpecificationsById,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    try {
      fetchSpecification = await responseFetchSpecification.json();
    } catch (e) {
      console.log("Не вышло запросить спецификации продукта так как не получилось разобрать их в ответе",e)
    }
    
  }catch(e){
    console.log("Не вышло запросить спецификации продукта",e)
  }


  const urlBuilderReviews = `${UrlApi.getProductReviewsById}${fetchProduct.id}`
  const urlBuilderReviewsWithDomain = `${UrlApiWithDomain.getProductReviewsById}${fetchProduct.id}`

  let fetchReviews = undefined;
  try {
    const responseFetchReviews = await fetch(urlBuilderReviewsWithDomain, {
      cache: "force-cache",
      // ...UrlRevalidate.getProductReviewsById,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    try {
      fetchReviews = await responseFetchReviews.json();
    } catch (e) {
      console.log("Не вышло запросить отзывы продукта так как не получилось разобрать их в ответе",e)
    }
  } catch (error) {
    console.log("Ошибка запроса отзывов продукта ", error);
  }
  
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
