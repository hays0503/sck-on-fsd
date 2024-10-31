import { Category } from "../types/category";


export default function findRootAndDescendants(categories: Category[], id: number): { root: Category | null, descendants: Category[] } {
    const breadcrumbs: Category[] = [];

    // Находим категорию по её id
    const findCategoryById = (categories: Category[], id: number): Category | null => {
        const queue: Category[] = [...categories];
        while (queue.length > 0) {
            const category = queue.shift();
            if (category?.id === id) {
                return category;
            }
            if (category?.children.length) {
                queue.push(...category.children);
            }
        }
        return null;
    };

    // Проходим по иерархии вверх, собирая категории
    let currentCategory = findCategoryById(categories, id);
    while (currentCategory) {
        breadcrumbs.unshift(currentCategory);  // Добавляем в начало списка
        if (currentCategory.parent === null) {
            break;  // Если категория корневая, выходим
        }
        currentCategory = findCategoryById(categories, currentCategory.parent);
    }

    return {descendants:breadcrumbs, root: breadcrumbs[0]};
}