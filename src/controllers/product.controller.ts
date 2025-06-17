import { Request, Response } from "express";
import ProductService from "../services/product.service";
import { CreateProductDTO, UpdateProductDTO } from "../dto/product.dto";

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductService.getAllProducts();
    res.status(200).json(products);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await ProductService.getProductById(id);
    res.status(200).json(product);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const registerProduct = async (req: Request, res: Response) => {
  try {
    const product: CreateProductDTO = req.body;
    const newProduct = await ProductService.registerProduct(product);
    res.status(201).json({message: "Produto Cadastrado com Sucesso!", value: newProduct});
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedProduct = await ProductService.deleteProduct(id);
    res.status(200).json({message: "Produto Deletado com Sucesso!", value: deletedProduct});
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product: UpdateProductDTO = req.body;
    const updatedProduct = await ProductService.updateProduct(id, product);
    res.status(200).json({message: "Produto Atualizado com Sucesso!", value: updatedProduct});
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export default {
  registerProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
};
