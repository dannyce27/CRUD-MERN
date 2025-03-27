const branchesController = {};
import productmodel from "../models/branches.js"


//Select del CRUD 
branchesController.getBranches = async (req, res) => {

    const branches = await productmodel.find();
    res.json(branches)
}

//Insert del CRUD
branchesController.createBranches = async(req, res) => {

    const{name, adress, phoneNumber, schedule} = req.body;
    const newProduct = new productmodel({name, adress, phoneNumber, schedule});


    await newProduct.save();
    res.json({message: "Branch created"})
}

branchesController.deleteBranches = async(req, res) => {
    await productmodel.findOneAndDelete(req.params.id)
    res.json({message: "Branch deleted"})

}

branchesController.updateBranches = async(req, res) => {
    const{name, adress, phoneNumber, schedule} = req.body;

    await productmodel.findOneAndUpdate(req.param.id, {
        name,
        adress,
        phoneNumber,
        schedule
    });
    res.json({message: "branch Updated"})
}
export default branchesController;
