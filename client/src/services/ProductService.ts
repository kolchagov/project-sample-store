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

    static async getProduct(productId: string) {
        const product = await Requester.get(`${BASE_URL}/catalog/${productId}`) as Product
        return product
    }

    static async createProduct(product: Product) {
        const persistedProduct = await Requester.post(`${BASE_URL}/catalog`, product);
        return persistedProduct
    }

    static async updateProduct(productId: string,
        {
            img,
            make,
            model,
            material,
            year,
            price,
            description,
            categoryId,
        }: Product) {
        const persistedProduct = await Requester.put(`${BASE_URL}/catalog/${productId}`, {
            img,
            make,
            model,
            material,
            year,
            price,
            description,
            categoryId,
        });
        return persistedProduct
    }
}


export default ProductService;