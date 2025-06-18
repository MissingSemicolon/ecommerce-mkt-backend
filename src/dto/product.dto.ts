export interface CreateProductDTO {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
}

export interface UpdateProductDTO {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
}

export interface ProductResponseDTO {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}