import { Category } from "../types/category";

const flatsCategory = (category: Category): Category[] => {
    if (category.children && category.children.length > 0) {
      return [category, ...category.children.flatMap((item) => flatsCategory(item))];
    } else {
      return [category];
    }
};

export default flatsCategory