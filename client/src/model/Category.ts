class Category {
    public _id?: string;
    public name: string;

    constructor(category: Category) {
        Object.assign(this, category)
    }
}