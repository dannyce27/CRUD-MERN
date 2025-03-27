import Employees from "../models/Employees.js";

import bcryptjs from "bcryptjs" //encriptar
import jsonwebtoken from "jsonwebtoken" //token
import { config } from "../config.js"
import { json } from "express";

const RegisterEmployeesController = {};

RegisterEmployeesController.register = async(req, res)=> {

    const {name, lastName, birthday, email, address, hireDate, password, phoneNumber, dui, isssNumber, isVerified} = req.body
    

    try {
        const existEmployee = await Employees.findOne({email})
        if (existEmployee) {
            return res.json({message: "Employee already exist"})
        }
    
        // 2 - Encriptar la contraseña
        const passwordHash = await bcryptjs.hash(password, 10)
    
        // 3 - Guardar Todo en la tabla de empleados
    
        const newEmployee = new Employees({name, lastName, birthday, adress, email, hireDate, password: passwordHash, phoneNumber, dui, isssNumber, isVerified})
    
        await newEmployee.save();

        jsonwebtoken.sign(
            {id: newEmployee._id},
            config.JWT.secret,
            {expiresIn: config.JWT.expiresIn},
            (error, token) =>{
            if (error) console.log("error", error)
            
                res.cookie("authToken", token)
                res.json({message: "Empleado Guardado"})
            } 
                    
                
            


        )
    
    } catch (error) {
         console.log("error"+error)
         res.json({message: "Error saving Employee"})
    }
}

export default RegisterEmployeesController



