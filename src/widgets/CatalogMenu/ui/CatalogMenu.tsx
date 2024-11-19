"use client";
import { useFetcherCategory } from "@/entities/Category";
import RowCategory from "./RowCategory";
import { Category } from "@/shared/types/category";
import { buildFlatCategory } from "@/shared/tools/buildFlatCategory";

const CatalogMenu: React.FC<{ slugCategory: string }> = ({ slugCategory }) => {
  const ListStyle: React.CSSProperties = {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  };

  const fetchCategory = useFetcherCategory().data!;

  const categoryFlat: Category[] = buildFlatCategory(fetchCategory);

  const categoryFind = categoryFlat.find(
    (item: Category) => item.slug === slugCategory
  ) ?? { children: fetchCategory };

  return (
    <div>
      <ul style={ListStyle}>
        {categoryFind?.children.map((item, index) => {
          return <RowCategory key={index} item={item} />;
        })}
      </ul>
    </div>
  );
};

export default CatalogMenu;
