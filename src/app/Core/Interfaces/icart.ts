export interface ICart {
    _id: string;
    cartOwner: string;
    products: ProductElement[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    totalCartPrice: number;
}

export interface ProductElement {
    count: number;
    _id: string;
    product: ProductProduct;
    price: number;
}

export interface ProductProduct {
    subcategory: Subcategory[];
    _id: string;
    title: string;
    quantity: number;
    imageCover: string;
    category: Category;
    brand: Category;
    ratingsAverage: number;
    id: string;
}

export interface Category {
    _id: string;
    name: string;
    slug: string;
    image: string;
}

export interface Subcategory {
    _id: string;
    name: string;
    slug: string;
    category: string;
}
