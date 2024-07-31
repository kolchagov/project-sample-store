export type CategoryMapType = {
    [id: string]: Category
}

class Category {
    public _id?: string;
    public _ownerId?: string;
    public _createdOn?: Date;
    public name: string;

    constructor(category: Category) {
        Object.assign(this, category)
    }
}

export default Category;