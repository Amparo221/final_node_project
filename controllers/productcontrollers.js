import {Product} from '../models/productModel.js';


const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Error al obtener el producto",
        error: error.message,
      });
  }
};

const addProduct = async (req, res) => {
  try {
    const { body } = req;

    if (!body.price || !body.description || !body.sku) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const newProduct = new Product(body);
    await newProduct.save();

    return res
      .status(201)
      .json({ message: "Producto agregado exitosamente" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        message: "Error al agregar el Producto",
        error: error.message,
      });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const updateProduct = await Product.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updateProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({
      message: "Producto actualizado exitosamente",
      updateProduct,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Error al actualizar el producto",
        error: error.message,
      });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteProduct = await Product.findByIdAndDelete(id);

    if (!deleteProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Error al eliminar el producto",
        error: error.message,
      });
  }
};

export {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};