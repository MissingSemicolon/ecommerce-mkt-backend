import WishlistRepository from "../repositories/wishlist.repository";
import mongoose from "mongoose";
import { WishlistResponseDTO } from "../dto/wishlist.dto";
import ProductRepository from "../repositories/product.repository";

const addProductToWishlist = async (
  userId: string,
  productId: string
): Promise<WishlistResponseDTO> => {
  let wishlist = await WishlistRepository.findByUserId(userId);

  // Verifica se o produtoId é válido
  const product = await ProductRepository.findById(productId);
  if (!product) {
    throw new Error("Produto não encontrado");
  }

  // Verifica se o produto já está na wishlist
  if (wishlist && wishlist.products.includes(new mongoose.Types.ObjectId(productId))) {
    throw new Error("Produto já está na wishlist");
  }

  // Se a wishlist não existir, cria uma nova
  if (!wishlist) {
    try {
      wishlist = await WishlistRepository.create(userId, productId);
    } catch (error) {
      throw new Error("Erro ao criar wishlist");
    }
  }

  // Adiciona o produto à wishlist
  try {
    await WishlistRepository.addProduct(userId, productId);
  } catch (error) {
    throw new Error("Erro ao adicionar produto à wishlist");
  }

  return {
    id: (wishlist._id as mongoose.Types.ObjectId).toString(),
    user_id: wishlist.user_id.toString(),
    products: wishlist.products.map((p: any) => ({
      id: p._id?.toString?.() ?? p.toString(),
      name: p.name,
      description: p.description,
      price: p.price,
    })),
    createdAt: wishlist.createdAt,
    updatedAt: wishlist.updatedAt,
  };
};

const removeProductFromWishlist = async (userId: string, productId: string): Promise<WishlistResponseDTO | null> => {
  // Verifica se o produto já está na wishlist
  const wishlist = await WishlistRepository.findByUserId(userId);
  if (wishlist && !wishlist.products.includes(new mongoose.Types.ObjectId(productId))
  ) {
    throw new Error("Produto não encontrado na wishlist");
  }

  // Remove o produto da wishlist
  const updatedWishlist = await WishlistRepository.removeProduct(userId, productId);
  // Se a wishlist ficou vazia, deleta
  if (updatedWishlist && updatedWishlist.products.length === 0) {
    await WishlistRepository.deleteById(
      (updatedWishlist._id as mongoose.Types.ObjectId).toString()
    );
    return null;
  }
  // Se o produto foi removido com sucesso, retorna e a wishlist não está vazia retorna a wishlist atualizada
  return updatedWishlist
    ? {
        id: (updatedWishlist._id as mongoose.Types.ObjectId).toString(),
        user_id: updatedWishlist.user_id.toString(),
        products: updatedWishlist.products.map((p: any) => ({
          id: p._id?.toString?.() ?? p.toString(),
          name: p.name,
          description: p.description,
          price: p.price,
        })),
        createdAt: updatedWishlist.createdAt,
        updatedAt: updatedWishlist.updatedAt,
      }
    : null;
};

const getWishlistByUser = async (userId: string ): Promise<WishlistResponseDTO | null> => {
  const wishlist = await WishlistRepository.findByUserId(userId);
  // Retorna a wishlist se existir, se não retorna null
  return wishlist
    ? {
        id: (wishlist._id as mongoose.Types.ObjectId).toString(),
        user_id: wishlist.user_id.toString(),
        products: wishlist.products.map((p: any) => ({
          id: p._id?.toString?.() ?? p.toString(),
          name: p.name,
          description: p.description,
          price: p.price,
        })),
        createdAt: wishlist.createdAt,
        updatedAt: wishlist.updatedAt,
      }
    : null;
};

export default {
  addProductToWishlist,
  removeProductFromWishlist,
  getWishlistByUser,
};