/**
 * This is DTO class for product
 */
class Product {
    public name: string;
    public price: number;
    public description: string;
    public image: string;

    constructor(name: string, price: number, description: string, image: string) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
    }
}

export default Product;