export type Size = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
export type Type = 'shirts'|'pants'|'hoodies'|'hats';
export type Gender = 'men'|'women'|'kid'|'unisex'

export interface Category {
    id: string;
    name: Type; 
}

export interface Product {
    id: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: Size[];
    slug: string;
    tags: string[];
    title: string;
    //TODO: type: Type;
    gender: Gender;
}

export interface CartProduct {
    id: string;
    slug: string;
    title: string;
    price: number;
    quantity: number;
    size: Size;
    image: string;
}

export interface ProductImage {
    id: number;
    url: string;
    productId?: string;
}

