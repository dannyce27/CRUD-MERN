const ClientsController = {};
import Clients from "../models/Clients.js";
import productmodel from "../models/Clients.js"


//Select del CRUD 
ClientsController.getClients = async (req, res) => {

    const clients = await productmodel.find();
    res.json(clients)
}

//Insert del CRUD
ClientsController.createClients = async(req, res) => {

    const{name, lastName, birthday, email, password, phoneNumber, dui, isVerified} = req.body;
    const newProduct = new productmodel({name, lastName, birthday, email, password, phoneNumber, dui, isVerified});


    await newProduct.save();
    res.json({message: "Client Created"})
}

ClientsController.deleteClients = async(req, res) => {
    await productmodel.findOneAndDelete(req.params.id)
    res.json({message: "Client deleted"})

}

ClientsController.updateClients = async(req, res) => {
    const{name, lastName, birthday, email, password, phoneNumber, dui, isVerified} = req.body;

    await productmodel.findOneAndUpdate(req.param.id, {
        name,
        lastName,
        birthday,
        email, 
        password, 
        phoneNumber,
        dui, 
        isVerified
    });
    res.json({message: "Client Updated"})
}
export default ClientsController;
