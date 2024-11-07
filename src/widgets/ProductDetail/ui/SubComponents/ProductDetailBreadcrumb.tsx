import { useFetcherCategory } from "@/entities/Category";
import { Link } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import findRootAndDescendants from "@/shared/tools/findRootAndDescandants";
import {
  selectDataByLangCategory,
  selectDataByLangProducts,
} from "@/shared/tools/selectDataByLang";
import { Category } from "@/shared/types/category";
import { ProductsDetail } from "@/shared/types/productsDetail";
import { Breadcrumb, Flex } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useLocale, useTranslations } from "next-intl";

interface IProductBreadcrumbProps {
  fetchProduct: ProductsDetail;
}

const ProductDetailBreadcrumb: React.FC<IProductBreadcrumbProps> = (props) => {
  const { fetchProduct } = props;
  const localeActive = useLocale();
  const city = useGetCityParams();
  const fetchCategory: Category[] = useFetcherCategory().data!;

  const t = useTranslations();

  const { descendants: breadcrumbs } = findRootAndDescendants(
    fetchCategory,
    fetchProduct.category.id
  );

  const breadcrumbsItems: ItemType[] = breadcrumbs.map((category: Category) => {
    return {
      title:
        selectDataByLangCategory(category, localeActive) ??
        selectDataByLangCategory(category, "ru"),
    };
  });

  return (
    <Flex style={{ width: "100%" }} >
    <Breadcrumb
      items={[
        { title: <Link href={`/${city}/main`}>{t('glavnaya')}</Link> },
        { title: t('catalog')},
        ...breadcrumbsItems,
        {
          title:
            selectDataByLangProducts(fetchProduct, localeActive) ??
            selectDataByLangProducts(fetchProduct, "ru"),
        },
      ]}
    />
    </Flex>
  );
};

export default ProductDetailBreadcrumb;
