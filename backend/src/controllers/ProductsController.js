const productsController = {};
import productmodel from "../models/Products"


//Select del CRUD 
productsController.getProducts = async (req, res) => {

    const products = await productmodel.find();
    res.json(products)
}

//Insert del CRUD
productsController.createProducts = async(req, res) => {

    const{name, description, price, stock} = req.body;
    const newProduct = new productmodel({name, description, price, stock});

    await newProduct.save();
}
