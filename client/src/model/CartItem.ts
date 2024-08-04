import Product from "./Product";

class CartItem extends Product {
    public count: number;

    constructor(product: Product, count: number = 1) {
        super(product);
        this.count = count;
    }
}


export default CartItem;