import customerModel from "../models/Clients.js"
import Employees from "../models/Employees.js"

import bcryptjs from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import {config} from "../config.js"


const loginController = {};

loginController.login = async(req, res) => {

    const{email, contraseña} = req.body;

    try {
        //validamos los 3 posibles niveles
        //1. admin
        //2. empleado
        //3. cliente

        let userFound;
        let userType;

        if(email === config.ADMIN.emailAdmin && contraseña === config.ADMIN.password){
            userType = "admin"
            userFound = {_id: "admin"}
        }else{
            userFound = await Employees.findOne({email})
            userType = "employee"
        }


        if(!userFound){
            return res.json({message: "User not found"})
        }

        if(userFound !== "admin"){
            const isMatched = await bcryptjs.compare(password, userFound.password)
            if(!isMatched){
                return res.json({message: "invalid password"})
            }
        }

        jsonwebtoken.sign(
            {id: userFound._id, userType},
            config.JWT.secret,
            {expiresIn: config.JWT.expiresIn},

            (error, token) =>{
                if (error) console.log("error", error)
                
                    res.cookie("authToken", token)
                    res.json({message: "lOGIN SUCCESFUL"})
                } 
        )

    } catch (error) {
        console.log("error", error)
    }
}

export default loginController