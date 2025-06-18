export interface AddProductToWishlistDTO {
    productId: string;
}

export interface RemoveProductFromWishlistDTO {
    productId: string;
}

export interface WishlistProductDTO {
    id: string;
    name: string;
    description: string;
    price: number;
    // Add other product fields as needed
}

export interface WishlistResponseDTO {
    id: string;
    user_id: string;
    products: WishlistProductDTO[];
    createdAt: Date;
    updatedAt: Date;
}