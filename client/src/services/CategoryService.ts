import Category from '../model/Category';
import Requester from './Requester';

const BASE_URL = "http://localhost:3030/data/";

type CategoryMapType = {
    [id: string]: Category
}

class CategoryService {
    static async getCategoryMap() {

        const defaultId = "default"
        let categoryMap: CategoryMapType = {
            defaultId: new Category({ _id: defaultId, name: "No category" })
        }
        const categories = await Requester.get(`${BASE_URL}/categories`) as Category[]
        categories.forEach((category: Category) => {
            if (category._id) categoryMap = {
                ...categoryMap, [category._id]: category
            }
        })
        return categoryMap
    }

    static async addCategory(category: Category) {
        const newCategory = await Requester.post(`${BASE_URL}/categories`, category);
        return newCategory;
    }
}


export default CategoryService;