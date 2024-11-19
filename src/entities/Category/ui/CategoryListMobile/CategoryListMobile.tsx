import { Segmented } from "antd";
import { useLocale } from "next-intl";
import { useFetcherCategory } from "../../api";
import { selectDataByLangCategory } from "@/shared/tools/selectDataByLang";
import { Category } from "@/shared/types/category";
import { SegmentedOptions } from "antd/es/segmented";
import { CSSProperties } from "react";
import { useRouter } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";

const CategoryListMobile = () => {
  const localActive = useLocale();
  const Category = useFetcherCategory();
  const city = useGetCityParams();
  const style:CSSProperties = {
    "--ant-segmented-item-selected-bg":"#3E54CF",
    "--ant-segmented-item-selected-color":"#FFF",
  } as CSSProperties

  const router = useRouter();

  const CategoryList: SegmentedOptions =
    Category.data?.map((category: Category) => {
      return {
        value: category.slug,
        label: (
          <span style={{
            marginLeft: "15px",
            marginRight: "15px",
          }}>
            {selectDataByLangCategory(category, localActive) ??
              selectDataByLangCategory(category, "ru")}
          </span>
        ),
      };
    }) ?? [];

  return <Segmented 
  options={CategoryList}
  style={style}
  defaultValue="1"
  onChange={(value: string | number) => router.push(`/city/${city}/catalog/category-slug/${value}`)}/>;
};

export default CategoryListMobile;
