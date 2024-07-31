import Product from "../model/Product";
import Requester from "./Requester";

const BASE_URL = "http://localhost:3030/data"

class ProductService {

    static async getProducts() {
        const relation = encodeURIComponent("category=categroyId:categories")
        const products = await Requester.get(`${BASE_URL}/catalog?load=${relation}`) as [Product]
        // set default category 
        products.forEach(product => {
            product.categoryId = product.categoryId || "default"
        });
        return products
    }

    static async addProduct(product: Product) {
        const persistedProduct = await Requester.post(`${BASE_URL}/catalog`, product);
        return persistedProduct
    }
}


export default ProductService;