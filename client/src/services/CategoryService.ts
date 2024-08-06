import Category, { CategoryMapType } from '../model/Category';
import Requester from './Requester';
import Product from '../model/Product';

const BASE_URL = "http://localhost:3030/data";

class CategoryService {
    static async getCategoryMap() {

        let categoryMap: CategoryMapType = {
            // hard-coded default category
            default: new Category({ _id: "default", name: "No category" })
        }
        const categories =
            await Requester.get(`${BASE_URL}/categories`) as Category[]

        categories.forEach((category: Category) => {
            if (category._id) categoryMap[category._id] = category
        })
        return categoryMap
    }

    static async addCategory(category: Category) {
        const newCategory = await Requester.post(
            `${BASE_URL}/categories`,
            category
        );
        return newCategory;
    }

    static async editCategory(category: Category) {
        const editedCategory = await Requester.put(
            `${BASE_URL}/categories/${category._id}`,
            category
        );
        return editedCategory;
    }

    static async deleteCategory(categroyId: string) {
        const params = new URLSearchParams({
            where: `categoryId="${categroyId}"`
        })

        const existing = await Requester.get(
            `${BASE_URL}/catalog?${params.toString()}`
        )

        existing.forEach(async (product: Product) => {
            product.categoryId = "default"
            // move all existing products to default category
            await Requester.put(`${BASE_URL}/catalog/${product._id}`, product)
        })
        await Requester.del(`${BASE_URL}/categories/${categroyId}`);
    }

    static getCategoryName(
        categoryMap: CategoryMapType,
        categoryId: string = "default"
    ) {
        const category = categoryMap[categoryId] || categoryMap["default"]
        return category?.name
    }
}


export default CategoryService;