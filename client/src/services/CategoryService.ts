import Category, { CategoryMapType } from '../model/Category';
import Requester from './Requester';

const BASE_URL = "http://localhost:3030/data";

class CategoryService {
    static async getCategoryMap() {

        const defaultId = "default"
        let categoryMap: CategoryMapType = {
            defaultId: new Category({ _id: defaultId, name: "No category" })
        }
        const categories = await Requester.get(`${BASE_URL}/categories`) as Category[]
        categories.forEach((category: Category) => {
            if (category._id) categoryMap[category._id] = category
        })
        return categoryMap
    }

    static async addCategory(category: Category) {
        const newCategory = await Requester.post(`${BASE_URL}/categories`, category);
        return newCategory;
    }

    static async editCategory(category: Category) {
        const editedCategory = await Requester.put(`${BASE_URL}/categories/${category._id}`, category);
        return editedCategory;
    }

    static async deleteCategory(categroyId: string) {
        // TODO: move all products with this id in default category
        await Requester.del(`${BASE_URL}/categories/${categroyId}`);
    }
}


export default CategoryService;