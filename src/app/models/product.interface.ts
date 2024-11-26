export interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    images: string[];
    created_at: string;
    updated_at: string;
    category_name?: string; // propiedad opcional
}
