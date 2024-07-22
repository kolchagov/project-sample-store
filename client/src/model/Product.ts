/**
 * This is DTO class for product
 */
class Product {
    public _createdOn?: Date;
    public _id?: string;
    public _ownerId?: string;

    public img: string;
    public make: string;
    public model: string;
    public material?: string;
    public year?: number;
    public price: number;
    public description: string;
    public categoryId?: string;

    constructor(product: Product) {
        Object.assign(this, product)
        this._createdOn = product._createdOn ? new Date(product._createdOn) : new Date()
    }
}

export default Product;