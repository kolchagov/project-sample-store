import Category from '../model/Category';
import Requester from './Requester';

const BASE_URL = "http://localhost:3030/jsonstore"

class CategoryService {
    static async getCategoryMap() {
        const id = "default";
        const defaultCategory = new Category({ _id: id, name: "No category" });
        const categories = { default: defaultCategory }
        const categoryMap = await Requester.get(`${BASE_URL}/categories`) as Object
        Object.assign(categories, categoryMap)
        return categories
    }
}


export default CategoryService;