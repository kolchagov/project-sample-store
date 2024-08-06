import Product from "../model/Product";
import Requester from "./Requester";

const BASE_URL = "http://localhost:3030/data"

class ProductService {

    static getFormattedPrice(price: number) {
        const euros = Math.floor(price),
            cents = ("00" + Math.round(price % 1 * 100)).slice(-2)
        return [euros, cents]
    }

    static async getProducts(categoryId?: string) {
        let params = ""
        if (categoryId && categoryId !== "default") {
            const search = new URLSearchParams({
                where: `categoryId="${categoryId}"`
            })
            params = `?${search.toString()}`
        }
        const products = await Requester.get(`${BASE_URL}/catalog/${params}`) as [Product]
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

    static async deleteProduct(productId: string | null) {
        if (!productId) return
        // returns {_deletedon: ...}
        await Requester.del(`${BASE_URL}/catalog/${productId}`);
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