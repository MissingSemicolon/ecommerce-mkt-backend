import ProductRepository from "../repositories/product.repository";
import { CreateProductDTO, UpdateProductDTO, ProductResponseDTO } from "../dto/product.dto";
import categoryRepository from "../repositories/category.repository";

import mongoose from "mongoose";

const registerProduct = async (
  product: CreateProductDTO
): Promise<ProductResponseDTO> => {
  const categoryExists = await categoryRepository.findByName(product.category);
  if (!categoryExists) {
    throw new Error("Categoria não encontrada.");
  }
  const existingProduct = await ProductRepository.findByName(product.name);
  if (existingProduct) {
    throw new Error("Produto já cadastrado.");
  }

  const newProduct = await ProductRepository.create(product);
  return {
    id: (newProduct._id as mongoose.Types.ObjectId).toString(),
    name: newProduct.name,
    description: newProduct.description,
    price: newProduct.price,
    stock: newProduct.stock,
    category: newProduct.category,
    createdAt: newProduct.createdAt,
    updatedAt: newProduct.updatedAt,
  };
};

const deleteProduct = async (id: string): Promise<ProductResponseDTO> => {
  const product = await ProductRepository.deleteById(id);
  if (!product) {
    throw new Error("Produto não encontrado.");
  }
  return {
    id: (product._id as mongoose.Types.ObjectId).toString(),
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    category: product.category,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
};

const getAllProducts = async (): Promise<ProductResponseDTO[]> => {
  const products = await ProductRepository.findAll();
  return products.map((product: any) => ({
    id: (product._id as mongoose.Types.ObjectId).toString(),
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    category: product.category,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  }));
};

const getProductById = async (id: string): Promise<ProductResponseDTO> => {
  const product = await ProductRepository.findById(id);
  if (!product) {
    throw new Error("Produto não encontrado.");
  }
  return {
    id: (product._id as mongoose.Types.ObjectId).toString(),
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    category: product.category,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
};

const updateProduct = async (
  id: string,
  product: UpdateProductDTO
): Promise<ProductResponseDTO> => {
  const updatedProduct = await ProductRepository.updateById(id, product);
  if (!updatedProduct) {
    throw new Error("Produto não encontrado.");
  }
  return {
    id: (updatedProduct._id as mongoose.Types.ObjectId).toString(),
    name: updatedProduct.name,
    description: updatedProduct.description || "",
    price: updatedProduct.price,
    stock: updatedProduct.stock,
    category: updatedProduct.category,
    createdAt: updatedProduct.createdAt,
    updatedAt: updatedProduct.updatedAt,
  };
};

export default {
  registerProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
};
