export interface CreateCategoryDTO {
    name: string;
}

export interface CategoryResponseDTO {
    id: string;
    name: string;
    createdAt: Date;
}