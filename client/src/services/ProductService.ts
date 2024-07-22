import Product from "../model/Product";
import Requester from "./Requester";
import hardcodedProducts from '../model/Products';

const BASE_URL = "http://localhost:3030/data"

class ProductService {

    static async getProducts() {
        const products = await Requester.get(`${BASE_URL}/catalog`) as [Product]
        // set default category 
        products.forEach(product => {
            product.categoryId = product.categoryId || "default"
        });
        return [...products, ...hardcodedProducts]
    }
}


export default ProductService;