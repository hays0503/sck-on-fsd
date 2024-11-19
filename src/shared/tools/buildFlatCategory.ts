import { Category } from "@/shared/types/category";

const buildFlatCategory = (dataCatalog: Category[]): Category[] => {
  const getCategory = (dataCatalog: Category): Category[] => {
    const category = {
      id: dataCatalog.id,
      parent: dataCatalog.parent,
      slug: dataCatalog.slug,
      name_category: dataCatalog.name_category,
      additional_data: dataCatalog.additional_data,
      children: dataCatalog.children,
    } as Category;

    if (dataCatalog.children.length > 0) {
      const recursiveData: Category[] = dataCatalog.children.flatMap((item) => {
        return getCategory(item as Category);
      });
      return [category, ...recursiveData];
    } else {
      return [category];
    }
  };

  const allSlugs = dataCatalog.flatMap((item) => {
    return getCategory(item);
  });

  return allSlugs;
};

export { buildFlatCategory };
