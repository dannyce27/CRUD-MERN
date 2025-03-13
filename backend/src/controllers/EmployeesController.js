const EmployeesController = {};

import productmodel from "../models/Employees"


//Select del CRUD 
EmployeesController.getEmployees = async (req, res) => {

    const Employees = await productmodel.find();
    res.json(Employees)
}

//Insert del CRUD
EmployeesController.createEmployes = async(req, res) => {


    const{name, lastName, birthday, email, adress, hireDate, password, phoneNumber, dui, isssNumber, isVerified} = req.body;
    const newProduct = new productmodel({name, lastName, birthday, email, adress, hireDate, password, phoneNumber, dui, isssNumber, isVerified});


    await newProduct.save();
    res.json({message: "Employee Created"})
}

EmployeesController.deleteEmployee = async(req, res) => {
    await productmodel.findOneAndDelete(req.params.id)
    res.json({message: "Employee deleted"})

}

EmployeesController.updateEmployee = async(req, res) => {
    const{name, lastName, birthday, email, adress, hireDate, password, phoneNumber, dui, isssNumber, isVerified} = req.body;

    await productmodel.findOneAndUpdate(req.param.id, {
        name,
        lastName,
        birthday,
        email, 
        adress,
        hireDate,
        password, 
        phoneNumber,
        dui, 
        isssNumber,
        isVerified
    });
    res.json({message: "Employee Updated"})
}
export default EmployeesController;
