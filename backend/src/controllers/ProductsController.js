import productmodel from "../models/Products.js";

const productsController = {};

// Obtener todos los productos
productsController.getProducts = async (req, res) => {
  try {
    const products = await productmodel.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
};

// Crear un nuevo producto
productsController.createProducts = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const newProduct = new productmodel({ name, description, price, stock });
    await newProduct.save();
    res.status(201).json({ message: "Producto creado exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al crear el producto", error });
  }
};

// Actualizar un producto por ID
productsController.updateProducts = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    await productmodel.findOneAndUpdate(
      { _id: req.params.id },
      { name, description, price, stock }
    );
    res.json({ message: "Producto actualizado exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el producto", error });
  }
};

// Eliminar un producto por ID
productsController.deleteProducts = async (req, res) => {
  try {
    await productmodel.findOneAndDelete({ _id: req.params.id });
    res.json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar el producto", error });
  }
};

export default productsController;
