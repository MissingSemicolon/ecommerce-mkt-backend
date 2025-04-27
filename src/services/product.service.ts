import Product from "../models/product.model";

const registerProduct = async (product: any) => {
  const newProduct = new Product(product);
  await newProduct.save();
  return newProduct;
};

const deleteProduct = async (id: string) => {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
        throw new Error("Produto não encontrado.");
    }
    return product;
}

const getAllProducts = async () => {
  const products = await Product.find();
  return products;
};

const getProductById = async (id: string) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error("Produto não encontrado.");
  }
  return product;
};

const updateProduct = async (id: string, product: any) => {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
        new: true,
        runValidators: true,
    });
}

export default { registerProduct, deleteProduct, getAllProducts, getProductById, updateProduct };