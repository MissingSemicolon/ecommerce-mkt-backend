import { Request, Response } from "express";
import WishlistService from "../services/wishlist.service";
import {
  AddProductToWishlistDTO,
  RemoveProductFromWishlistDTO,
} from "../dto/wishlist.dto";

interface WishlistRequest extends Request {
  user?: any;
}

const addProduct = async (req: WishlistRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const { productId }: AddProductToWishlistDTO = req.body;
    const wishlist = await WishlistService.addProductToWishlist(
      userId,
      productId
    );
    res
      .status(200)
      .json({
        message: "Produto adicionado a lista com sucesso!",
        value: wishlist,
      });
  } catch (error: any) {
    res
      .status(500)
      .json({
        error: "Erro ao adicionar produto à wishlist.",
        message: error.message,
      });
  }
};

const removeProduct = async (req: WishlistRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const { productId }: RemoveProductFromWishlistDTO = req.body;
    const wishlist = await WishlistService.removeProductFromWishlist(
      userId,
      productId
    );
    if (!wishlist) {
      res
        .status(200)
        .json({
          message:
            "Produto removido com Sucesso! Wishlist foi deletada pois ficou vazia.",
        });
    } else {
      res
        .status(200)
        .json({ message: "Produto removido com sucesso!", value: wishlist });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({
        error: "Erro ao remover produto da wishlist.",
        message: error.message,
      });
  }
};

const getWishlist = async (req: WishlistRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const wishlist = await WishlistService.getWishlistByUser(userId);
    if (!wishlist) {
      res
        .status(404)
        .json({
          message: "Wishlist vazia. Tente adicionar um produto a wishlist",
        });
    } else {
      res.status(200).json(wishlist);
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Erro ao buscar wishlist.", message: error.message });
  }
};

export default { addProduct, removeProduct, getWishlist };